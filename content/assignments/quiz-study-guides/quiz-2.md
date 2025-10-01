---
title: "Quiz 2"
weight: 2
draft: false
---

## Topics Covered

### Wireshark

Understand the basic syntax of Wireshark filters.

### The OSI Model

Understand what each layer is responsible for:

- https://www.cloudflare.com/learning/ddos/glossary/open-systems-interconnection-model-osi/

### TCP + UDP

Understand the differences between each protocol.

- Structure of packets
- Pros and Cons of each
- Know the three-way handshake for TCP connections

### Specific Protocols

- Be able to match application level protocols to their port numbers and whether
  they use TCP or UDP.
- Understand what various 'Utility' protocols are used for.
  - Address Resolution Protocol
    - Maps a device's logical IP address to its physical MAC (Media Access
      Control) address.
  - Internet Control Message Protocol
    - Sends error and control messages between hosts and routers.
  - Dynamic Host Configuration Protocol
    - Automates the assignment of IP addresses and other network configuration
      information to devices on a network.
  - Domain Name Service
    - Translates human-readable domain names (`example.com`) into
      machine-readable IP addresses (`192.168.0.1`).

## Example Questions

- In Wireshark capture filters, which syntax correctly captures all traffic only
  to the IP address 192.168.0.1?
- Which Wireshark filter would you use to display only incoming HTTP requests?

- Which OSI layer is responsible for:
  - converting data into electrical signals or bits for transmission?
  - data segmentation and reassembly?
  - error detection and correction?

- What is the primary purpose of Transport Layer protocols?
- Which protocol operates at the Transport Layer of the OSI model?

- Which of the following best describes the purpose of Network Layer protocols?

- Which of the following statements is true about Application Layer protocols?
- Which of the following is an Application Layer protocol?

- Which of the following represents a valid TCP segment structure?
- In which scenario is TCP preferred over UDP?
- Which of the following statements is true about UDP?
- Which of the following features is supported by TCP but not by UDP?
- Which of the following best describes the three-way handshake used in TCP
  connections?

- What is the primary purpose of `ARP|DNS|DHCP|ICMP` (`<Full Protocol Name>`)?

Please match the protocols with their associated port numbers:

| Protocol | Port       | Notes                                          |
| :------- | :--------- | :--------------------------------------------- |
| QUIC     | `udp:443`  | Same as HTTPS but with `udp` instead of `tcp`. |
| SSH      | `tcp:22`   |                                                |
| DNS      | `udp:53`   |                                                |
| RDP      | `udp:3389` |                                                |
| FTP      | `tcp:20`   |                                                |
| HTTP     | `tcp:80`   |                                                |
| HTTPS    | `tcp:443`  |                                                |
