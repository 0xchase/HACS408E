---
title: "Lab 2: Explicit Linking & Function Hashing"
weight: 2
draft: false
---

## Overview

{{< callout emoji="💡" >}}

The goal of this lab is to give you a high level overview of how programs can
load external library functionality at run time. This is often done by malware
developers so that the windows API functions that are used, don't show up in the
imports section of the `PE` headers.

**Goals:**

- Understand dynamic loading
- Practice using a debugger on Windows
- Practice skills for malware analysis

**Estimated Time:** `1 hour, 15 Minutes`

{{< /callout >}}

## Part 1: Dynamic Loading

{{% steps %}}

### Get the example program.

{{< downloadbutton file="dyn-load-example.exe" text="dyn-load-example.exe" >}}

### Run the program, then trace it with `procmon`

You should see it try and fail to open a `.dll` file a lot of times. Look for
many calls to `CreateFile` in a row that return a failure code rather than
`SUCCESS`.

{{< question >}}

What is the name of the file that fails to open?

{{< /question >}}

### Examine the program in Binary Ninja

Use the strings view to find the name of the file and then follow the cross
reference to see where this string is used. Review the code that is doing the
dynamic loading and explain what functions are used.

{{< question >}}

What does the `LoadLibrary` Windows API function do? <br></br> What does the
`GetProcAddress` function do?

{{< /question >}}

These functions are used
"[explicit linking](https://learn.microsoft.com/en-us/cpp/build/linking-an-executable-to-a-dll?view=msvc-170)"
and are used by malware authors to hide or obfuscate the functionality of their
code.

{{< question >}}

What function does this program want call from the `.DLL`?

{{< /question >}}

### Download the shared library

{{< downloadbutton file="temp_name.dll" text="temp_name.dll" >}}

Next rename this file to the correct name that you found in your earlier
analysis and run the `dyn-load-example.exe` program again. You should notice
that the behavior changes.

### Setup Binary Ninja Debugger

<img style="height: 600px;" src="./auto_install_windbg.png" />

> [!NOTE]
> If the link in the above screenshot doesn't work for you then you aren't using
> the personal edition of binaryninja. Please install that and proceed or follow
> the instructions on the Binary Ninja docs page.

{{% details title="Install WinDbg with Binja Free Edition" closed="true" %}}

Please follow the documentation to
[install WinDbg manually](https://docs.binary.ninja/guide/debugger/dbgeng-ttd.html#install-windbg-manually).

Use this bundle rather than trying to parse the XML file like it says:

{{< downloadbutton
file="https://windbg.download.prss.microsoft.com/dbazure/prod/1-2508-27001-0/windbg.msixbundle"
text="windbg.msixbundle" >}}

{{% /details %}}

### Create a new time-travel debugging (TTD) trace

<img style="height: 600px;" src="./record_ttd_trace.png" />

![](./record_trace.png "")

![](./trace_recorded.png "")

### Launch the debugger with your new trace

<img style="height: 600px;" src="./launch_debugger_with_trace.png" />

<img style="width: 300px;" src="./choose_debug_adapter.png" />

You'll need to also update the debugger settings to point to the trace you took
earlier.

![](./choose-trace-file.png "")

### View the loaded modules

![](./debugger_modules.png "")

{{< question >}}

Are there any modules here that were not loaded during your initial results with
`procmon` above?

{{< /question >}}

### Set a breakpoint on the call to `LoadLibraryA`

Breakpoints are set at the **instruction** level, so this is best done from the
disassembly view.

![](./set_breakpoint.png "")

Use the icons in the top of the debugger window to step through the code.

> [!TIP]
>
> This is a `time-travel debugging` (TTD) trace which means that the program has
> already run. This has some pros and cons. The con is that you won't be able to
> do some nice features of a debugger like changing the value of a register and
> seeing what happens in the program. However, the pro is that you can go
> backwards if you want!

![](./step_over_load_libarary.png "")

{{< question >}}

What is the base address of the newly loaded module?

{{< /question >}}

Keep stepping forward until you get to the point after the call to
`GetProcAddress`.

{{< question >}}

What is the address of the `myputs` function?

{{< /question >}}

{{% /steps %}}

## Part 2: Function Hashing

{{% steps %}}

### Download the `hash-example` files

{{< downloadbutton file="hash-example.exe" text="hash-example.exe" >}}

### Run the program to see what it does

> [!NOTE]
> This program was written by the instructors and is safe to run.

{{< question >}}

Make a hypothesis about the secret function that was called. What do you think
it does?

{{< /question >}}

### Analyze the program in Binary Ninja

This program uses a malware technique known as function hashing or
[API hashing](https://www.ired.team/offensive-security/defense-evasion/windows-api-hashing-in-malware)
in order to hide the names of the library functions that are called. This makes
it harder for reverse engineers to figure out what a program is doing. Reverse
the program in Binary Ninja to answer the following questions:

{{< question >}}

Where are the function hashes being calculated?

{{< /question >}}

> [!TIP]
> Often, you will see multiple hashes getting checked all at the same time and
> put into an array. Then they can be looked up quickly later on in the program.
> Also note, hashes are usually a 4 or 8 byte number (`0x12345678`) not the
> result of a hash function like `sha256` or `md5`.

{{< question >}}

What libraries (`.dll` files) is the program using to look up functions? (Hint:
There are three names)

{{< /question >}}

### Use the Binary Ninja debugger to find the secret function

Rather than trying to completely reverse engineer the hash algorithm, it is
usually easier to use a debugger to set a breakpoint when the hashed function is
actually called. Then you can see which function in the loaded library
corresponds to the hash.

You may need to `rebase` the program in binary ninja if the addresses don't
match where you set your breakpoint.

![](./copy_base_address.png "")

![](./ctrl_p_command_pallete.png "")

![](./enter_new_base_address.png "")

The debugger console lets you type commands and inspect memory in a text
interface. This is similar to the `gdb` prompt you've used from earlier in this
class. Binary Ninja uses a `WinDbg` backend for debugging windows programs. Any
commands that you enter in the console should be `WinDbg` commands.

- [WinDbg Commands Cheat Sheet](https://blog.lamarranet.com/wp-content/uploads/2021/09/WinDbg-Cheat-Sheet.pdf)

{{< question >}}

Set a breakpoint at the call instruction and determine the name of the secret
function and what library it comes from.

{{< /question >}}

### Using the HashDB plugin

One of the main reasons to use the paid version of Binary Ninja, is the plugins!
People from the security community write plugins to extend the functionality of
Binary Ninja so that certain repetitive or niche problems can be more easily
solved.

The HashDB plugin is a great example of this! Check out
[their website](https://hashdb.openanalysis.net/) for more info.

To use the plugin with Binary Ninja, you need to install it:

![](./hashdb_install_plugin.png "")

To use it you need to go through a couple of steps:

1. First you need to `Hunt` for the hash algorithm. To do this you'll right
   click on a hash value and then use the `Hunt feature to find an algorithm
   that matches that hash value.

   ![](./hunt_hashes.png "")

   ![](./hash_algorithm_suggestions.png "")

1. Next you'll need to do a `Hash Lookup` which will lookup the function names
   using the algorithm you selected in the previous step to create an `enum`
   entry with hash values mapping to function names **for a specific library**.
   Make sure you select the correct one in the drop-down menu!

   ![](./hash_lookup.png "")

   ![](./choose_the_hash_library.png "")

1. Finally, you can replace the hash value in the Binary Ninja code view using
   the `Display As > Enum Member` option or by using the `M` shortcut key.

   ![](./display_as_enum.png "")

   ![](./choose_enum_value.png "")

> [!NOTE]
> Shout out to Anuj Soni for putting together a great
> [video walkthrough explaining how to use the HashDB plugin](https://youtu.be/FKv7njCmJMU?si=Yqer15Oy4QDcfq93&t=1016).

{{< question >}}

What other functions does this program lookup from common windows libraries?

{{< /question >}}

{{% /steps %}}

> [!TIP]
>
> - Don't worry if the Windows API functions don't make a lot of sense. We don't
>   expect you to become windows experts overnight.

## Solutions

{{% details title="Click to reveal.." closed="true" %}}

### Dynamic Loading

![](./dyn-load-procmon-answer.png "")

![](./dyn-load-dll-cross-reference.png "")

![](./dyn-load-assembly-walkthrough.png "")

![](./step_over_load_library_answer.png "")

### Function Hashing

#### Static Analysis

![](./hash_function.png "")

![](./dll_string_names.png "")

![](./hash_lookup_and_calculation.png "")

![](./hash_function_marked_up.png "")

#### Debug Console

![](./debugger_console.png "")

![](./backtrace.png "")

#### HashDB

![](./hashes_answer.png "")

{{% /details %}}

## Submission

{{< callout emoji="📝" >}}

Submit a markdown file with any code you wrote and the answers to questions to
[ELMS](https://umd.instructure.com/courses/1390353/assignments).

{{< /callout >}}
