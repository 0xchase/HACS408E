---
title: "Lab 1: Triage Unknown Binary Files"
weight: 1
---

## Overview

{{< callout emoji="💡" >}}

This lab will guide you through the process of analyzing unknown binary files
using various command-line tools and techniques. By the end, you'll understand
how to determine file types, inspect binary contents, and extract useful
information.

**Goals:**

- Understand magic bytes and their role in identifying file types.
- Use Binary Ninja's hex editor and overview features to analyze file patterns.
- Employ the `file` command for initial file type analysis.
- Utilize the `strings` utility to extract readable text from binaries.

**Estimated Time:** `45 Minutes`

{{< /callout >}}

## Instructions

{{% steps %}}

### Understanding Magic Bytes

Magic bytes are specific sequences at the beginning of a file that help identify
its format. Use online resources or documentation to explore how magic bytes
work and their limitations.

**Task**: Research and write down the magic byte patterns for the following:

- PNG Image Files
- Zip Compressed Files
- Linux ELF Executables
- Windows PE Executables

### Analyzing with Binary Ninja's Hex Editor

Download and open an unknown binary file in Binary Ninja. Explore both the hex
editor and binary overview features to identify any recognizable patterns or
structures.

<!-- deno-fmt-ignore-start -->
{{< downloadbutton file="/Maryland_Terrapins_logo.svg.png" text="File 1" >}}
<!-- deno-fmt-ignore-end -->

{{< downloadbutton file="file-1.jar" text="File 2" >}}

{{< downloadbutton file="file-2.vsix" text="File 3" >}}

**Task**: Describe any structure that you see in the hex representaion of the
bytes. Try using the binary summary view. Does anything pop out here?

### Extracting Strings with Binary Ninja

Use the `strings` command to find readable text within a binary, including ASCII
and UTF16 encoded strings.

**Command**: `strings unknown_file.bin`

**Task**: Note down any meaningful strings or patterns that emerge from this
analysis.

### Using the `file` Command

Use the Linux `file` command to get a basic understanding of your unknown file's
type. Alternatively, you can upload the file into
[a browser based version](https://eakondratiev.github.io/file.htm) to get
similar results. For small files, you can use a version
[without leaving this site](/tools/file-tool/)!

**Command**:

```
file [file-1 file-2 ...]
```

**Task**: Answer the following questions:

- What types of files are the above?
- Does this match the results from your initial magic bytes analysis?

### Recursive Analysis

If you encounter a zipped file, list its contents without extracting them. Then
decompress the files to a specific directory of your choice.

```
unzip -l unknown.zip
```

**Task**: Examine the contents found within the compressed files you downloaded
earlier and describe what kinds of files are contained within them.

{{% /steps %}}

> [!TIP]
>
> - When analyzing magic bytes, remember they are not foolproof. Files can be
>   mislabeled.
> - In Binary Ninja, explore the documentation for advanced features like
>   pattern matching.
> - The `file` command is a quick way to get a general idea but might not always
>   be accurate.

## Submission

{{< callout emoji="📝" >}}

Submit your findings in a markdown file, including screenshots and answers to
the following questions:

1. How reliable are magic bytes for identifying file types? Imagine an example
   where a signature may fail.
1. Discuss any discrepancies between the `file` command output and your findings
   from other methods. Did anything suprise you?
1. How effective was the `strings` utility in revealing useful information? What
   limitations did you encounter?

{{< /callout >}}
