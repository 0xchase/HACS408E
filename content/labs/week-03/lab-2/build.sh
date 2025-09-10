#!/bin/bash

gcc -O0 -g -o xor_c.bin xor.c
g++ -O0 -g -o xor_cpp.bin xor.cpp


KEEP_SYMBOLS="-K MAX_INPUT_SIZE -K KEY -K error_msg -K RESULT_enum -K Ciphertext_struct -K xor_data -K get_file_size -K read_data_from_file_and_encrypt -K write_data_and_cleanup_struct -K main"

strip "$KEEP_SYMBOLS" ./xor_c.bin
strip "$KEEP_SYMBOLS" ./xor_cpp.bin