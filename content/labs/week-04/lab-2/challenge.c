#include <stdio.h>
#include <stdlib.h>
#include <string.h>

static unsigned char password[27] = "UNPF408rVfGurOrfgPynff@HZQ";

unsigned char *rot13(unsigned char *buffer) {
    size_t size = strlen((char *)buffer);
    unsigned char *buf = (unsigned char *)calloc(1, size + 1);

    size_t i = 0;

    while (i < size) {
        unsigned char c = buffer[i];

        unsigned char tmp = c + 13;

        if ('A' <= c && c <= 'Z') {
            if (tmp <= 'Z') {
                buf[i] = tmp;
            } else {
                buf[i] = tmp - 26;
            }
        } else if ('a' <= c && c <= 'z') {
            if (tmp <= 'z') {
                buf[i] = tmp;
            } else {
                buf[i] = tmp - 26;
            }
        } else {
            buf[i] = c;
        }

        printf("Final: %c\n", buf[i]);

        // Increment counter
        i++;
    }

    return buf;
}

int main() {
    unsigned char *input = NULL;
    size_t input_size = 0;

    printf("Enter the passowrd: ");

    getline((char **)&input, &input_size, stdin);
    input[strcspn((char *)input, "\r\n")] = 0;

    unsigned char *new_input = rot13(input);

    int ret;
    if (0 != strcmp((char *)input, (char *)password)) {
        printf("Your password: %s\n", new_input);
        printf("That doesn't look quite right... Try again!\n");
        ret = 1;
    } else {
        printf("Correct! You got the flag: ACES{%s}\n", rot13(password));
        ret = 0;
    }

    return ret;
}
