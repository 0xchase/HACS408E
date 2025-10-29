---
title: "Lab 1: Debugging with GNU Debugger"
weight: 1
---

## Overview

{{< callout emoji="💡" >}}

In this lab you will practice using a debugger (specifically GNU Debugger
`gdb`), to interact with and analyze a program as it's running.

**Goals:**

- Understand how to use `gdb`
  - Learn the most common commands
  - Learn how to look up help
- Practice reading assembly

**Estimated Time:** `45 Minutes`

{{< /callout >}}

## Part 1: Basic GDB Usage

{{% steps %}}

### Download Debug Program

First grab the debug versions of the programs we analyzed last week:

{{< downloadbutton file="./xor_c_debug.bin" text="xor_c_debug.bin" >}}

### Learn how to use `GDB` commands

#### The `help` command

Start the program under gdb with:

```{filename="Shell"}
gdb ./xor_c_debug.bin
```

Then, use the `help` command to have `gdb` tell you what types of commands you
can run.

{{< question >}}

What command is used for searching `gdb`'s help documentation for commands
related to the users search term?

{{< /question >}}

> [!TIP]
>
> You can also use the `gef` command to see help information about what commands
> provides as a plugin to `gdb`.

#### Setting Breakpoints

Breakpoints are the core functionality of a debugger. Use them to stop program
execution at a certain point so that you can inspect registers and walk through
each instruction step by step. You can set a breakpoint on a named object (like
the `main` function) or an address (like `*0xdeadbeef`). If you don't specify an
argument, the `break` command will put a breakpoint at the current instruction.

Use the `info addr` command to find the address of main and then set a
breakpoint there.

```sh
(gdb) info addr main
# ...
(gdb) break REPLACE_WITH_ADDRESS_OF_MAIN
# ...
```

> [!NOTE]
>
> `gdb` requires that address be prefixed with an asterisk (`*`) when setting
> breakpoints!

Next, run the program with (you guessed it): the `run` command. This will
execute instructions until the breakpoint you previously set is hit.

```sh
(gdb) run
# ...
```

{{% details title="If `run` Doesn't Work:" closed="true" %}}

> [!IMPORTANT]
> You may get an error like the following:
>
> ```{filename=GDB}
> Starting program: /home/student/Downloads/xor_c_debug.bin
> fish: Unknown command. '/home/student/Downloads/xor_c_debug.bin' exists but is not an executable file.
> -- or --
> Starting program: /home/student/Downloads/xor_c_debug.bin
> /bin/sh: 1: exec: /home/student/Downloads/xor_c_debug.bin: Permission denied
> ```
>
> This means that `gdb` is not able to execute the program because the file
> doesn't have execute permissions.
>
> ```sh {filename=Shell}
> ls -l xor_c_debug.bin
> # .rw-rw-r-- 23k student 27 Sep 10:45 xor_c_debug.bin
> #    ^  ^  ^
> #    ------------ Note how there are no 'x's in these positions. Run 'ls -l /bin/ls' to compare
> ```
>
> To fix this you need to add execute permissions to the file with the `chmod`
> command.
>
> ```sh {filename=Shell}
> chmod u+x xor_c_debug.bin
> ```

{{% /details %}}

This will run the program until it hits a breakpoint or exits. In our case it
stopped at main because that's where we set our breakpoint. You might notice
that because we have debugging information, `gdb` is able to display the values
of arguments and variables from the program.

Use the `print` command to print the value of variables. Gdb also understands
C-like syntax for accessing the properties of structs and data types. Use this
to learn more about the `argv` argument for the main function:

```sh
(gdb) help print
# ...
(gdb) print argv
# ...
# Use the '*' to dereference a pointer just like in C programming
(gdb) print *argv
# Alternatively you can use:
(gdb) print argv[0]
# ...
```

{{< question >}}

What is the type and address of the `argv` argument to the main function?
<br></br> Note that `argv` points to a string. What is the address of this
string?

{{< /question >}}

#### Examining Memory

You can use the `x` command to examine the contents of memory with gdb. This is
an extremely useful command and is absolutely worth reading the documentation
on.

- [Reference from VisualGdb](https://visualgdb.com/gdbreference/commands/x)
- [GDB Official Manual](https://sourceware.org/gdb/current/onlinedocs/gdb.html/Memory.html#Memory)
  (not as easy to read)

The command is also able to treat memory as various data types. For example, we
can look at the as bytes (`b`) in hex (`x`). Examine the `argv` string with
these options:

```
(gdb) x/32bx *argv
```

Or we might want to view it in terms of 4 byte (word sized) integers. To look at
the same amount of overall bytes, we divide 8 by the size of the integer (4) to
get 8. So we want to examine 8 words in decimal format.

```
(gdb) x/8wd *argv
```

Gdb will also display strings for you:

```
(gdb) x/s *argv
```

{{< question >}}

What happens when you try increasing the number of strings you examine with the
`x` command? <br></br> HINT: You should see something similar to when you run
the `env` program in another terminal window.

{{< /question >}}

#### Getting Program Information

Set another breakpoint at the `printf` function and use the `continue` command
to continue execution until the program enters that function.

```
(gdb) break printf
(gdb) continue
```

Once there, let's use the `info` command to learn a bunch of stuff about the
program! It does a lot so be prepared to scroll back up in your terminal to see
everything. Also make sure to use `help info <subcommand>` to learn more about
the different options.

First let's see what gdb can tell us about this file and the sections of the
executable (as well as it's shared libraries):

```sh
(gdb) info file
# ...
```

{{< question >}}

What is the start address of the `.text` section for the `xor_c_debug.bin`
program?

{{< /question >}}

Next lets look at the shared libraries a little more:

```sh
(gdb) info sharedlibrary
# ...
(gdb) info proc mappings
# ...
```

The `info proc mappings` command shows you the memory regions mapped into
virtual memory for the debugged process. Note that there is more than just the
program and shared libraries there!

{{< question >}}

What is the start and end address of the stack region?

{{< /question >}}

Use `q` or `ctrl+d` to end the gdb session.

{{% /steps %}}

## Part 2: Stepping through assembly with GDB

{{% steps %}}

### Install "GDB Enhanced Features" (`GEF`)

Follow the instructions at [the `gef` github page](https://github.com/hugsy/gef)
to install it.

```sh {filename="Shell"}
## using curl

$ bash -c "$(curl -fsSL https://gef.blah.cat/sh)"
```

> [!NOTE]
>
> If you want to turn off `gef`'s features, then edit your `$HOME/.gdbinit` file
> and remove the following line:
>
> ```{filename="$HOME/.gdbinit"}
> set disassembly-flavor intel
> ```

Before we start debugging with the `gef` plugin for gdb, lets get generate some
sample data for the xor program to encrypt.

```sh{filename="Shell"}
python3 -c 'print("A"*4096, end="")' > input.txt
```

Now you can run gdb like before, setting a breakpoint at `main` and then running
the program (this time with arguments).

```sh {filename="Shell"}
student@hacs408e-vm> gdb ./xor_c_debug.bin
gef➤  break main
gef➤  run ./input.txt ./output.bin
# ...
```

After the first breakpoint, your session will look quite different! This is
gef's context command which gives you an overview of what is currently happening
in the program. Your screen may be cut off if your window isn't big enough.

![](./gef_context.png "A screenshot of the `gef` context output.")

In the above screenshot, you can see the five main sections of the `gef`
context:

1. The `registers` section shows the value of each register and attempts to
   dereference the value if it is a memory address.
1. The `stack` section shows the bytes of memory starting from the lowest point
   of the stack. Notice that the first address listed is the same as the value
   in `$rsp`.
1. The next region (`code`) shows the current instruction and the instructions
   around it.
1. The `threads` region shows the current thread executing. This matters more
   when looking at multi-threaded programs.
1. Final we have the `trace` section which shows you a backtrace of all the
   functions called that have led to the current point of execution.

### Analyzing functions

Use the `disas` function to disassemble the code for `main()`. Then scroll back
up and find the addresses for each call to `fopen()` in the main function and
set breakpoints there:

```
gef➤  disas main
gef➤  break <address>
gef➤  break <address_2>
```

![](./break_fopen.png "A screenshot of the assembly instructions for main with the calls to fopen outlined by a red box")

Then once you have those set, run the program with the two input files it is
expecting:

```
gef➤  run input.txt output.bin
```

When you get to the call instruction you will see `gef`'s context change. It
should show the next instructions as the `fopen` code in the `code` section.
Also it tries to help your analysis by guessing the function arguments for you.

{{< question >}}

Based on what you think the arguments to the xor program are and what you know
about `fopen()`, what is the calling convention for this function? HINT:
Remember this is a 64-bit program.

- [Documentation for the `fopen()` function](https://en.cppreference.com/w/c/io/fopen.html)
- [x86 calling convention Wikipedia page](https://en.wikipedia.org/w/index.php?title=X86_calling_conventions)

{{< /question >}}

Next lets look at the return value of this function. Use the `stepi` command to
"step instructions" into the fopen() function and then use the `finish` command
to have gdb run the code until the function returns. Alternatively, you can use
the `stepover` command provided by `gef`.

If the function succeeds, it returns a pointer to a `FILE` object according to
the docs.

{{< question >}}

What register is the return value stored in? What is the address of the `FILE`
object?

{{< /question >}}

> [!TIP]
> Sometimes gdb doesn't have all the information about the type you want to
> dereference. You can use the `cast` syntax to tell gdb what type the variable
> should be.
>
> For example, to look at the FILE object pointed at by `$rax` we can cast it to
> a FILE pointer (`FILE *`) and then dereference it with an asterisk so that gdb
> prints the correct fields:
>
> ```
> gef➤  print *(FILE *)($rax)
> ```

Use the `continue` command to run the program until the next breakpoint is hit,
or the end of the program. Whichever comes first.

Practice the above again by continuing past the second call to `fopen` and step
forward a few more instructions. Use the `info locals` command to learn what gdb
knows about local variables. Then use the `vmmap` command provided by GEF to
figure out where the `FILE` structures are stored.

If you go too far or need to restart just use the `run` command with the input
files again and it gdb will start the program over. (`run input.txt output.bin`)

```sh
gef➤  c
#
# Continuing.
#
# Breakpoint 3, 0x0000000000401408 in main (argc=<optimized out>, argv=0x7fffffffe208) at main.c:120
gef➤  stepover
gef➤  si
gef➤  si
gef➤  info locals
# ...
gef➤  vmmap
# ...
```

{{< question >}}

What area of virtual memory contains the addresses of the file structs stored in
the `input_file` and `output_file` variables?

{{< /question >}}

### Learn some more helpful `GEF` commands

GEF provides a bunch of [helpful commands](https://hugsy.github.io/gef/commands)
that make debugging much easier. Here are a few that are worth trying yourself:

The `ctx` or `context` command will print all the information `gef` knows about
the current state of execution.

There is also the `deref` command which is what GEF uses to pretty-print memory
regions in the context output with the strings and stuff nicely printed. You can
use this command to look a larger portion of the stack frame (for example).

```
gef➤  deref -l 20 $rsp
```

You can also search for patterns in memory with the `search-pattern` or `grep`
command. This can be very helpful if your trying to figure out where some data
is that you've entered in the program. It understands the various sections
referenced in the `vmmap` command, but see the documentation for more details
about how to use it.

```
gef➤  help search-pattern
gef➤  grep student stack
```

Finally, to reinforce the linking/loading concepts learned in class, we'll look
at the `got` command. This will tell you the current state of the global offset
table, which is where the addresses of external functions are stored. Normally
when you call an external function, execution jumps to the `.plt` section which
points to the offset in the `.got` section with the address of the function we
want to store. From there execution will continue at the start of the external
function.

<figure>
    <img
      src="https://eli.thegreenplace.net/images/2011/plt_before.png"
      title="PLT and GOT Example"
      alt="Diagram showing how the PLT and the GOT interact in practice."
      loading="lazy"
      style="padding: 10px; border-radius: 10px; background: #fff;"
    >
    <figcaption>Image Source: https://eli.thegreenplace.net/2011/11/03/position-independent-code-pic-in-shared-libraries/</figcaption>
</figure>

If this is the first time the function is executed, the offset in the `.got`
will point back to the `.plt` stub which has some code to tell the dynamic
linker to resolve the address of the target function. Then the `.got` is updated
and the code continues in the external function like normal. Please see
[this video](https://www.youtube.com/watch?v=RtAYxBtpO20) for reference.

Use GEF's `got` command to look at the external functions and see which one is
resolved. Then use the `info symbol <addr>` command to see where the address
points to.

```sh
gef➤  got
# ...
gef➤  info symbol 0x########
```

{{< question >}}

Which function has been resolved by the loader so that it's address has been
updated in the global offset table?

{{< /question >}}

{{% /steps %}}

> [!TIP]
>
> - Any gdb command can be shortened as long as the shortened name doesn't
>   conflict with another command (`gdb` will tell you if the shortened version
>   is ambiguous).
>   - For example, you can set a breakpoint with `b` and `step` can be shortened
>     to just `s`.
> - There are many, MANY frontends to `gdb` that make it much easier to use.
>   Personally, I like vanilla `gdb` but feel free to use a plugin you find
>   online.

## Submission

{{< callout emoji="📝" >}}

Submit a markdown file with any code you wrote and the answers to questions to
[ELMS](https://umd.instructure.com/courses/1390353/assignments).

{{< /callout >}}
