---
title: "Lab-1: Go Reversing Example"
weight: 1
---

## Overview

{{< callout emoji="💡" >}}

This lab is to get you practice interacting with Go binaries! Go is a modern
programming language performance and memory safety in mind. It compiles quickly
to machine code and has the convience of gargabe collection and powerful runtime
reflection. However because of this, it can be quite challengeing to reverse
engineer.

**Goals:**

- Write a simple Go program
- Practice Reversing Go programs
- Practice using Ghidra

**Estimated Time:** `60 Minutes`

{{< /callout >}}

## Part 1

{{% steps %}}

### Download and Install Go (Version `1.20.0`)

Follow the instructions to install Go:
[https://go.dev/doc/install](https://go.dev/doc/install) but instead of using
the latest version please download version `1.20.0` from their 'All Releases'
page: [https://go.dev/dl](https://go.dev/dl).

> I like to install the go binaries to `~/.local/go`. If you choose
> `/usr/local/go` like the instructions you may need `sudo` privledges.

### Create an Example Program

Following the example in
[the tutorial](https://go.dev/doc/tutorial/getting-started), create a hello
directory and initialize it as a `go module`:

```sh
mkdir hello && cd hello/
go mod init example/hello
```

This will create a `go.mod` file in the `hello/` directory. Next write the hello
world program in the `main.go` file:

```go {filename="hello/go.mod"}
module example/hello

go 1.20.0 // <--- This is important. Pin it to this version!
```

```go {filename="hello/main.go"}
package main

import "fmt"

func main() {
    fmt.Println("Hello, World!")
}
```

Build and run your program with to verify that it works.

```sh {filename=Bash}
go build
./hello
# Hello, World!
```

Run `file` and `strings` on the binary:

1. **Is the program stripped? Does it contain debugging symbols?**
2. **Is the `Hello World!` string in your program in the `strings` output?**
   - Please provide the string containing the bytes `Hello World!`

For more information see the
[rest of the getting started](https://go.dev/doc/tutorial/getting-started)
tutorial in the go documentation.

### Open your hello world program in Ghidra

Import the binary into Ghidra and run the auto analysis on it. Navigate to
`main.main`

3. **What function in the `fmt` package actually gets used to print the
   `Hello World!` message?**
4. **What address is the hello world string at?**

{{% /steps %}}

Break for now. We'll go over part 1 before moving on.

## Part 2

{{% steps %}}

### Getting a little more complex

Lets make a new go program to see why golang reversing can be difficult.

```sh {filename=Bash}
mkdir error-check and cd error-check/
go mod init
```

```go {filename=main.go}
package main

import "fmt"
import "os"

func main() {
	// Use var keyword to initialize a variable or
	// use the `:=` symbol but not both:
	// WRONG: var foo := "foo"

	file, err := os.Open(os.Args[1])
	if err != nil {
		fmt.Fprintf(os.Stderr, "%v", err)
		return
	}

	var data = make([]byte, 4096)
	count, err := file.Read(data)
	if err != nil {
		fmt.Fprintf(os.Stderr, "%v", err)
	}

	fmt.Println("Read", count, "bytes...")

	file.Close()
}
```

Compile this program with `go build` and open the resulting binary in Ghidra.
There's a lot more going on in the ghidra decompiler window this time and its
pretty difficult to tell whats going on. Focus on finding each of the calls with
error handling: `os.Open` and `file.Read`.

5. **Which register is the `data` returned in?**
6. **Which register is the `err` returned in?**

We will also walk through some `gdb` debugging as well so
[this cheatsheet](https://sourceware.org/gdb/download/onlinedocs/refcard.pdf)
might be helpful.

{{% /steps %}}

## Tips

- Trying to work through the forward engineering process can help you understand
  how to reverse something
- Try to separate the runtime code from the actual functionality
- Focus on answering one thing at a time

## Submission

{{< callout emoji="📝" >}}

Submit a markdown file with any code you wrote and the answers to questions to
[ELMS](https://umd.instructure.com/courses/1374508/assignments).

{{< /callout >}}
