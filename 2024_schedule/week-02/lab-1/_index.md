---
title: "Lab 1: Triage"
weight: 1
next: /schedule/week-02/lab-2/
---

## Overview

{{< callout emoji="💡" >}}

Triage 5 binaries using simple static analysis tools.

**Goals:**

- Undestand how to investigate binary files.
- Become familliar with well known linux commands for static analysis:
  - `xxd`, `strings`, `file`, `ldd`
- Understand file formats and magic bytes

**Estimated Time:** `30 Minutes`

{{< /callout >}}

For each of the Following files, complete the steps below and answer questions.

{{< downloadbutton file="file_1.bin" text="File 1" >}}

{{< downloadbutton file="file_2.bin" text="File 2" >}}

{{< downloadbutton file="file_3.bin" text="File 3" >}}

{{< downloadbutton file="file_4.bin" text="File 4" >}}

{{< downloadbutton file="file_5.bin" text="File 5" >}}

## Instructions

{{% steps %}}

### First look at the bytes of the file using a hex viewer.

- For example:

  ```{filename=Bash}
  sudo apt install hexyl
  hexyl <file_##> | less -R
  ```

- Some other options are `xxd` or `ghex`.

- Do you notice any patterns in the binary? See any strings?

### Use the `file` command, to examine the file.

- Provide an explaination of what type of file this is.

- What are the magic bytes used to identify the file type?

If the binary is an **ELF** is it `static` or `dynamic`?

- Use `ldd` to find the dynamic libraries the executable relies on and explain
  what each shared object is.

- Does this give you any indication of what the program does?

### Use the `strings` binary to look for, well strings.

- Compare the differences between the `--data` flag and `--all` flag by saving
  both versions to a file and running `diff` on the two files.

- Increase the minimum length from `4` to `15`. What effect does this have? Do
  you think there may be drawbacks?

{{% /steps %}}

## Tips

- Non-executable files can still be interesting!

- If any of the data is compressed, try to decompress it to see what's inside.

1. Some of the files are from the
   [pico CTF practice page](https://play.picoctf.org/practice). If you find the
   flags, (i.e `picoCTF{########}`) add them to your lab write up.

## Submission

{{< callout emoji="📝" >}}

Submit a markdown file with a write up and answers to questions to
[ELMS](https://umd.instructure.com/courses/1374508/assignments).

{{< /callout >}}
