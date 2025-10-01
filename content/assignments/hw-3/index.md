---
title: "HW 3: Analyze Packet Capture + Artifacts"
weight: 3
draft: false
---

## Description

For this assignment, you have been given a malicious PCAP file with traffic from
real malware. Analyze the contents of the PCAP noting any suspicious traffic or
malicious domains. Extract any binary artifacts you can find and provide a brief
initial triage of each malicious program with VirusTotal. Finally you will
choose **exactly one** of the artifacts and look at it in Binaryninja.

Please cite any sources used during your research by including the website link
in a "Sources" section at the end of your report.

{{< dangerbutton file="homework-3.zip" text="Zipped PCAP" >}}

> [!CAUTION]
> The password to unzip the file is: `homework-3-malicious-pcap`

## Rubric (`20 pts`)

| Item                           | Points                  | Description                                                                                 |
| :----------------------------- | :---------------------- | :------------------------------------------------------------------------------------------ |
| PCAP&nbsp;Overview             | <code>3&nbsp;pts</code> | Give an overview of the types of packets seen in this capture.                              |
| Malicious&nbsp;Domains         | <code>4&nbsp;pts</code> | Research suspicious domains found to find out if they are associated with specific malware. |
| Extracted&nbsp;Artifacts       | <code>6&nbsp;pts</code> | Extract the binary artifacts from Wireshark.                                                |
| Virus&nbsp;Total&nbsp;Research | <code>4&nbsp;pts</code> | Triage each of the extracted artifacts with VirusTotal.                                     |
| Binaryninja&nbsp;Analysis      | <code>3&nbsp;pts</code> | Analyze **only one** of the extracted artifacts with binaryninja.                           |

### PCAP Overview

Give an overview of the ports and protocols that you see in this PCAP. Are there
any uses of non-standard ports? Does anything look suspicious?

### Malicious Domains

Research the domains you think are suspicious to see if they are connected to
any known malware. Make sure to put quotes (`""`) around the domain name when
you google it, or you can paste it into [Url Haus](https://urlhaus.abuse.ch/).

```{filename="Google Search Example"}
"www.domain-name.com"+malicious
```

If there is any TLS traffic to a suspicious domain, note the TLS certificate
information.

> [!TIP]
> Don't forget to check DNS requests for domain names!

### Extracted Artifacts

There are 5 binary files inside this packet capture. Show how you determined
which ones to extract by following the TCP streams in Wireshark. You can also
extract everything and find the files that way but you must still connect them
back to a specific HTTP request.

Calculate the `sha256` hashes of each binary and explain what type of file each
one is. Include this in your report.

> [!TIP]
> Some of the extracted files may not export correctly from Wireshark. Make sure
> to use `binwalk` and `dd` to check for embedded files.

### Virus Total Analysis

Either lookup the `sha256` hashes of the binaries or upload them to
[VirusTotal](https://virustotal.com). Explain what type of malware this might be
and what family it might belong to.

### Binaryninja Analysis

Choose **just one** of the extracted files and conduct a brief analysis of the
program with binaryninja.

- What kind of file is it?
- What libraries does it use?
- Are there interesting strings?
- Is there interesting code?
- Etc.

## Submission

{{< callout emoji="📝" >}}

Submit a write up with answers to questions and any code you wrote to
[ELMS](https://umd.instructure.com/courses/1390353/assignments).

{{< /callout >}}
