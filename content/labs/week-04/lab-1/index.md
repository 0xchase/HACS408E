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

Set another breakpoint at the `printf` function and use the `cont` command to
continue execution until the program enters that function.

```
(gdb) break printf
(gdb) cont
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

> [!CAUTION]
> TODO: Descript `gef` view

<br></br>

---

#### Finishing Up

Use the `finish` command to continue executing until you return from the
function you're currently in.

Once you have returned from `fopen` you should have a local variable with your
file handle. Use `info locals` to see what the address is.

```
(gdb) info locals
...
```

If the function succeeded, what is the address of the `FILE` object?

Because `gdb` understands types, you can use the `print` command to inspect
variables. You can also dereference pointer types!

```
(gdb) print infile
...
(gdb) print *infile
...
```

Use `help print` to find out how to pretty print structures.

{{% callout type="warning" %}} Beware, sometimes gdb doesn't have all the
information about the type you want to dereference. You can use the `cast`
syntax to tell gdb what type the variable should be. <br>
`(gdb) print *(FILE *)infile` <br> Use `info types` to see the types that gdb
currently aware of.

{{% /callout %}}

Use the `continue` command to run the program until the next breakpoint is hit,
or the end of the program. Whichever comes first.

#### Practice

Spend some time practicing what you've learned. Run the program again. Practice
setting breakpoints, and using the `help` command to learn about other commands.

### Using `gdb` without source code:

Compile the `xor` program without debugging info.

```bash {filename="Bash"}
$ gcc -Wall -Werror -O2 -o xor.bin ./xor_main.c
$ file ./xor.bin
# <... lots of info ...>, not stripped
```

#### Time to look at assembly

Set a breakpoint at `main` and run the program until the breakpoint is hit. Type
`list` and you should get an error saying no such file found.

Instead what you can look at is the assembly code using the `disassemble`
command.

```
(gdb) disassemble
```

What is the address of the first call to `fopen`?

Set a breakpoint at this address using the `break` command. Then use
`step instruction` to call the function.

```
(break) *0x<addresss>
(gdb) step instruction
(gdb) si
```

Use the `display` command to print something every time gdb stops. For example,
print the next `3 instructions (/3i)` starting from the value of the program
counter `$pc`.

```
(gdb) display /3i $pc
(gdb) si
(gdb) si
(gdb) si
```

#### Inspecting registers and variables

Use `finish` to return until you get back to the `main` function. Once you're
back in main lets look at the registers to find the return value from the
function. We learned that `RAX` is the return value of the function, and we just
returned from `fopen` so...

```
(gdb) info regs
```

What is the address of the `FILE` object returned from `fopen`?

Use the `print` command to show the `FILE` structure that `$rax` currently
points to.

{{% callout type=info %}}

When you want to specify a specific gdb variable (like the value of a register)
you will need to put a `$` infront of it.

{{% /callout %}}

```
(gdb) print *(FILE *)$rax
commands covered:
```

#### E<u> `x`</u>amining memory

Disassemble the main function but only show the first 8 bytes.

```
disassemble /r main, main+8
```

Now use the `x` command to examine memory at the same address. We want
`8 bytes in hexadecimal (\8bx)`. Use `help x` to learn more about the `/FMT`
string.

```
(gdb) x /8xb main
(gdb) x /4xh *0x<address-of-main>
```

Do the bytes match the bytes from the disassembly?

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
