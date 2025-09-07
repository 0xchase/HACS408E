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

### Enable remote desktop settings.

### Open PowerShell or Cmd.exe from the start menu and run `ipconfig` to get your IP address.

```{filename=PowerShell}
> ifconfig
```

### In the [port forwarding](https://ams.aces.umd.edu/user/port_forwarding) page of the Aces Management System, set up a new port forwarder.

| Option              | Value                    |
| :------------------ | :----------------------- |
| Machine IP          | `<result_from_ipconfig>` |
| Machine Port        | `3389`                   |
| Machine Description | `Windows VM - RDP`       |

{{% /steps %}}
