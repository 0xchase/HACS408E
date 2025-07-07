---
title: "Lab 1: Unpacking"
weight: 1
---

## Overview

{{< callout emoji="💡" >}}

The goal of this lab is to introduce you to the basics of embedded device
reverse engineering. There are a lot of components to embedded devices and many
different flavors of device so we've limited the scope to a linux based router.

**Goals:**

- Learn to use `binwalk` and `dd`
- Learn about linux boot + initialization
- Learn about the SquashFS filesystem

**Estimated Time:** `60 Minutes`

{{< /callout >}}

## Instructions

{{% steps %}}

### Open Source Research

One of the first things you should do when doing firmware analysis is to see
what you can find out about the divice you want to analyze. Depending on what
your looking at there may already be tons of information and previous analysis
work online.

We'll be looking at a relatively old router/firmware:

<img src="https://static.tp-link.com/Archer-C7-01_1485312801057e.jpg" alt="AC1750 Wireless Dual Band Gigabit Router 1">

1. **What brand/company makes this router?**

Find the product page for this router (version 4) and check the specifications
tab.

2. **Does it tell you what kind of processor the router uses?**

### Get / Download the Firmware

Normally this step can range from needing specialized equipment to get the
firmware off of a device to just downloading it from the vendor's website.
Luckily for us its the latter.

We'll be using `Archer C7(US)_V4_190411`:

{{< downloadbutton file=Archer_C7_US_V4_190411.zip text=firmware.zip >}}

Unzip the firmware from the vendor and run `file` on each of the extracted
items.

3. **Which file do you think is the firmware? What kind of file is it?**

### Walk the Binary

Now we get to use the de-facto file analysis tool: `binwalk`. Developed by
ReFirmLabs, now owned by Microsoft it uses
[Magic Bytes](https://en.wikipedia.org/wiki/File_format#Magic_number) as well as
other signatures to figure out what files are contained in any blob of data
(like firmware for example).

Create a copy of the firmware file and call it `firmware.bin`. Then run binwalk
on it:

```bash {filename=Bash}
# NOTE: You may want to upgrade the version of binwalk
# on the kali linux vm:
#   sudo apt update && sudo apt install binwalk

$ binwalk firmware.bin | tee output.log | less -S
```

What `binwalk` tells you is for every result:

- the offset into the file (both in base 10 and base 16)
- a description of the embedded data

4. **How many results do you see?**

### Carving Files

Lets examine how binwalk works a little more closely by carving out some of the
embedded data files.

First we'll extract the bootloader (`u-boot image`) using the `dd` command.

```bash {filename=Bash}
$ export BOOT_OFFSET=23728
$ export BOOT_LENGTH=$((63976 - 23728))
$ dd if=firmware.bin of=bootloader.bin bs=1 skip=$BOOT_OFFSET count=$BOOT_LENGTH
```

{{< callout type=info >}}

Whats happening here?

- `dd` is a very powerful program and its really old which is why it's syntax
  looks different from many of the other linux commands you may be familiar
  with.
- We `export` the `BOOT_<...>` variables so the remain in the current shell
  environment and can be seen by future commands that get run.

| Option  | Description                                                                                       |
| :-----: | :------------------------------------------------------------------------------------------------ |
|  `if`   | `I`nput `F`ile                                                                                    |
|  `of`   | `O`utput `F`ile                                                                                   |
|  `bs`   | `B`lock `S`ize: size of each block to be copied from `if` to `of`. Measured in bytes.             |
| `skip`  | Skip any number of bytes into the file before starting the copy operation.                        |
| `count` | Number of `bs` sized blocks to copy. If `bs` is 1, then this is just the number of bytes to copy. |

{{< /callout >}}

Finally run `file` on the extracted `bootloader.bin` and examine the output. Is
it similar to what `binwalk` reports?

4. **When was this u-boot image created?**
5. **What
   [instruction set architecture](https://en.wikipedia.org/wiki/Comparison_of_instruction_set_architectures#Instruction_sets)
   was it compiled for?**
   - HINT: It starts with 'M'

Use `dd` to extract the LZMA compressed linux kernel from further into the
firmware blob and decompress it.

Using `unlzma` wont work because we don't know the exact size of the compressed
data. Normally this is handled by the bootloader and so you could reverse
engineer the first binary to figure out the size. However, using a tool like
`7z` will extract as much as it can even if it fails.

```bash {filename=Bash}
$ 7z e kernel.lzma -so > kernel.bin
# ...
$ file kernel.bin
```

6. **After doing all this work to extract the contents does the `file` command
   recognize the file format?**

If you were trying to learn more about how this device works, you can use
`binwalk` or `strings` to start the normal reversing process. We won't dive into
the kernel so in this class so you can leave it for now.

### Extract the Filesystem

Finally we can move on the the meat of the embedded device to get at the actual
files.

7. **What is [SquashFS](https://en.wikipedia.org/wiki/SquashFS)?**
8. **How many bytes does the filesystem take up in the firmware blob?**

Using `dd`, extract the file system:
`dd if=firmware.bin of=filesystem.sqfs skip=1148290 bs=1 count=<SIZE>`

Then use the `unsquashfs` command to "un-squash" the filesystem (extract the
contents).

### Finding the Root Password

Linux systems store the user password in the `/etc/shadow` file. Find this file
in the extracted file system and compare it to the one on your kali linux vm.

9. **Does the root user have a password set?**

{{% /steps %}}

## Tips

- Analyzing firmware often relies on your ability to navigate linux systems.
  Knowing how to use essential linux commands like `find`, `file`, `dd`,
  `strings`, `grep`, etc. will make you a better reverse engineer!
- Don't forget to
  [skim the `manpage`](https://www.google.com/search?q=man+binwalk).

## Submission

{{< callout emoji="📝" >}}

Submit a write-up with the answers to questions to
[ELMS](https://umd.instructure.com/courses/1374508/assignments).

{{< /callout >}}
