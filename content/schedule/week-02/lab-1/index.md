---
title: "Lab 1: Firmware Startup Analysis"
weight: 1
draft: true
---

## Overview

{{< callout emoji="💡" >}}

The goal of this lab is to get you familliar with some new tools for analyzing
extracted filesystems from embedded devices. Also this should hopefully serve as
an initial guide for how to start looking for vulnerabilities in embedded
systems.

**Goals:**

- Practice linux file searching commands
- Learn how to use `chroot`
- (Indirectly) work with `qemu` user-mode emulation

**Estimated Time:** `45 Minutes`

{{< /callout >}}

## Instructions

{{% steps %}}

### Walk the Binary

Now we get to use the de-facto file analysis tool: `binwalk`. Developed by
ReFirmLabs, it uses
[Magic Bytes](https://en.wikipedia.org/wiki/File_format#Magic_number) as well as
other signatures to figure out what files are contained in any blob of data
(like firmware for example).

Create a copy of the firmware file and call it `firmware.bin`. Then run binwalk
on it:

```bash {filename=Bash}
$ binwalk firmware.bin | tee output.log | less -S
```

What `binwalk` tells you is for every result:

- the offset into the file (both in base 10 and base 16)
- a description of the embedded data

{{< question >}}

How many results do you see?

{{< /question >}}

Try again with the `-Me` flags:

```bash {filename=Bash}
$ binwalk -Me | tee output_full.log | less -S
```

{{< question >}}

Explain how the results differ.

{{< /question >}}

### Extract the Filesystem

Finally we can move on the meat of the embedded device to get at the actual
files.

{{< question >}}

- Explain what [SquashFS](https://en.wikipedia.org/wiki/SquashFS) is used for in
  embedded systems.

- How many bytes does the filesystem take up in your firmware blob?

{{< /question >}}

---

### Finding the Root Password

Linux systems store the user password in the `/etc/shadow` file. Find this file
in the extracted filesystem and compare it to the one on your Linux VM.

{{< question >}}

Does the root user have a password set?

{{< /question >}}

### Examine the Init Process

The next step in firmware analysis is to reverse engineer the initialization
process to see what a "normal" running system might look like. This is too much
to work though in the short ammount of time you have for a lab but we can start
on the process.

This router runs a version of [OpenWRT](https://openwrt.org/) which you may have
seen references to earlier on. Your goal is to find the program responsible for
hosting the HTTP web interface that a user would normally interact with when
configuring the router. Feel free to use any means you like but `grep`-ing for
strings will definitely be useful. Start with the `/etc/inittab` script which is
one of
[the first things run on a Unix system](https://en.wikipedia.org/wiki/Init).

{{< question >}}

What web server does this firmware use? Please describe how you found it.

{{< /question >}}

{{% /steps %}}

## Tips

- [`man chroot`](https://man7.org/linux/man-pages/man2/chroot.2.html)
- [OpenWRT Init Scripts](https://openwrt.org/docs/techref/initscripts)

## Submission

{{< callout emoji="📝" >}}

Submit a report with answers to questions to
[ELMS](https://umd.instructure.com/courses/1374508/assignments).

{{< /callout >}}
