---
title: "Lab 1: Initial Binary Analysis - Triage"
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

### First Steps

Download the program to analyze:

{{< downloadbutton file="curl1.bin" text="curl 1" >}}

The first thing you can do to get a limited understanding of a program is just
to look for strings! Developers leave log messages and print strings all over
the place and so this can be very fruitful when your first trying to figure out
what some random binary does. Use the strings command to view strings that are
present inside the binary. Remember to use the `-n` flag to filter results to
strings greater than or equal to the specified length.

{{< question >}}

Based on some of the strings that you see, what is this program used for?

{{< /question >}}

### Using BinaryNinja

For the labs this week we will be using [binaryninja](https://binary.ninja)'s
free version which is already installed on your class VMs. You can find it in
the `Tools` folder on your desktop. You can run it from the terminal with:

```shell {filename=Shell}
~/Desktop/Tools/binaryninja_free/binaryninja
```

Once you get it open, select `File > Open for Triage` from the menu to open
binary files for triage. Navigate to the file you downloaded earlier and double
click to open it. Alternatively, you can drag and drop the file into
binaryninja.

![](./binja_open_for_triage.png "Selecting the 'Open for Triage' option from the binaryninja menu")

### Explore the Triage window in `binaryninja`

Ignore the `Symbols` and `Cross References` view on the left side of binaryninja
for now.

![](./triage-view.png "Binaryninja Triage View")

Reverse engineering tools do A LOT of things! But this means that the view can
be a little overwhelming. Ignore the `Symbols` and `Cross References` panes on
the left side of the screen. The three indicators in the above screenshot are:

1. View selection dropdowns. Use these to get back to the `Triage` view if you
   ever click something and it takes you to a different view.
2. This is the main triage window. Scroll down to see more stuff!
3. The far right side shows an overview of the whole binary. You can also use
   this to navigate to other sections of the binary.

Because BinaryNinja understands the ELF file format, it has helpfully pulled out
some information and displayed it in the main window. Notice how the entropy bar
shows where different parts of the program have higher (yellow) and lower (dark
blue) values of entropy.

### Analyzing shared libraries

Review the loaded libraries. Compare this to the list when you run the `ldd`
program on the curl1.bin binary from the terminal. A quick glance at the
[`ldd` man page](https://man7.org/linux/man-pages/man1/ldd.1.html) shows that it
"prints the shared object dependencies" of the specified program.

{{< question >}}

Why do you think the list from `ldd` is different from what binaryninja reports?
<br></br> HINT: Try running `ldd` on the `libcurl.so.4` binary.

{{< /question >}}

Do a quick google search on the `libcurl.so.4` library to find out what kind of
functionality it provides.

{{< question >}}

Based on your search what do you think the curl binary uses `libcurl` for?
<br></br> What functions in the imports table come from `libcurl`?

{{< /question >}}

### Examine Segments and Sections

TODO:

- Research common sections `.text`, `.data`, `.bss`
- Click an imported function
  - What section does this take you to?
  - Use the hover feature to figure out what the bytes are at this address.
    - Notice the endianess
  - Click again What does this take you to now? is this a real section?
- Use the memory map view to see how each section of the ELF file maps to a
  segment in memory.
  - what segment does each section you looked up earlier correspond to?

- Finally, open curl2.bin for triage. What do you notice that is different about
  it?
  - Compare the outputs of the `file` command for each binary as well as the
    imports section.

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
