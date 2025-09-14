---
title: "Quiz 1"
weight: 1
draft: false
---

## Topics Covered

### Basic Systems Concepts

- Stack
  - Grows towards lower memory addresses.

- Heap
  - Grows towards higher memory addresses.

- [Virtual Memory](https://en.wikipedia.org/wiki/Virtual_memory)

### File Formats

- Magic Bytes
  - NOTE: you only need to understand the concept, not memorize the byte
    patterns for specific filetypes.

- Executable File structure - Linux (ELF) | Windows (PE)
  - Understand the different file extensions for shared libraries of each type:
    - Linux uses "Shared Object" (`.so`) files
    - Windows uses "Dynamic Link Library" (`.dll`) files
  - Memorize the uses of commonly seen sections (such as `.text`, `.data`,
    `.got`, etc.)
  - Understand the difference between `static` and `dynamic` executables
    - You should also know what shared objects or `.so` files are

### Intel `x86_64` and `IA_32` Assembly Code

- Know the uses of various registers
  | Register                    | Description                                                                                 |
  | :-------------------------- | :------------------------------------------------------------------------------------------ |
  | `RIP`, `EIP`                | Instruction Pointer - Used to keep track of the current instruction.                        |
  | `RBP`, `EBP`                | Base Pointer - Used to keep track of the base (highest address) of the current stack frame. |
  | `RSP`, `ESP`                | Stack Pointer - Used to keep track of the tip (lowest address) of the current stack frame   |
  | `RAX`, `RBX`, `ECX`, etc... | General purpose programming registers.                                                      |

- Different sizes of fundamental data types: `BYTE`, `WORD`, `DWORD`, `QWORD`
- Understand how to read assembly code

## Possible Questions

- Which statement is true regarding the growth direction of the stack and heap
  in most systems?
- Which of the following is stored in the heap?
- What statement accurately describes virtual memory in modern operating
  systems?
- What is the purpose of magic header bytes in a file format?
- What is the (`.text`|`.data`|`.got`|`.plt`|`.bss`) section used for in a Linux
  ELF file?
- What is the difference between a statically and dynamically linked program?
- What is the primary difference between PE and ELF files?
- Which of the following file extensions is used for shared libraries in
  (Linux|Windows)?
- What is the purpose of the (`EIP`|`EBP`|`ESP`|`EAX`) register?
- How many bits is a (`BYTE`|`WORD`|`DWORD`|`QWORD`)?
- Assume the value of `RDI` is the address of the following array:
  `[42, 1, 100]`. What is the value of `EAX` after this code finishes?
  ```NASM
  func:
          lea     rcx, [rdi+32]
          mov     eax, -1
  .L2:
          mov     edx, DWORD PTR [rdi]
          cmp     eax, edx
          cmovg   eax, edx
          add     rdi, 4
          cmp     rdi, rcx
          jne     .L2
          ret
  ```
- Assume the value in `EDI` is 3. What is the value of `EAX` after this code
  finishes?
  ```NASM
  func:
          push    rbp
          mov     rbp, rsp
          mov     DWORD PTR [rbp-4], edi
          mov     eax, DWORD PTR [rbp-4]
          imul    eax, eax
          pop     rbp
          ret
  ```
- Assume the value of `RDI` is 4. What is the value of `RAX` after this code
  finishes?
  ```NASM
  func:
          test    rdi, rdi
          je      .L2
          mov     eax, 0
  .L3:
          add     rdx, rax
          add     rax, 1
          cmp     rdi, rax
          jne     .L3
  .L2:
          mov     rax, rdx
          ret
  ```
