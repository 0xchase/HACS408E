---
title: "Lab-2: Go Reversing Example"
weight: 1
---

[Lecture on RE + Golang Tips](/schedule/lectures/supplemental/reversing_tips/)

## Overview

{{< callout emoji="💡" >}}

More practice reversing a mystery go binary.

**Goals:**

- Practice Reversing Go programs
- Practice using Ghidra
- Practice interacting with programs dynamically

**Estimated Time:** `60 Minutes`

{{< /callout >}}

## Instructions

{{% steps %}}

### Download the Mystery Program

{{< downloadbutton file=go-sample text=go-sample >}}

For this one you're on your own. The goal is to gain a highlevel understanding
of what the program is doing. Use a combination of dynamic and static analysis
to try and figure out what the program does.

Here are some helper questions to focus your reversing:

1. **What libraries/packages does this program import?**
   - What is each library used for?
1. **What are the `flag<...>` functions used for at the beginning of
   `main.main`?**
1. **What does the `net/http<...>Handle` function do?**
   - Work through each of the handler functions. Do the names give you any
     indication of what they're used for?
1. **Try to find all the `fmt.<print>` style functions and correctly type the
   global strings that are used.**
   - Can you find any strings that you see when the program runs by doing this?

{{% /steps %}}

## Tips

- Trying to work through the forward engineering process can help you understand
  how to reverse something
- Try to separate the runtime code from the actual functionality
- Focus on answering one thing at a time

## Submission

{{< callout emoji="📝" >}}

Submit a markdown file with any code you wrote and the answers to questions to
[ELMS](https://umd.instructure.com/courses/1374508/assignments).

{{< /callout >}}
