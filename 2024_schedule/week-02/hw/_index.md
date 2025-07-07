---
title: "HW: Static Analysis"
weight: 4
prev: /schedule/week-02/lab-2
---

## Part 1:

Use `pev` PE-tools to analyze `winmine.exe`.

```sh
$ sudo apt install pev
$ man readpe
$ man peldd
# Lookup other tools as necessary...
```

{{< downloadbutton file="winmine.exe" text="winmine.exe" >}}

Write a paragraph or two describing what you found out about the binary.

- What kind of file is it?
- What shared libraries
  ([<library>.dll](https://en.wikipedia.org/wiki/Dynamic-link_library)) does it
  use?
- Can you find any symbols/function names?

## Part 2:

Complete the following `PicoCTF` challenges by finding the flag ( a string with
the format `PicoCTF{<some_hex_string>}`) in each of the following files.

{{< downloadbutton file="file_1.bin" text="File 1" >}}

{{< downloadbutton file="file_2.bin" text="File 2" >}}

{{< downloadbutton file="file_3.bin" text="File 3" >}}

## Submission

{{< callout type="info" >}}

Submit a markdown file with a write-up analyzing the above programs to
[ELMS](https://umd.instructure.com/courses/1374508/assignments). Explain what
steps you took to staticaly analyze the programs and what you learned from each.

{{< /callout >}}
