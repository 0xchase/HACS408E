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

### Install some dependencies:

```
sudo apt install qemu-user-static binutils-mipsel-linux-gnu
```

### Try Running the Shell

To start understanding the device behaviour, lets try running the shell built in
to the system.

```bash {filename=Bash}
$ cd squashfs-root/bin/
$ ls -l
```

1. **What kind of file is the `sh` binary?**
2. **What kind file is `busybox`?**

Now try running the shell. It's not super important to know how busybox works
right now, but you can either run `./sh` which is equivelent to `./busybox sh`.

{{< callout type=info >}}

NOTE: These binaries are compiled for mips processors but they will still run on
your kali linux VM's because of "magic" that we won't get in to. For more
information you can read
[`man systemd-binfmt`](https://man7.org/linux/man-pages/man8/systemd-binfmt.service.8.html).
<br><br> You can use the `uname` command to see the architecture of your system.

{{< /callout >}}

3. **What error do you get?**

This program is trying to load a library that it can't find. This is because it
it looking based on our systems root directory and not from the `squashfs-root`
directory as the base. To fix this there are two options:

- Set your `LD_PRELOAD` environment variable (can of worms)
- Change the root directory

To figure out what other libraries are required you can run:

```
LD_TRACE_LOADED_OBJECTS=1 /usr/mipsel-linux-gnu/bin/ld busybox
```

### `chroot` Jails

[`chroot`](https://en.wikipedia.org/wiki/Chroot) is a very powerful program that
has been arround for a long time. It allows you run a command with a specified
directory as the root. Then all file paths are accessed from the new base
instead of the original on your system. This is one of the technologies behind
docker and other containerization tools.

To run inside of a `chroot`-ed environment:

```bash {filename=Bash}
$ cd squashfs-root/
$ sudo chroot $PWD sh
$ ls
# Output:
# bin      dev      etc      lib      mnt      overlay  proc     rom      root     sbin     sys      tmp      usr      var      www
```

This is a very powerful technique because it lets us intertact with the system
in a way that is similar to the real device. For example, this lets us run
commands and see how it would affect the device.

Try running the `/bin/login.sh` script.

4. **Add a sceenshot or copy and paste the login prompt below:**

{{< callout type=error >}}

Be warned! This is not a fully secured way of rehosting the firmware. Some
commands may try to adjust network settings or other things that could affect
the host system. It is also not a perfect recreation of the guest system, for
example the `/proc/` directory is empty and so some programs on the deivce may
not work properly still.

{{< /callout >}}

Try running `/lib/debug/system` inside the `chroot` environment for an example
of the above warning.

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
