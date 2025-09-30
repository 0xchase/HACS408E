---
title: "HW 3: TODO"
weight: 3
draft: true
---

## Description

TODO:

- Analyze the PCAP
  - Give an overview of the PCAP. What protocols do you see?
  - Note the domains and ip addresses, are any malicious?
    - Use google or `url haus`
  - Follow the HTTP streams and determine which ones were used to download
    malicious binaries.
  - Extract the executable files
    - Use wireshark, you may get some corruption. Use `binwalk` and `dd` to fix.
      Ask for help.
    - [Link to Network Miner]

- Conduct initial triage on executables
  - Calculate sha256 hash of each binary
  - Use virus total to learn about them
  - Use binaryninja
    - Do you see interesting strings?
    - Based on the windows functions, explain what you think about this program.

> [!TIP]
>
> - tip
> - tip
> - tip

## Submission

### Rubric (`20 pts`)

1. Task 1 (`3 pts`):
   - Description
1. Task 2 (`3 pts`):
   - Description

{{< callout emoji="📝" >}}

Submit a write up with answers to questions and any code you wrote to
[ELMS](https://umd.instructure.com/courses/1390353/assignments).

{{< /callout >}}
