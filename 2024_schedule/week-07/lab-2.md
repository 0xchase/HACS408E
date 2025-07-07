---
title: "Lab 2: Malware Analysis"
weight: 2
---

## Overview

{{< callout emoji="💡" >}}

In this lab you will perform an in-depth analysis of our malware sample. You may
use all of the tools we previously covered, though it's expected that this
portion is easiest to complete with Ghidra.

**Goals:**

- Gain familiarity with PE reverse engineering
- Look for indicators of compromise
- Look for elements of the malware that might be signatured

**Estimated Time:** `60 Minutes`

{{< /callout >}}

## Questions

Since this is a malware sample, there are some key questions you should address
in your writeup.

- Does this sample connect to the internet?
- Is there a way to disable this sample on infected machines?
- Does this sample implement persistance mechanisms?
- What indicators that a machine is compromised with this sample?
- What malicious payload does this sample implement or deliver?
- What is the overall purpose of this sample?

## Hints

- Real-world malware can be bloated and complicated. Don't try to understand
  what every function does.
- Look for key functions using information identified in the previous lab and
  focus on those
- Look at the cross-references to important strings, imports, and functions

## Submission

{{< callout emoji="📝" >}}

Submit a markdown file with your answers to the questions above to
[ELMS](https://umd.instructure.com/courses/1374508/assignments).

{{< /callout >}}
