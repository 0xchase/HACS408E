---
title: "HW: Firmware Triage"
type: docs
weight: 4
---

{{% callout type=info %}}

**Side Note:** Please complete the [following form](https://forms.gle/GDu6BRePhmKpoypw5) along with your homework

{{% /callout %}}

## Description

For this homework you will triage a router firmware. 
For this homework your task will be to decrypt a file that was encrypted with
the binary which you analyzed from last weeks homework. You should have all the
information you need below.

{{< downloadbutton file=FW_WRT1900ACSV2_2.0.3.201002_prod.zip text="Part 1" >}}

{{< downloadbutton file=FW_WRT1900ACSV2_2.0.3.201002_prod.z01 text="Part 2" >}}

{{< downloadbutton file=FW_WRT1900ACSV2_2.0.3.201002_prod.z02 text="Part 3" >}}

{{% steps %}}

### Download the firmware

Since the firmware image is large, and github has file size limits, your firmware is distributed as a multi-part zip file. To reconstruct it, you should download all three parts into the same directory, and then run the following `7z` command.

```
7z e FW_WRT1900ACSV2_2.0.3.201002_prod.zip
```

If all three parts are in the same directory, the extraction should create a file named `FW_WRT1900ACSV2_2.0.3.201002_prod.img`.

### Dump the image strings

Run the `strings` command (with relevant flags) on the `img` file and answer the following questions.

- What type of device is this firmware for (printer, router, camera, etc.)?
- What is the full brand and device name for this firmware?
- What kinds of files do you see embedded in the image? What do these files imply about the firmware's funtionality?

### Extract the image

Next you should extract the file system from the `img` using either [binwalk](https://github.com/ReFirmLabs/binwalk) or [unblob](https://unblob.org/installation/).

{{% callout type=info %}}

**Note:** You may need to install an external dependency that binwalk or unblob depends on for the extraction to succeed.

{{% /callout %}}

### Browse the file system

Find and examine the file system, answering the following questions in your report.

- What assembly architecture does this firmware use? Hint: find a binary and run the `file` command on it.
- What version of the linux kernel does this firmware use? When was this version released? Does it have any known vulnerabilities?
- `cd` in to the `/etc` folder and use its contents to answer the following
  - What firmware version is this?
  - When was this firmware built?
  - What SSH client does it run?
- Does this firmware contain a web server? If so, where are the files in the file system?
- Is the `shadow` file included in the file system?

{{% /steps %}}


## Tips

- Use google if you encounter errors
- Ask questions in the Discord

## Submission

{{< callout emoji="📝" >}}

Submit your report with answers to the questions to [ELMS](https://umd.instructure.com/courses/1374508/assignments).

{{< /callout >}}