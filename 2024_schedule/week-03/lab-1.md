---
title: "Lab 1: Tracing and LD_PRELOAD"
weight: 1
---

{{< callout emoji="💡" >}}

**Explaination:**

In this lab you will use `strace` and `ltrace` to analyze a the openssh server
(`sshd`). You will also use `LD_PRELOAD` to exploit features of dynamically
linked programs.

<u>Goals:</u>

- Become familiar with how a program interacts with the linux operating system.
- Practice using well know dynamic analysis tools.
- Understand how to hijack functions from dynamically loaded libraries using
  `LD_PRELOAD`.

{{< /callout >}}

## Instructions

{{% steps %}}

### Install `openssh-server`

```sh
$ sudo apt install openssh-server
```

Do some initial analysis of the `sshd` binary:

- What type of file is it?
- What shared libraries (if any) does it use?
- Are there symbols? Interesting strings?

### `strace`

Next install [`strace`](https://strace.io/) if you don't already have it.

```bash
$ man strace
```

#### Questions

1. What do the `openat`, and `execve`, syscalls do? Cite your sources (HINT:
   Google/Type in a terminal `man <syscall-name>`.

2. What is the command line flag for following child processes?

3. What do the `-s`, `-v`, `-x`, and `-y|-yy` command line flags do?

```bash
$ strace -qq -o sshd.strace $(which sshd)
$ less ./sshd.strace
```

Note, strace is kind of a mess to look at, use the filter mentioned below to
just look at "interesting" syscalls. Also see the tips section for syntax
highlighting.

4. Use the `-e` flag to filter only on syscalls relate to file operations. What
   files does `sshd` try to open?

   1. Do any succeed?
   1. Does this give you any insight into what the program does?

   {{% callout type="info" %}} HINT: Syscalls return a negative number when they
   fail. {{% /callout %}}

### `ltrace`

Install [`ltrace`](https://ltrace.org/) if you don't already have it.

```bash
$ ltrace -o sshd.ltrace $(which sshd)
```

#### Questions

1. Explain at a high level what you see.
   - What functions stand out to you?
   - What does this tell you about the functionality of `sshd`?

### Bonus/Optional: `LD_PRELOAD`

Choose two `str*` functions in the ltrace and write your own version of them in
C, but print out the string parameters while also performing the regular
functionality.

{{% callout type="info" %}} I recommend `strlen` and
[`strcasecmp`](https://sourceware.org/git/?p=glibc.git;a=blob;f=string/strcasecmp.c;h=ab75f22adc76f4ba28c48577678ffbb88495effb;hb=HEAD).
{{% /callout %}}

```bash
$ gcc -shared -fPIC -o my_string_lib.so ./<your-code>.c
```

#### Questions

Run openssh-server with your strings library loaded, and examine the strings
that your functions print.

```bash
$ LD_PRELOAD='./my_string_lib.so' $(which sshd)
```

1. What other functions might you want to replace in this way? How does this
   help with reverse engineering?

1. Check out the `LD_PRELOAD` links in the [resources section](/resources/) and
   explain why you can't simply include the

{{% /steps %}}

## Tips

- You can get syntax highlighting with [`bat`](https://github.com/sharkdp/bat),
  to make reading `strace` and `ltrace` a lot nicer.
  ```sh
  $ bat -l strace --color=always --paging=never <ltrace_or_strace_file> | less -SR
  # NOTE: The -R flag for less
  ```

## Submission

{{< callout type="info" >}}

Submit a markdown file with a write up and answers to questions to
[ELMS](https://umd.instructure.com/courses/1374508/assignments).

{{< /callout >}}
