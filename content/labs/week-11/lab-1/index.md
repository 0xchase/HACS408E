---
title: "Lab-1: Go Assembly Basics"
weight: 1
draft: false
---

## Overview

{{< callout emoji="💡" >}}

This lab is to get you practice interacting with Go binaries! Go is a modern
programming language performance and memory safety in mind. It compiles quickly
to machine code and has the convenience of garbage collection and powerful
runtime reflection. However because of this, it can be quite challenging to
reverse engineer.

In this lab you will build up your intuition for reversing Go programs by
analyzing some basic programs. You will apply concepts previously learned in
class to the assembly code for a go program and see how the code is different
from a C/C++ based program.

**Goals:**

- Write a simple Go program
- Practice Reversing Go programs
  - Understand the Go calling convention
  - Understand Go's internal assembly code translates to real x86_64 assembly
    instructions
- Practice using Binaryninja

**Estimated Time:** `60 Minutes`

{{< /callout >}}

## Instructions

{{% steps %}}

### Create an Example Program

Following the example in
[the tutorial](https://go.dev/doc/tutorial/getting-started), create a hello
directory and initialize it as a `go module`:

```sh
mkdir hello && cd hello/
go mod init hello
```

This will create a `go.mod` file in the `hello/` directory. Next write the hello
world program in the `main.go` file:

```go {filename="go.mod"}
module hello

go 1.22.2 // <--- This is important. Pin it to this version!
```

```go {filename="main.go"}
package main

import "fmt"

//go:noinline
//go:nosplit
sayHello() {
	fmt.Println("Hello, World!")
}

func main() {
    sayHello()
}
```

Build and run your program with to verify that it works.

```sh {filename=Bash}
go build
./hello
# Hello, World!
```

#### Initial Triage

Use the `file`, and `ldd` programs to analyze compiled go binary:

{{< question >}}

Is the program statically or dynamically linked?
<br></br> Is the program stripped?

{{< /question >}}

Search for the `Hello World!` string in your program using the `strings` utility
and `grep`:

```sh
strings hello | grep "Hello, World"
```

{{< question >}}

Please provide the string containing the bytes `Hello World!`. Is this string
the length you expected?

{{< /question >}}

#### Analyzing Go's Internal Assembly Language

You can look at the intermediate assembly of a go program using the
`objdump tool`. Specify a specific function with the `-s` flag.

> [!NOTE] A note from the&nbsp;[Go Assembly Docs](https://go.dev/doc/asm):
>
> "The most important thing to know about Go's assembler is that it is not a
> direct representation of the underlying machine. Some of the details map
> precisely to the machine, but some do not. This is because the compiler suite
> [...] needs no assembler pass in the usual pipeline. Instead, the compiler
> operates on a kind of semi-abstract instruction set...

```sh
go tool objdump -s sayHello hello

# Or with color:
go tool objdump -s sayHello hello \
    | bat -l asm --pager=none --color=always --tabs=8 \
	| less -SR
```

{{< question >}}

What is the full name of this function? <br></br> HINT: This is normally in the
form `module.funcname`.

{{< /question >}}

{{< question >}}

What function in the `fmt` package actually gets used to print the
`Hello World!` message?

{{< /question >}}

Use the `-S` flag to include the source lines and show which assembly
instructions correspond to each line.

```sh
go tool objdump -S -s sayHello hello
```

> [!NOTE] More words from the&nbsp;[Go Assembly Docs](https://go.dev/doc/asm):
>
> Symbols¶
>
> Some symbols, such as R1 or LR, are predefined and refer to registers. The
> exact set depends on the architecture.
>
> There are four predeclared symbols that refer to pseudo-registers. These are
> not real registers, but rather virtual registers maintained by the toolchain,
> such as a frame pointer. The set of pseudo-registers is the same for all
> architectures:
>
> - `FP`: Frame pointer - arguments and locals.
> - `PC`: Program counter - jumps and branches.
> - `SB`: Static base pointer - global symbols.
> - `SP`: Stack pointer - the highest address within the local stack frame.

{{< question >}}

Identify the function `prolog`/`epilog`. Does the assembly code save the base
pointer to the stack like a C/C++ compiled function?

{{< /question >}}

### Go Variables and Functions

Read the `amd64` section of the
[Go Internal ABI Docs](https://go.dev/src/cmd/compile/abi-internal#architecture-specifics)
how arguments and return values are passed to/from a function.

{{< question >}}

What registers are used on x86_64 (amd64) systems for passing arguments to a
function?

{{< /question >}}

Then create a go module for the next step

```sh
mkdir var_func && cd var_func/
go mod init var_func
```

```go {filename=main.go}
package main

import "fmt"

//go:noinline
//go:nosplit
func FuncAdd(x, y, z int) int { return x + y - z }

//go:noinline
//go:nosplit
func DoCallAdd() int { return FuncAdd(1, 2, 3) + 0x41 }

func main() {
	fmt.Println(DoCallAdd())
}
```

> [!NOTE] Source/Destination Operands in
> the&nbsp;[Go Assembly Docs](https://go.dev/doc/asm):
>
> One detail evident in the examples from the previous sections is that data in
> the instructions <u>**flows from left to right**</u>: `MOVQ $0, CX` clears
> `CX`. This rule applies even on architectures where the conventional notation
> uses the opposite direction.

Analyze the `DoCallAdd()` function first.

```sh
go build
go tool objdump -s DoCallAdd var_func
```

{{< question >}}

Where do the arguments get setup for the `FuncAdd` function? <br></br> What
register contains the return value after the function is complete?

{{< /question >}}

Confirm your answers by looking at the assembly for the `FuncAdd` function. Can
you see how the registers are used to calculate `(x+y) - z`?

### Analyzing Interface Types

Create a new module again:

```sh
mkdir interfaces && cd interfaces/
go mod init interfaces
```

Let's make a new go program to see why golang reversing can be difficult.

```sh {filename=Bash}
mkdir err_check and cd err_check/
go mod init err_check
```

Start by writing to following code to `main.go`:

```go {filename=main.go}
package main

import "fmt"

//go:noinline
//go:nosplit
func Simple1() int { return 0x41 }

//go:noinline
//go:nosplit
func Simple2() (int, error) { return 0x42, nil }

func main() {
	fmt.Print(Simple1())
	fmt.Print(Simple2())
}
```

Use the `go tool objdump` command to disassemble the two simple functions to see
how the interface type is returned.

```sh
go tool objdump -s Simple1 err_check
# ...
go tool objdump -s Simple2 err_check
```

{{< question >}}

What pseudo registers are used to return the `err` value? <br></br> Explain how
the compiler handles returning variables that are too big to fit in one
register.

{{< /question >}}

#### Functions that operate on interfaces rather than types

Change your `main.go` file to the following more complex interface example.

```go {filename=main.go}
package main

import "fmt"

type Speaker interface {
	Speak() string
}

type Dog struct {
	name string
}

// Define a `Speak()` function for the `Dog` type
func (d Dog) Speak() string {
	return "Woof!"
}

type Human struct {
	name string
}

// Define a `Speak()` function for the `Human` type
func (h Human) Speak() string {
	return fmt.Sprint("Hello my name is ", h.name, ".")
}

//go:noinline
func saySomething(thing Speaker) string {
	return thing.Speak()
}

func main() {
	var scooby = Dog{"Scooby-Doo"}
	var shaggy = Human{"Norville Rogers"}

	fmt.Println(saySomething(scooby))
	fmt.Println(saySomething(shaggy))
}
```

Compile this program with `go build` and analyze the `saySomethig()` function
like we've been doing previously.

> [!NOTE]
>
> From the [internal ABI docs]():
>
> "Any other interface type (besides the empty interface) is a sequence of:
>
> 1. A pointer to the runtime `itab` that gives the method pointers and the type
>    of the data field
> 2. An unsafe.Pointer data field
>
> An interface can be “direct” or “indirect” depending on the dynamic type: a
> direct interface stores the value directly in the data field, and an indirect
> interface stores a pointer to the value in the data field. An interface can
> only be direct if the value consists of a single pointer word."
>
> The Go `interface` type is defined in
> [`src/internal/abi/iface.go`](https://go.dev/src/internal/abi/iface.go):
>
> ```go
> type NonEmptyInterface struct {
>   ITab *ITab
>   Data unsafe.Pointer
> }
> ```
>
> It contains two pointers, so on an x86_64 based machine, it is 16 bytes long.
>
> The `ITab` struct is defined in the same file:
>
> ```go
> type ITab struct {
>    Inter *InterfaceType
>    Type  *Type
>    Hash  uint32
>    Fun   [1]uintptr // variable sized. fun[0]==0 means Type does not implement Inter.
> }
> ```
>
> The `Hash` field of the struct is only 4 bytes (32 bits), so there is four
> bytes of padding between it and the `Fun` field. This should be at offset
> `0x18` from the base of the struct.

{{< question >}}

Which register has the address of the `Speak()` function that is called during
the saySomething() function?

{{< /question >}}

Let's analyze how this gets passed in from the main function. For this we'll be
opening the program up in BinaryNinja.

First, find the place in the `main.main` function where the `interface` is being
setup and passed to the `saySomething()` function.

![](./itab_struct_passed_to_saySomething.png "")

Go to that area of global memory and redefine it as a `ITab` struct. (You will
need to manually crate the type in binaryninja).

![](./Dog_speaker_interface.png "")

![](./binga_create_type.png "")

{{< question >}}

Explain how the correct function pointer is called when the `Speaker` interface
type is passed to the `saySomething()` function.

{{< /question >}}

> [!NOTE] Further Reading:
>
> - https://dr-knz.net/go-calling-convention-x86-64-2020.html
> - https://eli.thegreenplace.net/2022/interface-method-calls-with-the-go-register-abi/
> - https://eli.thegreenplace.net/2021/go-internals-invariance-and-memory-layout-of-slices/
> - https://research.swtch.com/interfaces

{{% /steps %}}

## Solutions

{{% details title="Click to reveal.." closed="true" %}}

#### Hello Program

![](./hello_answers_1.png "")

![](./hello_answers.png "")

#### Var_Func Program

![](./var_func_answers.png "")

#### Interfaces Program

![](./saySomething_analysis.png "")

![](./binja_applied_vfuncs.png "")

![](./binja_interfaces_main.png "")

{{% /details %}}

## Submission

{{< callout emoji="📝" >}}

Submit a markdown file with any code you wrote and the answers to questions to
[ELMS](https://umd.instructure.com/courses/1390353/assignments).

{{< /callout >}}
