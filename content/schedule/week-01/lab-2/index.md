---
title: "Lab 2: Manual File Extraction"
weight: 2
---

## Overview

{{< callout emoji="💡" >}}

The goal of this lab is to introduce you to the basics of embedded device
reverse engineering to reinforce the skills you've learned in the previous lab.
There are a lot of components to embedded devices and many different flavors of
device so we've limited the scope to a Linux based router.

**Goals:**

- Learn to use `binwalk` and `dd`
- Learn about Linux boot + initialization
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

> [!IMPORTANT] **What brand/company makes this router?**

Find the product page for this router (version 4) and check the specifications
tab.

> [!IMPORTANT] **Does it tell you what kind of processor the router uses?**

### Get / Download the Firmware

Normally this step can range from needing specialized equipment to get the
firmware off of a device to just downloading it from the vendor's website.
Luckily for us it's the latter.

We'll be using `Archer C7(US)_V4_190411`:

{{< downloadbutton file=Archer_C7_US_V4_190411.zip text=firmware.zip >}}

Unzip the firmware from the vendor and run `file` on each of the extracted
items.

> [!IMPORTANT] **Which file do you think is the firmware? What kind of file is
> it?**

### Walk the Binary

For this lab, we'll be learning how to carve data from firmware blobs manually.
The standard way to handle this task though is to use the `binwalk` tool (which
we'll learn about next week). For now use the analysis results below:

```
./Archer_C7(US)_V4_190411/c7v4_eu-up-ver1-0-8-P1[20190411-rel65590].bin
--------------------------------------------------------------------------------------------
DECIMAL           HEXADECIMAL                DESCRIPTION
--------------------------------------------------------------------------------------------
22372             0x5764                     U-Boot version string: 1.1.4-g4df6eb16-dirty 
                                             ...

22436             0x57A4                     CRC32 polynomial table, big endian

23728             0x5CB0                     uImage firmware image, header size: 64 bytes, 
                                             data size: 40183 bytes, ...

63976             0xF9E8                     uImage firmware image, header size: 64 bytes, 
                                             data size: 1084249 bytes, ...

1148290           0x118582                   SquashFS file system, little endian, image 
                                             size: 13908480 bytes ...

15069820          0xE5F27C                   gzip compressed data, ... 10663 bytes
--------------------------------------------------------------------------------------------

Analyzed 1 file for 111 file signatures (251 magic patterns) in 16.0 milliseconds
```

Because firmware blobs are meant to include updates for all parts of the system,
they usually contain multiple bits of data smashed together into a single file.
To analyze a big blob of data the standard process is to walk through the bytes
of the file and check for certain patterns like magic bytes or other file
signatures. The results above are a representation of this with two important
points for every result:

- The offset into the file of the matching pattern
  - Represented in base 10 (decimal) and base 16 (hexadecimal)
- A description of the embedded data based on the matched pattern.

### Carving Files

You will now practice carving out some of the embedded data files from blobs of
data using the `dd` command.

First we'll extract the bootloader (`u-boot image`):

```bash {filename=Bash}
$ export BOOT_OFFSET=23728
$ export BOOT_LENGTH=$((63976 - 23728))
$ dd if=firmware.bin of=bootloader.bin bs=1 skip=$BOOT_OFFSET count=$BOOT_LENGTH
```

> [!NOTE] What's happening here?
>
> - `dd` is a very powerful program and its **REALLY** old which is why it's
>   argument syntax looks different from many of the other Linux commands you
>   may be familiar with.
> - We `export` the `BOOT_<...>` variables so the remain in the current shell
>   environment and can be seen by future commands that get run.
>
> | Option  | Description                                                                                       |
> | :-----: | :------------------------------------------------------------------------------------------------ |
> |  `if`   | `I`nput `F`ile                                                                                    |
> |  `of`   | `O`utput `F`ile                                                                                   |
> |  `bs`   | `B`lock `S`ize: size of each block to be copied from `if` to `of`. Measured in bytes.             |
> | `skip`  | Skip any number of bytes into the file before starting the copy operation.                        |
> | `count` | Number of `bs` sized blocks to copy. If `bs` is 1, then this is just the number of bytes to copy. |

Finally run `file` on the extracted `bootloader.bin` and examine the output. Is
it similar to what `binwalk` reports?

> [!IMPORTANT] When was this u-boot image created?

> [!IMPORTANT] What architecture was it compiled for?
>
> - [List of Instruction Set Architecture](https://en.wikipedia.org/wiki/Comparison_of_instruction_set_architectures#Instruction_sets)
> - HINT: Some common ones are Arm, RiscV, Mips, PowerPC, and x86

> [!IMPORTANT] Is it a 32 or 64 bit architecture?

Repeat the process above to extract the next recognized chunk of data. Once
extracted, run `file` on the contents to find out how to continue extracting the
blob.

> [!TIP]
> If you follow the process above exactly, you may find that the `unlzma` wont
> work because there is extra data at the end of the compressed file. To fix
> this try extracting with 7-zip (`7z`). It will extract data on a best effort
> basis even if it fails.

```bash {filename=Bash}
$ 7z e kernel.lzma -so > kernel.bin
# ...
$ file kernel.bin
```

> [!IMPORTANT] Does the `file` command recognize the file format?

If you were trying to learn more about how this device works, you can use
`binwalk` or `strings` to start the normal reversing process. We won't dive into
the kernel so in this class so you can leave it for now.

### Extract the Filesystem

Finally we can move on the meat of the embedded device to get at the actual
files.

> [!IMPORTANT] What is [SquashFS](https://en.wikipedia.org/wiki/SquashFS)?

> [!IMPORTANT] How many bytes does the filesystem take up in the firmware blob?

Using `dd`, extract the filesystem:
`dd if=firmware.bin of=filesystem.sqfs skip=1148290 bs=1 count=<SIZE>`

Then use the `unsquashfs` command to "un-squash the fs" i.e. extract the
contents.

At this point you should see a folder structure similar to the root (`/`)
directory of your machine's filesystem.

<!-- deno-fmt-ignore-start -->
> [!IMPORTANT] Are there any items in your machine's root folder that are missing from the routers file system?
<!-- deno-fmt-ignore-end -->

{{% /steps %}}

## Tips

- Analyzing firmware often relies on your ability to navigate linux systems.
  Knowing how to use essential linux commands like `find`, `file`, `dd`,
  `strings`, `grep`, etc. will make you a better reverse engineer!
- Don't forget to skim
  [the `manpage`](https://man7.org/linux/man-pages/index.html) for commands you
  don't know.

## Submission

{{< callout emoji="📝" >}}

Submit a write-up with the answers to questions to
[ELMS](https://umd.instructure.com/courses/1374508/assignments).

{{< /callout >}}
