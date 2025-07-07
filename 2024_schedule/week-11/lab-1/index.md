---
title: "Lab 1: Premium SMS Fraud"
weight: 1
---

<!--
This lab guide is taken from Maddie Stone's excellent
[Android App Reversing 101](https://www.ragingrock.com/AndroidAppRE/)
workshop.
-->

## Overview

{{< callout emoji="💡" >}}

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

### Install Dependencies

Install `apktool` and `jadx`.

```sh {filename=Bash}
sudo apt install jadx apktool
```

### Naive Analysis

Android packages are also zip files so you can just run `unzip` to extract the
contents. Extract the contents to answer the following questions:

1. **What type of file is the Manifest.xml file?**

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

2. **What are the most common file extensions in the assets folder?**

### Using `apktool` to extract resources

`apktool`'s main use case is for doing minor edits and then repackaging your app
but you can also use it to reverse android applications.

```bash {filename=Bash}
apktool d -m --output apktool-out <apk-file>
```

3. **Can you read the android manifest this time?**

4. **What are the application entry points?**
   - **List the activity/service names**

Find the smali file for the main entrypoint: `com.cp.camera.MyApplication`

5. **Give a breif (3 bullet points) description of what you see.**
   - Can you tell what methods get called?
   - Is it easy to read the `smali` assembly?

### Using `jadx` to get back to Java source code

The de-facto tool for reversing Android applications is the
[dex to java decompiler `jadx`](https://github.com/skylot/jadx). Once you've
installed it you can run the gui version by typing the `jadx-gui` in your
terminal. Navigate to teh directory where you downloaded the `.apk` file and
open it up.

Click around to get oriented, try opening some java source files.

Once you're ready click `Navigation > Text Search` to look for strings.

6. **Search for `SMS`, what Java classes contain this string?**

### Researching Android API functions

Android is open source, so you can find the documentation (and source code) for
any system/API functions on the developer website. Look up the
[documentation for `sendTextMessage`](https://developer.android.com/reference/android/telephony/SmsManager#sendTextMessage(java.lang.String,%20java.lang.String,%20java.lang.String,%20android.app.PendingIntent,%20android.app.PendingIntent))
which is the most common way to send a text message in android.

7. **What are each of the parameters?**

8. **What parameter corresponds to the text message destination?**

### Work backwards using cross references

Next can search for the function android `sendTextMessage` and find where it
gets called. We care about the text destination parameter so see where that
value comes from. It should be a parameter to the parent function.

To keep working backwards, right click on the parent function and click
`Find Usage` to see where it gets called. The `Go To Declaration` feature might
also be helpful to you. Go back as far as you can.

9. **What method is responsible for dynamically generating the the text
   destination?**
   - Give a breif description of how this works:
     - Does it reach out to a remote computer? How?
     - How does it parse the data it gets back?

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

10. **What are the 3 functions where it is called?**

11. **Which function requests a permission that is related to the SMS fraud we
    think the app is doing?**

Is asking permission enough for a user to consent to send a premium text message
to a random number? Probably not, especially since this app is branded as some
kind of Camera app.

### 🎉 Way to go! You found some SMS fraud! 🎉

{{% /steps %}}

## Tips

- Ask for help if you get stuck.
- Google is your friend! The android documentation is prolific!

## Submission

{{< callout emoji="📝" >}}

Submit a markdown file with the answers to questions to
[ELMS](https://umd.instructure.com/courses/1374508/assignments).

{{< /callout >}}
