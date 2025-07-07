---
title: "Lab 1: Buffer Overflows"
weight: 1
---

## Overview

{{< callout emoji="💡" >}}

In this lab you will exploit a basic buffer overflow. You will need to analyze
the software to find the vulnerability in order to understand how to solve the
challenge.

**Goals:**

- Practice using ghidra to analyze software.
- Practice using gdb to interact with software dynamically.
- Understand endianness
- Exploit a buffer overflow

**Estimated Time:** `60 Minutes`

{{< /callout >}}

## Instructions

{{% steps %}}

### Download Challenge Binary

{{< downloadbutton file="challenge" text="challenge" >}}

### Reverse Engineer the Program

Use the tools we've learned so far in class to analyze this program. Identify
the file type and gather any information about what its functionality using
static and dynamic analysis. In your writeup, answer the following questions.

1. What kind of file is it?
2. Does it link or import any recognizable cryptographic libraries?
3. How is the password being checked?
4. Can the password be extracted from the executable?

### Bypass the Password

This binary contains a buffer overflow vulnerability that allows us to overwrite
the stored hash with one we choose. We'll write a script that prints the output
needed to exploit it. A starter template is below.

```python {filename=solution.py}
import sys

buffer_size = 8

# Construct the buffer
new_hash = b"\xde\xad\xbe\xef"
buffer = b"A" * buffer_size + new_hash

# Output the buffer
sys.stdout.buffer.write(buffer + b"\n")
```

If you run the script, it will print a the output buffer needed to exploit the
binary. To test it, you can pipe the output of the script in into the challenge
binary's standard input.

```
python3 solution.py | ./challenge
```

Since you don't know the password that corresponds to the hash in the
executable, to solve this challenge you'll need to overwrite the hash with one
you generate from a password you know.

```
echo <password> | md5sum
```

In your writeup, explain the vulnerability and include the script you used to
solve it.

{{% /steps %}}

## Tips

- Build up your input slowly to see where it getting to on the stack.
- To see more of the stack in `gef`, run `gef config context.nb_lines_stack 20`.
- If you want to use the contents of a file as your input in `gdb` you can run
  the program with: `run < my_input_file`.

## Submission

{{< callout emoji="📝" >}}

Submit a markdown file with any code you wrote and the answers to questions to
[ELMS](https://umd.instructure.com/courses/1374508/assignments).

{{< /callout >}}
