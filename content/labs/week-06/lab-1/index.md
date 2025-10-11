---
title: "Lab 1: Malware Triage"
weight: 2
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

### Snapshot your Windows VM

If you haven't already, snapshot your Windows VM. When dealing with malware we
want to be able to revert our system to a blank state, to ensure the malware
hasn't persisted without our knowledge.

Follow the instructions in [Taking a VM Snapshot](../vm-setup/) for more info.

### Download the malware sample

{{< dangerbutton file="infected.zip" text="./infected.zip" >}}

> [!CAUTION]
> This "malware" sample was written by the instructors, but it does still
> exhibit malicious behavior and should still be handled with care. The password
> to decrypt the compressed file is `infected`, which is standard practice in
> many malware sharing repositories. After extracting it you should have a
> standalone `.exe` file.

{{% /steps %}}

## Part 2 - Sample Triage

{{% steps %}}

### Upload the sample to Virus Total

[VirusTotal](https://virustotal.com) is often the first place to go when you
want to triage a malicious sample. The site will scan the file or search for a
hash you enter and give you insight into whether or not the file is malicious.
The behavior section will show or link to previous analysis and information
about how the binary sample interacts with the operating system. The community
tab is also useful because security researchers and automated bots will comment
with helpful or related information.

{{< question >}}

Does Virus Total detect it as malicious? Does it reveal any other useful
information?

{{< /question >}}

### Examine the strings

First, open the sample in binary ninja. You'll notice this sample is much larger
than those we examined in previous labs. It wouldn't be feasible to analyze
every function manually, so we need strategies to quickly identify key
functionality and locate important code sections.

1. Examine the strings and note any that hint at the sample's behavior
2. For strings you identify, find cross references to the functions that use
   those strings.

   > [!TIP]
   > The cross-references tab is normally in the bottom left of binaryninja when
   > it opens up a program.

   ![](./binja_cross_references.png "")

   ![](./binja_references_examples.png "")

{{< question >}}

Find an interesting looking string and show where it is used int the program
code.

{{< /question >}}

3. If you can guess at what a function does, rename it so you can easily find it
   later.

   > [!TIP]
   > You can rename a variable or function by clicking on it and pressing the
   > `N` key. Alternatively, you can right-click and select the menu option to
   > rename it.

### Example the imports

<!-- TODO: Next year we should move this section up and use PE Studio to find suspicious api imports. -->

1. Examine the imports and note any that hint at the sample's behavior. For
   example, the `CreateFileA` or `CreateFileW` functions are used on Windows to
   open and read files.

{{< question >}}

Is this function imported in this binary? Explain how you found your answer.

{{< /question >}}

2. For imports you identify, find cross references to the functions that call
   the imported functions

{{< question >}}

Where does the `CreateFile` function get called? (Provide the address of the
`call` assembly instruction.)

{{< /question >}}

3. Review the function and try to explain at a high-level what it is doing.

{{< question >}}

Where do the arguments come from? <br></br> What is the code doing with the
result?

{{< /question >}}

### Collect potential signatures

When analyzing malware it's useful to collect signatures unique to the malware
that an antivirus might use to recognize it automatically. A "signature"
generally is a pattern bytes that is unique enough to identify the malware
sample. The most common format for developing signatures of malware is
[YARA rules](https://virustotal.github.io/yara/).

{{< question >}}

What unique strings or patters have you seen looking at this sample that you
think would make a good signature? Explain why you think this.

{{< /question >}}

{{% /steps %}}

## Submission

{{< callout emoji="📝" >}}

Submit a markdown file with your answers to the questions above to
[ELMS](https://umd.instructure.com/courses/1374508/assignments).

{{< /callout >}}
