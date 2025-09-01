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
- Use `xxd` to get an overview of patterns in binary files.
- Employ the `file` command for initial filetype analysis.
- Utilize the `strings` utility to extract readable text from binaries.

**Estimated Time:** `45 Minutes`

{{< /callout >}}

## Instructions

{{% steps %}}

### Understanding Magic Bytes

[Magic Bytes](https://en.wikipedia.org/wiki/File_format#Magic_number) are
specific sequences at the beginning of a file that help identify its format. Use
online resources or documentation to explore how magic bytes work and their
limitations.

{{< question >}}

Research and write down the magic byte patterns for the following:

- PNG Image Files
- Zip Compressed Files
- Linux ELF Executables
- Windows PE Executables

{{< /question >}}

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

Describe any structure that you see in the hex representation of the bytes. What
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
output? <br></br> How does this change if you use the `-n` flag?
<br></br> Do the strings give you any ideas about what this filetype is used
for?

{{< /question >}}

> [!TIP]
> The `strings` command also supports different
> [string encodings](https://en.wikipedia.org/wiki/Character_encoding). Try
> using some of the other `strings` command line flags to find UTF-16 LE (little
> endian) strings in `TODO: filename`.

### Using the `file` Command

Use the `file` command to get a description each file's type.

```{filename=Bash}
file [file-1 file-2 ...]
```

Alternatively, you can upload the file into
[a browser based version](https://eakondratiev.github.io/file.htm) to get
similar results. For small files, you can use a version
[without leaving this site](/tools/file-tool/)!

{{< question >}}

What types of files are the above?<br></br> Does this match the results from
your initial magic bytes analysis?

{{< /question >}}

### Recursive Analysis

At least one of the files you downloaded is a compressed archive containing
other files. Use the `unzip` program to list its contents without extracting
them. Then decompress the files to a specific directory of your choice.

```{filename=Bash}
# List the contents of a zip file
unzip -l file.zip

# Unzip to a directory
unzip -d <DIR> file.whatever
```

{{< question >}}

Examine the contents found within the compressed files you downloaded earlier
and describe what kinds of files are contained within them.

{{< /question >}}

{{% /steps %}}

## General Lab Tips

> [!TIP]
>
> - Use the `man` command to learn about how to use various Linux command line
>   utilities. This information also be browsed at [many]() [different]()
>   [sites]()
>   - When in doubt, google "man command" and read the result.
> - When analyzing magic bytes, remember they are not foolproof. Files can be
>   mislabeled.
> - The `file` command is a quick way to get a general idea but might not always
>   be accurate.

## Submission

{{< callout emoji="📝" >}}

Submit your answers to the above questions to ELMS. A markdown file is
preferred, but if you have screenshots please render your report as a `.pdf`
file.

{{< /callout >}}

<!--
TODO: I like the idea of having reflection questions at the end but I feel like
if they aren't worth points then the students won't think about them. Maybe
these could be worked into discussion posts?

## Reflection Questions

1. How reliable are magic bytes for identifying file types? Imagine an example
   where a signature may fail.

1. Discuss any discrepancies between the `file` command output and your findings
   from other methods. Did anything suprise you?

1. How effective was the `strings` utility in revealing useful information? What
   limitations did you encounter? -->
