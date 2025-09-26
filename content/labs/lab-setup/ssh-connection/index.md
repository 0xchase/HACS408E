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

## Port Forwarding (Recommended)

{{% steps %}}

### Get the IP address of your class Linux VM at [`https://lab.aces.umd.edu`](https://lab.aces.umd.edu)

You will first need to get the IP address of your Linux VM. Log in through the
web user interface and start up the virtual machine if it isn't already running.
Then, run the following in a terminal:

```{filename=Shell}
student@hacs408e-vm ~> ip -c a
```

### Set up a new port forwarding rule at [`https://ams.aces.umd.edu`](https://ams.aces.umd.edu/user/port_forwarding)

> [!NOTE]
> You will need to be on UMD's Wi-Fi or
> [connected to their VPN](https://itsupport.umd.edu/itsupport?id=kb_article_view&sysparm_article=KB0016076)
> to access the site.

For the three fields to fill in use:

<div style='margin-top: 1.5rem; display: flex; justify-content: center; align-content: center;'>

| Field                | Description                                                             |
| :------------------- | :---------------------------------------------------------------------- |
| `Machine IP`         | Use the `ip address` of your Linux VM                                   |
| `Machine Port`       | Use port `22` which is the default port that the ssh server listens on. |
| `Machine Description | Doesn't matter what you put here, but it must be something.             |

</div>

Once you add a new port forwarder, you should see something like this:

![](./port_forward_ssh.png "Table showing a new rule setting up a redacted port number that connects to port 22 of a machine at a redacted ip address.")

This shows a blurred out port indicated by the red box. You can now use this
port to ssh to your Linux VM.

### Connect to the class VM from using an SSH client.

Using `ssh` from a terminal on your local machine, run the following command to
connect to the class Linux VM. Don't forget to replace `PORT_NUM` with the
actual forwarded port specified on the site.

```sh {filename=Shell}
ssh student@jump.aces.umd.edu -p PORT_NUM
```

{{% /steps %}}

> [!TIP]
> Check out the `ssh-copy-id`
> [man page](https://man7.org/linux/man-pages/man1/ssh-copy-id.1.html) if you
> want to be able to automatically sign in as the student user without entering
> your password.
>
> You will need to run `ssh-copy-id` for each ssh connection:
>
> ```shell
> # Enter UMD password to copy private key to Aces class VM
> ssh-copy-id -p $PORT lmains@vm.aces.umd.edu
>
> # Enter `student` password to copy private key to HACS408E VM
> ssh-copy-id -J lmains@vm.aces.umd.edu:$PORT student@hacs408e-vm
> ```

### Viewing GUI Programs over SSH

You will need an X11 server running on your host machine to view GUI programs
over ssh. Here are the recommended programs for each OS.

|      OS | Program                                                                                                                      |
| ------: | :--------------------------------------------------------------------------------------------------------------------------- |
| Windows | Free Option: [MobaXTerm](https://mobaxterm.mobatek.net/)                                                                     |
|   MacOS | Free Option: [XQuartz](https://www.xquartz.org/)                                                                             |
|   Linux | If you set up your `ssh` config as above, you should be good to go! Otherwise, make sure to add `-X` when you ssh to the VM. |
