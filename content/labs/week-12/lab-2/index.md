---
title: "Lab 2: Command Execution Vulnerability"
weight: 2
draft: false
---

## Overview

{{< callout emoji="💡" >}}

This lab guide is adapted from Maddie Stone's excellent
[Android App Reversing 101](https://www.ragingrock.com/AndroidAppRE/) workshop.

In this lab, you will be using your reverse engineering expertise to try and
find an arbitrary command injection in an android application. However, this
sample will be a little more complex.

**Goals:**

- Find a vulnerability in and Android app
- Practice using `jadx` to reverse Java code
- Become more familiar with how Android apps work

**Estimated Time:** `45 Minutes`

{{< /callout >}}

## Exercise Context

You are auditing a set of phones for security issues prior to allowing them onto
your enterprise network. You are going through the apps that come pre-installed.
For this pre-installed application, you are concerned that there may be a
vulnerability that allows it to run arbitrary commands.

## Instructions

{{% steps %}}

Download the target application:

{{< downloadbutton file=FotaProvider.apk text=FotaProvider.apk >}}

### Standard Application Triage

Open the application in `jadx` and review the manifest for possible entrypoints.
In this case we care about which ones are <u>**exported**</u> since those can be
accessed from other apps.

- Review the Android documentation for `exported` entrypoints:<br>
  https://developer.android.com/privacy-and-security/risks/android-exported

> [!NOTE]
>
> If an entrypoint defines an `intent-filter`, with an `action` then this class
> is also automatically defined as <u>**exported**</u>. Indicate any classes
> that define `intent-filter`'s as well.
>
> [What are `Intent`s](https://developer.android.com/guide/components/intents-filters)?

{{< question >}}

What are the exported entrypoint (activity/service) names?

{{< /question >}}

### Review how to run Linux commands from Java code

The goal is to find out if there is a way to get this app to execute arbitrary
Linux commands on a phone.

{{< question >}}

Use google to find out what methods are used to execute commands?

{{< /question >}}

### Look for vulnerable code

Start by searching for uses of `getRuntime()`

{{< question >}}

Explain what command gets executed.

{{< /question >}}

{{< question >}}

Is the command executed using dynamic data that could be attacker controlled?

{{< /question >}}

Next, look for instances of the `ProcessBuilder` class.

> [!IMPORTANT]
>
> You may need to set
> `File > Preferences > Decompilation > Show Inconsistent Code` to on in the
> `jadx` preferences menu.

Don't forget to check
[the documentation for `ProcessBuilder`](https://developer.android.com/reference/java/lang/ProcessBuilder#ProcessBuilder(java.util.List%3Cjava.lang.String%3E))
to see what parameters specify the command to run.

### First `ProcessBuilder` Instance

Pick the first occurrence of `ProcessBuilder` and trace the arguments back until
you get to a `parcel.readString()` method.

{{< question >}}

What class and method is this in?

{{< /question >}}

<!-- Consider this done for now and we'll go over it a little in the walkthrough. -->

### Second `ProcessBuilder` Instance

Pick the next occurrence of `ProcessBuilder` and trace the arguments back as far
as you can.

{{< question >}}

What intent action triggers the code path to get to the `ProcessBuilder` call?

{{< /question >}}

{{< question >}}

Where does the string list come from?

{{< /question >}}

### 🎉 You've found a vulnerability in an Android app! 🎉

{{% /steps %}}

## Tips

- Google is still your friend. As always, you should read the documentation (not
  just ask an LLM about it).

## Solutions

{{% details title="Click to reveal.." closed="true" %}}

#### Android App RE Workshop

Please see the explanation on
[Maddie Stone's workshop page](https://www.ragingrock.com/AndroidAppRE/reversing_dex.html)
for full details.

<br>

{{% youtube WvJ8bDUCf4Y %}}

{{% /details %}}

## Submission

{{< callout emoji="📝" >}}

Submit a write-up file with any code you wrote and the answers to questions to
[ELMS](https://umd.instructure.com/courses/1390353/assignments).

{{< /callout >}}
