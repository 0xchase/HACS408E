#!/bin/bash

# C Version
BIN="xor_c.bin"

echo "Building C version..."
gcc -O0 -g -Wall -o "$BIN" xor.c

echo "Removing debug info..."

cp "$BIN" "$BIN.full"
strip --strip-debug "$BIN"
objcopy --add-gnu-debuglink="$BIN.full" "$BIN"
rm "$BIN.full"

# C++ Version
BIN="xor_cpp.bin"

echo "Building C++ version..."
g++ -O0 -g -Wall -o "$BIN" xor.cpp

echo "Removing debug info..."
cp "$BIN" "$BIN.full"
strip --strip-debug "$BIN"
objcopy --add-gnu-debuglink="$BIN.full" "$BIN"
rm "$BIN.full"
