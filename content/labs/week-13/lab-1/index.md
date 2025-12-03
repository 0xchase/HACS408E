---
title: "Lab 1: Introduction to Frida"
weight: 1
draft: false
---

## Overview

{{< callout emoji="💡" >}}

explanation

**Goals:**

- goal
- goal
- goal

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

### TODO

- Compare `frida-trace` to using `ltrace`

### TLS Key Extraction

There are a ton of other tools built on top of Frida out on the internet, all
you need to do is search for them. Many of them are geared towards mobile
devices though which isn't the most helpful for this lab.

One tool that's pretty cool is [`friTap`](https://fkie-cad.github.io/friTap/)
which is:

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
