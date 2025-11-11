---
type: reveal
sidebar:
  exclude: true
---

## Set a Goal

<table>
<tr><th>  <u>Malware Analysis</u></th><td> Is this program malicious?            </td></tr>
<tr><th>   <u>Vulnerabilities</u></th><td> Is there a bug in this program?       </td></tr>
<tr><th> <u>General Knowledge</u></th><td> How does this program or service work?</td></tr>
</table>

---

## Focus on the Hypothesis

- Try to answer one specific question at a time.
  - Does this program listen on a specific port?
  - How does this program parse the config file?
  - Does this <u>memcpy()</u> cause a buffer overflow?
  - What persistece mechanism does this malware use?

---

## Where to Start

1. Get Context (Triage)
   - Where did it come from + Open source research
   - File type / Operating System
   - Strings (Especially debug messages!)

---

## Strategies

- Depth First Search
  - Start from <u>main</u> and work through the function call graph.
- Breadth First Search
  - Start by understanding the leaf functions and working your way up.
- Both are good!

---

### Motivating Research

<figure>

![{RE-Mind}: A First Look Inside the Mind of a Reverse Engineer,](RE_Mind_Paper.png)

<figcaption style="font-size: 1.5rem">Mantovani, Alessandro, Simone Aonzo, Yanick Fratantonio, and Davide Balzarotti.

[Paper from Usenix Security 2022](https://www.usenix.org/conference/usenixsecurity22/presentation/mantovani)

</figcaption>
</figure>

---

### Novice

<figure>

![ALT Text](novice.png)

<figcaption style="font-size: 1.5rem">A novice user exploring and revisiting many basic blocks.</figcaption>
</figure>

---

### Expert 1

<figure>

![ALT Text](expert_1.png)

<figcaption style="font-size: 1.5rem">An expert starting from main and exploring the control flow.</figcaption>
</figure>

---

### Expert 2

<figure>

![ALT Text](expert_2.png)

<figcaption style="font-size: 1.5rem">An expert starting from the target function and working backwards.</figcaption>
</figure>

---

## Golang

---

## Golang Runtime Overview

<!-- .element class="r-fit-text" -->

<iframe width="560" height="315" src="https://www.youtube.com/embed/YpRNFNFaLGY?si=6deEO7pzoKcoK0jA" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

Jesus Espino |
[Understanding the Go Runtime](https://golab.io/talks/understanding-the-go-runtime#slides)
|
<a href="https://www.datocms-assets.com/95170/1712916017-espino_2023.pdf" target="_blank">Slides</a>

<!-- .element class="r-fit-text" -->

---

## Golang Strings

- Strings are not stored the same way as C.

- [CUJO Blog Post](https://cujo.com/blog/reverse-engineering-go-binaries-with-ghidra/)

---

### Ghidra Support

- See the
  [Ghidra Change Log](https://htmlpreview.github.io/?https://github.com/NationalSecurityAgency/ghidra/blob/Ghidra_11.2.1_build/Ghidra/Configurations/Public_Release/src/global/docs/ChangeHistory.html)
