#!/bin/bash

KEEP_SYMBOLS="-K MAX_INPUT_SIZE -K KEY -K error_msg -K RESULT_enum -K Ciphertext_struct -K xor_data -K get_file_size -K read_data_from_file_and_encrypt -K write_data_and_cleanup_struct -K main"

# C Version

echo "Building C version..."
gcc -O0 -g -Wall -o xor_c.bin xor.c

echo "Removing debug info..."
strip "$KEEP_SYMBOLS" ./xor_c.bin

# C++ Version

echo "Building C++ version..."
g++ -O0 -g -Wall -o xor_cpp.bin xor.cpp

echo "Removing debug info..."
strip "$KEEP_SYMBOLS" ./xor_cpp.bin
