---
title: "Lab 2: Dynamic Function Calls"
weight: 2
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

**Estimated Time:** `90 Minutes`

{{< /callout >}}

## Part 1: Dynamic Loading

{{% steps %}}

### Get the example program.

{{< downloadbutton file="program.exe" text="program.exe" >}}

### Run the program, then trace it with `procmon`

You should see it try and fail to open a `.dll` file a lot of times. Look for
many calls to `CreateFile` in a row.

1. **What is the name of the file that fails to open?**

### Examine the program in Ghidra

Select `Search > For Strings` in the ghidra menu and find the `.dll` name that
the program is trying to open. Double click the `XREF` (cross reference) to see
where the string gets used.

1. **Describe at a high level what this function is doing.**
   - **What does the `LoadLibrary` Windows API function do?**
   - **What does the `GetProcAddress` function do?**
1. **What function is the program trying to call?**
1. **What Windows API function is it using to lookup this function?**

### Download the shared library

{{< downloadbutton file="MyPuts.dll" text="MyPuts.dll" >}}

1. **What functions does it export? Was this what you were expecting?**

Run the program with the `MyPuts.dll` file in the same directory. And take a new
trace with `procmon`.

1. **Do you notice any differences in the trace?**

{{% /steps %}}

## Part 2: Obfuscation

{{% steps %}}

### Download the `hash-example` files

{{< downloadbutton file="hash-example.zip" text="hash-example.zip" >}}

### Review the program in Ghidra to get a sense of what it's doing

1. **Describe at a high level what the program does.**

### Use `x32-debug` to step through until you get to when it calls the secret function.

1. **What function gets called?**
1. **Were you able to figure this out in any other ways (context clues, etc.)?**

{{% /steps %}}

## Tips

- Don't worry if the Windows API functions don't make a lot of sense. We don't
  expect you to become windows experts overnight.
- Debugging symbols for windows are stored in `.pdb` files. Ghidra should pick
  this up automatically if it stored in the same directory as the executable
  file.

## Submission

{{< callout emoji="📝" >}}

Submit a markdown file with any code you wrote and the answers to questions to
[ELMS](https://umd.instructure.com/courses/1374508/assignments).

{{< /callout >}}
