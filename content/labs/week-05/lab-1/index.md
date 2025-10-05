---
title: "Lab 1: Starter PCAP Analysis"
weight: 2
draft: false
---

## Overview

{{< callout emoji="💡" >}}

In this lab you will be practicing using Wireshark by using what you learned
from the walkthrough. You will be given a few PCAP's to look at and you need to
analyze each of them in order to answer the questions. The files come from
[Marcelle Lee](https://info.marcellelee.com/)'s
[Packet Analysis workshop content](https://github.com/marcellelee/packet_analysis/blob/main/Marcelle_SharkFest_2025.zip)
used at Sarkfest 2025. She also has some really helpful cheat sheets:

- [OSI Model vs. TCP/IP Stack](https://raw.githubusercontent.com/marcellelee/cheat-sheets/refs/heads/main/OSI_Model_TCP-IP_Stack.pdf)
- [Commonly Used Wireshark Filters](https://raw.githubusercontent.com/marcellelee/cheat-sheets/refs/heads/main/Wireshark_Display_Filters.pdf)

**Goals:**

- Practice using Wireshark

**Estimated Time:** `45 Minutes`

{{< /callout >}}

## Instructions

{{% steps %}}

### PCAP 1

{{< downloadbutton file="login.pcap" text="PCAP 1" >}}

This packet capture is a simplified example of a credential stealing web page
where attackers redirect you to a site masquerading as a legitimate one.

{{< question >}}

What IP address is hosting the credential harvesting pages? <br></br> Try to
figure out which organization was being targeted by looking at the HTML code.

{{< /question >}}

### PCAP 2

{{< downloadbutton file="injection.pcap" text="PCAP 2" >}}

Review the examples for SQL injection from the following OWASP article:

- [https://owasp.org/www-community/attacks/SQL_Injection](https://owasp.org/www-community/attacks/SQL_Injection)

Then analyze the PCAP to answer the questions.

{{< question >}}

What string was used to trigger the SQL injection? <br></br> HINT: The
`unquote()` method from the
[`urllib.parse` python module](https://docs.python.org/3/library/urllib.parse.html#urllib.parse.unquote)
might come in handy.

{{< /question >}}

{{< question >}}

Who does the attacker login as using this technique?

{{< /question >}}

### PCAP 3

This next PCAP is some web shell traffic. Typically, once an attacker gets into
a system, they set up a way to communicate with the machine in case their first
connection breaks. A reverse shell is a common example because it give the
attacker a way to remotely run shell commands on the victims system.

{{< downloadbutton file="web.pcap" text="PCAP 3" >}}

{{< question >}}

What is the first command the attacker tried? Was it successful? <br></br> What
was the message in `secret.txt`?

{{< /question >}}

### PCAP 4

{{< downloadbutton file="golang_RAT.pcap" text="PCAP 4" >}}

The final PCAP for this lab is traffic from a RAT (remote access toolkit) that
used a uniq way to communicate with its command/control server. Analyze the file
to answer the following questions.

{{< question >}}

What was the most commonly used (application level) protocol used in this PCAP
file? <br></br> What is the
[top-level domain](https://letmegooglethat.com/?q=what+is+a+top+level+domain)
(TLD) of the site that the malware is trying to communicate with?

{{< /question >}}

{{% /steps %}}

## Solutions

{{% details title="Click to reveal.." closed="true" %}}

### PCAP 1

![](./login_pcap_http_filter.png)

![](./login_pcap_save_html_to_file.png)

![](./login_pcap_view_page.png)

### PCAP 2

![](./injection_pcap_follow_http.png)

![](./injection_pcap_python.png)

![](./injection_pcap_logged_in_user.png)

### PCAP 3

![](./web_pcap_first_command.png)

![](./web_pcap_not_successful.png)

![](./web_pcap_secret.png)

### PCAP 4

![](./golang_pcap_most_common.png)

![](./golang_pcap_dns_tld_answer.png)

{{% /details %}}

## Submission

{{< callout emoji="📝" >}}

Submit a markdown file with any code you wrote and the answers to questions to
[ELMS](https://umd.instructure.com/courses/1390353/assignments).

{{< /callout >}}
