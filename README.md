# HACS408E: Reverse Engineering

**Couse Description**: _This course introduces students to the tools and
techniques required to analyze the security properties of various systems.
Topics covered include assembly language, executable file formats, operating
system internals, and the static/dynamic analysis of compiled binaries. Students
will apply these concepts to real-world scenarios like malware analysis and
vulnerability analysis with interactive labs, at-home assignments, and a final
project._

## Topics

|        Date | Week |          Section          | Lectures | Labs | Homework |
| ----------: | ---: | :-----------------------: | :------: | :--: | :------: |
| 28 Aug 2024 |    1 |      C and Assembly       |   [ ]    | [ ]  |   [ ]    |
| 04 Sep 2024 |    2 |      Static Analysis      |   [ ]    | [ ]  |   [ ]    |
| 11 Sep 2024 |    3 |     Dynamic Analysis      |   [ ]    | [ ]  |   [ ]    |
| 18 Sep 2024 |    4 |          Ghidra           |   [ ]    | [ ]  |   [ ]    |
| 25 Sep 2024 |    5 |  Vulnerability Analysis   |   [ ]    | [ ]  |   [ ]    |
| 02 Oct 2024 |    6 |  Networking + Protocols   |   [ ]    | [ ]  |   [ ]    |
| 09 Oct 2024 |    7 |          Malware          |   [ ]    | [ ]  |   [ ]    |
| 16 Oct 2024 |    8 |       Cryptanalysis       |   [ ]    | [ ]  |   [ ]    |
| 23 Oct 2024 |    9 |         Rootkits          |   [ ]    | [ ]  |   [ ]    |
| 30 Oct 2024 |   10 |         Firmware          |   [ ]    | [ ]  |   [ ]    |
| 06 Nov 2024 |   11 |         Hardware          |   [ ]    | [ ]  |   [ ]    |
| 13 Nov 2024 |   12 |      Bonus: Android       |   [ ]    | [ ]  |   [ ]    |
| 20 Nov 2024 |   13 | Final Project Work Period |   [ ]    | [ ]  |   [ ]    |
| 27 Nov 2024 |   14 |    --- Fall Break ---     |    -     |  -   |    -     |
| 04 Dec 2024 |   15 | Final Project Work Period |    -     |  -   |    -     |
| 11 Dec 2024 |   16 |      --- Finals ---       |    -     |  -   |    -     |

## Miscellaneous Ideas

- Reverse the [Feisti and TDL3](https://github.com/bootkitsbook/rootkits)
  rootkits from _Rootkits and Bootkits_ book
- Utilize Pwn Island 3? Potentially some performance issues.
- Malware from Practical Malware Analysis or Mastering Malware Analysis
- Trigger malware kill switch by registering domain
- Fuzzing
- Implementing common reverse engineering tools
- Symbolic execution
- Non-compiled code
- Android Apk Analysis, Jadx
- Frida Dynamic Analysis Framework
- Intel Pin / Dynamorio DBI
- Fuzzing + AFL

## Policies

### Each Week

- Distribute slides
- Distribute lecture notes
- Distribute in-class lab, lab guides, and lab solutions
- Distribute list of 20 questions, quiz will be 5 of them
- Assign a short-ish homework lab

## Lab + Homework Ideas:

- Environment setup
- C review (read encrypted file, xor decrypt flag)
- Incremental assembly assignments
- Give them 4-5 binaries to triage strings, readelf
- Intro RE lab 1
- Intro RE lab 2
- Homework: CTF-style RE lab
- GDB walkthrough + GDB binary bomb
- GDB + UMD binary bomb
- Binaryninja debugger + binary bomb
- Homework: Finish the binary bomb
- Get familiar with the interface, basic RE lab
- struct identification and reversing
- C++ lab (vtables, etc)
- basic strcpy buffer overflow, overwrite var on the stack
- same lab except overwrite return address jmp shellcode
- DEP and ASLR bypass
- Homework: Exploit with DEP and ASLR bypass
- Wireshark basics on pcap
- Capture and RE a client/server key exchange
- Implement masquerade client with session key
- Homework: Give them C&C malware pcap
- Intro - What is a rootkit?
- Write script that generates valid licenses to a checker
- Toy heartbleed protocol
- Homework: Reverse engineer weak key, brute force
- Intro - What is firmware? Embedded Systems...
- `binwalk`, filesystems
- QEMU + `chroot` Jail
- Intro - Fundamentals
- JTAG + Read Flash Chips
