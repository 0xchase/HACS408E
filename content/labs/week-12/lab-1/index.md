---
title: "Lab 1: Premium SMS Fraud"
weight: 1
draft: false
---

## Overview

{{< callout emoji="💡" >}}

This lab guide is adapted from Maddie Stone's excellent
[Android App Reversing 101](https://www.ragingrock.com/AndroidAppRE/) workshop.

The goal of this lab is to introduce you to android applications and how to
reverse them. You'll be using some new tools but the techniques will be the same
thing you been doing all semester.

**Goals:**

- Conduct initial triage of Android applications
- Learn to use `jadx` for reverse engineering APKs
- Practice reversing Android Java code

**Estimated Time:** `45 Minutes`

{{< /callout >}}

## Context

You are a malware analyst for Android applications. You are concerned that this
sample maybe doing premium SMS fraud, meaning that it sends an SMS to a premium
phone number without disclosure & user consent.

Premium SMS Fraud is a form of mobile billing fraud where and app sends a
premium SMS message without user knowledge and consent. This SMS adds charges to
a users mobile bill.

## Instructions

{{% steps %}}

Download the target application:

{{< downloadbutton file=ThaiCamera.apk text=ThaiCamera.apk >}}

### Initial Triage

Android packages are also zip files so you can just run `unzip` to extract the
contents. Extract the contents to answer the following questions:

{{< question >}}

What type of file is the Manifest.xml file?

{{< /question >}}

At this stage you won't be able to read the file but you can still get
information from the file. Try using `xxd` or `strings -eb`.

Looking at the resources folder, use the following script to print the count of
each file extension.

```bash {filename=Bash}
for file in $(find -type f); do tmp=$(basename -- "$file"); extension="${tmp##*.}"; echo $extension; done | sort | uniq -c | sort -n -r
```

{{% details title="Multi-line Version" closed="true" %}}

```bash
for file in $(find -type f); do \
    tmp=$(basename -- "$file")
    extension="${tmp##*.}"
    echo $extension
done \
  | sort \
  | uniq -c \
  | sort -n -r
```

{{% /details %}}

{{< question >}}

What are the most common file extensions in the assets folder?

{{< /question >}}

### Use `apktool` to extract resources

`apktool`'s main use case is for doing minor edits and then repackaging your app
but you can also use it to reverse android applications.

```bash {filename=Bash}
apktool d -m --output apktool-out ./ThaiCamera.apk
```

{{< question >}}

Can you read the android manifest this time?

{{< /question >}}

{{< question >}}

What are the application entry points? List the activity/service names

{{< /question >}}

<!--
Find the smali file for the main entrypoint: `com.cp.camera.MyApplication`

5. **Give a brief (3 bullet points) description of what you see.**
   - Can you tell what methods get called?
   - Is it easy to read the `smali` assembly?
-->

### Use `jadx-gui` to get back to Java source code

The de-facto tool for reversing Android applications is the
[dex to java decompiler `jadx`](https://github.com/skylot/jadx). It is already
installed for you on the class Linux VM. You can run the gui version by typing
the `jadx-gui` in your terminal.

```sh {filename=Shell}
jadx-gui ./ThaiCamera.apk
```

Navigate to the directory where you downloaded the `.apk` file and open it up.

Click around to get oriented, try opening some java source files.

Once you feel comfortable with the interface, click `Navigation > Text Search`
to look for strings.

{{< question >}}

Search for `SMS`, what Java classes contain this string?

{{< /question >}}

### Research Android API functions

Android is open source, so you can find the documentation (and source code) for
any system/API functions on the developer website. Look up the
[documentation for `sendTextMessage`](https://developer.android.com/reference/android/telephony/SmsManager#sendTextMessage(java.lang.String,%20java.lang.String,%20java.lang.String,%20android.app.PendingIntent,%20android.app.PendingIntent))
which is the most common way to send a text message in android.

{{< question >}}

What are each of the parameters?

{{< /question >}}

{{< question >}}

What parameter corresponds to the text message destination?

{{< /question >}}

### Work backwards using cross references

Next can search for the function android `sendTextMessage` and find where it
gets called. We care about the text destination parameter so see where that
value comes from. It should be a parameter to the parent function.

To keep working backwards, right click on the parent function and click
`Find Usage` to see where it gets called. The `Go To Declaration` feature might
also be helpful to you. Go back as far as you can.

{{< question >}}

What method is responsible for dynamically generating the text destination?

- Give a brief description of how this works:
  - Does it reach out to a remote server? If so, explain how.
  - How does it parse the data it gets back?

{{< /question >}}

### Other components of SMS fraud

Finding suspicious text message traffic isn't the only thing you need to decide
if this app is doing SMS fraud. The main things you need to know are:

- Does the app send a text message?
- Does it send it to a premium number?
- Does it send the message without the users knowledge/consent?

The `onRequestPermissionsResult()` method is an important thing to notice in
this case. This function gets called immediately after `requestPermissions`
method finishes. This type of knowledge comes with android experience which you
probably don't have yet. So for now you'll just have to trust the lab guide.

To figure out if the app sends a text message find places in the `Loading` class
where the `requestPermissions` method is called using a string search.

{{< question >}}

What are the 3 functions where it is called?

{{< /question >}}

{{< question >}}

Which function requests a permission that is related to the SMS fraud we think
the app is doing?

{{< /question >}}

Is asking permission enough for a user to consent to send a premium text message
to a random number? Probably not, especially since this app is branded as some
kind of Camera app.

### 🎉 Way to go! You found some SMS fraud! 🎉

{{% /steps %}}

> [!TIP]
>
> Google is your friend! The android documentation is quite prolific!

## Solutions

{{% details title="Click to reveal.." closed="true" %}}

#### Android App RE Workshop

Please see the explanation on
[Maddie Stone's workshop page](https://www.ragingrock.com/AndroidAppRE/reversing_dex.html)
for full details.

<br>

{{% youtube XvocjlxuccI %}}

<br>

{{% youtube pvgLRWxsOd0 %}}

{{% /details %}}

## Submission

{{< callout emoji="📝" >}}

Submit a write-up file with any code you wrote and the answers to questions to
[ELMS](https://umd.instructure.com/courses/1390353/assignments).

{{< /callout >}}
