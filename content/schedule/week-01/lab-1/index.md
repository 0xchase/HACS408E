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
- Use `hexdump` and `xxd` to get an overview of patterns in binary files.
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

### Analyzing patterns with Hex Viewers

Download the following files and use the `xxd` command to view a hex/ascii
representation of each. Explore both the hex and binary overview displays to
identify any recognizable patterns or structures.

<!-- deno-fmt-ignore-start -->
{{< downloadbutton file="/Maryland_Terrapins_logo.svg.png" text="PNG File" >}}
<!-- deno-fmt-ignore-end -->

{{< downloadbutton file="file-1.jar" text="JAR File" >}}

{{< downloadbutton file="file-2.vsix" text="VSIX File" >}}

> [!TIP]
>
> Pipe the output to the `less` command to scroll and search in the terminal.
>
> ```
> xxd <file> | less
> ```
>
> Use `\/` to enter search mode while using `less`. Type something and press
> enter. Then use `n` and `Shift+N` to find the next match or the previous one
> respectively. <br/><br/>
>
> ---
>
> Or use your favorite editor:
>
> ```
> xxd <file> > output.txt
> emacs output.txt
> ```

{{< question >}}

Describe any structure that you see in the hex representaion of the bytes. What
about the ascii representation?

{{< /question >}}

### Extracting plaintext Strings

Use the `strings` command to find readable text within each binary. Experiment
with the `-n` flag to look for strings of different lengths.

```{filename="Bash"}
strings unknown_file.bin
```

{{< question >}}

Is it difficult to find interesting strings in from the default `strings`
output? How does this change if you use the `-n` flag?

{{< /question >}}

> [!TIP]
> The `strings` command also supports different
> [string encodings](https://en.wikipedia.org/wiki/Character_encoding). Try
> using some of the other `strings` command line flags to find UTF 16 LE (little
> endian) strings in `TODO: filename`.

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

Submit your answers to the above questions to ELMS. A markdown file is
preferred, but if you have screenshots please render your report as a `.pdf`
file.

{{< /callout >}}

## Reflection Questions

1. How reliable are magic bytes for identifying file types? Imagine an example
   where a signature may fail.

1. Discuss any discrepancies between the `file` command output and your findings
   from other methods. Did anything suprise you?

1. How effective was the `strings` utility in revealing useful information? What
   limitations did you encounter?
