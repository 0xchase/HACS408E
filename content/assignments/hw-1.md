---
title: "Homework 1: Firmware Analysis"
weight: 1
draft: false
---

## Description

For this lab you will be reinforcing the skills learned in the first two weeks
of class by repeating them on a new firmware. Write a report in the style of a
blog/article
([this is a fine example](https://www.infosecinstitute.com/resources/iot-security/iot-security-fundamentals-reverse-engineering-firmware/)).
Your writing should be informal, and broken down into steps for each part of
your analysis. Please include pictures or code blocks to show or explain
concepts visually.

{{< downloadbutton file="firmware.zip" text="Firmware Blob" >}}

## Rubric (`20 pts`)

| Item                 | Points  | Description                                                                                       |
| :------------------- | :------ | :------------------------------------------------------------------------------------------------ |
| Initial Research     | `3 pts` | Find information about the device this firmware is for and provide an overview in your report.    |
| Decrpyt Firmware     | `3 pts` | Explain your process for decrypting the firmware. Include references to anything you find online. |
| Extract Firmware     | `4 pts` | Show an overview of the binwalk extraction results.                                               |
| Analyze Init Scripts | `3 pts` | Give a short analysis of the directory structure and init scripts for the filesystem.             |
| Analyze Web Pages    | `4 pts` | Try to analyze the web server HTML/Javascript code. This does not need to be extensive.           |
| CVE Analysis         | `3 pts` | Look up CVE's for this device, pick one and give a short description of it in your report.        |

### Decrypt Firmware

You will have to deal with encryption for this assignment. It should be easy to
figure out with some googling but don't be afraid to reach out if you get stuck!

For those who are not using the class Ubuntu VM to do the homework, you may run
into an issue where binwalk doesn't recognize the encrypted firmware file. This
seems to be an issue with older versions of binwalk. However once you decrypt
the firmware, older versions of binwalk should be fine.

Here is what the binwalk results for the encrypted firmware should be:

![](./hw-1/hacs408e-assignment-1-binwalk.png "Picture of terminal commands showing that binwalk version 3 recognizes the firmware file type while binwalk version 2.3.3 does not.")

### Extract Contents with Binwalk

Show which section of the firmware is the Linux kernel and which is the
filesystem. Explain what binwalk tells you about the Linux kernel image.

### Filesystem and Web Content Analysis

For the init script analysis:

- Is there a similar structure to what you encountered in the labs for week 02?
- Is there a binary file responsible for starting up the system? Are there
  interesting strings in this binary?

Analyze the HTML/Javascript Files:

- Where are the HTML/Javascript files for the website located? Is this different
  from your experience with the class labs?
- Are there any files with interesting names? Show how you might try find the
  code for the login page:
  - For example, you could search for terms like `username` or `password`
  - Or you could serve the HTML code with `python3 -m http.server` and use a
    browser view the HTML
- This does not need to be an extensive analysis, but you should explain how
  using what files you attempted to look at and what road blocks (if any) you
  dealt with.

### CVE Description

- Explain how your chosen CVE makes the system vulnerable. Just a paragraph is
  fine.

<h2><p style="display: none;">foo</p></h2>

> [!NOTE]
>
> The prompts for this assignment are meant to be open ended. A lot of real
> world reverse engineering involves learning how to figure out what information
> about a system is important and what isn't. It is okay to say, "I looked at X
> and didn't find anything" or "I tried to analyze Y but I didn't get anywhere."
>
> Documenting your failures is just as important as celebrating your wins.

## Submission

{{< callout emoji="📝" >}}

Please submit your report in Markdown or PDF format to
[ELMS](https://umd.instructure.com/courses/1390353/assignments).

{{< /callout >}}
