---
title: "Lab 2: System Analysis"
weight: 2
draft: true
---

## Overview

{{< callout emoji="💡" >}}

TODO

**Goals:**

- Practice linux file searching commands
- Review Javascript/HTML code
- Learn how to use `chroot`
- (Indirectly) work with `qemu` user-mode emulation

**Estimated Time:** `45 Minutes`

{{< /callout >}}

## Instructions

{{% steps %}}

### Walk the Binary

Analyze the web server.

Use QEMU/chroot to run it.

Browse with firefox, analyze the source with vscode.

### Finding Vulnerabilities

Finally, you might be reversing this router in order to conduct a security
assessment of the device. You can search for previously reported vulnerabiliteis
for our device using the following link:

- [`https://cve.mitre.org/cgi-bin/cvekey.cgi?keyword=AC1750`](https://cve.mitre.org/cgi-bin/cvekey.cgi?keyword=AC1750)

Find `CVE-2020-10886`.

{{< question >}}

Is the vulnerable program in our firmware dump? (I.e can you find it in the
extracted filesystem?)**

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
