---
title: "Lab 1: Packed Program Analysis"
weight: 1
draft: false
---

## Overview

{{< callout emoji="💡" >}}

This lab is designed to show you how to use reverse engineering tools to figure
out if a program is packed. Malware often uses packing to hide its code and make
it harder for reverse engineers to understand what the program is doing.

**Goals:**

- Understand indicators of a packed program
- Learn how to use `entropy` analysis to decide if a program is packed
- Practice using reverse engineering tools

**Estimated Time:** `45 Minutes`

{{< /callout >}}

## Instructions

{{% steps %}}

### Examine a non-packed file

Before you look at a packed file, lets try to get a sense of what a "normal"
Windows executable looks like. To accomplish this, you will analyze the
`explorer.exe` program located at `C:\Windows\explorer.exe` on your VM.
Alternatively, you can download a copy of the program here:

{{< downloadbutton file="explorer.exe" text="explorer.exe" >}}

### Open the "Detect it Easy" tool

Detect it Easy (`die`) is a popular tool to analyze Windows portable executable
files in order to tell if it is packed or obfuscated in some way. It has many
signatures and algorithms baked into it that it uses to analyze files.

![](./die.png "")

Open the explorer program in `die` and then click the `Advanded` checkbox to get
to the entropy settings.

![](./die_advanced.png "")

![](./click_entropy.png "")

![](./die_entropy_view.png "")

{{< question >}}

What is the overall entropy for this file? Does `die` think this program is
packed/obfuscated? <br></br> Explain why you think the entropy graph is
higher/lower in certain places.

{{< /question >}}

### Open `explorer.exe` in Binary Ninja

Next try opening the `explorer.exe` program in Binary Ninja. Navigate to the
`Triage Summary` view and analyze the entropy section.

{{< question >}}

Based on your previous analysis with `die` what do you think Binary Ninja's
entropy section is telling you?

{{< /question >}}

> [!TIP]
> Review the
> [Binary Ninja Documentation](https://docs.binary.ninja/guide/index.html?h=entropy#1-entropy)
> for information about what the colors mean.

Notice how there are a lot of imported libraries and functions. This is a good
indication that this program is not packed. Another good indication that a
program is packed, is having few or strangely named sections. Open the
`Memory Map` view in Binary Ninja.

{{< question >}}

Do the sections of this binary seem strange to you?

{{< /question >}}

### Repeat this process with `packed.exe`

Repeat the analysis steps above using a packed file:

{{< downloadbutton file="packed.exe" text="packed.exe" >}}

{{< question >}}

What is the average entropy value? Does the entropy graph look different?

{{< /question >}}

{{< question >}}

Review the entropy graph in Binary Ninja. Explain how it is different from
`explorer.exe`.

{{< /question >}}

{{< question >}}

Are the sections in this program different from what you normally see?

{{< /question >}}

### Run the program to see what it does

> [!IMPORTANT]
> This program was written by the instructors and is NOT malicious.

{{< question >}}

Do you see any of the text in the program when looking at strings with Binary
Ninja? What does this tell you about why malware authors might want to use a
packer on their code? <br></br> Can you think of any valid reason(s) why
legitimate software might use a packer?

{{< /question >}}

### Figure out how to unpack it

Your last challenge is to try and unpack this program. Googling strings or
section names is a good way to figure out what packer was used. Detect it Easy
certainly has some helpful information as well.

{{< question >}}

What command (or any other method) did you use to unpack the program?

{{< /question >}}

{{% /steps %}}

## Optional: Advanced Packer Analysis

If you would like to look into more advanced examples of packed malware,
[this blog post](https://intezer.com/blog/malware-reverse-engineering-for-beginners-part-2/)
by Intezer is a great example. The sample referenced in part one of the article
can be found
[here](https://bazaar.abuse.ch/sample/02dda0916789c0c3572cbbf0e119cbae7be42e10eca39be66bbaaf2468a62b7a/).

## Solutions

{{% details title="Click to reveal.." closed="true" %}}

### Analysis of `explorer.exe`

![](./die_entropy_answer.png "")

![](./explorer_binja_entropy.png "")

![](./explorer_binja_sections.png "")

### Analysis of `packed.exe`

![](./die_packed_answer.png "")

![](./packed_binja_entropy.png "")

![](./packed_binja_sections.png "")

To unpack the file you can run:

```
upx -d packed.exe
```

![](./packed_binja_unpacked.png "")

![](./die_unpacked_answer.png "")

{{% /details %}}

## Submission

{{< callout emoji="📝" >}}

Submit a markdown file with any code you wrote and the answers to questions to
[ELMS](https://umd.instructure.com/courses/1390353/assignments).

{{< /callout >}}
