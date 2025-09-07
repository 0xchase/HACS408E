---
title: Platform Analysis
layout: title-with-image
description: Identifying magic bytes, parsing file headers, extracting files from binary.
buttonText: Start Week 2
imageText: Week 2
slides:
  - Review
  - Platforms
  - Linux
  - Reverse Engineering
  - File Identification
  - Lab 1
  - File Extraction
  - Lab 2
  - Homework
---

```
7a85 dabd 8b48 892c a7c3 4cb4 e24c 3b40
8e66 2eb8 7ac1 a36d 95dc b150 8b84 3d02
782e 32bf d9d7 f400 f1ad 7fac b258 6fc6
e966 c004 d7d1 d16b 024f 5805 ff7c b47c 
7a85 dabd 8b48 892c a7ad 7fac b258 6fc6 
7a85 dabd 8b48 892c a7ad 7fac b258 6fc6
e966 c004 d7d1 d16b 024f 5805 ff7c b47c
371b f798 90fb 1861 2d53 e282 bb5e 8cd0
7aea 31e9 9659 d7d9 f6ad 7fac b258 6fc6 
```

---
currentNav: "Review"
---

# Review

Some text goes here.

<CourseTimeline currentWeek="2" />

<WeekComparison 
  lastWeekSummary="File triage and extraction techniques, including magic bytes identification and file carving."
  lastWeekHomework="Lab exercises on file identification and extraction"
  thisWeekSummary="Platform analysis, reverse engineering fundamentals, and file identification methods."
  thisWeekHomework="Lab exercises on file identification and carving"
/>

---
currentNav: "Platforms"
---

# Platforms

Sentence about what a platform is here.

Put a row of pictures of different IOT devices.

<v-clicks depth="2">

- Hardware
  - Is this a router?
  - What board is it running?
- Operating System
  - Is it Windows, Linux, MacOS, etc?
  - What version is it?
  - Has it been modified?
- Services and Applications
  - What version is it?
  - What language is it written in?
  - What are its dependencies?
  - What server is hosting it?

</v-clicks>

---
currentNav: "Platforms"
---

# Operating System Architecture

Most operating systems follow this general architecture.

<div class="architecture-container">
  <ArchitectureLayerLabel label="User Applications" labelWidth="150px">
    <ArchitectureGrid>
      <ArchitectureArrow>
        <ArchitectureItem text="Application 1" color="#3b82f6" />
      </ArchitectureArrow>
      <ArchitectureArrow>
        <ArchitectureItem text="Application 2" color="#3b82f6" />
      </ArchitectureArrow>
      <ArchitectureArrow>
        <ArchitectureItem text="Application 3" color="#3b82f6" />
      </ArchitectureArrow>
      <ArchitectureItem text="..." color="" />
      <ArchitectureArrow>
        <ArchitectureItem text="Application N" color="#3b82f6" />
      </ArchitectureArrow>
    </ArchitectureGrid>
  </ArchitectureLayerLabel>

  <ArchitectureBoundary userLabel="User Space" kernelLabel="Kernel Space" />

  <ArchitectureLayerLabel label="System Call Interface" labelWidth="150px">
    <ArchitectureLayer></ArchitectureLayer>
  </ArchitectureLayerLabel>

  <ArchitectureLayerLabel label="Kernel" labelWidth="150px">
    <ArchitectureLayer>
      <ArchitectureGrid>
        <ArchitectureItem text="Process Mgmt" color="#059669" />
        <ArchitectureItem text="Memory Mgmt" color="#059669" />
        <ArchitectureItem text="File System" color="#059669" />
        <ArchitectureItem text="Network Stack" color="#059669" />
        <ArchitectureItem text="Audio" color="#059669" />
        <ArchitectureItem text="Device Mgmt" color="#059669" />
      </ArchitectureGrid>
    </ArchitectureLayer>
  </ArchitectureLayerLabel>

  <ArchitectureLayerLabel label="Device Drivers" labelWidth="150px">
    <ArchitectureLayer>
      <ArchitectureGrid>
        <ArchitectureItem text="Block Drivers" color="#dc2626" />
        <ArchitectureItem text="Network Drivers" color="#dc2626" />
        <ArchitectureItem text="FS Drivers" color="#dc2626" />
        <ArchitectureItem text="Char Drivers" color="#dc2626" />
      </ArchitectureGrid>
    </ArchitectureLayer>
  </ArchitectureLayerLabel>

  <ArchitectureLayerLabel label="Hardware" labelWidth="150px">
    <ArchitectureLayer>
      <ArchitectureGrid>
        <ArchitectureItem text="CPU" color="#6b7280" />
        <ArchitectureItem text="Memory" color="#6b7280" />
        <ArchitectureItem text="Storage" color="#6b7280" />
        <ArchitectureItem text="Network" color="#6b7280" />
        <ArchitectureItem text="Audio" color="#6b7280" />
      </ArchitectureGrid>
    </ArchitectureLayer>
  </ArchitectureLayerLabel>
</div>

<style>
.architecture-container {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  max-width: 1000px;
  margin: 0 auto;
  padding: 0.5rem;
}
</style>


---
currentNav: "Platforms"
---

# Test Your Comprehension

Should have a custom Q/A component.

<v-clicks depth="2">

- What's the interface between user and kernel mode?
- Some other question?
- Some other question?
- Some other question?

</v-clicks>

---
currentNav: "Linux"
---

# We'll Cover

Should have a custom Q/A component.

- Applications and kernel
- File system (interesting directories)
- Security relevant (passwords, users, ssh keys, etc)

---
currentNav: "Reverse Engineering"
layout: image-right
image: /images/marcus-wired.png
---

# In The News: Malware Analysis

In May of 2017, the WannaCry ransomware had infected an estimated 300,000 computers worldwide, encrypting user files and demanding a ransom payment.

British researcher Marcus Hutchins:

- Reverse engineered the worm's artifacts
- Spotted a hard-coded domain that functioned as a kill switch when registered
- Registered the domain, halting the spread
- Arrested for writing malware in his free time

---
currentNav: "Reverse Engineering"
layout: image-right-2
image1: /images/playstation.png
image2: /images/hotz.png
---

# In The News: Interoperability

Console developer go to great lengths to prevent users from running custom software, primarily to prevent piracy.

In December of 2009, George Hotz:

- Began a multi-year project to exploit the Playstation 3
- Found exploits that granted him hypervisor-level code execution
- Published the exploits and a private key
- Sony applied for a temporary restraining order

---
currentNav: "Reverse Engineering"
layout: image-right-2
image1: /images/nso.png
image2: /images/exploit.png
---

# In The News: Exploitation

Google's Project Zero has some of the best public writeups on exploitation in the wild. One example is their writeup on ForcedEntry, a zero-click iPhone exploit that triggers an integer overflow in Apple's Core Graphics library. The exploit is part of the Pegasus spyware developed by the NSO Group, an Israeli security firm.

Reverse engineering was used by multiple parties:

- NSO Group reversed iPhone internals to find the exploit
- Security researchers reversed the exploit to patch the vulnerability

Exploit development continues to be a high demand skill. By the end of this class you'll be able to understand how these chains work.

---
currentNav: "Reverse Engineering"
---

# Ethics

- Do not attempt to use what you learn in this class to commit illegal acts.
- The techniques taught in this course can be used for multiple purposes
- Use them in a way that complies with U.S. law and university policy

---
currentNav: "Reverse Engineering"
---

# Topics for this course

We don't have time to cover every aspect of software reverse engineering. These will be our focus.

- Identify and characterize arbitrary files
- Analyze source code and compiled binaries
- Some coverage of Linux and Windows internals
- Network protocols
- Malware Analysis
- Vulnerability Analysis and Exploitation
- Modern Applications and Languages

---
currentNav: "Reverse Engineering"
---

# Jobs that use Reverse Engineering

Since this is an *applied* course, we're focused on skills that are immediately applicable in the workforce. Quiz questions will be inspired by questions I've gotten in interviews.

- Security Researcher
- Malware Analyst
- Forensic Analyst
- Incident Response
- Vulnerability Analyst
- Security Operations Center Analyst
- Computer Network Operations Developer
- **Software Engineer**
- ...

---
layout: section
title: "Lab Setup"
currentNav: "Lab Setup"
---

---
currentNav: "File Identification"
---

# File Identification

**Scenario**: You're given a file of an unknown type. How can you identify it to begin your analysis?

<v-clicks depth="2">

- Double click it and see what happens
  - Might not work for all files
  - Could be malicious
- Look for the extension extension (`.exe`, `.pdf`, `.`)
  - Might not have one
  - Malware authors might alter it to make a malicious file appear legitimate
- Thankfully, most file types have a publically documented "magic bytes" 
  - These are a signature (usually 4-8 bytes) that identify different file types
  - At the beginning of the file

</v-clicks>

---
currentNav: "File Identification"
---

## Identifying Magic Bytes

You can dump the hex of a file using the `xxd` utility.

```
chase@Chases-MacBook-Pro ~ % xxd /bin/ls | head
00000000: cafe babe 0000 0002 0100 0007 0000 0003  ................
00000010: 0000 4000 0000 bbf0 0000 000e 0100 000c  ..@.............
00000020: 8000 0002 0001 0000 0001 5c00 0000 000e  ..........\.....
00000030: 0000 0000 0000 0000 0000 0000 0000 0000  ................
00000040: 0000 0000 0000 0000 0000 0000 0000 0000  ................
00000050: 0000 0000 0000 0000 0000 0000 0000 0000  ................
00000060: 0000 0000 0000 0000 0000 0000 0000 0000  ................
00000070: 0000 0000 0000 0000 0000 0000 0000 0000  ................
00000080: 0000 0000 0000 0000 0000 0000 0000 0000  ................
00000090: 0000 0000 0000 0000 0000 0000 0000 0000  ................
```

**Note**: Magic bytes aren't infallible. `0xcafebabe` is used to identify both Mach-O binaries and Java classes.

```
chase@Chases-MacBook-Pro ~ % file /bin/ls
/bin/ls: Mach-O universal binary with 2 architectures
```

---
currentNav: "Lab 1"
---

## Lab 1

File identification.

[https://hacs408e.umd.edu/schedule/week-01/lab-1/](https://hacs408e.umd.edu/schedule/week-01/lab-1/)

<CountdownTimer :destHour="18" :destMinute="15" />

---
currentNav: "File Extraction"
---

## File Carving

Sometimes a single binary blob will have multiple files embedded in it. We can use `dd` to carve those files from the blob.

`dd if=example.bin of=output.bin skip=SKIP_BYTES bs=1 count=SIZE`

```c [example.bin] {all|6|11|6-10|11|16|11-15|16|22|16-21|22|all}{maxHeight: '330px',lines: true}
00000000: AA BB CC DD EE FF 00 11 22 33 44 55 66 77 88 99  ........"3DUfw..
00000010: 00 11 22 33 44 55 66 77 88 99 AA BB CC DD EE FF  .."3DUfw........
00000020: 07 07 07 09 09 08 0A 0C 14 0D 0C 0B 0B 0C 19 12  ................
00001000: 07 07 07 09 09 08 0A 0C 14 0D 0C 0B 0B 0C 19 12  ................
00001010: FF EE DD CC BB AA 99 88 77 66 55 44 33 22 11 00  ........wfUD3"..
00001020: 89 50 4E 47 0D 0A 1A 0A 00 00 00 0D 49 48 44 52  .PNG......IHDR
00002000: 00 00 02 80 00 00 01 E0 08 06 00 00 00 75 71 3C  ..............uq<
00002010: 07 07 07 09 09 08 0A 0C 14 0D 0C 0B 0B 0C 19 12  ................
00002020: 07 07 07 09 09 08 0A 0C 14 0D 0C 0B 0B 0C 19 12  ................
00003000: 4C 00 00 00 04 67 41 4D 41 00 00 B1 8F 0B FC 61  L....gAMA......a
00003010: FF D8 FF E0 00 10 4A 46 49 46 00 01 02 01 00 60  ......JFIF.....`
00003020: 00 60 00 00 FF DB 00 43 00 08 06 06 07 06 05 08  .`.....C........
00004000: 07 07 07 09 09 08 0A 0C 14 0D 0C 0B 0B 0C 19 12  ................
00004010: 07 07 07 09 09 08 0A 0C 14 0D 0C 0B 0B 0C 19 12  ................
00004020: 07 07 07 09 09 08 0A 0C 14 0D 0C 0B 0B 0C 19 12  ................
00005000: 50 4B 03 04 14 00 06 00 08 00 00 00 21 00 B3 AC  PK..........!...
00005010: 8D 4E 00 00 00 00 00 00 00 00 00 00 08 00 1C 00  .N..............
00005020: 07 07 07 09 09 08 0A 0C 14 0D 0C 0B 0B 0C 19 12  ................
00006000: 07 07 07 09 09 08 0A 0C 14 0D 0C 0B 0B 0C 19 12  ................
00006010: 74 65 73 74 2E 74 78 74 55 54 09 00 03 E8 3D 75  test.txtUT....=u
00006020: 07 07 07 09 09 08 0A 0C 14 0D 0C 0B 0B 0C 19 12  ................
00007000: 7F 45 4C 46 02 01 01 00 00 00 00 00 00 00 00 00  .ELF............
00007010: 02 00 3E 00 01 00 00 00 78 00 40 00 00 00 00 00  ..>.....x.@.....
00007020: 40 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00  @...............
00008000: 07 07 07 09 09 08 0A 0C 14 0D 0C 0B 0B 0C 19 12  ................
00008010: 07 07 07 09 09 08 0A 0C 14 0D 0C 0B 0B 0C 19 12  ................
00008020: 07 07 07 09 09 08 0A 0C 14 0D 0C 0B 0B 0C 19 12  ................
```

---
currentNav: "Lab 2"
---

## Lab 2

[https://hacs408e.umd.edu/schedule/week-01/lab-2/](https://hacs408e.umd.edu/schedule/week-01/lab-2/)

<CountdownTimer :destHour="19" :destMinute="40" />

---
currentNav: "Homework"
---

# Homework

First homework is due next week.