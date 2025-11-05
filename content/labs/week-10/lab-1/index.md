---
title: "Lab 1: Stack Canaries"
weight: 1
draft: false
---

## Overview

{{< callout emoji="💡" >}}

This lab is meant to teach you about stack canaries, but it was made
intentionally difficult to give you a sense of what real world reverse
engineering is like. You have already seen some of this from the malware
presentations. In this lab you will reverse engineer a C++ binary to find where
the canary is checked and how to enable a memory leak to find this value. If
used correctly, it is possible to overflow the buffer while keeping the canary
value unchanged.

**Goals:**

- Understand stack canaries
- Practice using Binaryninja
- Practice using GDB

**Estimated Time:** `45 Minutes`

{{< /callout >}}

## Instructions

{{% steps %}}

### Run the program

First grab the table printing program and run it to get a feel for what it does.

{{< downloadbutton file="./table-printer-64.bin" text="table-printer-64.bin" >}}

Run the `checksec` function provided by `gef` in `gdb` on the program.

{{< question >}}

Does the program have canaries enabled?

{{< /question >}}

### Review the program in Binaryninja

Analyze the main method of this program. What does it do and what functions does
it call? Then find the main logic of the program. This should be a pretty
large/intimidating function.

Your goal is to find a buffer overflow, are there any functions that copy bytes
like `strcpy` or `memcpy`?

Try inputting a bunch of `A's` to trigger the overflow.

{{< question >}}

Explain what happens when you overflow the buffer? (You should see a specific
message printed if you've done it correctly.)

{{< /question >}}

### Try to find the information leak

The programmer who wrote this program did not think of all the ways this code
might be abused by attackers. Information leaks are traditionally found by
leveraging a controlled format string to print memory addresses/values to the
screen. There is no such vulnerability in this case, but there is some logging
code. Perhaps the developer left some debugging information in that could help
us.

{{< question >}}

How did you find and enable the information leak?

{{< /question >}}

### Use this information to overflow the buffer

Once you get the information leak, you can use this to find out what the canary
is, and programmatically develop an input that will overflow the buffer. A way
you could do this is using the `pwnlib` python library which is commonly used
for capture-the-flag (CTF) challenges. Here is an example python script to get
you started:

> [!IMPORTANT]
>
> I recommend setting up a virtual environment to install the python
> dependencies:
>
> ```sh {filename=Shell}
> uv venv lab-1-venv
> # The default shell is `fish` so make sure to use the correct actvation script
> source lab-1-venv/bin/activate.fish
> ```

```python {filename=Python}
#!/usr/bin/env python3

from pwn import context, process
import sys


def recv_data(proc: process) -> bytes:
    """Receives binary data from stdout of a subprocess (`proc`) and prints it to the screen."""

    bytes = b""
    try:
        while data := proc.recv():
            bytes += data
    except (TimeoutError, EOFError):
        pass

    _ = sys.stdout.buffer.write(bytes)
    _ = sys.stdout.buffer.flush()
    return bytes


def send_data(proc: process, data: bytes):
    """Sends binary data to stdin of a subprocess (`proc`) while printing it to the screen."""

    proc.sendline(data)
    _ = sys.stdout.buffer.write(data + b"\n")
    _ = sys.stdout.buffer.flush()


if __name__ == "__main__":
    # Set default timeout to 1 second
    context.timeout = 1

    proc = process("./table-printer-64.bin", env={"FOO": "BAR"})

    _ = recv_data(proc)
    send_data(proc, b"20")

    _ = recv_data(proc)
    send_data(proc, b"")

    _ = recv_data(proc)
    send_data(proc, b"1")

    _ = recv_data(proc)
    send_data(proc, b"A" * 200)

    _ = recv_data(proc)
```

{{% /steps %}}

If you are interested in trying a 32-bit version of this lab you can download
the program here:

{{< downloadbutton file="./table-printer-32.bin" text="table-printer-32.bin" >}}

> [!TIP]
>
> Here are some great blogposts with more info about stack canaries:
>
> - [Who's you canary?](https://sigma-star.at/blog/2023/05/stack-canary/)
> - [Playing with Canaries](https://www.elttam.com/blog/playing-with-canaries/)

## Solutions

{{% details title="Click to reveal.." closed="true" %}}

The solution for this lab is still a work in progress unfortunately. An
explanation of the concepts will be presented in class.

#### Binary Ninja Analysis

![](./binja_read_items_loop.png "")

![](./binja_debug_print_loop.png "")

![](./memset_buffer.png "")

![](./binja_vulnerable_memcpy_buffer.png "")

#### Analysis of debug logs

![](./stack_analysis_from_logs.png "")

![](./binja_pop_pop_return.png "")

{{% /details %}}

## Submission

{{< callout emoji="📝" >}}

Submit a markdown file with any code you wrote and the answers to questions to
[ELMS](https://umd.instructure.com/courses/1390353/assignments).

{{< /callout >}}
