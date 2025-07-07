---
title: "Lab 2: GDB"
weight: 2
---

{{< callout emoji="💡" >}}

**Overview:**

In this lab you will practice using a debugger (specifically GNU Debugger
`gdb`), to interact with and analyze a program as it's running.

<u>Goals:</u>

- Understand how to use `gdb`
  - Learn the most common commands
  - Learn how to look up help
- Practice reading assembly

{{< /callout >}}

## Instructions

{{% steps %}}

### Installing `gef`

Follow the instructions at [the `gef` github page](https://github.com/hugsy/gef)
to install it.

```
# via the install script
## using curl
$ bash -c "$(curl -fsSL https://gef.blah.cat/sh)"
```

Then edit your `$HOME/.gdbinit` file and add the following line:

```{filename="$HOME/.gdbinit"}
set disassembly-flavor intel
```

### Standard `gdb` Usage:

First, compile the `xor` program from program from
[week-01/lab-1](/schedule/week-01/lab-1/) with debugging symbols:

{{< callout type=info >}}

There is a solution posted to the
[files section of the canvas site](https://umd.instructure.com/files/79647538/download?download_frd=1).

{{< /callout >}}

```bash {filename="Bash"}
$ gcc -Wall -Werror -O0 -ggdb -o xor.bin xor_main.c
$ file ./xor.bin
# <... lots of info ...>, with debug_info, not stripped
```

#### Getting `help`

Start the program under gdb with: `gdb ./xor_bin`

- Use the `help` command to have `gdb` tell you what types of commands you can
  run.
- What command is used for searching the help documentation?

#### Running Your Program

Run the program with (you guessed it): the `run` command:

```
(gdb) run
...
```

Use the `help` command to figure out how to run the program with command line
arguments:

```
(gdb) help run
```

#### Info

Use `info` command to get information about the program:

```
(gdb) info file
...
(gdb) info sharedlibrary
...
```

{{% callout type="info" %}} `info sharedlibrary` won't work until the program
has started running. Use `starti` to start the program and stop at the first
assembly instruction. {{% /callout %}}

- What is the address of the entrypoint?
- What is the start address of the `.text` section?

```
(gdb) info functions
```

- What is the address of `main`?
- What is the address of `fopen`?

#### Setting Breakpoints

Set a breakpoint at `main` so the program stops during execution.

```
(gdb) break main
...
(gdb) run <infile> <outfile>
...
```

Use the `list` command to show the lines of source code around the current
breakpoint.

{{< callout type="info" >}}

You can also use the `layout src` to display source constantly but if you don't
like the look of it use `tui disable` to get out of that view.

{{< /callout >}}

Then use the `step` command to step into the next line of source code or
function call. Keep stepping until you enter into the `fopen` function.

Use `break` with no arguments to set a breakpoint at the current address. To
delete the breakpoint, use the `delete` command specifying the breakpoint number
shown by `info break`.

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

## Tips

- To change the assembly syntax from `AT&T` to `Intel` use the
  `set disassembly-flavor` command.
- Any gdb command can be shortened as long as the shortened name doesn't
  conflict with another command (`gdb` will tell you if the shortened version is
  ambiguous).
  - For example you can set a breakpoint with `b` and `step` can be shortened to
    just `s`.
- To get rid of that annoying
  `--Type <RET> for more, q to quit, c to continue without paging--` message add
  the following to your `$HOME/.gdbinit`.
  ```{filename="~/.gdbinit"}
  set pagination off
  ```
- There are many, MANY front ends to `gdb` that make it much easier to use.
  Personally, I like vanilla `gdb` but feel free to use a plugin you find
  online.

## Submission

{{< callout type="info" >}}

Submit a markdown file with any code you wrote and the answers to questions to
[ELMS](https://umd.instructure.com/courses/1374508/assignments)?

{{< /callout >}}
