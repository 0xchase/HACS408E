---
title: "HW 5: Android Application Reversing"
weight: 5
draft: false
---

## Description

In this homework you complete a capture the flag challenge by reverse
engineering an android app. The flag will be in the form of `cygym3{...}`. This
app has two screens which, one where the user can enter a pin code (see below)
and then a second screen displaying the flag once correct pin is entered. Since
we have not covered dynamic analysis of android apps, a screenshot of the phone
showing the flag has been encrypted with the pin. You will reverse engineer the
application to find the pin and submit a report detailing your process below.

![Phone screenshot with entry boxes for four numbers at the center of the screen](pin_entry_screen.png)

You can download the `.apk` here:

{{< downloadbutton file="CyberGym.apk" text="CyberGym.apk" >}}

There are a couple of ways to solve this homework. You will need to explain both
in your submitted report for full credit.

### Static Method

Since the value of the flag is static, you can tailor your analysis to figure
out where the flag is and read and displayed. Maybe it's hidden in the
resources, or maybe its constructed in the code? Once you find it, you can write
some Java code (or equivalent) to run the exact methods used to display the flag
and then print it to the terminal. For this section you must provide:

- An analysis of the code related to displaying the flag.
- A java (or equivalent) program used to generate the flag.

### "Dynamic" Method

The application expects you to enter a pin to unlock and view the flag. It does
this at runtime, so I've pulled some relevant artifacts and you should be able
to get the key that way. We haven't covered interacting with a phone
dynamically, but you won't need to with the information provided. It looks like
they were some encrypted databases but I "lost" the file with the names for each
of the databases. You'll have to guess which one corresponds to the ones
referenced in the code.

To complete this section, you must provide an analysis of the database related
code. Use the information you find to decrypt the database files (more info
below). Explain how the databases are related to the screen shown above and then
decrypt the screenshot below.

{{< downloadbutton file="file_1.db" text="Database 1" >}}

{{< downloadbutton file="file_2.db" text="Database 2" >}}

> [!IMPORTANT]
>
> You will need to use version 3 of `sqlcipher` to decrypt the databases. The
> default one installed from the `apt` package manager is too new. I have
> provided a copy of `sqlcipher v3` for linux in the following `.zip` file has
> been tested on the class vm. (Read the instructions for usage!)
>
> {{< downloadbutton file=sqlcipher.zip text=sqlcipher.zip >}}
>
> Helpful `sqlcipher` commands:
>
> - Decrypt database
>   [using a password](https://www.zetetic.net/sqlcipher/sqlcipher-api/#key):
>   ```sql
>   sqlite> PRAGMA key = "password";
>   ```
> - List tables:
>   ```sql
>   sqlite> .tables
>   ```
> - Get items in a table:
>   ```sql
>   sqlite> SELECT * FROM my_table_name;
>   ```

Once you've figured out the 4 digit pin decrypt the following flag screenshot
with:

```{filename=Shell}
gpg successful_pin_entry.png.gpg
```

<!-- deno-fmt-ignore-start -->
{{< downloadbutton file=successful_pin_entry.png.gpg text=successful_pin_entry.png.gpg >}}
<!-- deno-fmt-ignore-end -->

### A secret 3rd way?!

There's another way I can think of to get the flag, but this one will be a
secret! If you figure it out you can get one bonus point.

## Submission

### Rubric (`20 pts`)

| Item               | Points  | Description |
| :----------------- | :------ | :---------- |
| App Triage         | `4 pts` | See below   |
| Static Method      | `7 pts` | See below   |
| "Dynamic" Method   | `7 pts` | See below   |
| Successful Results | `2 pts` | See below   |

Choose one of the methods above (no need to do both) and submit a report with
relevant information to
[ELMS](https://umd.instructure.com/courses/1374508/assignments). For full credit
your report should have the following things:

#### App Triage (`4 pts`):

Analysis of the Manifest and the entrypoint(s) to the program.

#### Static Method (`7 pts`):

You must show your code analysis, explain how the flag is generated, and provide
any code you wrote to re-create the flag.

#### "Dynamic" Method (`7 pts`):

You must show your code analysis, explain how the pin is set, and walk through
how you decrypted the database(s) above.

#### Successful Results (`2 pts`):

One point for each solution.

- You must show that you can generate the flag from the static section analysis.
- You must show how you got the pin from

> [!NOTE]
>
> Report quality will be taken in to consideration as well. Please include
> screenshots of your work and make your explanations clear and concise.

{{< callout emoji="📝" >}}

Submit a write up with answers to questions and any code you wrote to
[ELMS](https://umd.instructure.com/courses/1390353/assignments).

{{< /callout >}}
