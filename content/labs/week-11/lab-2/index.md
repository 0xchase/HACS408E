---
title: "Lab-2: Reversing a Real Go Program"
weight: 1
draft: false
---

## Overview

{{< callout emoji="💡" >}}

In this lab you are given a precompiled go binary, and tasked with reversing it.
There is no right or wrong approach and the questions below are more like
suggestions to help you get started. The goal is to get more practice using
binaryninja and reinforce the concepts learned in the previous lab.

**Goals:**

- Practice Reversing Go programs
- Practice using Binary Ninja
- Practice interacting with programs dynamically with a debugger
- Practice researching topics online to improve reversing results

**Estimated Time:** `60 Minutes`

{{< /callout >}}

## Instructions

{{% steps %}}

### Reversing + Golang Tips

These slides are a little outdated, but we'll go over a couple things in it
before starting on the lab.

- <a href="/supplemental/reversing_tips/" target="_blank">Lecture on RE + Golang
  Tips (2024)</a>

### Download the Mystery Program

{{< downloadbutton file=go-sample.bin text=go-sample.bin >}}

### Static Analysis

For this one you're on your own. The goal is to gain a high-level understanding
of what the program is doing. Use a combination of dynamic and static analysis
to try and figure out what the program does.

Here are some helper questions to focus your reversing:

#### Looking at Libraries & Packages

Here are some examples of package URLs that you might see in strings somewhere:

`pkg.go.dev/golang.org/x/crypto/acme/autocert` `codeberg.org/anaseto/goal`
`github.com/cyucelen/marker`

Research any libraries you find and explain what they are used for.

{{< question >}}

What libraries/packages does this program import?

{{< /question >}}

#### Analyzing Strings and Functions

Look at the [documentation for the `flag` package](https://pkg.go.dev/flag) to
understand what the function arguments correspond to. You can also break up the
strings so that binaryninja only shows the correct value passed to the function,
rather than the giant blob of text.

{{< question >}}

What are the `flag.(*FlagSet).String()` functions used for at the beginning of
`main.main`?

{{< /question >}}

> [!TIP]
>
> Remember, calling convention for Go functions is different from the standard
> Linux C ABI, so the High Level IL representation will show the function
> arguments as out of order. You should **use the disassembly view** to analyze
> function arguments.
>
> If you use the Personal version of Binary Ninja with the class provided
> license, you can install
> [a plugin](https://github.com/PistonMiner/binaryninja-go-callconv) to add the
> go calling convention option for functions.

#### Review the Handler Functions

Try to work through each of the `Handle` functions one at a time and see if you
can understand what it is doing. Note the types that the functions are
associated with, and the strings that are used.

{{< question >}}

Explain at a high level what each of the `main.<...>Handler` functions do.
(NOTE: Focus on the main ones, not the `.func1()`, `.func2()` ones).

{{< /question >}}

There also seems to be some networking going on:

{{< question >}}

What does the `net/http.(*ServeMux).Handle()` function do? Does the program open
a socket for listening, or does it make a connection to a remote server?

{{< /question >}}

### Dynamic Analysis

You also want to use your static analysis results to inform how to run the
program. What command line flags does it take? The `--help` flag is always a
good thing to try for a command line program. Seeing how the program runs, and
any error/debug messages you find will also tell you where to focus your static
analysis efforts.

Another thing you can do is run the program with a debugger. Now, `gdb`
[does support](https://go.dev/doc/gdb) debugging go programs, but the
recommended debugger to use is Delve:

- https://github.com/go-delve/delve

Delve natively understands Go types, and can help you analyze type values at
runtime. It also supports `goroutine` introspection, which we haven't really
talked about but it's important to know they exist.

{{< question >}}

Try using the delve debugger to break on one of the functions you analyzed
statically and inspect the arguments to that function.

{{< /question >}}

{{% /steps %}}

## Solutions

{{% details title="Click to reveal.." closed="true" %}}

```go {filename=go.mod}
module example.com/go-sample

go 1.23.0

require go.uber.org/zap v1.27.0

require go.uber.org/multierr v1.10.0 // indirect
```

```go {filename=main.go}
package main

import (
	"encoding/base64"
	"encoding/csv"
	"encoding/json"
	"flag"
	"fmt"
	"io"
	"net/http"
	"os"
	"sort"

	"go.uber.org/zap"
)

// User structure to hold user data
type User struct {
	Name   string  `json:"name"`
	Age    int     `json:"age"`
	Height float64 `json:"height"`
}

// Global variable to hold a list of users
var users []User

// Declare a global logger variable
var logger *zap.Logger

// handler function to serve the content at the root URL
func handler(w http.ResponseWriter, r *http.Request) {
	// Log at info level
	logger.Info("Received request", zap.String("method", r.Method), zap.String("path", r.URL.Path))

	// Set the content type to HTML
	w.Header().Set("Content-Type", "text/html")
	// Respond with a simple HTML message
	fmt.Fprintf(w, "<h1>Hello, welcome to my Go HTTP server!</h1>")
}

// base64EncodeHandler function to handle POST requests for encoding data
func base64EncodeHandler(w http.ResponseWriter, r *http.Request) {
	// Ensure the request method is POST
	if r.Method != http.MethodPost {
		logger.Warn("Invalid request method", zap.String("method", r.Method), zap.String("expected_method", http.MethodPost))
		http.Error(w, "Invalid request method. Please use POST.", http.StatusMethodNotAllowed)
		return
	}

	// Read the body of the request
	body, err := io.ReadAll(r.Body)
	if err != nil {
		logger.Error("Failed to read request body", zap.Error(err))
		http.Error(w, "Failed to read request body", http.StatusInternalServerError)
		return
	}
	defer r.Body.Close()

	// Base64 encode the data
	encoded := base64.StdEncoding.EncodeToString(body)

	// Respond with the base64 encoded string
	w.Header().Set("Content-Type", "text/plain")
	fmt.Fprintf(w, "Base64 Encoded Data:\n%s", encoded)
}

// addUserHandler handles the POST request to add a new user
func addUserHandler(w http.ResponseWriter, r *http.Request) {
	// Ensure the request method is POST
	if r.Method != http.MethodPost {
		logger.Warn("Invalid request method", zap.String("method", r.Method), zap.String("expected_method", http.MethodPost))
		http.Error(w, "Invalid request method. Please use POST.", http.StatusMethodNotAllowed)
		return
	}

	// Parse the JSON body of the request
	var user User
	err := json.NewDecoder(r.Body).Decode(&user)
	if err != nil {
		logger.Error("Invalid JSON format", zap.Error(err))
		http.Error(w, "Invalid JSON format", http.StatusBadRequest)
		return
	}
	defer r.Body.Close()

	// Add the new user to the users slice
	users = append(users, user)

	// Respond with a success message
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusCreated) // HTTP 201 Created
	response := map[string]string{
		"message": "User added successfully",
		"name":    user.Name,
	}
	err = json.NewEncoder(w).Encode(response)
	if nil != err {
		logger.Error("Error encoding response as JSON!")
	}

	// Log the user addition
	logger.Info("Added new user", zap.String("name", user.Name), zap.Int("age", user.Age), zap.Float64("height", user.Height))
}

// getUsersHandler returns the list of all users
func getUsersHandler(w http.ResponseWriter, r *http.Request) {
	// Log the request
	logger.Info("Fetching list of users", zap.String("method", r.Method), zap.String("path", r.URL.Path))

	// Get the query parameters for format and sort
	format := r.URL.Query().Get("format")
	sortBy := r.URL.Query().Get("sort")

	// Sort the users by the specified parameter (age or height)
	switch sortBy {
	case "age":
		sort.Slice(users, func(i, j int) bool {
			return users[i].Age < users[j].Age
		})
	case "height":
		sort.Slice(users, func(i, j int) bool {
			return users[i].Height < users[j].Height
		})
	}

	// Check if the format is specified, otherwise default to JSON
	if format == "csv" {
		// Set the content type to CSV
		w.Header().Set("Content-Type", "text/csv")
		// Create a new CSV writer
		csvWriter := csv.NewWriter(w)
		defer csvWriter.Flush()

		// Write the CSV header
		err := csvWriter.Write([]string{"Name", "Age", "Height"})
		if nil != err {
			logger.Debug("Unable to write to csv file!")
		}

		// Write each user as a row in the CSV
		for _, user := range users {
			err = csvWriter.Write([]string{
				user.Name,
				fmt.Sprintf("%d", user.Age),
				fmt.Sprintf("%.2f", user.Height),
			})

			if nil != err {
				logger.Debug("Unable to write to csv file!")
			}
		}
	} else {
		// Default to JSON format
		// Set the content type to JSON
		w.Header().Set("Content-Type", "application/json")
		// Return the list of users in JSON format
		err := json.NewEncoder(w).Encode(users)
		if nil != err {
			logger.Error("Error encoding response as JSON!")
		}
	}
}

func main() {
	// Define a command-line flag for logging level
	logLevel := flag.String("log-level", "warn", "Set the logging level (debug, info, warn, error)")
	ip_addr := flag.String("ip", "0.0.0.0", "Specify the server ip address")
	port := flag.String("port", "9999", "Specify the port number to listen on")

	// Parse the flags
	flag.Parse()

	// Create a zap logger based on the log level
	var cfg zap.Config
	switch *logLevel {
	case "debug":
		cfg = zap.NewDevelopmentConfig()
	case "warn":
		cfg = zap.NewProductionConfig()
		cfg.Level = zap.NewAtomicLevelAt(zap.WarnLevel)
	case "error":
		cfg = zap.NewProductionConfig()
		cfg.Level = zap.NewAtomicLevelAt(zap.ErrorLevel)
	default:
		cfg = zap.NewProductionConfig()
		cfg.Level = zap.NewAtomicLevelAt(zap.InfoLevel)
	}

	// Create the logger
	var err error
	logger, err = cfg.Build()
	if err != nil {
		fmt.Fprintf(os.Stderr, "Error creating logger: %v\n", err)
		os.Exit(1)
	}
	defer func() {
		err := logger.Sync() // Ensure any buffered log entries are flushed
		if nil != err {
			fmt.Fprintf(os.Stderr, "Error in logger.Sync(): %v\n", err)
		}
	}()

	// Define the routes and associate them with handlers
	http.HandleFunc("/", handler)                       // Root URL handler
	http.HandleFunc("/encode", base64EncodeHandler)     // /encode for base64 encoding
	http.HandleFunc("/api/users", addUserHandler)       // /api/users to add a user
	http.HandleFunc("/api/users/list", getUsersHandler) // /api/users/list to get all users

	// Start the HTTP server
	logger.Info(fmt.Sprintf("Starting server on %s:%s...", *ip_addr, *port))
	err = http.ListenAndServe(fmt.Sprintf("%s:%s", *ip_addr, *port), nil)
	if err != nil {
		logger.Fatal("Error starting server", zap.Error(err))
	}
}
```

{{% /details %}}

## Submission

{{< callout emoji="📝" >}}

Submit a markdown file with any code you wrote and the answers to questions to
[ELMS](https://umd.instructure.com/courses/1374508/assignments).

{{< /callout >}}
