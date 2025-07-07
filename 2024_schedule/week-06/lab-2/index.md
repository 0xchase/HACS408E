---
title: "Lab 2: Malware Traffic Analysis"
weight: 2
---

## Overview

{{< callout emoji="💡" >}}

In this lab you will change the configuration of wireshark to better prepare for
analyzing malware traffic. Often malware uses web traffic to reach back to a
control machine or download a second stage payload to execute once the victim
machine has been exploited.

**Goals:**

- Change the wireshark interface
- Develop a report analyzing known malware traffic

**Estimated Time:** `60 Minutes`

{{< /callout >}}

## Part 1 - Walkthrough: Changing Wireshark Columns

{{% steps %}}

### Follow the `workshop-part-02.pdf` slides from Palo Alto's Wireshark Workshop.

The slides can be downloaded from
[the workshop github repo](https://github.com/pan-unit42/wireshark-workshop/tree/master).

{{< callout type=info >}}

**Note:** The password to unzip the file is `unit42`

{{< /callout >}}

- Video walk throughs from the work shop are available at
  [Unit 42's Website](https://unit42.paloaltonetworks.com/wireshark-workshop-videos/)

### Don't hide any of the columns after you've set them up, just skip to the `Search Filter Expressions` section.

You'll only need to save the first display filter:

- `basic`

{{% /steps %}}

## Part 2 - Pcap Analysis

For this exercise you will become a network analyst for `Large Corporation™`.
There have been news reports and bulletins from CISA that the `lokibot` malware
incidents have been on the rise. An employee at your work has reported
suspicious behavior to the security team and they've given you (as the resident
networking expert) some packet captures to look over.

{{< callout type=info >}}

Here is a list of known indicators of the `lokibot` malware:

- HTTP requests to urls ending in `fre.php`
- A User Agent string of `Mozilla/4.08`
- The string `ckav.ru` as well as the `victim Host Name` in the content of the
  HTTP request.

{{< /callout >}}

{{% steps %}}

### Download the first two pcaps from part 05 of the workshop using the link below.

{{< downloadbutton file="pcaps.zip" text="pcaps.zip" >}}

{{< callout type=error >}}

**NOTE:** The password to unlock the zip file is `pcaps-contain-malware`

{{< /callout >}}

### Victim Machine Info - Open the first pcap and filter to `dhcp` traffic

DHCP is how a host requests an ip address when joining a network.

Look at the first frame and find the `Requested IP Address` option in the `DHCP`
drop down.

1. **What is the victim machine's IP address?**
1. **What is the victim machine's Host Name?**

### Victim Machine Info - Next, filter for `nbns` traffic

Find a frame where the `source IP` matches the address you found above and the
`info` column contains the correct `Host Name`.

This traffic is common in enterprise networks and can be seen from both Windows
and MacOS machines. Looking at the ethernet dropdown of the frame details:

1. **What is the mac address of the victim machine?**

The first two bytes of a MAC address indicate the manufacturer of the machine
and wireshark will fill in the name for you.

### Finding IOCs - Click the `basic` label you created in Part 1 to filter for web traffic

Look for unencrypted http traffic (this will be on `port 80`, colored `green`).

1. **What hostnames do you see?**

Follow the tcp stream of the frames sent to the `parisyoungerfashion.com` host.

1. Do you see any indicators of the `lokibot` malware mentioned above?

### ---------------------------------------------------------------------------

### Malware Artifacts - Open the second pcap, now and click the `basic` label to filter for web traffic.

The person who reported the incident mentioned that they clicked a link in thier
email to download an invoice document before their computer started acting
weird. Look for any web requests to download an invoice document.

1. What is the hostname for the site the document was downloaded from?
1. Are there any other files downloaded from this site?
1. Export the two files you found and list their names with `MD5` hashes in your
   report.

{{% /steps %}}

## Tips

- If you get stuck, ask for help!
- The real skill of using wireshark is to filter the information down so your
  not overwhelmed.

## Submission

{{< callout emoji="📝" >}}

Submit a markdown file with any code you wrote and the answers to questions to
[ELMS](https://umd.instructure.com/courses/1374508/assignments).

{{< /callout >}}
