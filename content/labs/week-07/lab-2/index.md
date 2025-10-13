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
analysis and rerun the `dyn-load-example.exe` program. You should notice that
the behavior changes.

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

### Review the program in Ghidra to get a sense of what it's doing

1. **Describe at a high level what the program does.**

### Use `x32-debug` to step through until you get to when it calls the secret function.

1. **What function gets called?**
1. **Were you able to figure this out in any other ways (context clues, etc.)?**

{{% /steps %}}

> [!TIP]
>
> - Don't worry if the Windows API functions don't make a lot of sense. We don't
>   expect you to become windows experts overnight.
> - Debugging symbols for windows are stored in `.pdb` files. Ghidra should pick
>   this up automatically if it stored in the same directory as the executable
>   file.

## Solutions

{{% details title="Click to reveal.." closed="true" %}}

### Dynamic Loading

![](./dyn-load-procmon-answer.png "")

![](./dyn-load-dll-cross-reference.png "")

![](./dyn-load-assembly-walkthrough.png "")

![](./step_over_load_library_answer.png "")

### Function Hashing

{{% /details %}}

## Submission

{{< callout emoji="📝" >}}

Submit a markdown file with any code you wrote and the answers to questions to
[ELMS](https://umd.instructure.com/courses/1390353/assignments).

{{< /callout >}}
