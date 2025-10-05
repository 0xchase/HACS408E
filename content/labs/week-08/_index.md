---
title: "08: Group Presentation"
prev: labs/week-07
next: labs/week-09
---

## Description

This week you will form groups to reverse engineer real-world malware samples.
Your group will be expected to prepare a short (10-15 minute) presentation to be
given in two weeks during class (next week we'll be covering more malware
topics). The presentation will be your midterm. To be assigned your sample,
first form a group of 3-4 students. Feel free to use the Discord to find group
members. Then send a Discord message or email to the instructors with the names
of your group members. We will respond with a sample for your group to analyze.

{{< callout type=info >}}

You can add yourself to a group in the `People` tab when viewing
[this class on ELMS](https://umd.instructure.com/courses/1390353/groups#tab-112702).

{{< /callout >}}

## Samples

> [!WARNING]
> These are real, potentially live malware samples for your midterm report.
>
> **PLEASE BE CAREFUL WITH THEM!**
>
> All zip files are password protected. Reach out to the instructors for the
> password.

<table>
<tbody>
<tr>
<th scope="row">Group 1</th>
<td>
{{< dangerbutton file="group_1.zip" text="Sample 1" >}}
</td>
</tr>
<tr>
<th scope="row">Group 2</th>
<td>
{{< dangerbutton file="group_2.zip" text="Sample 2" >}}
</td>
</tr>
<tr>
<th scope="row">Group 3</th>
<td>
{{< dangerbutton file="group_3.zip" text="Sample 3" >}}
</td>
</tr>
<tr>
<th scope="row">Group 4</th>
<td>
{{< dangerbutton file="group_4.zip" text="Sample 4" >}}
</td>
</tr>
<tr>
<th scope="row">Group 5</th>
<td>
{{< dangerbutton file="group_5.zip" text="Sample 5" >}}
</td>
</tr>
<tr>
<th scope="row">Group 6</th>
<td>
{{< dangerbutton file="group_6.zip" text="Sample 6" >}}
</td>
</tr>
<tr>
<th scope="row">Group 7</th>
<td>
{{< dangerbutton file="group_7.zip" text="Sample 7" >}}
</td>
</tr>
</tbody>
</table>

## Presentation

Prepare a 10-15 minute presentation with your group about your sample. It should
summarize your analysis, with any background information and context necessary
to help the class understand your results. At a minimum, it should answer the
following questions (does not need to be in this order):

#### Research Previous Work

- Look for information about this malware type from other researchers and give a
  summary in your presentation.
  - You may use VirusTotal to get you started.
- What type of malware is it and what family does it belong to?
- What indicators of compromise (IOCs) are there for this sample?

#### Initial Triage

- Explain high level details about this sample from binaryninja's triage
  summary.
- What imports, exports, and strings does the malware contain?
  - Does anything seem interesting or malicious?
- Provide hashes (MD5 and SHA256) of the file and ways to potentially identify
  this type of malware.
- Provide a time frame for when this malware was active based on when this
  binary was compiled.
  - Is it still active?

#### Network & System Analysis

- How does this sample interact with the network?
  - Can you find hard coded URLs or IP addresses?
  - Monitor for suspicious requests with Wireshark.
- How does this sample interact with the operating system?
  - Does it look for specific files or access Windows registry keys?
  - Does the behavior include additional payloads, process injection or
    persistence mechanisms?

#### Demonstrate Reversing Skills

- Demonstrate use of reversing tools learned in class (such as `binaryninja` and
  `windbg`) to understand what this sample does.
- Does it match what you found in your initial research? If not show how it is
  different.
- Show static and dynamic analysis workflows for understanding your sample's
  behavior.
  - If you encountered any challenges explain how you addressed them
    (successfully or not).

## Rubric (`20 pts`)

| Item                         | Points  | Description |
| :--------------------------- | :------ | :---------- |
| Research Previous Work       | `3 pts` |             |
| Initial Triage               | `3 pts` |             |
| Network & System Analysis    | `7 pts` |             |
| Demonstrate Reversing Skills | `7 pts` |             |

## Submission

{{< callout emoji="📝" >}}

Please submit your presentation as a PDF to
[ELMS](https://umd.instructure.com/courses/1390353/assignments).

{{< /callout >}}
