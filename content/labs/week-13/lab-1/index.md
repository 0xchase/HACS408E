---
title: "Lab 1: Introduction to Frida"
weight: 1
draft: false
---

## Overview

{{< callout emoji="💡" >}}

The goal of this lab is to give is give you a gentle introduction to Frida and
how tools built on top of the framework can be used for useful dynamic binary
instrumentation. You will practice compiling code and then use tracing tools to
inspect the functions in the code. Finally you will use a network sniffing tool
to decrypt the TLS traffic of a curl request.

**Goals:**

- Learn how to use the `frida-trace` tool to trace library functions
- Recall how function calling conventions work
- Use a Frida based tool (`friTap`) to sniff TLS traffic

**Estimated Time:** `45 Minutes`

{{< /callout >}}

## Instructions

{{% steps %}}

### Install Frida

![](https://frida.re/img/logotype.svg)

Follow the instructions on `Frida`'s website to install, or use the following
command:

```sh {filename=Shell}
uv tool install frida-tools
```

### Build a program to trace with Frida

#### Shared Library

Source Code:

```C {filename="String.c"}
#include <ctype.h>
#include <stdlib.h>

void uppercase_string(char *str) {
  if (NULL == str) {
    return;
  }

  char *s = str;
  while (*s) {
    *s = toupper(*s);
    s++;
  }
}

bool compare_strings(char *x, char *y) {
  return 0 == strcmp(x, y); 
}
```

Compile:

```sh {filename=Shell}
gcc -c -fPIC String.c -o String.o && gcc -shared -o libString.so String.o && rm String.o
```

#### Main Program

Source Code:

```C {filename=simple.c}
#include <stdbool.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

extern void uppercase_string(char *str);

extern bool compare_strings(char *x, char *y);

int main(int argc, char *argv[]) {
  if (1 >= argc) {
    fprintf(stderr, "USAGE: %s <input>", argv[0]);
    exit(0);
  }

  char secret[0x10] = {0};
  strcpy(secret, "hacs408e");
  uppercase_string(secret);

  if (compare_strings(secret, argv[1])) {
    printf("You did it! Hooray!");
    return 0;
  } else {
    printf("Incorrect! Try again...");
    return 1;
  }
}
```

Compile:

```sh {filename=Shell}
gcc simple.c -o simple -L. -lString
```

#### Setup `LD_LIBRARY_PATH` and run the program

You can check that the program depends on your shared object file using `ldd`.

{{< question >}}

Is `ldd` able to find the `libString.so` shared object?

{{< /question >}}

To fix this, you can add the current directory to the `LD_LIBRARY_PATH`
environment variable. See
[`man ld.so`](https://man7.org/linux/man-pages/man8/ld.so.8.html) for more info.

```sh {filename=Shell}
# Setup Environment
export LD_LIBRARY_PATH="$PWD:$LD_LIBRARY_PATH"

# Check library and run!
ldd ./simple
./simple some-string
```

### Tracing Functions with `ltrace` and `frida-trace`

Use `ltrace` to see the arguments to the library calls.

```sh {filename=Shell}
ltrace ./simple some-string
```

Compare this to using `frida-trace`:

```sh {filename=Shell}
# You need to specify a pattern in order for frida to actually hook any functions
frida-trace -i 'fprintf' ./sample some-string
```

Alternatively, you can specify a shared library that you want to trace with `-I`
and Frida will automatically follow all the functions from that library.

```sh
frida-trace -I 'libString.so' -f ./simple some-string
```

> [!NOTE]
>
> The above results may seem under-whelming but we'll improve it as class
> progresses.

### Working with Calling Conventions

Compile the following library and program code which uses two different calling
conventions for each function:

```C {filename=libexample.c}
#include <stdio.h>

void default_call(int a, int b) {
  printf("Default call: a = %d, b = %d\n", a, b);
}

__attribute__((ms_abi))
void ms_abi_call(int a, int b) {
  printf("MS ABI call: a = %d, b = %d\n", a, b);
}
```

```sh {filename=Shell}
gcc -fPIC -shared libexample.c -o libexample.so
```

```C {filename=example.c}
extern void default_call(int a, int b);
extern __attribute__((ms_abi)) void ms_abi_call(int a, int b);

int main() {
  default_call(10, 20);
  ms_abi_call(30, 40);
  return 0;
}
```

```sh {filename=Shell}
gcc example.c -L. -lexample -o example
```

{{< question >}}

How does changing the calling convention affect the results of `ltrace`? Why do
you think that is?

{{< /question >}}

Try using `frida-trace` to see the arguments.

```sh {filename=Shell}
frida-trace -I 'libexample.so' -i '*_call' ./example
```

Unfortunately, Frida isn't quite smart enough to figure out how to display the
arguments from these functions because we haven't told it how to properly
display the data. This is part of what makes Frida so powerful even if it's a
little unintuitive at first. Edit the following lines in the auto generated
scripts in the `__handlers__/libexample.so/` folder to get better results:

```javascript {file="__handlers__/libexample.so/ms_abi_call.js"}
defineHandler({
    onEnter(log, args, state) {
        log(`ms_abi_call(${args[0]},${args[1]},${args[2]},${args[3]})`);
    },
    // ...
});
```

```javascript {file="__handlers__/libexample.so/default_call.js"}
defineHandler({
    onEnter(log, args, state) {
        log(`default_call(${args[0]},${args[1]},${args[2]},${args[3]})`);
    },
    // ...
});
```

Rerun the `frida-trace` command from above.

{{< question >}}

Do these results resemble what you saw with `ltrace`?

{{< /question >}}

### TLS Key Extraction

There are a ton of other tools built on top of Frida out on the internet, all
you need to do is search for them. Many of them are geared towards mobile
devices though which isn't the most helpful for this lab. The main hub to find
Frida scripts at is [Frida CodeShare](https://codeshare.frida.re/).

One alternative tool that's pretty cool is
[`friTap`](https://fkie-cad.github.io/friTap/) which is:

> "... a powerful cybersecurity research tool that simplifies SSL/TLS traffic
> analysis by automating key extraction and traffic decryption."

It works by using `Frida` to dynamically intercept SSL/TLS operations used by
the target application:

<img style="background: #fff" src="https://raw.githubusercontent.com/fkie-cad/friTap/main/assets/fritap_workflow.png" />

See [their documentation](https://fkie-cad.github.io/friTap/) for more
information.

For this next section, we'll be using `fritap` to instrument the `curl` binary
to capture TLS session keys and use them to decrypt the traffic in Wireshark.
Follow the below instructions to capture a web request.

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
