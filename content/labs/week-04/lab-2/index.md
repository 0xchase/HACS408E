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

- Practice filtering and manipulating text with Linux utilities like `grep` and
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

```sh
dropbear setup script:
sudo apt install zlib1g-dev
curl -OL "https://matt.ucc.asn.au/dropbear/dropbear-2025.88.tar.bz2"
tar xf dropbear-2025.88.tar.bz2
cd dropbear-2025.88
./configure
make PROGRAMS="dropbear dbclient dropbearkey dropbearconvert scp"
make install DESTDIR=./temp
cp ./temp/usr/local/sbin/dropbear ../
cd ..
```

### TODO

#### Questions

1. What do the `openat`, and `execve`, syscalls do? Cite your sources (HINT:
   Google/Type in a terminal `man <syscall-name>`.

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
