#!/bin/bash

KEEP_SYMBOLS="('MAX_INPUT_SIZE', 'error_msg', 'RESULT_enum', 'RESULT', 'Ciphertext_struct', 'Ciphertext', 'main')"
STRIP_ARGS=$(python3 -c "for sym in $KEEP_SYMBOLS: print('-K', sym, end=' ');")
# C Version
BIN="xor_c.bin"

echo "Building C version..."
gcc -O0 -g -Wall -o "$BIN" xor.c

echo "Removing debug info..."
strip $STRIP_ARGS $BIN

# C++ Version
BIN="xor_cpp.bin"

echo "Building C++ version..."
g++ -O0 -g -Wall -o "$BIN" xor.cpp

echo "Removing debug info..."
strip $STRIP_ARGS $BIN
