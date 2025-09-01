---
title: "Homework 1: Firmware Analysis"
weight: 1
draft: false
---

## Description

For this lab you will be reinforcing the skills learned in the first two weeks
of class by repeating them on a new firmware. Write a report in the style of a
blog/article
([this is a fine example](https://www.infosecinstitute.com/resources/iot-security/iot-security-fundamentals-reverse-engineering-firmware/)).
Your writing should be informal, and broken down into steps for each part of
your analysis. Please include pictures or code blocks to show or explain
concepts visually.

{{< downloadbutton file="firmware.zip" text="Firmware Blob" >}}

## Rubric (`20 pts`)

1. Initial Research (`3 pts`):
   - Find information about the device this firmware is for and provide an
     overview in your report.
1. Decrypt and Extract Files:
   - You will have to deal with encryption for this assignment. It should be
     easy to figure out with some googling but don't be afraid to reach out if
     you get stuck!
   - Explain your process of decrypting it and make sure you include any
     references to things you find online. (`3 pts`)
   - Show which section of the firmware is the Linux kernel and which is the
     filesystem. Explain what binwalk tells you about the Linux kernel image.
     (`4 pts`)
1. Use your file search and string matching abilities to find the HTTP server
   and the web root.
   - Give a short analysis of the directory structure for the filesystem.
     - What can you find out about the init process? (`3 pts`)
     - Does analyzing the web content give you any info about the system?
       (`4 pts`)
1. Look up CVE's for this device, pick one and give a short description of it in
   your report. (`3 pts`)
   - Explain how your chosen CVE makes the system vulnerable.

## Submission

{{< callout emoji="📝" >}}

Please submit your report in Markdown or PDF format to
[ELMS](https://umd.instructure.com/courses/1374508/assignments).

{{< /callout >}}
