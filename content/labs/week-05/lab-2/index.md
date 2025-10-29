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
> - HTTP requests to urls ending in `free.php`
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

List a couple of domains that you see this time. Are any strange?

{{< /question >}}

The person who reported the incident mentioned that they clicked a link in their
email to download an invoice document before their computer started acting
weird. Look for any web requests that were used to download a document file.

{{< question >}}

What is the hostname for the site the document was downloaded from? <br></br>
Are there any other files downloaded from this site?

{{< /question >}}

Look for other HTTP requests to this malicious domain. Find another GET request
which downloads a file. Presumably, this is a second stage payload for this
malware.

{{< question >}}

What type of file is it? Do you see the correct magic byes associated with this
filetype?

{{< /question >}}

#### Exporting Artifact from Wireshark

Use the Wireshark menu to navigate to `File > Export Objects > HTTP` to see the
various files that Wireshark can extract from this PCAP.

{{< question >}}

What are the `SHA256` hashes of each of the files.

{{< /question >}}

### Inspecting HTTPS Certificates

By default if you're capturing TLS (HTTPS) traffic, it is encrypted so you won't
be able to decrypt it and see the contents unless you have the private key. This
is possible to intercept if you set up a
[Man-in-the-Middle proxy](https://www.mitmproxy.org/) or if you control the
server that serves HTTPS connections.

In this case thought, we're going to analyze the packets to look for malicious
traffic by finding non-standard looking TLS certificates.

Open up `workshop-part-05-04.pcap` from the unzipped files you extracted earlier
and use the `basic` filter to see the various hostnames present in the capture.

{{< question >}}

What are the IP address without a domain using HTTPS? Are any of them using a
non-standard port?

{{< /question >}}

Next lets find out what packet(s) contain the certificates. Most major web
protocols are documented in
"[Request for Comments](https://www.ietf.org/process/rfcs/)" (RFCs).

Search through the table of contents in the TLS specification and find the
`Handshake Protocol` section of the appendix on
`Protocol Data Structures and Constant Values`:

- [RFC8446](https://datatracker.ietf.org/doc/html/rfc8446)

{{< question >}}

In the `HandshakeType` enum, what number denotes the `certificate` handshake
type?

{{< /question >}}

Use this number as a filter in Wireshark for the `tls.handshake.type` field.
Then look for a packet where the `src` address is `204.79.197.200` which is the
ip address for `www.bing.com` from this recording.

```{filename="Wireshark Filter"}
ip.addr == 204.79.197.200 and tls.handshake.type == <ANSWER_TO_PREVIOUS_QUESTION>
```

Expand the dropdowns in the frame details pane until you see the
[`RDNSequence`](https://datatracker.ietf.org/doc/html/rfc4514#section-2).

- `Transport Layer Security`
  - `TLSv1.2 Record Layer: Handshake Protocol: Certificate`
    - `Handshake Protocol: Certificate`
      - `Certificates (### bytes)`
        - `Certificate`
          - `signedCertificate`
            - `issuer: rdnSequence (0)`
              - `rdnSequence: # items (...)`

Compare this to the RDNSequence for one of the TLS packets coming from a
malicious address you found above (such as `178.33.183.53`).

{{< question >}}

Describe how the values for a RDNSequence look for a normal certificate compared
to a malicious one.

{{< /question >}}

{{% /steps %}}

## Solutions

{{% details title="Click to reveal..." closed="true" %}}

#### Victim Machine Info

![](./victim_machine_info_1.png "")

![](./victim_machine_info_2.png "")

#### Export Objects Hashes

![](./file_hashes_answer.png "")

#### Malicious Certificates RDNSequence

![](./find_valid_certificate_answer.png "")

![](./find_invalid_certificate_answer.png "")

{{% /details %}}

## Submission

{{< callout emoji="📝" >}}

Submit a markdown file with any code you wrote and the answers to questions to
[ELMS](https://umd.instructure.com/courses/1390353/assignments).

{{< /callout >}}
