---
title: "Linux VM: Setting Up SSH"
---

> [!WARNING]
>
> If you are opening up the `ssh` port, then it is recommended that you change
> the password of the `student` user to something other than the default!
>
> ```sh {filename=Bash}
> # To change the current user's password run:
> student@hacs408e-vm ~> passwd
> ```

{{% steps %}}

### Get the IP address of your Linux VM.

```{filename=Bash}
student@hacs408e-vm ~> ip -c a
```

### Navigate to `ams.aces.umd.edu` from a browser to set up [port forwarding](https://ams.aces.umd.edu/user/port_forwarding).

> [!NOTE]
> You will need to be on UMD's Wi-Fi or connected to their VPN to access the
> site.

TODO: Better description.

### Next, on your local machine, add the following to your `ssh config`:

```yaml {filename="$HOME/.ssh/config/"}
# This is the connection info for your AMS aces vm:
Host aces-vm
  HostName vm.aces.umd.edu
  User <USER>
  Port <PORT>
  ForwardX11 yes

# Fill in the ip address you got earlier here:
Host hacs408e-vm
  HostName <hacs408e-vm IP ADDR>
  User student
  ProxyJump aces-vm
  ForwardX11 yes
```

> [!NOTE]
> You must fill in everything in `<...>` in the above config file!

### Try connecting to your VM:

```{filename=Bash}
ssh hacs408e-vm
```

> [!TIP]
> Check out the `ssh-copy-id`
> [man page](https://man7.org/linux/man-pages/man1/ssh-copy-id.1.html) if you
> want to be able to automatically sign in as the student user.

{{% /steps %}}

### Viewing GUI Programs over SSH

You will need an X11 server running on your host machine to view GUI programs
over ssh. Here are the recommended programs for each OS.

|      OS | Program                                                                                                                      |
| ------: | :--------------------------------------------------------------------------------------------------------------------------- |
| Windows | Free Option: [MobaXTerm](https://mobaxterm.mobatek.net/)                                                                     |
|   MacOS | Free Option: [XQuartz](https://www.xquartz.org/)                                                                             |
|   Linux | If you set up your `ssh` config as above, you should be good to go! Otherwise, make sure to add `-X` when you ssh to the VM. |
