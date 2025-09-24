---
title: "Lab 2: Tracing with Strace + Ltrace"
weight: 2
draft: false
---

## Overview

{{< callout emoji="💡" >}}

In this lab you will use `strace` and `ltrace` tools to further your
understanding of dynamic analysis. Each tool lets you monitor the system calls
and library calls, respectively, that a program makes while it runs. This can be
very insightful when trying to learn at a high-level what a program does.

**Goals:**

- Practice filtering and manipulating text with Linux utilities like `egrep` and
  `less`.
- Become familiar with how a program interacts with the operating system (in
  this case, Linux).
- Practice using well known dynamic analysis tools.

**Estimated Time:** `45 Minutes`

{{< /callout >}}

## Instructions

{{% steps %}}

### Outline

Learn to use the `ltrace` and `strace` tools.

- read the man pages
- View the output of both on the simple xor binary
- use ltrace to compare the c and c++ versions?
  - The `ltraces` will look very different, make sure to use `-C` to demangle
    c++ symbols
  - The straces are also quite different but try again with the last 15 lines

Practice on the `dropbear` ssh server:

- What files does it read?
  - what syscall did you look for?
- Why does it seem to fail?
- Try running with sudo
  - Did it fail?
  - Check for listening ports 2222, Check for dropbear in process list
  - Review the last few calls
    - What does the clone syscall do?

Try the challenge program:

Figure out the password and explain what you think the algorithm does.

### Program downloads and other setup

First you'll need the `xor_c` and `xor_cpp` binaries that we've looked at in
previous labs if you don't have them already. You may use the debug version of
`xor_c.bin` from the last lab if you want, but you will also need the c++
(`cpp`) version for later.

{{< downloadbutton file="../../week-03/lab-2/xor_c.bin" text="xor_c.bin" >}}

{{< downloadbutton file="../../week-03/lab-2/xor_cpp.bin" text="xor_cpp.bin" >}}

Please install the `dropbear` program on the class Linux VM as well.

```sh {filename=Shell}
sudo apt install dropbear
```

### Review the difference between `ltrace` and `strace`

Read the description for `ltrace` and the first few paragraphs of the
description for `strace`.

```sh {filename=Shell}
man ltrace
# Press 'q' to quit out of the manpage viewer
man strace
# ...
```

{{< question >}}

Which of these two tools will work on a statically compiled binary?

{{< /question >}}

### Compare the output of each tool

First generate some input data for the XOR program.

```sh {filename=Shell}
python3 -c 'print("A"*1000, end="")' > input
```

Run `strace` and `ltrace` on the C version of the XOR encryption program
(`xor_c.bin`). It is a best practice to save the logs from each of these tools
to a separate file so that you don't get it mixed up with the output. If you
just send everything to `stdout`, then the text from the `strace/ltrace` program
and the output of the traced program gets mixed up and it becomes very difficult
to read.

```sh  {filename=Shell}
ltrace -o ltrace_xor_c.log -- ./xor_c.bin input output
# ...
strace -o strace_xor_c.log -- ./xor_c.bin input output
# <same output>
```

Then we can setup the `bat` program so that it nicely highlights our logs for
us. This will work until you close your terminal, so if you start a new terminal
tab or window you'll need to re-run this command:

```sh {filename=Shell}
alias bat 'bat -l strace --pager=none --color=always --style=header'
```

Then use the `bat` command to print the trace logs you saved earlier with pretty
colors:

```sh {filename=Shell}
bat ./ltrace_xor_c.bin
# ...
bat ./strace_xor_c.bin
# ...
```

{{< question >}}

Compare and contrast the output of the two log files. Does one give more or less
info? Is does one make it easier to see whats going on than the other?
<br></br> Do you see any library functions in the `ltrace` output that seem to
correspond to the `strace` output?
<br></br> HINT: There are at least four.

{{< /question >}}

> [!NOTE]
>
> You may find it helpful to pipe the output of the `bat` command to `less` so
> that you can scroll through it and search for things by pressing `/`. You can
> also pipe the output to `rg` or `egrep` to filter or search for lines based on
> regex patterns.
>
> If your output in `less` isn't showing the colors, make sure to use the `-R`
> flag!

### Dive deeper into syscalls

Find the first `read` syscall from the `strace` log and review the man page for
it.

```sh {filename=Shell}
bat strace_xor_c.log | rg read
#...
man 2 read
#... or you can google:  'man read syscall'
```

{{< question >}}

What is the first argument to this call? <br></br> What kind of file is it?
<br></br> How many bytes were read?

{{< /question >}}

Use the file descriptor number to find the relevant `openat` call that generated
it.

```sh {filename=Shell}
bat strace_xor_c.log | rg read
```

{{< question >}}

Are file descriptor numbers unique? Review the full log to figure out which file
corresponds to the file descriptor in the first `read` syscall.

{{< /question >}}

### Compare and contrast with the C++ version

Next run the same `ltrace` and `strace` commands on the C++ version of the XOR
program.

```sh {filename=Shell}
ltrace -C -o ltrace_xor_cpp.log -- ./xor_cpp.bin input output
# ...
strace -o strace_xor_cpp.log -- ./xor_cpp.bin input output
# ...
```

Review the `ltrace` output:

{{< question >}}

Describe how this version of the `ltrace` output differs from the C version.
<br></br> What function is used to allocate heap memory for a new object in the
C++ version?

- HINT: Developers often `memset` freshly allocated memory.

{{< /question >}}

Next review the `strace` log output. You will notice if you grep for the `read`
syscall again that the c++ version of the program reads in more ELF files at the
beginning of the program. Note the files that they correspond to.

{{< question >}}

Why does the C++ version read in more ELF files than the C version? Perhaps the
`ldd` command will be helpful here.

{{< /question >}}

Compare the last 15 or so lines from each of the `strace` output files.

```sh
tail -n 15 strace_xor_c.log > strace_xor_c_end.log
# ...
tail -n 15 strace_xor_cpp.log > strace_xor_cpp_end.log
# ...
bat *_end.log | less -SR
```

{{< question >}}

Does changing the source code language have much of an effect on the system
calls used by the program?

{{< /question >}}

### Tracing a more complex program: `dropbear`

TODO

{{% /steps %}}

## Part 2: Challenge Program

{{% steps %}}

### Download and analyze the challenge program

For the final part of this lab you will download the challenge program and
analyze it. Use all the skills that you learned in class today to try and figure
out the password. Once you get the password your final goal is to figure out
what algorithm was used to encrypt it. Good luck!

{{< downloadbutton file="./challenge.bin" text="./challenge.bin" >}}

{{% /steps %}}

> [!TIP]
>
> - You can get syntax highlighting with
>   [`bat`](https://github.com/sharkdp/bat), to make reading `strace` and
>   `ltrace` a lot nicer.
>   ```sh
>   $ bat -l strace --color=always --paging=never <ltrace_or_strace_file> | less -SR
>   # NOTE: The -R flag for less
>   ```

## Submission

{{< callout emoji="📝" >}}

Submit a markdown file with any code you wrote and the answers to questions to
[ELMS](https://umd.instructure.com/courses/1390353/assignments).

{{< /callout >}}
