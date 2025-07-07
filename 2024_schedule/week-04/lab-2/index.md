---
title: "Lab 2: Demo - Ghidra Structure Editor"
weight: 2
---

## Overview

{{< callout emoji="💡" >}}

Follow along with the demo of using ghidra's data type manager for reverse
engineering.

**Goals:**

- Practice using Ghidra
- Become familiar with Ghidra's `data type manager`
- Become familiar with Ghidra's `structure editor`

**Estimated Time:** `30 Minutes`

{{< /callout >}}

## Instructions

{{% steps %}}

### Follow along using Ghidra to analyze the following files:

{{< downloadbutton file="global.bin" text="Global Data" >}}

{{< downloadbutton file="heap.bin" text="Heap Data" >}}

{{< downloadbutton file="stack.bin" text="Stack Data" >}}

### A little bit of C++

{{< downloadbutton file="vfunc_linux.bin" text="Linux" >}}

{{< downloadbutton file="vfunc_windows.bin" text="Windows" >}}

```c++ {filename=call_vfunc.h}
class BaseClass {
public:
   BaseClass();
   virtual void vfunc1() = 0;
   virtual void vfunc2();
   virtual void vfunc3();
   virtual void vfunc4();
private:
   int x;
   int y;
};

class SubClass : public BaseClass {
public:
   SubClass();
   virtual void vfunc1();
   virtual void vfunc3();
   virtual void vfunc5();
private:
   int z;
};
```

```c++ {filename=call_vfunc.cpp}
#include "call_vfunc.h"

BaseClass::BaseClass() {}
void BaseClass::vfunc2() {}
void BaseClass::vfunc3() {}
void BaseClass::vfunc4() {}

SubClass::SubClass() {}
void SubClass::vfunc1() {}
void SubClass::vfunc3() {}
void SubClass::vfunc5() {}

void call_vfunc(BaseClass *bc) {
    bc->vfunc3();
}

int main() {
    BaseClass *bc = new SubClass();
    call_vfunc(bc);
}
```

### Helpful Ghidra Windows

- Strings
- Graph View
- Function caller/callee references

<!-- deno-fmt-ignore-start -->

{{< downloadbutton file="/schedule/week-02/lab-2/libmagic.so.1" text="libmagic" >}}

<!-- deno-fmt-ignore-end -->

{{% /steps %}}

## Submission

{{< callout emoji="📝" >}}

Submit a screenshot of the graph view window to
[ELMS](https://umd.instructure.com/courses/1374508/assignments)?

{{< /callout >}}
