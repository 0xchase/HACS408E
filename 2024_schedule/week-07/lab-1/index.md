---
title: "Lab 1: Malware Triage"
weight: 1
---

## Overview

{{< callout emoji="💡" >}}

**Goals:**

- Snapshot your Windows VM
- Upload a malware sample to virus total
- Perform initial triage

**Estimated Time:** `30 Minutes`

{{< /callout >}}

## Part 1 - Initial Setup

{{% steps %}}

### Download ExeSpy

Install the [ExeSpy](https://ajsmith.org/projects/exespy/) utility, which can be
used to view basic information about an Portable Executable file.

### Install x64dbg

Install [x64dbg](https://x64dbg.com/). This application can be used to debug
your sample.

### Snapshot your Windows VM

When dealing with malware we want to be able to revert our system to a blank
state, to ensure the malware hasn't persisted without our knowledge.

### Download the malware sample

{{< downloadbutton file="infected.zip" text="/week-07/infected.zip" >}}

The malware is compressed into an encrypted zip file. The password is
`infected`. After extracting it you should have an `.exe` file.

{{% /steps %}}

## Part 2 - Sample Triage

{{% steps %}}

### Upload the sample to Virus Total

Does Virus Total detect it as malicious? Does it reveal any other useful
information?

### Open the sample in ExeSpy

Try opening the sample in ExeSpy, an open source utility that parse the PE
headers. We won't attempt an in-depth analysis yet. Instead, you should look for
hints of what the malware might be capable of.

1. What are the programs imports and exports? What do they imply about the
   malware's functionality?
2. What strings does the binary contain? Might any of them serve as signatures?

### Run the sample

Try running the sample inside of your Windows VM. What can you infer about it
from its overt behavior? What kind of other behavior might we look for?

### Capture a run with process monitor

Process monitor will attempt to intercept various call the sample might make to
the operating system through its API (similar to strace and ltrace, covered
earlier in this class).

1. Try to filter the process monitor output for just the sample
2. What else can be inferred about its behavior?

{{% /steps %}}

## Submission

{{< callout emoji="📝" >}}

Submit a markdown file with your answers to the questions above to
[ELMS](https://umd.instructure.com/courses/1374508/assignments).

{{< /callout >}}
