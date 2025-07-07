---
title: "Lab 1: Man-In-The-Middle"
weight: 1
---

## Overview

{{< callout emoji="💡" >}}

In this lab you will decrypt HTTPS/TLS traffic using `mitmproxy` to capture the
exchanged secret keys and then load them into wireshark which will show you the
decrypted packets.

**Goals:**

- Prctice using wireshark
- Decrypt encrypted traffic
- Gain a deeper understanding of TLS

**Estimated Time:** `45 Minutes`

{{< /callout >}}

## Instructions

{{% steps %}}

### Get the example file

Start by getting the example pcap with encrypted traffic and the `SSLKEYLOGFILE`
from the
[Unit 42 tutorial](https://unit42.paloaltonetworks.com/wireshark-tutorial-decrypting-https-traffic/).

{{< downloadbutton
file="https://github.com/pan-unit42/wireshark-tutorial-decrypting-HTTPS-traffic/raw/refs/heads/master/Wireshark-tutorial-on-decrypting-HTTPS-SSL-TLS-traffic.zip"
text="files.zip" >}}

{{< callout type=error >}}

The password to unzip the files is `infected`. This pcap contains real malware
artifacts! Do not extract and run any files on your personal computer!

{{< /callout >}}

### Filter to the first tcp stream (`tcp.stream eq 0`) and view encrypted data.

Open the pcap and verify that the tcp stream is encrypted. Follow as
`TCP Stream` and you should just see gibberish.

### Find the frame containing the `Server Key Exchange` data

In the `TLS` section of the frame data, find the first certificate
(`1692 Bytes`) and then open the `issuer: rdnSequence` section.

1. **What is the `Country Name` and the `Organization Name`?**

Next open up the other `TLS` section and look for the public key exchange
algorithm. It should be in front of the words `Server Params`.

2. **What is the algorightm?**
3. **What does the `EC` stand for?**

### Set the TLS `(Pre)-Master-Secret` log file

Click `Edit > Preferences > Protocols > TLS`. In this menu set the Master Secret
log file to the text file included in the `.zip` archive you downloaded above.

Once you save the setting you should see http traffic in wireshark now.

Verify that you can follow the first stream as `HTTP` now.

### Open the `File > Export Objects > HTTP` window

4. **What website does the `invest_20.dll` file come from?**

### Setup MITMProxy

Follow the instructions to install
[Man-in-the-Middle Proxy](https://mitmproxy.org/) on your VM.

{{< downloadbutton file=https://docs.mitmproxy.org/stable/overview-installation/
text="Install Instructions" >}}

Then browse to the `Getting Started` page to find out how to use the tool. This
will tell you to:

- Start the `mitmproxy` program
- Google how to set up your device to route all traffic through the proxy
  - You can ignore this
- Tell you to browse to a special page to download / install the `mitmproxy`
  certificates
  - You can ignore this too

### Record and decrypt an https request with wireshark

1. Start `mitmproxy` (the `mitmproxyweb` command is a little more user friendly)
1. Run the curl command found on the
   [`Core Concepts > Certificates`](https://docs.mitmproxy.org/stable/concepts-certificates/)
   page of MITMProxy's documentation.
1. In wireshark: set the (Pre)-Master-Secret file to the one found in:
   - `<plac where you ran mitmproxy>/.mitmproxy`
1. Decrypt the `TLS` traffic

Please submit a screenshot of a decrypted http stream from wireshark.

{{% /steps %}}

## Submission

{{< callout emoji="📝" >}}

Submit a markdown file with any code you wrote and the answers to questions to
[ELMS](https://umd.instructure.com/courses/1374508/assignments).

{{< /callout >}}
