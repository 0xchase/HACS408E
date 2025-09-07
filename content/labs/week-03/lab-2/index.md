---
title: "Lab 2: Understanding Executable File Formats"
weight: 2
draft: true
---

## Overview

{{< callout emoji="💡" >}}

In this lab, you will explore the structure of executable file formats by
comparing static and dynamically linked Linux binaries. You'll learn about how
executables are organized into segments and sections (such as .text, .rodata,
.bss, etc.) and use Binary Ninja to examine symbols and strings. Later, you'll
compare a small program compiled for both Windows and Linux to identify
platform-specific differences.

**Goals:**

- Understand the difference between static and dynamically linked executables.
- Learn how executable file formats are organized into segments and sections.
- Identify common sections (e.g., .text, .rodata, .bss) and understand their
  roles.
- Use Binary Ninja to view symbols and strings for deeper insight into a
  binary's functionality.
- Compare Linux and Windows binaries by examining differences in libraries,
  segments, and platform-specific features.

**Estimated Time:** `45 Minutes`

{{< /callout >}}

## Instructions

{{% steps %}}

### Step 1: Download the Binaries

Download the following Linux command-line utilities:

{{< downloadbutton file="curl" text="curl 1" >}}

{{< downloadbutton file="curl-static" text="curl 2" >}}

### Step 2: Open and Analyze in Binary Ninja

Open both binaries in Binary Ninja. Your goal is to determine which version is a
dynamically loaded binary, and which is statically loaded.

- Observe which libraries each binary uses.
- Check the entropy values – do they differ significantly between the static and
  dynamic versions?
- Compare the overall file sizes.

### Step 3: Examine Segments and Sections

Using Binary Ninja, inspect the segments and sections of each binary.

- Identify common sections like .text (executable code), .rodata (read-only
  data), and .bss (uninitialized data).
- Note differences in how these sections are organized between the static and
  dynamic versions.

### Step 4: Compare Windows vs. Linux Binaries

For part two, download or locate a small program compiled for both Windows and
Linux.

{{< downloadbutton file="hashcat.bin" text="hashcat.bin" >}}

{{< downloadbutton file="hashcat.exe" text="hashcat.exe" >}}

- Open each binary in Binary Ninja.
- Examine their library dependencies – are there any notable differences?
- Look for platform-specific symbols or strings (for example, DLL imports on
  Windows versus system calls on Linux).
- Compare the segmentation/section layout between the two binaries.

{{% /steps %}}

> [!TIP]
>
> - Use Binary Ninja’s "Symbol" and "Strings" views to get detailed insights
>   into each binary.
> - Comparing entropy values can help you spot differences in how data is
>   compressed or obfuscated.
> - Pay close attention to the layout of segments/sections; these often reveal
>   platform-specific optimizations.

## Submission

{{< callout emoji="📝" >}}

Submit a markdown file containing:

- Your observations and notes from comparing the static vs. dynamic Linux
  binaries.
- A detailed comparison of segments and sections for both binaries.
- An analysis of the Windows and Linux versions, highlighting any
  platform-specific differences (such as library dependencies and symbols).
- Answers to the reflection questions at the end.

You can submit this assignment via
[ELMS](https://umd.instructure.com/courses/1390353/assignments).

{{< /callout >}}

## Reflection Questions

After completing the lab, answer the following reflective questions:

1. What are the main differences you observed between static and dynamically
   linked executables in terms of library dependencies and overall file size?
2. How do segments differ from sections in an executable file format? Provide
   examples based on your analysis.
3. In what ways did using Binary Ninja enhance your understanding of a binary’s
   structure, especially regarding symbols and strings?
4. What platform-specific differences did you notice when comparing the Windows
   and Linux binaries?
5. Based on your observations, what are some potential challenges or
   considerations for cross-platform binary analysis?

Feel free to add any additional thoughts or insights that emerged during this
exercise.
