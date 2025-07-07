---
title: "Lab 2: Assembly Language - Basics"
weight: 2
---

{{< callout emoji="💡" >}}

**Explaination:**

This lab is meant to get you comfortable interacting with assembly language. You
will learn how to look up instructions and write assembly code.

**Goals:**

- Download and install tools needed to build/run assembly code.
- Lookup assembly instructions in a programmers manual.
- Do simple math in assembly.
- Understand control flow structures in assembly.

{{< /callout >}}

## Demo

First, follow along with the demo at https://thlorenz.com/visulator/

## Instructions

{{% steps %}}

### Install Assembler + Grab Template Code

- First install an assembler. We will be using [`nasm`](https://www.nasm.us) for
  this lab. If you are using the class VM, it is already installed.

> [!NOTE]
> There are two common syntaxes for assembly language: AT&T and Intel. You may
> see both based on which reverse engineering tool you're using. We'll only be
> using Intel syntax in this class but check
> [the assembly syntax supplemental lecture](/supplemental/asm-syntax) for more
> details.

{{% details title="Template Code" closed="true" %}}

```NASM
extern printf
section .text

global main

main:
    ; START: your code

    ; END: your code

    mov rdi, $fmt_str
    xor al, al
    call printf
    ret 0

section .data

fmt_str:
    db  "The value of $rsi is 0x%zX",10,0
```

{{% /details %}}

### Simple Arithmetic

> [!TIP]
>
> - The
>   [NASM Documentation](https://www.nasm.us/xdoc/2.16.03/html/nasmdo12.html) is
>   excellent.
> - Don't be afraid to google things.

- Store two `immediate` numbers of your choice in the general purpose registers
  `r8` and `r9`.

- Search for the `add` and `imul` instructions in the x86 reference manual
  ([AMD](https://www.amd.com/content/dam/amd/en/documents/processor-tech-docs/programmer-references/24592.pdf),
  [Intel](https://cdrdv2.intel.com/v1/dl/getContent/671110))

- Calculate the sum of two squares (`A^2 + B^2`) using the numbers you put in
  `r8` and `r9`.

- Check to see that the answer is correct by placing the result in `rsi` and
  running the program.

### Addresses and Memory

- Search for the `shr` (shift right) and `and` instructions in the reference
  manual.

- Print the address of the `fmt_str` variable.

- Print the value of the first byte of the string

  1. Load the first chunk of the string into a register.
  2. Get the first byte by `and`-ing the register with the byte `0xff`.

- Print the value of the first lowercase `'a'` caracter in `fmt_str`.

  - You can check your work by using `echo -e '\x##'` to print the hex value as
    a character. For example `echo -e '\x41'` prints the character `A`.
  - Alternatively use `man ascii` to find the hex value of `'a'`.

### Control Flow - Loops

- Search for the `jne`, and `cmp` instructions.

- Calculate the length of `fmt_str` by incrementing a register by 1 until you
  reach the `NUL` byte.

- Your answer should print the hex value for `27`.

{{% /steps %}}

## Testing

To compile, run:

```bash {filename=Bash}
# Generate an object file
nasm -f elf64 -o main.o nasm-template.s
# Link the object into an actual executable
gcc -static -o main main.o
# Run it!
./main
```

## Submission

{{< callout emoji="📝" >}}

Submit a markdown file with any code you wrote and the answers to the following
questions to [ELMS](https://umd.instructure.com/courses/1374508/assignments).

1. What are the `rip`, `rsp`, and `rbp` registers?

1. What does `xor %eax %eax` do?

{{< /callout >}}
