---
title: "Wireshark Tutorial"
weight: 1
draft: false
---

## Overview

{{< callout emoji="💡" >}}

This guide will attempt to walk you through some of the basics of using
Wireshark to capture and analyze network packets. By the end you should have
some familiarity with how to navigate the user interface of Wireshark.

**Goals:**

- Capture packets
- Use Wireshark filters
- Follow streams of data

**Estimated Time:** `45 Minutes`

{{< /callout >}}

## Instructions

{{% steps %}}

### Take your first capture

Start a packet capture by clicking the blue shark fin icon in the upper left
part of the window. Alternatively, you can double click on the interface you
want to capture from in the main window.

![](./start_first_capture.png "")

Let this go for a little bit until you see some packets, then stop the capture.

![](./stop_packet_capture.png "")

### Fix missing headers

If missing `Src` and `Src Port` in the table headers of the default view,
right-click one of the column names and use the context menu to add them back.

![](./fix_wireshark_headers.png "")

### Review packet hierarchy

To get a sense of the different types of packets in this pcap, use the
statistics menu to open the packet hierarchy.

![](./menu_open_protocol_heirarchy.png "")

![](./proto_heirarchy_example.png "")

### Capture a PING command

Start a new capture by pressing the shark fin and choose:
`Continue without Saving`

![](./start_new_capture.png "")

Then run `ping 1.1.1.1` in a terminal.

![](./run_ping_command.png "")

After it finishes, don't forget to stop the capture.

![](./stop_packet_capture.png "")

### Filter traffic for ICMP packets

Use the filter bar at the top of the window to only show packets that match the
filter you type. It will turn green once you have entered a valid filter. Use
the filter `icmp` to only show our ping packets.

![](./ping_filtered.png)

### Capture some browsing data for `httpforever.com`

Next start a new capture and then use a browser to navigate to
[http://httpforever.com/](http://httpforever.com/).

![](./browse_to_http_forever.png "")

Don't forget to stop your capture after you open the webpage.

![](./stop_packet_capture.png "")

### Review DNS requests

To start with analyzing this traffic, your browser needs to translate the
website name into an IP address. The DNS protocol is used for that so use the
filter bar to only show those types of packets.

![](./dns_filter_http_forever.png "")

Once you've found the DNS request for `httpforever.com`, you'll want to find the
corresponding response packet. You can use the `src` and `dst` port to find it
manually. Wireshark has a really nice color coding feature to help you match up
conversations.

![](./colorize_conversation.png "")

![](./find_dns_response.png "")

### Follow the stream to see HTTP traffic

To see the actual content of your browsing session, filter for HTTP traffic.

![](./filter_http_traffic.png "")

Find one of the tcp packets associated with browsing to `httpforever.com` by
looking for the URL in the packet descriptions. Then right click on this packet
and choose `Follow > TCP Stream`.

![](./follow_as_tcp_stream.png "")

Note the HTTP headers, Request type, Response code and Content.

![](./follow_tcp_stream.png "")

### Walkthrough complete

Great work! You now know the basics of how to use Wireshark!

{{% /steps %}}
