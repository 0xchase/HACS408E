---
title: "Lab 1: Using Frida"
weight: 1
draft: false
---

## Overview

{{< callout emoji="💡" >}}

This lab provides an introduction to dynamic instrumentation using Frida, a popular framework for analyzing desktop and mobile applications. There are a variety of alternative frameworks but many of the basic concepts from Frida generalize to other tools.

**Goals:**

- Gain a basic understanding of Frida's features
- Practice quickly debugging a larger application
- Apply previously learned triage techniques to scope your traces
- Practice vulnerability analysis

**Estimated Time:** `45 Minutes`

{{< /callout >}}

## Part 1: Function Hooking

{{% steps %}}

### Install Frida

![](https://frida.re/img/logotype.svg)

Follow the instructions on `Frida`'s website to install, or use the following
command:

```sh {filename=Shell}
uv tool install frida-tools
```

### Download and run web server

Today's labs will analyze an unknown web server for functionality and vulnerabilities. Download the web server and run it on your linux virtual machine. Browse to the served content in your web browser. Note how the web server prints corresponding logs.

{{< downloadbutton file="vuln_axum_server" text="vuln_axum_server" >}}

### Triage the binary

Triage the server binary unix utilities we've previously discussed in class like `readelf`, `strings`, and `nm`. Use this information to answer the following:

- Many symbol names appear convoluted and illegible. Why is this?
- What source language was this binary compiled from?
- What are some public packages linked to this binary?

### Create your scripts

Frida's most powerful feature is scripting the injected javascript engine to change the state of the running program. We'll develop a basic program to demonstrate function hooking. Below are two skeletons to get you started. Read and understand each of these scripts before continuing.

The first script is a python script used to attach Frida to the target process and load the `hook_commands.js` script into the injected core. 

```python
import pathlib
import sys
import time

import frida

SCRIPT_PATH = pathlib.Path(__file__).with_name("hook_commands.js")
TARGET = "vuln_axum_server"


def find_target(device):
    for proc in device.enumerate_processes():
        if proc.name and TARGET in proc.name:
            return proc
    return None


def on_message(message, _data):
    payload = message.get("payload", {})
    if message["type"] == "send":
        msg = payload.get("message", payload)
        tag = payload.get("type", "send")
        print(f"[{tag}] {msg}")
    else:
        print(f"[frida {message.get('type')}] {message}")


def main():
    device = frida.get_local_device()
    target = find_target(device)
    if not target:
        print("vuln_axum_server not running. Start it with `cargo run` first.")
        sys.exit(1)

    print(f"Attaching to PID {target.pid} ({target.name})")
    session = device.attach(target.pid)

    script = session.create_script(SCRIPT_PATH.read_text())
    script.on("message", on_message)
    script.load()

    print("Hook loaded. Trigger the /run endpoint to exercise Command::output. Ctrl+C to exit.")
    try:
        while True:
            time.sleep(1)
    except KeyboardInterrupt:
        session.detach()


if __name__ == "__main__":
    main()

```

The next script runs inside the target process in the Frida `js` interpreter. It attempts to hook a symbol name and print to the console on the callback. Using the information gathered during your triage, try to identify a symbol associated with running a shell command in the source language standard library. Modify this script to hook that symbol and figure out which UI elements in the served web content run shell commands in the background.

```js
'use strict';

// Hook a symbol by name
const SYMBOL_NAME = ''; // TODO: Put your symbol name here

const module = Process.mainModule;
const symbols = module.enumerateSymbols();
const target = symbols.find((sym) => sym.name === SYMBOL_NAME);

if (!target) {
  console.log(`Symbol ${SYMBOL_NAME} not found in ${module.name}`);
} else {
  console.log("Hooking " + SYMBOL_NAME + " @ " + target.address);
  const hook = {
    onEnter(args) {
      console.log(`${SYMBOL_NAME} called`);
    },
  };

  Interceptor.attach(target.address, hook);
}
```

{{% /steps %}}

## Part 2: Function Tracing

{{% steps %}}

### Faster tracing with `frida-trace`

Scripting is Frida's most powerful feature but for common tasks like tracing Frida distributes prebuilt utilities that can be used without a custom script. We'll experiment with tracing the web server using the `frida-trace` utility. Since crate names are embedded in the mangled symbol names, you can use this to trace specific functionality. For example, examining the symbols indicates that the `reqwest` crate is linked. We can trace related functions by following functions with the package name in the symbol. Try running the following command.

```sh {filename=Shell}
frida-trace -n vuln_axum_server -i "*reqwest*"
```

This command will attach the tracer to the `vuln_axum_server` process if it is running and trace functions matching the expression following `-i`. Clicking served web content in your browser during a trace should make it easy to discover which user interface elements trigger these functions.

### Trace shell commands

Craft a new Frida trace command to trace symbols related to shell command invocation. To find the right keywords you should look for standard practices for invoking these commands in the target language and how they map to symbols you observed during triage. Use this to verify which UI elements in the served web content trigger shell commands upon interaction. 

### Identify the command inject

Web severs that trigger shell commands sometimes have [command injection vulnerabilities](https://owasp.org/www-community/attacks/Command_Injection). You've already narrowed down the functionality associated with shell commands. Now experiment with in the browser to identify which one is vulnerable.

{{% /steps %}}

## Part 3: TLS Keys Dump

In this part you'll use Frida to dump the TLS keys associated with an encrypted web request.

{{% steps %}}

### Dump TLS keys

One tool that's pretty cool is [`friTap`](https://fkie-cad.github.io/friTap/)
which is:

> "... a powerful cybersecurity research tool that simplifies SSL/TLS traffic
> analysis by automating key extraction and traffic decryption."

It works by using `Frida` to dynamically intercept SSL/TLS operations used by
the target application:

<img style="background: #fff" src="https://raw.githubusercontent.com/fkie-cad/friTap/main/assets/fritap_workflow.png" />

See [their documentation](https://fkie-cad.github.io/friTap/) for more
information.

Here's an example of using `fritap` to instrument the `curl` binary to capture TLS session keys and use them to decrypt the traffic in Wireshark. You can apply these instructions to either `curl` or the server binary.

```sh {filename="Shell"}
# Make a temporary directory and navigate to it
mkdir -p /tmp/foo
cd /tmp/foo

# Start wireshark and capture on the ethernet interface
wireshark &>/dev/null &

# Use friTap to spawn the the curl program and save the 
fritap -k keys.log  -s "$(which curl) -L https://hacs408e.net"

# You will probably need to use `ctrl+c` to end the friTap command
```

> [!TIP]
>
> Don't forget to stop the capture in Wireshark!

Check that you captured the request using the `basic+dns` filter button or the
following:

![](./wireshark_basic_plus_dns.png "")

```{filename="Wireshark Filter"}
(http.request or tls.handshake.type eq 1 or (tcp.flags.syn eq 1 and tcp.flags.ack eq 0) or dns) and !(ssdp)
```

![](./wireshark_dns_packets.png "")

Then review the following links to answer the questions:

- https://wiki.wireshark.org/TLS
- https://tlswg.org/sslkeylogfile/draft-ietf-tls-keylogfile.html

{{< question >}}

What log file allows Wireshark to decrypt HTTPS/TLS packets? Where can you
specify this file in the Wireshark settings?

{{< /question >}}

{{< question >}}

Which secret is used to encrypt data sent to the client? Is this label present
in your `keys.log` file?

{{< /question >}}

{{% /steps %}}

## Solutions

{{% details title="Click to reveal.." closed="true" %}}

#### Wireshark TLS Capture

![](./wireshark_https_stream.png "Encrypted packet data.")

![](./wireshark_edit_preferences.png "Go to `Edit > Preferences` in the menu.")

![](./wireshark_protocols_dropdown.png "Find the TLS protocol section.")

![](./wireshark_select_tls.png "")

![](./wireshark_set_pre_master_secret.png "Setup the Pre-master shared secret file to point to the `keys.log` file you created.")

![](./wireshark_decrypted_tls.png "After that you should see decrypted HTTP packets.")

![](./wireshark_follow_decrypted_stream.png "")

![](./wireshark_decrypted_stream_contents.png "")

{{% /details %}}

## Submission

{{< callout emoji="📝" >}}

Submit a Markdown file with any code you wrote and the answers to questions to
[ELMS](https://umd.instructure.com/courses/1390353/assignments).

{{< /callout >}}
