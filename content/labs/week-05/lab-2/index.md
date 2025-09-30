---
title: "Lab 2: Malware Traffic Analysis"
weight: 3
draft: false
---

## Overview

{{< callout emoji="💡" >}}

In this lab you will use Wireshark to analyze real malware traffic and learn how
to extract artifacts from packet captures. Often malware uses web traffic to
reach back to a command and control (C2) server to download a second stage
payload which is then executed after the victim machine has been exploited.

**Goals:**

- Learn to use Wireshark to look for suspicious or malicious traffic.
- Find and document important information about malicious network activity.
- Extract binary artifacts from a packet capture.

**Estimated Time:** `45 Minutes`

{{< /callout >}}

> [!NOTE]
> The content of this lab comes from Unit42's Wireshark workshop. Links to the
> sources and video walkthroughs can be found here:
>
> - https://github.com/pan-unit42/wireshark-workshop
> - https://unit42.paloaltonetworks.com/wireshark-workshop-videos/
>
> Unit42 is a cybersecurity research team at Palo Alto Networks and they have
> ton of helpful resources on their site.

## Instructions

For this exercise you will become a network analyst for `Large Corporation™`.
There have been news reports and bulletins from CISA that the `lokibot` malware
incidents have been on the rise. An employee at your work has reported
suspicious behavior to the security team and they've given you (as the resident
networking expert) some packet captures to look over.

> [!IMPORTANT]
>
> Here is a list of known indicators of the `lokibot` malware:
>
> - HTTP requests to urls ending in `fre.php`
> - A User Agent string of `Mozilla/4.08`
> - The string `ckav.ru` as well as the `victim Host Name` in the content of the
>   HTTP request.

{{% steps %}}

### Download the PCAP files

{{< dangerbutton
file="https://github.com/pan-unit42/wireshark-workshop/raw/refs/heads/master/workshop-part-05-pcaps.zip"
text="pcaps.zip" >}}

> [!CAUTION]
> These PCAP files contain artifacts from real malware. Do not run them on your
> personal laptop! To unlock the zip file when decompressing, the password is
> `unit42`

### Find Victim Machine Info

Open the first PCAP and use the filter bar to limit the packets to `dhcp`
traffic.

DHCP is how a host requests an ip address when joining a network and it can be
useful for figuring out information about the local machine. Use the dropdown
menu in the packet details section to find the relevant fields in the `DHCP`
request packet.

{{< question >}}

What is the victim machine's requested IP address? <br></br> What is the victim
machine's hostname?

{{< /question >}}

Next look at the Ethernet dropdown of the frame details for this packet. The
first two bytes of the MAC address indicate the manufacturer of the machine and
Wireshark will fill in the name for you. This can help you figure out what kind
of PC the victim was using, and therefore information about what kind of malware
you're dealing with.

{{< question >}}

What is the MAC address of the victim machine?

{{< /question >}}

### Finding IOCs

Click the `basic` label to filter for web traffic. Look for unencrypted HTTP
traffic (this will be on `port 80`, colored `green`).

{{< question >}}

What hostnames do you see?

{{< /question >}}

Find an unencrypted HTTP packet going to `www.google.com` and follow the TCP
stream. This is very suspicious since by default your browser should use HTTPS
and google will redirect you to HTTPS.

![](./export_objects_menu.png "")

Click the basic web filter again. Follow the TCP stream of the frames sent to
the `parisyoungerfashion.com` host.

1. Do you see any indicators of the `lokibot` malware mentioned above?

### Malware Artifacts

Open the second PCAP (`workshop-part-05-02.pcap`), now and click the `basic`
label to filter for web traffic.

{{< question >}}

What domains do you see this time?

{{< /question >}}

The person who reported the incident mentioned that they clicked a link in their
email to download an invoice document before their computer started acting
weird. Look for any web requests that were used to download a document file.

{{< question >}}

What is the hostname for the site the document was downloaded from? <br></br>
Are there any other files downloaded from this site?

{{< /question >}}

Look for other HTTP requests to this malicious domain. Look for another file
download.

{{< question >}}

What type of file is it? Do you see the correct magic byes associated with this
filetype?

{{< /question >}}

### Exporting Artifact from Wireshark

Use the Wireshark menu to navigate to `File > Export Objects > HTTP` to see the
various files that Wireshark can extract from this PCAP.

{{< question >}}

What are the `SHA256` hashes of each of the files.

{{< /question >}}

### Inspecting HTTPS Certificates

Find packet for `evento.peugeot-anzures.com` look for cert name?

Use url_haus to check malicious domain.

What are the IP address without a domain using https? Are any of them using a
non-standard port?

Look at RDN sequence

{{% /steps %}}

## Submission

{{< callout emoji="📝" >}}

Submit a markdown file with any code you wrote and the answers to questions to
[ELMS](https://umd.instructure.com/courses/1390353/assignments).

{{< /callout >}}
