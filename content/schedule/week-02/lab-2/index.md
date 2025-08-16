---
title: "Lab 2: System Analysis"
weight: 2
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
ReFirmLabs, now owned by Microsoft it uses
[Magic Bytes](https://en.wikipedia.org/wiki/File_format#Magic_number) as well as
other signatures to figure out what files are contained in any blob of data
(like firmware for example).

Create a copy of the firmware file and call it `firmware.bin`. Then run binwalk
on it:

```bash {filename=Bash}
# NOTE: You may want to upgrade the version of binwalk
# on the kali linux vm:
#   sudo apt update && sudo apt install binwalk

$ binwalk firmware.bin | tee output.log | less -S
```

What `binwalk` tells you is for every result:

- the offset into the file (both in base 10 and base 16)
- a description of the embedded data

**How many results do you see?**

### Extract the Filesystem

Finally we can move on the the meat of the embedded device to get at the actual
files.

**What is [SquashFS](https://en.wikipedia.org/wiki/SquashFS)?**

**How many bytes does the filesystem take up in the firmware blob?**

Using `dd`, extract the file system:
`dd if=firmware.bin of=filesystem.sqfs skip=1148290 bs=1 count=<SIZE>`

Then use the `unsquashfs` command to "un-squash" the filesystem (extract the
contents).

### Finding the Root Password

Linux systems store the user password in the `/etc/shadow` file. Find this file
in the extracted file system and compare it to the one on your kali linux vm.

**Does the root user have a password set?**

### Examine the Init Process

The next step in firmware analysis is to reverse engineer the initialization
process to see what a "normal" running system might look like. This is too much
to work though in the short amout of time you have for a lab but we can start on
the process.

This router runs a version of [OpenWRT](https://openwrt.org/) which you may have
seen references to earlier on. Your goal is to find the program responsible for
hosting the http web interface that a user would normally interact with when
configuring the router. Feel free to use any means you like but `grep`-ing for
strings will definitely be useful. Start with the `/etc/inittab` script which is
one of
[the first things run on a unix system](https://en.wikipedia.org/wiki/Init).

NOTE: You don't need to do this exercise in the `chroot` environment.

5. **What web server does this firmware use? Please describe how you found it.**

### Finding Vulnerabilities

Finally, you might be reversing this router in order to conduct a security
assessment of the device. You can search for previously reported vulnerabiliteis
for our device using the following link:

- [`https://cve.mitre.org/cgi-bin/cvekey.cgi?keyword=AC1750`](https://cve.mitre.org/cgi-bin/cvekey.cgi?keyword=AC1750)

Find `CVE-2020-10886`.

6. **Is the vulnerable program in our firmware dump? (I.e can you find it in the
   extracted filesystem?)**

{{% /steps %}}

## Tips

- [`man chroot`](https://man7.org/linux/man-pages/man2/chroot.2.html)
- [OpenWRT Init Scripts](https://openwrt.org/docs/techref/initscripts)

## Submission

{{< callout emoji="📝" >}}

Submit a report with answers to questions to
[ELMS](https://umd.instructure.com/courses/1374508/assignments).

{{< /callout >}}
