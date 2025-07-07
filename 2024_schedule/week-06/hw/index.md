---
title: "HW: Pcap Analysis"
weight: 4
---

## Description

This is a challenge from a CTF where you've captured some interesting network
traffic. Work to find the flag by analyzing the packet capture and any other
artifacts you can find.

{{< downloadbutton file="homework.pcap" text="homework.pcap" >}}

## Tips

- You can export files from wireshark.
  [See this example guide](https://unit42.paloaltonetworks.com/using-wireshark-exporting-objects-from-a-pcap/).
- CTF challenges often use `base64` or `ROT13` to hide plain text.
- You will not need to run/install any files extracted from the pcap. (You might
  need to extract the contents of some things though...)

## Submission

{{< callout emoji="📝" >}}

Submit a markdown or pdf report describing how you solved the challenge to
[ELMS](https://umd.instructure.com/courses/1374508/assignments)? Your report
should include the following:

- An analysis of the pcap file
  - What protocols do you see? What is the source/destination information.
- A list of any extracted files, with their sha256 hash
- Explain the steps you took to uncover the flag.

{{< /callout >}}
