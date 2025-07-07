# Quiz 1: Study Guide

Here's your study guide for the first quiz, which covers the first three weeks
of content. The actual quiz questions will be a multiple-choice subset of the
ones below.

---

### **Basic Systems Concepts (Stack, Heap, Virtual Memory)**

1. **Which of the following is stored in the heap?**

   - A) Local variables defined within functions
   - B) Dynamically allocated memory using functions like `malloc` or `new`
   - C) Return addresses of function calls
   - D) CPU register values

2. **Which of the following best describes the stack in program execution?**

   - A) A dynamically resizing memory region used for heap allocations
   - B) A Last-In, First-Out (LIFO) data structure used for function calls and
     local variables
   - C) A memory region that allows random access to variables
   - D) The area where global and static variables are stored

3. **What is virtual memory in modern operating systems?**

   - A) An abstraction that allows a process to use more memory than physically
     available by using disk space
   - B) The total physical RAM installed in the system
   - C) A special type of memory used exclusively by virtual machines
   - D) Memory that is shared between different processes

4. **Where are function parameters typically stored during execution in the x86
   (32-bit) calling convention?**

   - A) In CPU registers
   - B) On the heap
   - C) On the stack
   - D) In the data segment

5. **Which statement is true regarding the growth direction of the stack and
   heap in most systems?**

   - A) The stack grows downward in memory addresses, while the heap grows
     upward
   - B) The heap grows downward, and the stack grows upward
   - C) Both stack and heap grow upward in memory addresses
   - D) Both stack and heap grow downward in memory addresses

---

### **File Formats (Magic Header Bytes, ELF, PE)**

6. **What is the purpose of magic header bytes in a file format?**

   - A) To compress the file data for storage efficiency
   - B) To identify the file type and format
   - C) To encrypt the file content for security
   - D) To indicate the size of the file

7. **In an ELF file, where is the entry point address of the program
   specified?**

   - A) In the section headers table
   - B) In the symbol table
   - C) In the program header table
   - D) In the `e_entry` field of the ELF header

8. **What is the role of the program header table in an ELF file?**

   - A) It stores information about the file's sections
   - B) It specifies how segments are to be loaded into memory at runtime
   - C) It provides debugging symbols for the executable
   - D) It contains the file's version and metadata

9. **Which of the following is NOT typically a part of the ELF file structure?**

   - A) ELF header
   - B) Program header table
   - C) Section header table
   - D) File metadata section for user comments

10. **What is the primary difference between PE and ELF files?**

    - A) PE is the standard executable format in Windows, whereas ELF is
      standard in Unix-like systems
    - B) PE files are used for dynamic libraries, ELF files are for static
      libraries
    - C) PE files are text files, ELF files are binary files
    - D) PE and ELF files are interchangeable across operating systems

---

### **Execution in Linux (Executables, Dynamic Libraries, Shared Objects, Relocatable Files)**

11. **In the context of executable file formats like ELF, what is the main
    difference between sections and segments?**

    - A) Sections are used during linking; segments are used during execution
    - B) Segments are used during linking; sections are used during execution
    - C) Sections contain runtime information; segments contain compile-time
      information
    - D) Sections and segments are the same and used interchangeably

12. **Which of the following file extensions is used for shared libraries in
    Linux?**

    - A) `.dll`
    - B) `.so`
    - C) `.exe`
    - D) `.lib`

13. **What is the purpose of a relocatable object file (`.o` file) in the
    compilation process?**

    - A) It can be executed directly by the operating system
    - B) It can be dynamically loaded during program execution
    - C) It must be linked with other object files to create an executable or
      library
    - D) It contains only debugging information

14. **Which of the following statements is true about shared object files (`.so`
    files) in Linux?**

    - A) They are loaded only at compile time
    - B) They are dynamically linked during program execution (runtime)
    - C) They are part of the executable's ELF header
    - D) They are static libraries that are fully included in the executable at
      link time

15. **Which statement is true about relocatable object files?**

    - A) They are used as input to the linker to produce an executable or a
      library
    - B) They can be directly executed by the operating system
    - C) They contain code that is already linked and loaded
    - D) They are only used for debugging purposes

---

### **x86 and x86_64 Assembly**

16. **In CPU architectures like x86, what is the purpose of the stack pointer
    register?**

    - A) It points to the next instruction to be executed
    - B) It holds the base address of the data segment
    - C) It points to the top of the stack, indicating where the next push or
      pop operation will occur
    - D) It stores the address of the current function's stack frame

17. **What is a key difference between the x86 (32-bit) and x86_64 (64-bit)
    calling conventions on Linux systems?**

    - A) x86 passes function arguments in registers, while x86_64 passes them on
      the stack
    - B) x86_64 passes the first several function arguments in registers,
      whereas x86 passes them on the stack
    - C) Both x86 and x86_64 use the same calling convention, passing all
      arguments on the stack
    - D) x86_64 does not support function calls

18. **In x86 architecture, when a function is called, where is the return
    address stored, and how is the return value typically passed back to the
    caller?**

    - A) The return address is stored in the EIP/RIP register; the return value
      is passed on the stack.
    - B) The return address is stored on the stack; the return value is returned
      in the EAX/RAX register.
    - C) The return address is stored in the EBP/RBP register; the return value
      is passed in the EDX/RDX register.
    - D) The return address is stored in a special return address register; the
      return value is stored on the heap.

19. **In x86 assembly, given the instruction `MOV EAX, [EBX + 8]`, if the value
    of `EBX` is `0x2000`, what memory address is being accessed?**

    - A) `0x2000`
    - B) `0x2008`
    - C) `0x2004`
    - D) `0x1FF8`

20. **Consider the following x86 assembly code snippet:**

```assembly
MOV ECX, 4
MOV EAX, 0
LOOP_START:
ADD EAX, 5
LOOP LOOP_START
```

**After this code executes, what is the value of `EAX`?**

- A) 5
- B) 10
- C) 15
- D) 20
