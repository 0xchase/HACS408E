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

### Get Familiar with the Intel Software Developer's Manuals

The
[Intel® 64 and IA-32 Architectures Software Developer's Manuals](https://www.intel.com/content/www/us/en/developer/articles/technical/intel-sdm.html)
provide a comprehensive explanation of the Intel chip architecture and how to
effectively write programs for their chips. They are extremely helpful for
reverse engineering because they give a detailed breakdown of all the system
components as well as every possibly assembly instruction. However, they are
also incredibly dense so we're going to break down some of the pieces you need.

Lets start with the components of an assembly instruction by looking at page
`132` of [Vol. 2](https://cdrdv2.intel.com/v1/dl/getContent/671110):

![](./intel_add_instr_breakdown.png "Screenshot of the ADD instruction from the intel sofware developers manual")

This breakdown shows some important information about the add instruction"

1. The `Instruction` column shows the various different formats that the add
   instruction can take. In the two rows not blurred out we can see:
   - `ADD AL, imm8`
   - `ADD r/m32, r32`

   In the first option the instruction will add an 8-bit
   ["immediate"](https://en.wikipedia.org/wiki/Constant_(computer_programming))
   value to register `AL` and then store the result in register `AL`. In the
   second version the table is saying we can add a 32-bit contents of a
   <u>r</u>egister or <u>m</u>emory address to the contents of another register
   and store it in the first location.
1. The second column to note is the `Op/En` column, which gives you a letter
   code to look up in the below `Instruction Operand Encoding` table.

   This table gives you a more detailed breakdown of what form each operand for
   the assembly instruction is allowed to take. Note that some operands are
   read/write while others are read-only.
1. Finally, there is the description at the bottom which is always worth reading
   and will explain what the assembly instruction does.

The other important thing to remember is the fundamental data types that
assembly instructions operate on. You can learn more about this from
`Section 4.1` on page 87 of
[Vol. 1](https://cdrdv2.intel.com/v1/dl/getContent/671436):

![](./intel_fundamental_data_types.png "A screenshot of the beginning of section 4.1 with a figure showing the fundamental data types for Intel chips")

| Data Type          | Named Register | Size (in bits) |
| :----------------- | -------------: | -------------: |
| Byte               |             AL |              8 |
| Word               |             AX |             16 |
| Doubleword (DWORD) |            EAX |             32 |
| Quadword (QWORD)   |            RAX |             64 |
| Double Quadword    |           XMM0 |            128 |

<!--
- What are the two types of instructions to transfer memory between memory and registers.
- What are the four instructions used for "Unconditional Transfer"?
-->

### Intro Assembly with Hello World

Now that you know how to look up stuff in the Intel Manuals, lets start
analyzing some assembly code! Navigate to the program:
[Hello World on Godbolt](https://godbolt.org/z/4xzr11zec)

> [!NOTE]
> This is not exactly real assembly because it's not part of a complete program
> and memory addresses are not present. We will get to what real programs look
> like later.
> <a href="https://godbolt.org/z/4xzr11zec" target="_blank">

<div id="foo" style="display: flex">

<img style="width: 50%" src="./godbolt_src.png" alt="C source code for the hello world example" />
<img style="width: 50%" src="./gotdbolt_asm.png" alt="Assembly code output by godbolt for the hello world example" />

</div>
</a>

{{< question >}}

What instructions do you see in this example? (`mov`, `sub`, etc.)

{{< /question >}}

Hover over the lines to see what instructions correspond to the lines of source
code.

{{< question >}}

What register does the address of the string get put in? What line of the
assembly code does this instruction happen on?<br></br>What instruction is used
to go to the `printf` function?

{{< /question >}}

Note the differences in the optimized version:

<a target="_blank" href="https://godbolt.org/z/W47YnKWrM">
<img style="width: 75%" src="./gotdbolt_asm_optimized.png" alt="Assembly code output by godbolt for the hello world example when the -O3 flag is specified"/>
</a>

{{< question >}}

What changes about this code when the optimizations are increased?

{{< /question >}}

### Learn more instructions with the slope calculation example

The next example is meant to introduce you to a couple binary arithmetic
instructions. Please navigate to the example code:
[Slope Calculation on Godbolt](https://godbolt.org/z/KPs4z9c1v)

{{< question >}}

Give an explanation of how the assembly instructions are used to calculate the
slope.
<br></br> Read the
[`imul` instruction description](https://www.felixcloutier.com/x86/imul#description).
Which two registers are used for the calculation and where is the result stored?

<!-- - Do the same for the [`add` instruction description](https://www.felixcloutier.com/x86/add#description). -->

{{< /question >}}

### Understanding control flow (first steps)

Analyze the assembly code in:
[Min Value Calculation on Godbolt](https://godbolt.org/z/5G5WTxvcj)

Try to trace the control flow (which branches the code takes or doesn't take) by
walking through the instructions.

{{< question >}}

How many times does the loop run?

{{< /question >}}

Try to note how memory and registers are used in combination to keep track of
the values of variables in the code. Assuming there is an address in the
register `RSP` (lets say `0x7fff8000`) answer the following questions:

{{< question >}}

Explain how the values of the array are saved so that the `min()` function has
access to them.
<br></br> What register is used to keep track of the `min` variable?

{{< /question >}}

### Step3

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
