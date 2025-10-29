---
title: "Lab 1: Firmware Startup Analysis"
weight: 1
draft: false
---

## Overview

{{< callout emoji="💡" >}}

The goal of this lab is to immerse you in the practical aspects of reverse
engineering a Linux-based embedded device. You will gain hands-on experience by
traversing the Linux filesystem and understanding the init process for the
operating system. Also this weeks labs should hopefully serve as an initial
guide for how to start looking for vulnerabilities in embedded systems.

**Goals:**

- Use the `binwalk` firmware reversing tool.
- Practice common Linux commands and get more practice working in a terminal.
- Understand how to analyze the boot process of embedded Linux devices.

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

Create a copy of the firmware file you downloaded from last weeks lab and call
it `firmware.bin`. It is always good practice to save a backup in case your
analysis changes the firmware. Then run `binwalk` on it:

```bash {filename=Bash}
$ binwalk firmware.bin | tee output.log | less -SR
```

> [!TIP]
> If you see some junk output like `ESC[1;35m` while viewing the output with
> less, then you forgot the `-R` flag. You can set this option while `less` is
> running by just typing `-R`.
>
> This option tells `less` to interpret ascii color code sequences and show the
> colored output to your terminal.

{{< question >}}

How many results do you see? Does this match what you expected from the previous
week?

{{< /question >}}

Try again with the `-Me` flags:

```bash {filename=Bash}
$ binwalk -Me | tee output_full.log
```

{{< question >}}

Explain how the results differ, or explain what the `-M` and `-e` options for
binwalk do.

{{< /question >}}

### Excavating the Filesystem

Binwalk knows how to handle SquashFS data and it was nice enough to extract all
the files for us. To start getting a sense of what files are on the device, use
the `fd` and `wc` commands.

- The `fd` utility is a rewrite of the `find` program which is used to 'find'
  files in a directory that match some pattern.
- The `wc` command is short for 'word count' and will tell you how many lines
  are in a file.

```bash {filename=Bash}
fd '.' extractions | wc -l
```

The '.' is a
[regular expression](https://en.wikipedia.org/wiki/Regular_expression) that
matches any character.

Change directories into the root of the SquashFS file system. When you `ls` in
this directory, you should see a list of files that looks similar to the root
(`/`) directory of your Linux VM. This is where we left off at the end of last
week.

### Finding the Root Password

When assessing the security of embedded devices, a common first step is to see
if you can find any hard coded passwords or hashes. Linux systems store the user
password in the `/etc/shadow` file. Find this file in the extracted filesystem
and compare it to the one on your Linux VM.

{{< question >}}

<!-- deno-fmt-ignore-start -->
- How do you tell if a Linux user has a password set? Does the root user have a
  password set?
- What other users are part of this system?
<!--deno-fmt-ignore-end -->

<p></p>

{{< /question >}}

### Examine the Init Process

The next step in firmware analysis is to reverse engineer the initialization
process to see what a "normal" running system might look like. Getting into full
embedded device [re-hosting](https://dl.acm.org/doi/10.1145/3423167) is out of
scope for this class but we will learn some of the process.

Review the [Unix `init` process](https://en.wikipedia.org/wiki/Init) and use
that to start searching for the start up files on this system.

{{< question >}}

Explain three things that the `boot` script does when the system is `start`ed.

{{< /question >}}

### Finding the Web Server

This router runs a version of [OpenWRT](https://openwrt.org/) which you may have
seen references to. `OpenWRT`, like other router operating systems, provides a
web interface for configuring settings on the router. Find the program
responsible for hosting the HTTP web interface by searching through the init
scripts.

{{< question >}}

What web server does this firmware use?

{{< /question >}}

{{% /steps %}}

## Submission

{{< callout emoji="📝" >}}

Submit a report with answers to questions to
[ELMS](https://umd.instructure.com/courses/1390353/assignments).

{{< /callout >}}
