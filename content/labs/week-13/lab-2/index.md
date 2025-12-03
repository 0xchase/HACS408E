---
title: "Lab 2: Using Angr"
weight: 2
draft: false
---

## Overview

{{< callout emoji="💡" >}}

The purpose of this lab is to introduce you to the basics of symbolic execution
with Angr. By the end of this lab you should have some familiarity with how its
API maps to basic symbolic execution concepts.

**Goals:**

- Understand the basics of symbolic execution
- Understand the basics of Angr scripting
- Automate solving a reverse engineering problem

**Estimated Time:** `45 Minutes`

{{< /callout >}}

## Part 1: Understand an Angr script

This first lab will be focused just on understanding a script conceptually
before we develop one of our own.

{{% steps %}}

### Install Angr

First install the `angr` python package to your Linux virtual machine using `uv`
or `pip`. The recommended way is using a virtual environment:

```sh {filename=Shell}
# Create the virtual environment
...> uv venv .venv

# Activate it
...> . .venv/bin/activate.fish

# Install Frida
(.venv) ...> uv pip install angr
```

### Read and compile a C program

The following is source for the program we'll analyze using symbolic execution.
Read and understand its contents, then compile it to a binary we'll analyze.

```c {filename=fauxware.c}
#include <stdio.h>
#include <string.h>
#include <unistd.h>
#include <fcntl.h>
#include <stdlib.h>

char *sneaky = "SOSNEAKY";

int authenticate(char *username, char *password)
{
	char stored_pw[9];
	stored_pw[8] = 0;
	int pwfile;

	// evil back d00r
	if (strcmp(password, sneaky) == 0) return 1;

	pwfile = open(username, O_RDONLY);
	read(pwfile, stored_pw, 8);

	if (strcmp(password, stored_pw) == 0) return 1;
	return 0;

}

int accepted()
{
	printf("Welcome to the admin console, trusted user!\n");
}

int rejected()
{
	printf("Go away!");
	exit(1);
}

int main(int argc, char **argv)
{
	char username[9];
	char password[9];
	int authed;

	username[8] = 0;
	password[8] = 0;

	printf("Username: \n");
	read(0, username, 8);
	read(0, &authed, 1);
	printf("Password: \n");
	read(0, password, 8);
	read(0, &authed, 1);

	authed = authenticate(username, password);
	if (authed) accepted();
	else rejected();
}
```

Compile with:

```sh {filename=Shell}
gcc -o fauxware fauxware.c
```

### Run an example script

After compiling the target program you can analyze it with an Angr script. Try
running the following solution and verify it finds the right solution.

```python {filename=solve.py}
#!/usr/bin/env python

import angr
import sys

# Look at fauxware.c! This is the source code for a "faux firmware" (@zardus
# really likes the puns) that's meant to be a simple representation of a
# firmware that can authenticate users but also has a backdoor - the backdoor
# is that anybody who provides the string "SOSNEAKY" as their password will be
# automatically authenticated.


def basic_symbolic_execution():
    # We can use this as a basic demonstration of using angr for symbolic
    # execution. First, we load the binary into an angr project.

    p = angr.Project('fauxware', auto_load_libs=False)

    # Now, we want to construct a representation of symbolic program state.
    # SimState objects are what angr manipulates when it symbolically executes
    # binary code.
    # The entry_state constructor generates a SimState that is a very generic
    # representation of the possible program states at the program's entry
    # point. There are more constructors, like blank_state, which constructs a
    # "blank slate" state that specifies as little concrete data as possible,
    # or full_init_state, which performs a slow and pedantic initialization of
    # program state as it would execute through the dynamic loader.

    state = p.factory.entry_state()

    # Now, in order to manage the symbolic execution process from a very high
    # level, we have a SimulationManager. SimulationManager is just collections
    # of states with various tags attached with a number of convenient
    # interfaces for managing them.

    sm = p.factory.simulation_manager(state)

    # Uncomment the following line to spawn an IPython shell when the program
    # gets to this point so you can poke around at the four objects we just
    # constructed. Use tab-autocomplete and IPython's nifty feature where if
    # you stick a question mark after the name of a function or method and hit
    # enter, you are shown the documentation string for it.

    # import IPython; IPython.embed()

    # Now, we begin execution. This will symbolically execute the program until
    # we reach a branch statement for which both branches are satisfiable.

    sm.run(until=lambda sm_: len(sm_.active) > 1)

    # If you look at the C code, you see that the first "if" statement that the
    # program can come across is comparing the result of the strcmp with the
    # backdoor password. So, we have halted execution with two states, each of
    # which has taken a different arm of that conditional branch. If you drop
    # an IPython shell here and examine sm.active[n].solver.constraints
    # you will see the encoding of the condition that was added to the state to
    # constrain it to going down this path, instead of the other one. These are
    # the constraints that will eventually be passed to our constraint solver
    # (z3) to produce a set of concrete inputs satisfying them.

    # As a matter of fact, we'll do that now.

    input_0 = sm.active[0].posix.dumps(0)
    input_1 = sm.active[1].posix.dumps(0)

    # We have used a utility function on the state's posix plugin to perform a
    # quick and dirty concretization of the content in file descriptor zero,
    # stdin. One of these strings should contain the substring "SOSNEAKY"!

    if b'SOSNEAKY' in input_0:
        return input_0
    else:
        return input_1

def test():
    r = basic_symbolic_execution()
    assert b'SOSNEAKY' in r

if __name__ == '__main__':
    sys.stdout.buffer.write(basic_symbolic_execution())

# You should be able to run this script and pipe its output to fauxware and
# fauxware will authenticate you.
```

To run:

```sh {filename=Shell}
python3 solve.py | fauxware
```

### Understand the solution

Symbolic execution can seem like magic! Read the solution comments and search
for the API documentation to make sure you understand what each line does. Once
you do:

- [Angr Api Documentation](https://docs.angr.io/en/latest/api.html)

{{< question >}}

Write a paragraph in your own words that describes how the script works.

{{< /question >}}

{{% /steps %}}

## Part 2: Alter an Angr script

In this part you'll use combine static analysis and symbolic execution to solve
a novel reversing challenge.

{{% steps %}}

### Download the challenge binary

Download and run the challenge binary to understand what you're up against.

{{< downloadbutton file="r100" text="r100" >}}

### Statically analyze the binary

This binary has specific success and failure conditions. Use static analysis to
identify the corresponding branches in the graph view of binary ninja. Note the
addresses corresponding to the success and failure branches.

### Use `explore` to find the solution

Below is the starting script for your solution. Before making changes, ensure
you understand what each existing line does. Then, research the exploration API
and add the corresponding line(s) to the skeleton. Running your script should
produce a solution you can test on the original file in your terminal.

```python {filename=solve_r100.py}
import angr

def main():
    p = angr.Project("r100", auto_load_libs=False)
    simgr = p.factory.simulation_manager(p.factory.full_init_state())

    # TODO: use the explore API to find the solution
    # simgr.explore(...)

    return simgr.found[0].posix.dumps(0).strip(b'\0\n')

if __name__ == '__main__':
    print(main())
```

{{< question >}}

Include your python script in your lab submission.

{{< /question >}}

{{% /steps %}}

> [!TIP]
>
> - Review the API documentation
> - Don't alter anything you don't understand
> - Ensure you understand symbolic execution conceptually

## Solutions

{{% details title="Click to reveal.." closed="true" %}}

#### Angr `r100` Solution Script

Still a work in progress. Check back later.

{{% /details %}}

## Submission

{{< callout emoji="📝" >}}

Submit a markdown file with any code you wrote and the answers to questions to
[ELMS](https://umd.instructure.com/courses/1390353/assignments).

{{< /callout >}}
