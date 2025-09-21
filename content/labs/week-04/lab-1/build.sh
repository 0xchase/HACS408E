#!/bin/bash

echo "Compiling C code..."

podman run --rm -it \
  -v "$PWD:/out" \
  -v "$(realpath ../../week-03/lab-2/xor.c):/usr/src/xor/main.c" \
  -w "/usr/src/xor/" docker.io/gcc:15.2 \
gcc -ggdb -O1 -Wall -o /out/xor_c_debug.bin main.c
