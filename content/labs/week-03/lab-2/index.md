---
title: "Lab 2: Understanding Executable File Formats"
weight: 2
draft: false
---

## Overview

{{< callout emoji="💡" >}}

explaination

**Goals:**

- goal
- goal
- goal

**Estimated Time:** `45 Minutes`

{{< /callout >}}

## Instructions

{{% steps %}}

### Outline

- Learn to read the Intel Asm Manual
  - Give sections of pdfs?
    - Answer questions about the size of a DWORD and QWORD.
    - Review Vol. 1 Chapter 7, basic instruction types
      - What are the two types of instructions to transfer memory between memory
        and registers.
      - What are the four instructions used for "Unconditional Transfer"?
- Intro to basic assembly with godbolt:
  - Note this is not exactly `real` assembly because it hasn't been fully
    compiled into an executable program.
  - [Hello World on Godbolt](https://godbolt.org/z/4xzr11zec)
  - What instructions do you see in this example? (`mov`, `sub`, etc.)
  - Hover over the lines to see what instructions correspond to the lines of
    source code.
    - What register does the address of the string get put in?
    - What instruction is used to go to the `printf` function?
  - [Slope Calculation on Godbolt](https://godbolt.org/z/KPs4z9c1v)
    - Give an explanation of what's is happening.
    - Read the
      [`imul` instruction description](https://www.felixcloutier.com/x86/imul#description).
      Which register does it put the result it?
    - Do the same for the
      [`add` instruction description](https://www.felixcloutier.com/x86/add#description).
  - [Min Value Calculation on Godbolt](https://godbolt.org/z/5G5WTxvcj)
    - try to trace the control flow by walking through the instructions.
    - where is the array stored?
    - explain where the `min` variable gets used?

- Binaryninja Usage
  - Open the xor_c.bin program in binaryninja.
  - What are the named functions that you see in the left window?
  - What is the entrypoint? What does this function do? What is
    `__libc_start_main`?
  - Split the overview and disassembly window views.
    - What `c library` functions are used to read data from the file?
    - What is the address of the instruction where the data is encrypted
      `xor-ed`
    - What is the key that is used?
  - Answer the same questions about `xor_cpp.bin`. What do you notice that is
    different about the c++ version?

### Step1

### Step2

### Step3

{{% /steps %}}

> [!TIP]
>
> - tip
> - tip
> - tip

## Submission

{{< callout emoji="📝" >}}

Submit a markdown file with any code you wrote and the answers to questions to
[ELMS](https://umd.instructure.com/courses/1390353/assignments).

{{< /callout >}}
