---
title: "Lab 2: Hijacking Control Flow"
weight: 2
---

## Overview

{{< callout emoji="💡" >}}

In this lab you will learn to craft an input that hijacks the control flow of a
program.

**Goals:**

- Understand stack frames and return addresses
- Practice using `gdb` and `Ghidra`

**Estimated Time:** `60 Minutes`

{{< /callout >}}

## Instructions

{{% steps %}}

### Redirect execution to the secret function:

Before starting this lab, run the following command. This disables ASLR, a
security measure that makes solving this challenge more complicated.

```
echo 0 | sudo tee /proc/sys/kernel/randomize_va_space
```

We can use our buffer overflow to overwrite more than just the password buffer.
By overwriting the return address, we can redirect execution to an address of
our choosing. Write a script that demonstrates this, by redirecting execution to
the `secret_function`. In your writeup, explain the purpose of the return
address and include the script you use build a buffer that overwrites it. You
may start with a similar script template like the previous lab.

```python
import sys

buffer_size = 8

# Construct the buffer
new_hash = b"\xde\xad\xbe\xef"
buffer = b"A" * buffer_size + new_hash

# Output the buffer
sys.stdout.buffer.write(buffer + b"\n")
```

You can run it against the `challenge` binary by piping the output into stdin.

```
python3 solution.py | ./challenge
```

It may also be useful to run this challenge in `gdb`. To do this, you can write
your buffer to a file, then pipe this file into gdb.

```
$ python3 solution.py > buffer.txt
$ gdb -q challenge
gef> run < output.txt
```

You'll need to use gdb to figure out how large of a buffer you need to reach the
return address, and the runtime address of the `secret_function` we're
redirecting execution to. Include your completed script in your writeup.

### Executing Arbitrary Code

Since we can redirect program execution to an arbitrary address, we may also
redirect execution to custom shellcode stored in the input buffer. This will
give us arbitrary code execution.

#### <u>Task 1: Finding the Return Address</u>

Figure out where on the stack we might store our shellcode and redirect
execution to.

#### <u>Task 2: Build a NOP sled</u>

Append to your buffer a large number of `nop` (no operation) instructions. See
if you can redirect execution to it, and verify this by stepping to it with gdb.

#### <u>Task 3: Include your shellcode</u>

Use google to find some example shellcode that does something interesting like
spawn `/bin/sh`. Craft an exploit so the `challenge` binary runs it.

{{% /steps %}}

## Tips

- Use gdb to debug your exploit
- Sometimes it's useful to guess-and-check buffer lengths

## Submission

{{< callout emoji="📝" >}}

Submit a markdown file with any code you wrote and the answers to questions to
[ELMS](https://umd.instructure.com/courses/1374508/assignments).

{{< /callout >}}
