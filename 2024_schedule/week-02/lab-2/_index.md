---
title: "Lab 2: Analyzing Executables"
weight: 2
prev: /schedule/week-02/lab-1/
next: /schedule/week-02/hw/
---

{{< callout emoji="💡" >}}

**Explaination:**

Use `nm`, `objdump`, `readelf` to analyze the `file` and `libmagic.so.1`.

<u>Goals:</u>

- Become familliar with ELF structure
- Practice looking at (and understanding) x86 assembly code

{{< /callout >}}

## Instructions

{{% steps %}}

### Get Files

{{< downloadbutton file="file" text="Executable" >}}

{{< downloadbutton file="libmagic.so.1" text="Library" >}}

### `readelf`

Use `readelf` to look at the headers of each ELF:

```sh
$ man readelf
$ readelf -aW ./file > readelf_file.txt
$ readelf -aW ./libmagic.so.1 > readelf_libmagic.txt
$ diff --color=always readelf_file.txt readelf_libmagic.txt | less -SR
```

1. Choose 2 sections not covered in class, and describe what they are used for.
1. Are there any sections in one but not the other?

<!-- 1. What is the difference between a `section` and a `segment` in the ELF format specification? -->

### `nm`

Use `nm` to look at the symbol lists of each file:

```sh
$ man nm
```

1. Do you see any patterns in the output?

   - Are symbols named the same?
   - Are common symbols in the same section? If so which section? (Hint:
     `man nm`)

1. Do you see any similarities between the symbols?

### `objdump`

Use `objdump` to disassemble a few functions from `libmagic.so.1`:

```sh
$ man objdump
$ objdump --visualize-jumps=color  -M intel --disassemble=<func_name> | less --SR
```

- Choose some of the `magic_*` functions in the shared object to analyze.
  - Are there any loops?
  - What sub-functions get called?
  - Can you find any instances of the `magic_*` function getting called?

{{% /steps %}}

## Tips

- When looking at a function with objdump, don't worry if its too big. Just try
  another one.
- Use common linux utilities like `grep`, `sort`, `uniq`, `less` to search
  through large ammounts of text..

## Submission

{{< callout type="info" >}}

Submit a markdown file with a write up and answers to questions to
[ELMS](https://umd.instructure.com/courses/1374508/assignments).

{{< /callout >}}
