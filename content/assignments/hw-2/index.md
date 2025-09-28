---
title: "Homework 2: Binary Bomb"
weight: 2
draft: false
---

## Description

For this assignment you will be completing each stage of the challenge binary
provided. There are 10 stages with different challenges of varying degrees of
difficulty. Each stage is worth 2 points and you must include a write up
describing how you solved each challenge. It doesn't need to be very lengthy,
but you MUST INCLUDE an analysis of the assembly instructions that were critical
to solving the challenge. You will not receive full points if you only include
the solution. You will also not receive full points if you only show the
binaryninja decompiler. It is a great tool to help with your analysis but
inspection of the assembly code is required for full points.

{{< downloadbutton file="bomb.bin" text="Binary Bomb" >}}

### Homework Update (27 Sep 2025)

After talking with some students about the some of the challenges, we realized
there was a bug in the way we built the program. When the original binary is
analyzed by `binaryninja`, one of the functions gets combined into the previous
one. This can be very difficult to find unless you know what you're looking for.
This does make it unnecessarily difficult to solve one of the challenges, so
there's two options to fix it.

1. Download the updated version of the bomb:

   {{< downloadbutton file="bomb_2.bin" text="Binary Bomb (Updated)" >}}

1. Manually create the function yourself:
   - First you need to find where it looks like two functions are smashed
     together. The `endbr64` instruction is commonly seen at the beginning of
     functions [for security reasons](https://stackoverflow.com/a/69226244), so
     this is a good indicator that part of the static analysis failed.
     ![](./homework_2_combined_funcs.png "")
   - You can click on the `endbr64` instruction and press the `P` keyboard
     shortcut, or right click and select
     `Make Function At This Address > Default` to create a new function.
     ![](./binja_create_new_func.png "")
   - Afterward, you should see two separate function blocks.
     ![](./binja_split_functions.png)

## Rubric (`20 pts`)

| Item     | Points  |
| :------- | :------ |
| Stage 1  | `2 pts` |
| Stage 2  | `2 pts` |
| Stage 3  | `2 pts` |
| Stage 4  | `2 pts` |
| Stage 5  | `2 pts` |
| Stage 6  | `2 pts` |
| Stage 7  | `2 pts` |
| Stage 8  | `2 pts` |
| Stage 9  | `2 pts` |
| Stage 10 | `2 pts` |

## Submission

{{< callout emoji="📝" >}}

Submit a write up with answers to questions and any code you wrote to
[ELMS](https://umd.instructure.com/courses/1390353/assignments).

{{< /callout >}}
