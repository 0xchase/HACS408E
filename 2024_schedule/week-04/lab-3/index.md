---
title: "Lab 3: ReverseMe.exe"
weight: 3
---

## Overview

{{< callout emoji="💡" >}}

In this lab you will practice using ghidra to solve a reverse engineering
challenge.

**Goals:**

- Practice using ghidra

**Estimated Time:** `45 Minutes`

{{< /callout >}}

## Instructions

{{% steps %}}

### Get the example program:

{{< downloadbutton file="./reverseMe.exe" text="reverseMe.exe" >}}

### Import the binary into ghidra.

1. What is the `Executable Format` of the binary?

1. What is the `MD5` hash of the binary?

1. What compiler was used to make this program?

### Open the file in the code browser and navigate to the `entry` function.

### Analyze the function to figure out how to get to the `MessageBox` with a `"You really did it!"` string.

1. What are the contents of your `keyfile`? Or you can give an explaination of
   how to pass the checks.

{{% /steps %}}

## Tips

- Ask for help! Ghidra is a massively complex, monolithic mess of java code that
  is very clunky. We can help you figure out what to click.
- Don't get too focused on windows library functions.
- You can double click global data go to the address. To get back to where you
  were use the `back` button ('<-' in the top left) or use the cross references
  (`XREF[2]`).

## Submission

{{< callout emoji="📝" >}}

Submit a markdown/text file with the answers to questions to
[ELMS](https://umd.instructure.com/courses/1374508/assignments).

{{< /callout >}}
