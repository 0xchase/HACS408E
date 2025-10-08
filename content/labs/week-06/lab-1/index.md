---
title: "Lab 1: Malware Triage"
weight: 2
---

## Overview

{{< callout emoji="💡" >}}

**Goals:**

- Snapshot your Windows VM
- Upload a malware sample to virus total
- Perform initial triage

**Estimated Time:** `30 Minutes`

{{< /callout >}}

## Part 1 - Initial Setup

{{% steps %}}

### Snapshot your Windows VM

If you haven't already, snapshot your Windows VM. When dealing with malware we want to be able to revert our system to a blank state, to ensure the malware hasn't persisted without our knowledge.

### Download the malware sample

{{< downloadbutton file="infected.zip" text="/week-07/infected.zip" >}}

The malware is compressed into an encrypted zip file. The password is
`infected`. After extracting it you should have an `.exe` file.

{{% /steps %}}

## Part 2 - Sample Triage

{{% steps %}}

### Upload the sample to Virus Total

Does Virus Total detect it as malicious? Does it reveal any other useful information?

### Examine the strings

First, open the sample in binary ninja. You'll notice this sample is much larger than those we examined in previous labs. It wouldn't be feasible to analyze every function manually, so we need strategies to quickly identify key functionality and locate important code sections.

1. Examine the strings and note any that hint at the sample's behvaior
2. For strings you identify, find cross references to the functions that use those strings
3. If you can guess at what a function does, rename it so you can find it later

### Example the imports

1. Examine the imports and note any that hint at the sample's behvaior
2. For imports you identify, find cross references to the functions that call the imported functions
3. If you can guess at what a function does, rename it so you can find it later

### Collect potential signatures

When analyzing malware it's useful to collect signatures unique to the malware that an antivirus might use to recognize it automatically.

1. Collect a few potential string or byte signatures for this sample

{{% /steps %}}

## Submission

{{< callout emoji="📝" >}}

Submit a markdown file with your answers to the questions above to
[ELMS](https://umd.instructure.com/courses/1374508/assignments).

{{< /callout >}}
