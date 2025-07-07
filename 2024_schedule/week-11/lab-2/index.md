---
title: "Lab 2: Command Execution Vulnerability"
weight: 2
---

<!--
This lab guide is taken from Maddie Stone's excellent
[Android App Reversing 101](https://www.ragingrock.com/AndroidAppRE/)
workshop.
-->

## Overview

{{< callout emoji="💡" >}}

In this lab, you will be using your reverse engineering expertise to try and
find an arbitrary command injection in an android application. However, this
sample will be a little more complex.

**Goals:**

- Find a vulnerability in and Android app
- Practice using jadx to reverse Java code
- Become more familliar with how Android apps work

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

Open the application in `jadx` and review the manifest.

1. **What are the entrypoint (activities and services) names?**

   - In this case we care about which ones are
     [`exported`](https://developer.android.com/privacy-and-security/risks/android-exported)
     so indicate which one(s) are.
   - If an entrypoint defines an `intent-filter`, with an `action` then this
     class is also automatically defined as exported. Indicate any classes that
     define `intent-filter`'s as well.

{{< callout type=info >}}

[What are `Intent`s](https://developer.android.com/guide/components/intents-filters)?

{{< /callout >}}

### Review how to run linux commands from Java code

The goal is to find out if there is a way to get this app to execute arbitrary
linux commands on a phone.

3. **Use google to find out what methods are used to execute commands?**

### Look for vulnerable code

Start by searching for uses of `getRuntime()`

4. **Explain what command gets executed.**

5. **Is the command executed using dynamic data that could be attacker
   controlled?**

Next, look for instances of the `ProcessBuilder` class.

{{< callout type=warning >}}

**Important:** You may need to set
`File > Preferences > Decompilation > Show Inconsistent Code` to on in the
`jadx` preferences menu.

{{< /callout >}}

Don't forget to check
[the documentation for ProcessBuilder](https://developer.android.com/reference/java/lang/ProcessBuilder#ProcessBuilder(java.util.List%3Cjava.lang.String%3E))
to see what parameters specify the command to run.

### First `ProcessBuilder` Instance

Pick the first occurrence of `ProcessBuilder` and trace the arguments back until
you get to a `parcel.readString()` method.

6. **What class and method is this in?**

Consider this done for now and we'll go over it a little in the walkthrough.

### Second `ProcessBuilder` Instance

Pick the next occurenc of ProcessBuilder and trace the arguments back as far as
you can.

7. **What intent action triggers the code path to get to the ProcessBuilder
   call?**

8. **Where does the string list come from?**

### 🎉 You've found a vulnerability in an Android app! 🎉

{{% /steps %}}

## Tips

- Read the documentation.
- This lab and the previous one are taken directly from Maddie Stone's excellent
  [Android App Reversing 101](https://www.ragingrock.com/AndroidAppRE/)
  workshop.
  - On the linked page, she had video walk throughs of the lab exercises.

## Submission

{{< callout emoji="📝" >}}

Submit a markdown file with the answers to questions to
[ELMS](https://umd.instructure.com/courses/1374508/assignments).

{{< /callout >}}
