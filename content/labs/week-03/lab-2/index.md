---
title: "Lab 2: Understanding Executable File Formats"
weight: 2
draft: false
---

## Overview

{{< callout emoji="💡" >}}

The goal of this lab is to get you familiar with x86 and x86_64 assembly
language. You will learn how to learn about various instructions in Intel's
Software Developer's manuals. You will also use binaryninja to reverse engineer
some small C and C++ programs.

**Goals:**

- Learn how to read the Intel Software Developer's Manuals.
- Learn how to use Binaryninja to reverse engineer Linux programs.
- Start to understand the difference between C and C++ programs.

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

![](./intel_add_instr_breakdown.png "Screenshot of the ADD instruction from the intel software developers manual")

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

Review `section 3.2` of Vol. 1 of the intel manuals.

{{< question >}}

What is the size of the virtual address space in the "64-Bit Mode Execution
Environment"? <br></br> Home many general purpose registers are available?

{{< /question >}}

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
[Min Value Calculation on Godbolt](https://godbolt.org/z/Gsh5PqW57)

Try to trace the control flow (which branches the code takes or doesn't take) by
walking through the instructions.

Try to note how memory and registers are used in combination to keep track of
the values of variables in the code. Assuming there is an address in the
register `RSP` (lets say `0x7fff8000`) answer the following questions:

{{< question >}}

Explain how the values of the array are saved so that the `min()` function has
access to them.
<br></br> What register is used to keep track of the `min` variable?

{{< /question >}}

{{< question >}}

Explain what the `cmova eax, edx` instruction does.

{{< /question >}}

### Analyze a small C program with binaryninja

Start by downloading the first program we'll be looking at:

{{< downloadbutton file="./xor_c.bin" text="xor_c.bin" >}}

Open the file using the default open option for binary ninja and click the
dropdown to take you to the `Triage Summary`. Note in the `Symbols` pane on the
left-hand side there are only a few functions in the `.text` section which is
where the executable code for this binary is.

{{< question >}}

Which of these functions do you think is the entry point of the program? Give a
reason why.

{{< /question >}}

Next double-click on the `Entry Point` address in the `Triage Summary` pane.
This will take you to the first function of the program.

![](./entrypoint.png "The entrypoint of the program in binaryninja's triage view")

This will take you to binaryninja's code view which by default starts off with
their high-level level IL (intermediate language) view. This is the code that
has been processed and analyzed by the tool so that it looks closer to a high
level language like C or C++.

![](./_start_func_binja.png "A high level language overview of the _start function")

1. Binaryninja displays code in the lighter gray boxes.
2. The black bars in between the functions are areas of the `.text` section that
   were not picked up by the auto analysis as assembly code.

Switch to the `ELF Disassembly` view in binary ninja:

![](./_start_func_asm_binja.png)

{{< question >}}

What function is called inside of the code for the `_start()` function?
<br></br> Google this function and explain what it is used for.

{{< /question >}}

> [!TIP]
>
> <div style="display: flex" >
>
> - Click the split view icon in the top-right to show both the HLIL version and
>   the disassembly.
> - Click the chain icon to toggle whether the two views are synchronized by
>   address.
>
> <img style="justify-content: space-between; margin: 0;" src="./split_view_binja.png" />
>
> </div>

### Analyzing the `main` function

Next use `ctrl+p` to open the command menu and type `goto` to open the
`Goto Address` pop up window in binaryninja. Alternatively, you can the `g` or
`alt+g` keyboard shortcuts. Once the popup is up navigate to the `main`
function.

![](./ctrl_p_command_popup.png "Binaryninja's command popup which can be accessed with 'ctrl+p'")

![](./goto_main.png "The 'Go to Address' popup which will show an address in green above the search bar if you enter a valid symbol name")

In the `Linear` disassembly view, it can be difficult to follow the control flow
of the program, so you can use the `spacebar` keyboard shortcut to switch back
and forth between the `Linear` and `Graph` views. You can also select this in
the top left drop down menu.

![](./graph_view.png "Binaryninja's graph view which shows the start of the main function")

Focus on the first comparison statement highlighted by the red box. Use the
strings in following blocks of code to help you figure out what the comparison
is doing. The green (left) arrows in the graph view correspond to when the jump
instruction is taken. The red (right) arrows correspond to the jump not being
taken.

{{< question >}}

What is this comparison checking? Why is the number 3 important?

{{< /question >}}

### Rename variables and functions for better understanding

Switch back to the `High Level IL` (HLIL) view and clean up the code by renaming
functions and variable based on what they look like they are being used for.

You can rename a variable by right clicking on it or by pressing the `N`
keyboard shortcut. Work through each of the `sub_40####` functions to figure out
what they do.

{{< question >}}

What is the address of the function that `xors` the file data? <br></br> What is
the address of the assembly instruction that `xors` the data? <br></br> What is
the key used to encrypt the data?

{{< /question >}}

### Learn how binaryninja is not a perfect tool

> [!WARNING]
>
> This is an important lesson to never blindly trust the decompiler output of a
> reverse engineering tool! It is not an exact science since we are working with
> missing information. Always check the disassembly for the ground source of
> truth!

![](./binja_decomp_error.png "")

Here we can see that binja thinks the program is trying to compare a variable to
the address of the very start of our ELF file (a.k.a the `__elf__header`). This
seems kind of weird, especially given that we can see the an error string that
doesn't seem to be related. Let's verify what the assembly is doing.

![](./binja_decomp_error_asm.png "")

In the above screenshot, we can see that `0x400000` is being moved into `EAX`
and then if the comparison passes, then we skip the block printing the error
message. `0x400000` is the default base address that binaryninja assigns to our
program but in this case the code is probably just referring to the actual
number `0x400000`. To fix it you need to right click on the `__elf_header`
pointer and `Undefine` the data variable.

![](./binja_decomp_error_fix.png "")

### **Bonus:** Repeat the process with a C++ version of the same code

Analyze the C++ version of the XOR encryption program following the same process
as above.

{{< downloadbutton file="./xor_cpp.bin" text="xor_cpp.bin" >}}

{{< question >}}

What do you notice that is different about the c++ version?

{{< /question >}}

{{% /steps %}}

## Submission

{{< callout emoji="📝" >}}

Submit a markdown file with any code you wrote and the answers to questions to
[ELMS](https://umd.instructure.com/courses/1390353/assignments).

{{< /callout >}}
