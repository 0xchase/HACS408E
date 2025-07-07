---
title: "HW: Reversing Go Malware"
weight: 4
draft: true
---

## Description

For this homework assignment you will be analyzing malware written in the Go
programming language.

TODO: More context.

{{< callout type=error >}}

NOTE: The following ransomware has been altered so it shouldn't encrypt any of
your files but it is still malware! It will affect your system (though not in
any irreversible way). Please be careful and only run this file on a windows VM.

{{< downloadbutton file=ransomware.zip text=ransomware.zip >}}

The password to decrypt the zip file is: `its-magically-malicious`

{{< /callout >}}

### Part 1: Dynamic Analysis (3 Pts)

Run the malware in a VM while using procmon. Ignore ALL REGISTRY operations,
they are not important for this program. (3 points / bullet)

- Describe what happens to your system. Any noticable changes? Any files
  created?

- Verify that files were created by showing a screenshot of the event(s) in
  procmon.

- What program is being searched for in many different places?

Run the program a second time (procmon is not necessary). Is the execution
different?

### Part 2: Static Analysis (9 Pts)

Part of go programming is using libraries which generally come from github
repos. Find <u>**3 unique repositories**</u> referenced in the malware. Look up
the repository and explain what they are for. (1 point)

Using proof from ghidra or any other analysis sources answer the following
questions (2 points / bullet):

- Explain how the ransomware knows if you've already been infected.

- Explain how the ransomware changes your wallpaper.

- What data is in the `BAD_GOPHER.txt` file and where does the contents of this
  file get generated in the code?

- Find the main decryption function and show the control-flow path from the
  `main.main` function. In other words, specify the name of each function called
  from `main.main` --> `<decrypt function>`.
  - HINT: Ghidra has a `Function Call Trees` window that might be helpful.
