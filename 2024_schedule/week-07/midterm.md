---
title: "Midterm: Real-World Malware"
weight: 4
---

## Description

This week you will form groups to reverse engineer real-world malware samples.
Your group will be expected to prepare a short (~10 minute) presentation to be
given in two weeks during class (next week we'll be covering more malware
topics). The presentation will be your midterm. To be assigned your sample,
first form a group of 3-5 students. Feel free to use the Discord to find group
members. Then send a Discord message or email to the instructors with the names
of your group members. We will respond with a sample for your group to analyze.

{{< callout type=info >}}

You can add yourself to a group in the `People` secion of our
[ELMS Class](https://umd.instructure.com/courses/1374508/groups#tab-106948)

{{< /callout >}}

## Tips

- Use Ghidra to inspect your sample in depth
- Use x64dbg to assist with static analysis (covered in more depth next class)
- Use the [Sysinternals Suite](https://learn.microsoft.com/en-us/sysinternals/)
  to triage your sample

## Assignment

{{% steps %}}

### Presentation

{{< callout emoji="🗨️" type="info" >}}

Prepare a 10-minute presentation with your group about your sample. It should
summarize your analysis, with any background information necessary to help the
class understand your analysis. At a minimum, it should answer the following
questions.

- What kind of file is the malware?
- What interest imports, exports, and strings does the malware contain?
- Does it interact with the network?
- Does the behavior include file modifications, additional payloads, process
  injection, registry modifications, or persistence mechanisms?
- What indicators of compromise (IOCs) are there for this sample?
- What is the overall purpose of this sample?

{{< /callout >}}

{{% /steps %}}
