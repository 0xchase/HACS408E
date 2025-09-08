---
title: "Lab 1: TODO"
weight: 1
draft: false
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

### Using BinaryNinja

For the labs this week we will be using [binaryninja](https://binary.ninja)'s
free version which is already installed on your class VMs. You can find it in
the `Tools` folder on your desktop. You can run it from the terminal with:

```shell {filename=Shell}
~/Desktop/Tools/binaryninja_free/binaryninja
```

Once you get it open, select `File > Open for Triage` from the menu to open
binarie files for triage.

### Looking at the first binary: `curl1`

Download the program to analyze:

{{< downloadbutton file="curl1.bin" text="curl 1" >}}

Inside of the BinaryNinja "Open for Triage" tab, navigate to the file you just
downloaded and open it. Alternatively you can drag and drop the file into
binaryninja.

Use the strings command to view strings that are present inside the binary.
Remember to use the `-n` flag to filter results to strings greater than or equal
to the specified length.

{{< question >}}

Make a hypothesis about what this program does based on the strings that you
see.

{{< /question >}}

### Open and Analyze in Binary Ninja

Ignore the `Symbols` and `Cross References` view on the left side of binaryninja
for now. Looking at the first couple of sections

Because BinaryNinja understands the ELF file format, it has helpfully pulled out
some information and displayed it in the main window. Notice how the entropy bar
shows where different parts of the program have higher (yellow) and lower (dark
blue) values of entropy.

### Analyzing shared libraries

Review the loaded libraries. Compare this to the list when you run the `ldd`
program on the curl1.bin binary from the terminal. A quick glance at the
[`ldd` man page](TODO) shows that it "prints the shared object dependencies" of
the specified program.

{{< question >}}

Why do you think the list from `ldd` is different from what binaryninja reports?

HINT: Try running `ldd` on the `libcurl.so.4` binary.

{{< /question >}}

Do a quick google search on the `libcurl.so.4` library to find out what kind of
functionality it provides.

{{< question >}}

Based on your search what do you think the curl binary does?

{{< /question >}}

### Examine Segments and Sections

Using Binary Ninja, inspect the segments and sections of each binary.

- Identify common sections like .text (executable code), .rodata (read-only
  data), and .bss (uninitialized data).
- Note differences in how these sections are organized between the static and
  dynamic versions.

### Compare Windows vs. Linux Binaries

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
> - Review the
>   [BinaryNinja Documentation](https://docs.binary.ninja/guide/index.html#triage-summary)
>   to learn how to use the tool.

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
