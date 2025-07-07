---
title: "HW: 'Ransomware' Reversing"
weight: 4
---

## Description

Please revers the following 'ransomware'. You will analyze the binary and
provide a report which should be written to inform other security researchers
what to look for in this `malware` and how it works. Your report should include
the following:

Initial Triage (3 pts):

- What type of file is it?
- Is this binary packed?
- Any interesting strings?
- Provide `sha256` hashes of the file. (Both the packed and unpacked version if
  applicable)

Static Analysis (4 pts):

- Provide an explaination of what this program does using proof from your ghidra
  analysis.
- Povide 'indicators' for sys admins to detect this 'malware'
  - Files Opened/Created
  - Network Connections
  - Etc.

Dynamic Analysis (3 pts):

- Demonstrate the ability to get the program to behave "normally".
  - Fix any errors
  - Show network traffic in wireshark

The final 2 points of your homework will be in the quality of your report. Make
it clear and readable.

{{< callout type=info >}}

NOTE: The following program is safe to run on your computer, but I'd still
recommend using the kali linux VM.

{{< /callout >}}

{{< downloadbutton file=program.exe text=program.exe >}}

## Tips

- [Redirect External IP to localhost](https://askubuntu.com/questions/1168293/redirect-an-external-ip-to-localhost)
- [Getting Started with `socat`](https://www.redhat.com/en/blog/getting-started-socat)
  - You can use `socat` to listen on a specific port anc redirect all received
    content to a file. Look in the man page for `TCP-LISTEN` and `OPEN`. Google
    is also a good resource.
- Reach out if you get stuck. The intention is not to have you waste too much
  time figuring out how to redirect network traffic.
- Also instead of the above methods you can just patch the binary...

## Submission

{{< callout emoji="📝" >}}

Submit a nicely rendered PDF (.pdf) report to
[ELMS](https://umd.instructure.com/courses/1374508/assignments)?

{{< /callout >}}
