---
title: "HW: Return Oriented Programming"
weight: 4
---

### Introduction

In the previous lab, we exploited a buffer overflow to achieve arbitrary code
execution. We did this by overwriting the return address with the address of
shellcode we included in our input buffer. This caused the program execution to
be redirected to the stack, where we placed our malicious shellcode. One of the
mitigations for buffer overflows implemented by modern operating systems is
known as Data Execution Prevention (DEP), which disables execution of memory if
it is located in the stack region. When DEP is enabled and execution is
redirected to the stack, it will cause a crash (segmentation fault). In order to
allow you to complete the shellcode lab an executable stack was manually enabled
with the compiler flag `-z execstack`. For your homework, you will extend the
exploit you developed during the labs to work on a version of the challenge
binary that has a non-executable stack.

### Download the Homework Binary

{{< downloadbutton file="homework" text="homework" >}}

### Background

To execute arbitrary code when the stack is non-executable, hackers developed a
technique called
[return oriented programming](https://en.wikipedia.org/wiki/Return-oriented_programming)
(ROP). The basic idea is to locate many small assembly snippets _already in the
program's executable address space_ (where each one ends in a `ret`
instruction). These small bits of code ending in `ret` instructions are called
'ROP gadgets'. To write shellcode, all one has to do is figure out a combination
of them that accomplishes the desired malicious functionality, and then put the
addresses of each gadget to return to on the stack sequentially. This group of
gadgets is called a 'ROP chain'.

When the program returns from each snippet, it will pop the next return address
in the chain of the stack and execute it until it gets to a value on the stack
which is not a valid return address. This attack is possible because most
programs contain hundreds of thousands to millions of assembly instructions, so
you can usually find combinations of gadgets that accomplish almost anything.

Though you could search for these gadgets manually with Ghidra, it is usually
best to use a tool that automatically searches for them. One of the most popular
ones is called `ROPgadget`, a python utility that can be installed with `pip`.
Another option is `ropper`, also a python utility.

```
pip3 install ropgadget
```

You can then run it on a binary to start searching for gadgets.

```
ROPgadget --binary ./homework
```

You should investigate the flags supported by `ROPgadget` to see how you can
start filtering for specific instructions. Also, keep in mind that the search
outputs the _offset_ of each gadget in the binary. To find the location of this
gadget in the running program, you'll need to add this offset to the location
where your executable is loaded in memory.

### Summary

To extend your exploit to work on the homework binary, you should replace your
malicious shellcode with a ROP chain that performs some other malicious
functionality. You can decide exactly what functionality you want to implement,
and you should describe it in your report. A common one is to spawn a shell, by
executing `/bin/sh`. I'd recommend you follow these steps:

1. **Task 1**: Decide what malicious payload you will implement
2. **Task 2**: Implement it in assembly, or better yet _find the corresponding
   assembly online_
3. **Task 3**: Search for ROP gadgets corresponding to each assembly instruction
   in the payload
4. **Task 4**: Build a ROP chain and integrate it into your exploit

For full credit you should demonstrate a working ROP chain, but since bypassing
DEP is difficult, 80% of your grade will be the quality of your report. The
final 20% will be how much progress you made towards a working solution. If you
write your payload in assembly but there's a corresponding gadget you can't
find, just describe that in the report and you'll get most of the credit.

If you need a certain gadget but can't find it in the homework binary, remember
that most executables load libraries like `libc` during runtime which contain
additional gadgets. You should be able to find the gadget you're looking for in
one of these shared objects.

### Tips

- Work through this step by step! Start with one gadget and make sure you can
  get the vulnerable function to return to it. Once you have that work on the
  next gadget.
- Remember that each gadget should end with a `ret` instruction.
- Be sure to disable ASLR with
  `sudo bash -c 'echo 0 > /proc/sys/kernel/randomize_va_space'`
- Ask questions in the `#homework` channel of the Discord

## Submission

{{< callout emoji="📝" >}}

Submit a markdown (`.md`) or PDF (`.pdf`) file containing a lab report to
describe what you have done. Your report should include:

- An overview of the shellcode you plan to execute
- A list of `ROP Gadgets` that match those instructions
- An explaination of your exploit:
  - Constructing your input
  - Any debugging/issues you ran into

Submit the report to
[ELMS](https://umd.instructure.com/courses/1374508/assignments).

{{< /callout >}}
