---
title: "Week 13 + 15: Final Project"
prev: schedule/week-12
draft: true
---

{{< callout type=warning >}}

**UPDATE: Your final project is now a write-up of `Task 3` of the codebreaker
challenge!**

{{< /callout >}}

## Description

For your final project, you will be working on tasks 3, of the
[codebreaker challenge](https://nsa-codebreaker.org/challenge). The last two
lectures of class will be dedicated work periods rather than the normal
lecture/lab content. You can ask questions of the instructors and get tips on
how to progress if you are stuck.

{{< callout type=error >}}

The codebreaker challenge is meant to be completed individually! We cannot share
answers with you, nor should you share your solution with other students.

{{< /callout >}}

This challenge will be **DIFFICULT**, and will require you to leverage many of
the tools and concepts covered in this class to solve. It is also likely that
you will need to spend a lot of time google-ing how things work and teach
yourself new concepts on the fly. This is the essence of reverse engineering.
<span style="color: #939395">~~Given the difficulty and the fact that you must
complete the challenges in order, we have adjusted the grades accordingly (see
below).~~</span>

The goal of this project is to have you demonstrate your ability critically
think about the software that you are reversing. Using the tools learned in
class you should be able to get this program past its initial error condition.
Follow the practices we've worked through on all of the labs (this is not meant
to be an exhaustive list):

- Conduct an initial triage of the program.
  - What kind of file is it?
  - Are there interesting strings?
- Statically analyze the program.
  - Can you get a high level feel for what the code is trying to do?
- Dynamically analyze the program.
  - Is there debug information? Use a debugger to print the local variables, or
    arguments to function calls.
  - Is the program communication over a socket? Analyze the network
    communications.

Getting the `server` binary to work WILL REQUIRE writing some code using a
library referenced by the program.

## Challenge Write-up

The expectation for the final has changed from just completing tasks to writing
about the progress you make on `Task 3`. Your report should explain what you
learned about the program, the methods you used and explainations of why you
used each method.

### Report Structure (`30 pts`)

1. Triage (`3 pts`):
   - Give an overview of the program.
1. Static Analysis (`12 pts`):
   - `6 pts` - Give a high level overview of what you think the program is
     trying to do. Use supporting evidence from Ghidra and explain your process
     for analyzing the software.
   - `6 pts` - Document the library used for client/server communications.
     - Do some research to figure out what this library is and provide and
       overview of the protocol.
     - Cite your sources.
1. Dynamic Analysis (`12 pts`):
   - `6 pts` - Demonstrate usage of a debugger to learn about the program. Try
     and figure out the function where the program is failing.
   - `6 pts` - Demonstrate usage of wireshark to view and decode network
     traffic. Explain what filters you used and why. Does wireshark support the
     communications protocol you researched during static analysis?
1. Interacting with the Target Program (`3 pts`):
   - Write some code to respond to the server in the way that it expects. We
     recommend using `go` for this but you will be able to complete this using
     other languages.
   - `1 pts` - Get the target program past the first error message.
   - `2 pts` - Demonstrate the ability to interact with the target program. This
     means sending a message and getting a response back.

## Submission

If you complete task three of the codebreaker challenge you do not need to
submit a write-up to receive `100%` on the final.

{{< callout emoji="📝" >}}

<span style="color: #939395">~~The challenge is being tracked through the
codebreaker website, so~~</span> make sure you
[share your progress](/schedule/week-12/hw/) with the instructor(s)!
<span style="color: #939395">~~If you complete all three tasks, then no write-up
is necessary and you will receive a `35/30` or `116.67%` as the grade for your
final.~~</span>

Points may be deducted for the quality of your report, not demonstrating the
concepts learned, etc. Your report should be clear and nicely formatted. Include
any information you learned while researching any of the technologies used by
the challenge programs.

As always, the write-up and any code you wrote should be submitted to
[ELMS](https://umd.instructure.com/courses/1374508/assignments).

{{< /callout >}}
