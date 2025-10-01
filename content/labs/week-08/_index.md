---
title: "08: Group Presentation"
prev: labs/week-07
next: labs/week-09
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

You can add yourself to a group in the `People` section of our
[ELMS Class](https://umd.instructure.com/courses/1390353/groups#tab-112702)

{{< /callout >}}

> [!TIP]
>
> - TODO

## Samples

{{< downloadbutton file="group_1.zip" text="Group 1" >}}

{{< downloadbutton file="group_2.zip" text="Group 2" >}}

{{< downloadbutton file="group_3.zip" text="Group 3" >}}

{{< downloadbutton file="group_4.zip" text="Group 4" >}}

{{< downloadbutton file="group_5.zip" text="Group 5" >}}

{{< downloadbutton file="group_6.zip" text="Group 6" >}}

{{< downloadbutton file="group_6.zip" text="Group 7" >}}

These are live malware samples for the midterm report. **PLEASE BE CAREFUL WITH
THEM!**

> [!WARNING]
> All zip files are password protected. Reach out to the instructors for the
> password.

## Presentation

Prepare a 10-minute presentation with your group about your sample. It should
summarize your analysis, with any background information necessary to help the
class understand your analysis. At a minimum, it should answer the following
questions.

## Rubric (`20 pts`)

1. Conduct Research (`5 pts`)
   - What type of malware is it and what family does it belong to?
   - Look for information about this malware type from other researchers and
     give a summary in your presentation.
   - What indicators of compromise (IOCs) are there for this sample?

2. Initial Triage (`3 pts`)
   - What kind of file is the malware?
   - What interest imports, exports, and strings does the malware contain?

3. Demonstrate Reversing Skills (`7 pts`)
   - Demonstrate use of reversing tools learned in class (such as binaryninja)
     to understand what this binary does.
   - Does it match what you found in your initial research? If not show how it
     is different.
   - Show both static and dynamic analysis workflows. If you encountered any
     challenges explain how you addressed (successfully or not) them.

4. Network & System Analysis (`5 pts`)
   - Does it interact with the network?
   - Does the behavior include file modifications, additional payloads, process
     injection, registry modifications, or persistence mechanisms?
   - What is the overall purpose of this sample?

## Submission

{{< callout emoji="📝" >}}

Please submit your presentation as a PDF to
[ELMS](https://umd.instructure.com/courses/1390353/assignments).

{{< /callout >}}
