---
title: "Windows VM: Setting Up RDP"
---

> [!WARNING]
>
> If you are opening up the `rdp` port, then it is recommended that you change
> the password of the `ACES` user to something other than the default!
>
> 1. Open the settings application.
> 1. Go to Accounts settings.
> 1. Under `Sign-In Options`, change the password.

{{% steps %}}

### In the windows VM, open settings. Click `System > Remote Desktop`.

Alternatively, you can get to it by searching for "Remote Desktop" in the search
bar.

### Enable remote desktop settings.

![](./enable_remote_desktop.png "")

![](./enable_remote_desktop_2.png "")

### Open PowerShell or Cmd.exe from the start menu and run `ipconfig` to get your IP address.

```{filename=PowerShell}
> ipconfig
```

![](./get_windows_ip_address.png "")

### In the [port forwarding](https://ams.aces.umd.edu/user/port_forwarding) page of the Aces Management System, set up a new port forwarder.

<div style='margin-top: 1.5rem; display: flex; justify-content: center; align-content: center;'>

| Option              | Value                    |
| :------------------ | :----------------------- |
| Machine IP          | `<result_from_ipconfig>` |
| Machine Port        | `3389`                   |
| Machine Description | `Windows VM - RDP`       |

</div>

![](./set_up_port_forwarder.png "")

Once you've created the forwarder, a new row will appear in the table:

![](./get_new_forwarded_port.png "")

### Install and/or run an RDP client based on your operating system.

First you'll need to install one if you don't already have it.

#### Windows Client

An RDP client comes built-in on a default Windows installation:

<img src="./run_rdp_start_menu.png" style="width: 700px" />

#### MacOS Client

For MacOS I recommend using the
[Windows App](https://apps.apple.com/us/app/windows-app/id1295203466).

<img src="./macos_windows_rdp_app.png" style="width: 700px" />

#### Linux Client

For the Linux folks, I recommend [remmina](https://remmina.org/).

<img src="./remmina_logo.png" style="width: 700px" />

### Finally, connect to the class VM using the ACES port forwarder you set up earlier.

![](./make_rdp_connection.png "")

{{% /steps %}}
