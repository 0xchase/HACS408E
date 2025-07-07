---
title: "Lab 1: C Programming"
weight: 1
---

{{< callout emoji="💡" >}}

**Explaination:**

Write a small C program which reads data from a file and XOR's it with a hard
coded `key`. It should exit if the file is larger than 4MB.

**Goals:**

- Recall C syntax for functions and data structures.
- Know how to install a compiler and compile a C program.
- Be familliar with looking up function documentation of the C standard library.

{{< /callout >}}

## Instructions

### Setup Your Environment:

You will need a C compiler, so choose either [`gcc`](https://gcc.gnu.org/) or
[`clang`](https://clang.llvm.org/) and check that it is installed on the system
you're using. If not, follow the instructions on thier website to install it.
<br> (NOTE: `gcc` is already installed on your vm...)

In the text editor of your choice, create a new file named `xor_main.c` (or
whatever, it doesn't matter).

### Template Program:

All C programs need to have a main function defined. We don't care that you know
how to parse arguments so have a template for you to start from.

{{% details title="Template Code" closed="true" %}}

```C
#include <stdbool.h> /* bool */
#include <stddef.h>  /* NULL, size_t */
#include <stdint.h>  /* uint8_t */
#include <stdio.h>   /* printf, stdout, <file functions...>, rewind */
#include <stdlib.h>  /* EXIT_SUCCESS, EXIT_FAILURE, exit */

static const long MAX_INPUT_SIZE = 4 * 1024 * 1024; // 4 Megabytes
static const uint8_t KEY[] = "hacs480e";
static char *error_msg;

typedef enum RESULT_enum {
    SUCCESS = 0,
    FAILURE = 1,
} RESULT;

typedef struct Ciphertext_struct {
    uint8_t *data;
    size_t size;
} Ciphertext;

/*
* This function returns the size of the file pointed to by the handle. It
* will do this by seeking to the end of the file and then returning the
* current position. Finally, it will reset the file pointer to the beginning
* of the file.
*/
size_t get_file_size(FILE *handle) {
    // Your code here

    return 0;
}

/*
* This function allocates a buffer and reads in data from the file if the
* size of the file is within the maximum allowed size. The buffer allocated
* can be larger then the actual data but the actual size of the data should and
* the buffer pointer should be stored in the passed in ciphertext struct.
*/
RESULT read_data_from_file_and_encrypt(FILE *handle, Ciphertext *p_ciphertext) {
    // Your code here

    return SUCCESS;
}

/*
* This function writes the encrypted data to the output file and frees the
* memory allocated for the ciphertext struct.
*/
RESULT write_data_and_cleanup_struct(FILE *handle, Ciphertext ciphertext) {
    // Your code here

    return SUCCESS;
}

/*
 * This function XORs the data in the buffer with the key defined above.
 */
void xor_data(uint8_t *data, size_t size) {
    // Your code here
}

int main(int argc, char *argv[]) {
Ciphertext ciphertext = {NULL, 0};
int ret = EXIT_SUCCESS;

if (3 != argc) {
    printf("USAGE: %s <input_file> <output_file>\n", argv[0]);
    ret = EXIT_FAILURE;
    goto cleanup;
}

FILE *input_file = fopen(argv[1], "rb");
if (!input_file) {
    error_msg = "Failed to open input file!\n";
    ret = EXIT_FAILURE;
    goto cleanup;
}

FILE *output_file = fopen(argv[2], "wb");
if (!output_file) {
    error_msg = "Failed to open output file!\n";
    ret = EXIT_FAILURE;
    goto cleanup;
}

RESULT r1 = read_data_from_file_and_encrypt(input_file, &ciphertext);
if (SUCCESS != r1) {
    error_msg = "Failed to read data from input file\n";
    ret = EXIT_FAILURE;
    goto cleanup;
}

RESULT r2 = write_data_and_cleanup_struct(output_file, ciphertext);
if (SUCCESS != r2) {
    error_msg = "Failed to write data to output file\n";
    ret = EXIT_FAILURE;
    goto cleanup;
}

printf("Wrote %zu bytes of encrypted data to %s\n", ciphertext.size, argv[2]);

cleanup:
printf("%s", error_msg);
if (input_file)
    fclose(input_file);
if (output_file)
    fclose(output_file);
return ret;
}
```

{{% /details %}}

### Steps:

{{% steps %}}

### Implement the `FILE` related functions:

- Implement the function to check the size of the files. Then implement the
  read/write functions.

  - Some standard library functions that may be useful: <br>
    [`fopen()`](https://en.cppreference.com/w/c/io/fopen),
    [`fread()`](https://en.cppreference.com/w/c/io/fread),
    [`fseek()`](https://en.cppreference.com/w/c/io/fseek),
    [`ftell()`](https://en.cppreference.com/w/c/io/ftell),
    [`rewind()`](https://en.cppreference.com/w/c/io/rewind),
    [`fclose()`](https://en.cppreference.com/w/c/io/fclose)

  - If an error occurs, return the corresponding status code and put an
    informative error message in the `error_msg` variable.

  - Only read the file if the the file size is NOT larger than 4MB.

  - Read the contents into a
    [dynamically allocated](https://en.cppreference.com/w/c/memory/malloc)
    buffer.

### Implement the XOR Function:

- Write a function to XOR the contents of `data` with the `KEY` constant.

- Make sure to think about how to handle when the data is larger than the key
  (this is the case most of the time).

### Compile Your Program:

> [!TIP]
> You should probably do this more often than at the very end.

- Open a terminal and navigate to your project directory.

- Compile your C program using the compiler you previously installed:

```{filename=Bash}
gcc -Wall -Werror -o xor ./xor_main.c
```

{{% /steps %}}

## Example Usage

Here is an example usage of the program.

```sh {filename=Bash}
# Create some junk data:
dd if=/dev/random of=test.bin bs=1M count=1

# Run the program
./xor test.bin out1
./xor out1 out2

# If your program works then this should return nothing
diff test.bin out2
```

> [!TIP]
>
> - This is not a programming class, handling errors doesn't mean it has to be
>   pretty. If something fails, just exit and let the OS handle cleanup.
> - Test with different input files to validate your program, something over
>   4MB.
> - Don't forget to `free()` your buffer(s)!

## Submission

{{< callout type="info" >}}

Submit a markdown file with any code you wrote and the answers to the following
questions to [ELMS](https://umd.instructure.com/courses/1374508/assignments).

1. Explain in your own words what a
   [pointer](https://en.wikipedia.org/wiki/Pointer_(computer_programming)) is.

1. How many bytes do each of the following data types use? (Hint:
   [`sizeof()`](https://en.cppreference.com/w/c/language/sizeof))

   - `int`
   - `size_t`
   - `uint64_t`
   - `uint8_t*`

1. Suppose you have a variable `string` in memory at the following address:
   ```
   0x1000: "Hello, World!"
   ```
   What is the value of:
   - `string[0]`
   - `&string[0]`
   - `string + 10`
   - `*(string + 14)`

{{< /callout >}}
