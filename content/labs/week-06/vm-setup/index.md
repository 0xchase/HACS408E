---
title: "Taking a VM Snapshot"
weight: 1
draft: false
---

## Overview

{{< callout emoji="💡" >}}

Being able to revert back to a clean state is extremely useful when analyzing
malware. This is one of the many reasons to always use a VM when reversing
malicious programs. In this walkthrough, you will learn how to create a VM
snapshot on the class lab infrastructure.

**Goals:**

- Learn to create and restore from a snapshot.
- Learn how to disable and re-enable a network interface in Windows.

**Estimated Time:** `15 Minutes`

{{< /callout >}}

## Taking a Snapshot

{{% steps %}}

### First navigate to your VM at [`https://labs.aces.umd.edu`](https://labs.aces.umd.edu)

### Open the VM settings

![](./snap_edit_vm_preferences.png "")

### Click on the "snapshots" tab

![](./snap_click_on_snapshots.png "")

### Choose a name for your snapshot

![](./snap_create_new_snapshot.png "")

![](./take_snapshot_popup.png "")

> [!TIP]
>
> It make take a minute for your snapshot to finish. Wait a beat, then refresh
> the page.

### You can use the "restore" button to revert your VM back to the original state

![](./restore_snapshot_button.png "")

{{% /steps %}}

## Disable Networking (Optional)

> [!NOTE]
>
> This method of disabling networking is not perfect because it is a setting
> that is changed on the VM's operating system. A sufficiently advanced malware
> could potentially just reconnect the adapter. However, that should not be an
> issue for this class.
>
> A better approach would be to disable the network interface from the
> hypervisor's settings. (A hypervisor, is the program that runs your VM).

{{% steps %}}

### Open the Ethernet settings on your Windows VM

![](./net_ethernet_settings.png "")

### Navigate to the "Network and Sharing Center" in Control Panel

![](./network_sharing_center.png "")

### Disable the interface to stop network connectivity

![](./net_disable_interface.png "")

> [!TIP] NOTE
>
> When you disable network connectivity, your VM background will change. The
> red-ish glowing outline will disappear.

### To reconnect, use the adapter settings on the left-hand side

![](./net_click_adapter_settings.png "")

### Right click on the interface to enable it

![](./net_enable_network_adapter.png "")

{{% /steps %}}

## Submission

{{< callout emoji="📝" >}}

No submission required.

{{< /callout >}}
