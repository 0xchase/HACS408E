---
title: "Lab 2: Analyzing System Interactions"
weight: 3
draft: false
---

## Overview

{{< callout emoji="💡" >}}

Dynamic analysis is the act of learning about code by interacting with it while
it runs. We've seen an example of this by using GDB and strace on Linux to step
through a program and see how it interacts with the operating system. In this
lab you will use standard tools to monitor system events on Windows in order to
dynamically analyze a malicious binary.

**Goals:**

- Learn how to set up and use `fakenet-ng` to imitate network connectivity.
- Practice using `procmon` to monitor a program for system events.
- Learn to use `regshot` to watch for changes to the Windows Registry.

**Estimated Time:** `45 Minutes`

{{< /callout >}}

## Instructions

{{% steps %}}

### Start `fakenet`

First run the `fakenet` program found in the `Tools` folder on your Desktop.

![](./fakenet_run.png "")

![](./fakenet_startup.png "")

{{< question >}}

After you've started `fakenet` browse to a fake domain like
`http://evil-domain.com` in a browser. <br></br> What happens? What does this
tell you about what `fakenet` does?

{{< /question >}}

### Start `procmon` and pause capture

Start by running the `procmon` program, found in the `Utilities` section of the
`Tools` folder.

![](./fakenet_run_procmon.png "")

When you open it, you should start seeing events immediately. Pause the capture
so we can filter events to the specific program we care about.

![](./fakenet_pause_procmon_recording.png "")

### Setup `wannacry` filter

![](./fakenet_open_filter_options.png "")

![](./fakenet_add_process_filter.png "")

![](./fakenet_wannacry_filter.png "")

### Detonate the malware

At this point you should be ready to start a capture and run the malware to see
what it does.

![](./fakenet_restart_capture.png "")

![](./fakenet_detonate_malware.png "")

After the malware runs, make sure to stop the `procmon` capture to preserve
system resources.

![](./fakenet_stop_capture_wannacry.png "")

{{< question >}}

Does it seem like anything happened when the malware ran? Most malware does not
want you to know it's running.

{{< /question >}}

### Use the quick filter buttons

Procmon has some buttons in the top ribbon that you can use to quickly filter
for specific types of events:

- Windows Registry
- Filesystem
- Networking
- Performance Events

Toggle the buttons on/off to see how this hides certain events from the trace.
Filter out everything but the network events.

![](./fakenet_network_events.png "")

{{< question >}}

Does the malware make any network connections? <br></br> What IP address and
port does it reach out to?

{{< /question >}}

### Review the `fakenet` PCAP in Wireshark

To stop fakenet, click on the terminal window where it is running and press
`Ctrl+C`. It will take a second to shut everything down.

Then, open the PCAP located in the `fakenet` directory in `C:\Tools\`.

![](./fakenet_pcap_file.png "")

{{< question >}}

Find the packets associated with the connections you saw in `procmon` and
include a screenshot.

{{< /question >}}

### Capture events without `fakenet`

The next step is to see what happens when you run the malware without faking the
network events.

Create a text file on the Desktop to use as a test to see if the malware
encrypts it. You can use whatever method you want but here is an example in
Windows PowerShell:

```PowerShell {filename="PowerShell"}
echo "Hello, world!" | Out-File ~/Desktop/test.txt
```

Then clear all the events in `procmon` and detonate the malware again.

![](./fakenet_restart_capture.png "")

![](./wannacry_no_fakenet.png "")

{{< question >}}

Can you see events that show how the malware behavior changed from the original
run? <br></br> What files or folders does this malware access?

{{< /question >}}

### Analyze the Windows Registry

For this part you might not get good results unless you restore your vm to a
clean snapshot before monitoring for registry changes. Rather than take valuable
class time to do that, you can put that you don't see anything interesting in
the question below.

Follow the screenshots to use `regshot` to compare the Windows registry at two
points in time.

![](./regshot_tools_dir.png "")

![](./regshot_first_snap.png "")

![](./fakenet_detonate_malware.png "")

![](./regshot_second_snap.png "")

> [!NOTE]
> Sorry about the size for the above image. Forgot to zoom in when taking it.

![](./regshot_compare.png "")

![](./regshot_output.png "")

{{< question >}}

What key(s) changed after running the malware?

{{< /question >}}

{{% /steps %}}

## Solutions

{{% details title="Click to reveal..." closed="true" %}}

#### Fakenet Chrome Test

![](./fakenet_chrome_test.png "")

#### PCAP Results

![](./fakenet_pcap_results.png "")

#### Malware results without `fakenet`

![](./wannacry_no_fakenet_results.png "")

![](./wannacry_confirm_encrypted.png "")

![](./wannacry_jpeg_real_bytes.png "")

### Registry Results

![](./regshot_results.png "")

{{% /details %}}

## Submission

{{< callout emoji="📝" >}}

Submit a markdown file with any code you wrote and the answers to questions to
[ELMS](https://umd.instructure.com/courses/1390353/assignments).

{{< /callout >}}
