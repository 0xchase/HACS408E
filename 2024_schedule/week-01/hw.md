---
title: "HW: Assembly Language"
weight: 4
---

## Part 1 - Analyzing Assembly Code

### Compiler's Effect on Assembly

Analyze the assembly code in
[this Godbolt example](https://godbolt.org/z/KczKxq79o).

{{% details title="Details" closed="true" %}}

If the above link does not work, paste this into your browser's address bar:

```txt
https://godbolt.org/#g:!((g:!((g:!((h:codeEditor,i:(filename:'1',fontScale:14,fontUsePx:'0',j:1,lang:___c,selection:(endColumn:2,endLineNumber:22,positionColumn:2,positionLineNumber:22,selectionStartColumn:2,selectionStartLineNumber:22,startColumn:2,startLineNumber:22),source:'__attribute__((stdcall))%0Aint+sum_stdcall(int+a,+int+b,+int+c,+int+d)+%7B%0A++++return+a+%2B+b+%2B+c+%2B+d%3B%0A%7D%0A%0A__attribute__((cdecl))%0Aint+sum_cdecl(int+a,+int+b,+int+c,+int+d)+%7B%0A++++return+a+%2B+b+%2B+c+%2B+d%3B%0A%7D%0A%0A__attribute__((fastcall))%0Aint+sum_fastcall(int+a,+int+b,+int+c,+int+d)+%7B%0A++++return+a+%2B+b+%2B+c+%2B+d%3B%0A%7D%0A%0Aint+line()+%7B%0A++++int+x+%3D+sum_stdcall(1,+2,+3,+4)%3B%0A++++int+y+%3D+sum_cdecl(5,+6,+7,+8)%3B%0A++++int+z+%3D+sum_fastcall(1,+3,+5,+7)%3B%0A%0A++++return+x+*+y+*+z%3B%0A%7D'),l:'5',n:'0',o:'C+source+%231',t:'0')),k:50,l:'4',n:'0',o:'',s:0,t:'0'),(g:!((h:compiler,i:(compiler:cg142,filters:(b:'0',binary:'1',binaryObject:'1',commentOnly:'0',debugCalls:'1',demangle:'0',directives:'0',execute:'1',intel:'0',libraryCode:'0',trim:'1',verboseDemangling:'0'),flagsViewOpen:'1',fontScale:14,fontUsePx:'0',j:1,lang:___c,libs:!(),options:'-m32+-O0',overrides:!(),selection:(endColumn:1,endLineNumber:1,positionColumn:1,positionLineNumber:1,selectionStartColumn:1,selectionStartLineNumber:1,startColumn:1,startLineNumber:1),source:1),l:'5',n:'0',o:'+x86-64+gcc+14.2+(Editor+%231)',t:'0')),k:50,l:'4',n:'0',o:'',s:0,t:'0')),l:'2',n:'0',o:'',t:'0')),version:4
```

{{% /details %}}

1. Explain what a function `prologue` and `epilogue` are used for in assembly
   language.

1. What happens when you change the `-O0` option to `-O2`? What does the `-O`
   argument to `gcc` (or `clang`) mean?

1. Explain in full sentences what is different between each of the functions.
   - What is a function
     [calling convention](https://en.wikipedia.org/wiki/X86_calling_conventions)?
   - How are the arguments passed to each function?
   - How is the result of the computation returned?

### Analyzing a 'Real' Program

Analyze the assembly code from the example solution to lab 1 in
[this Godbolt example](https://godbolt.org/z/hWYb18aEY).

{{% details title="Details" closed="true" %}}

If the above link does not work, paste this into your browser's address bar:

```txt
https://godbolt.org/#z:OYLghAFBqd5QCxAYwPYBMCmBRdBLAF1QCcAaPECAMzwBtMA7AQwFtMQByARg9KtQYEAysib0QXACx8BBAKoBnTAAUAHpwAMvAFYTStJg1AB9U8lJL6yAngGVG6AMKpaAVxYM9DgDJ4GmADl3ACNMYgkANg1SAAdUBUJbBmc3Dz04hJsBX38gllDwriiLTCsshiECJmICFPdPLhKypMrqghzAkLDI6IUqmrq0xr62jryCnoBKC1RXYmR2DgBSACYAZj9kNywAaiW1xz70YNQXADoEfewdgHoAKh2Tlx27m6WNAEFVjYYt1139ocCOgsFQLlcdrcHgE5N5vKQdgkAF6YYwEF5vT7fTbbTB7A5HPwEcFra5QnauIkADjRGPeX3WOP%2BeMBhNQJLJ5JixCJVARR1mBARgJo9B2VFcv3KCjOsquCOImAA7n50HSsYzfrj8UD0LQ8MEOZD7jtsAANACSABVjEI5I5HNghEIEebrcYAGIfC3eOQAJWwCMwqkI6q%2BnxGNmQOzQDD6O1oAmAOwAsh8zcYLQFlHIbUILQAta77AAiO0kLx2XA0KwrD2rtf2ACFbjdy6nMMAmMEAJ4ETAKemRvDR2PxymCGnogDS2AAmksAKxNpdl0t7FYrBBMZAKSRUjSYVYrZtDqpRmPb4gvMLEEjGFgKZPr4%2BvtYrrGfAg9mKYUE7Rh3B2AM7W8G1AJYPYAHYPw%2BSFITtB0nSEfEy2iel4J2L0fX9Ys1jLRp6SWKCyxA2ErVPT8Pm/X9/z6YhXGsHZHDwGIEDCftVAIYx6MY9FiNgzCJwIKcXnQJgqkouD4ORVF0VkqTiLLFi2I44MCEUz57gwh4rQQPAFHFSVrCSHYzQAeT9QyCHYnZxKqHY/B2Gy8WCVwqCoMIdhVGznNsgBrTAezszAaH8NVu1QAA3TAzh0zEPii1A8DVVR73spgIGE0S7gy/k8BRWlZMmaDBPg/hrwgWTaTwVCdg0ZtHJ1RECqPd9HNWFcVibEqBIwzD4IypcmzwVc9kXbB11nBdl1q1ZFxalFUCoCBpsmVcpMwpSiJIoitLueldP0wyJSlUzFQIOY4z8vFZJ2ZabvFOg8TiIk/2c1BHmClydm3Bg9VinYLQ0z4HhVWhaDsz6bIMr7EUwTB/L8ZMiEehx7qoR7RTxQw1Rchgdguq7kZuw6YzmRVBB2DJEgEM4sL8MRaB7BFQ3ByHFSUdEfux6nksELzUZ%2B0JgD8BhkbJh6eeeuLQYS6r0WATBuOxnjWogD0fWuO4/oB3qYP6402yEBH/I%2BtH/oxrHnsNxyqaoJREeMTm6od02IF1%2BgEWiHYhGwbBp2MbAAhLdb31tvBMYgDQdjAMB1zdp3Of1sqBoA4g72IB8nzq49E7N28SBAZjZlodAGDADh5NN830Ye7G4sXRwGDfVOBqJ4gCYAWi4Tb4O2qjMIVp76DVlE6qq1q0UmKh%2Bwhj3cfoMO28jnYIB77xUIT56x8wFPbfgwus8fZ98I3FZZ9KWgIBKqgmGe9A4s3Pv2%2BVq6dh7l/oJLPbpKNnYSwCEruiCqStuafUVCqS22M4620gaqBe/0l6aT/oTN%2BncR6ogUuHLEu0qLaVBjsPSsNTomQEDsJmqBRD9kMkwR47lPLXlxmgpg6BDJOQyuKO8kFpZilXi5Mmd0pa2V5rDHy%2BkCY/RYEwEMLAgKUKVO9WS9M9KuQYV5Sh1C/xk1EATUICZqhK2vPjR6O5LpiDshJOhblua2TMa4CxQjMY/U4QoBApcIr/TJsLdR15XoC2vG4jxjxbpEEVGqJyP0YhMAUEoCJBNkCsXYjUdSiICAMWsLLD4rx6RkTAiw9AxgMrGCoNwkpO9cbGEYMgYgP4CAay1i8T2mAEQqWSZxdEdwYjGESapFJXF96fEwjcNsc5ZjXjQLsZJR4hkySniAned11xgPKaPWSiC9Zf1XuvLgW8z6q2KqVA%2B8ERmmgziQHYbBYlMCVhQ2gipWHBS5nDFZBz1brVmWnDuBNsK%2BgDF/JSAFaBKEclHN548IRpgzFmHMeZCzYEGagzCR9s6nzXJuD0z1Fp4mDAsP8hlpGyPkRDVAii1TKNbscyE3ysLej%2BZNHBqCB7hlQdlWkdw3IeS8uuaRJLkDUEWa1ZeEco4wjhHsssnLGGIrTpCFFJ9c6bl5Ymflt9770EfpSz5r9LoYN%2BbhAFeCWVD3mV9GhztMCsNdg89AEApVhHyktFabKCDTEwbvBEzThXau2b2c1NrY7x32YKlEMrZXypzi%2BTcpTLW2rVQ/J%2BJ5GWyq4QjO1vjl6tiIcdVNeJYYKH8EwfywVmF4BYHEGohgCCwO1ZhGl%2Br/nJv7ka22pzKgkDxJwpyvT2mpN4tYW23Se1qS4l3K4nD1z2uIF/IdSSR0EDHaSJZwa1mtRQXW9BBNEKOmdIpFt%2B0ybEJOsZco3keQ0ItjUup71OFC1soKGIrgFlimYTGgcpNCFsBYCQEtfKJLvQqo9Yd/T5LpL4lknJnw8lWjPYQVExTKlbEtQwVw3T%2B31M1t4bWzTWlzpAzGPDHSw2Qmg2kiSrhDLrm3chdd8E0pZwyhAYDHSzh5QI30ljxVaOQmHn6gcxglTnv7ATBOgm4NMcI%2BpVjVjHWYGWllak08ETMak7JT1i895bKjnxhQAmhOMEDeuFTXEziHL6rWw%2B5zj6RrPnnMT/Yb7inVX%2BRNX8h7ngo3VBtDK27Mttm%2BiTHGpMZW9agmlkYKN7p/lRIklz74MAgLFwx5hLzVBeIYqKw1VyIrafO9jvauK5xgmK%2BE9VtqMtixdOqbo8z2h3UIFB2y1iGbPsl4j1MeSCBWseOQQgPgAHFsDF3mpRg4fhH0qxtqSHUD6n2rLapNJuLdNwIgy8NBqi5Q5fyq%2BuGrno6UGqbZCYAqBUZIcMKhqLv9MPa3G3N3mCdUC/gS2t5cvdNvCk3MQYIx5QvbLjndybS8jnaojWi8%2BHpnN40%2Bk9gzgPMGwKW1qsLytquWhtN5r%2BJ2zv0AuzEK7VEbsvFm0Dlk%2BzYcveIMATLy4TwffPkqH7m4/tRzjiT%2Bb7WweKpWJDh%2B5sKf3SfRNhH8ckfPyO2g/iZ89uY4l9jz652UP48ZX5qDTpyKE12euG1RSrElLKarSp1TakxHqYD%2Bbn2IjGddVJbZ1HnQtbLMQLgnOrOou57zjV5sA2cNKagSC8PsZLmbsjjdUuywy4O42tu8uYy46VwTllpHiArDqvZ%2BDevEPx9QzxMD1gIDs%2BxspyTAzbdR3tyhWBZ8U%2Bu8zu7qNPOofm3T5YhyqMSeYOD8tpNbcdvS/R/tnC0fbax8V5dlX%2B6Pjcl5BAY8AB1O8/YNyLiRK4M176HrG%2BvWqW9n0Rtd%2BPMXoLJm1MUKpzTpsdOtsq8%2BGPmIIB6TT667P5%2BKxFyDhW%2BnOvJ8Wdr3N9jD5VBKgLYeITARLBgCbDnMvNeQvZ6QAzCYAxMJQAvIXe7OAqSGlC6RPDgaYWgTgRcXgTwDgLQUgVATgRwREcZBYDcNYHgUgAgTQHA6YfyEARcaIPAjgSQQgxg0gzgXgBQEAaIBg4gnA0gOAWAJANActZ6MgCgJjf3GIGQlAYAKQFYPgOgfsYgAQu1Hg4IRmWpTgOgvQ5gWpcyYIbQTAawQw3gKQtgQQcyBgZmHgrANyYARwJmAQ7gXgLAaRIwcQEQ0gfARUEyGKTwkg4MSwp9RYOgt6Dgkg/UYIYgaoHsZwLAHg9JMtaw0gGKb7UAksTAXw4AfUIwRg6YKgAwYABQAANTwGVHMmeyyP4EEBEDEHYCkBkEEEUBUHUACN0EaAMBKNMB6X0ANAEMgGmCe2lE4C7hYDWFTy7nMhIOilvBSgHHgGmEsEsPKHsH%2BkGAaEaB8D8E6HyG6EXFiHiFpmSBcHqAkEaBpnKDGC6HCDOM2LIQqH6FqGuKGGGFKC2JaA%2BMeJOOeIsA%2BL2NuJBNGCOPGFOI2KoLaNwPwO4ICLII4B2FUCpAiC7giArGAGQGjCkDOFTwgFwEIAuW%2BBd14GEK0EmGYNYPYM4C4NICIKWL4IsEEPoNKIRI4BWCRJZI4EpM5OyLCASDsEkCAA%3D%3D
```

{{% /details %}}

1. What is the size of the stack in each function? How did you come up with this
   number? (It is fine to google things.)

1. What line of assembly references the `"USAGE: ..."` string get used?

1. Which lines correspond to the loop where data is `xor`-ed with the key?

## Part 2 - C++ Programming

Please fill out a c++ version of the xor program from lab 1 using the template
provided below. {{% details title="C++ Template" closed="true" %}}

```c++
#include <cstddef>  // size_t
#include <fstream>  // std::ifstream, std::ofstream
#include <iostream> // std::cerr, std::cout
#include <vector>

const long MAX_INPUT_SIZE = 4 * 1024 * 1024; // 4 Megabytes
const char KEY[] = "hacs408e";
std::string error_msg;

class Ciphertext {
private:
  std::vector<char> data;

  void xor_data() {
      // Your code here
  }

  std::streamsize get_file_size(std::ifstream &handle) {
      // Your code here
  }

public:
  Ciphertext() {}

  bool read_data_from_file_and_encrypt(std::ifstream &handle) {
      // Your code here
  }

  bool write_data_and_cleanup_struct(std::ofstream &handle) {
      // Your code here
  }

  const size_t get_size() const { return this->data.size(); }
};

int main(int argc, char *argv[]) {
  if (argc != 3) {
    std::cerr << "USAGE: " << argv[0] << " <input_file> <output_file>"
              << std::endl;
    return EXIT_FAILURE;
  }

  auto ciphertext = new Ciphertext();
  bool success_read = false;
  bool success_write = false;

  std::ifstream input_file(argv[1], std::ios::binary);
  std::ofstream output_file(argv[2], std::ios::binary);
  if (!input_file) {
    error_msg = "Failed to open input file.";
    goto failure;
  }
  if (!output_file) {
    error_msg = "Failed to open output file.";
    goto failure;
  }

  success_read = ciphertext->read_data_from_file_and_encrypt(input_file);
  if (!success_read)
    goto failure;

  success_write = ciphertext->write_data_and_cleanup_struct(output_file);
  if (!success_write)
    goto failure;

  std::cout << "Wrote " << ciphertext->get_size()
            << " std::bytes of encrypted data to " << argv[2] << '\n';

  input_file.close();
  output_file.close();

  return EXIT_SUCCESS;

failure:
  std::cerr << error_msg << std::endl;
  delete ciphertext;
  return EXIT_FAILURE;
}
```

{{% /details %}}

> [!TIP]
>
> Don't forget to use `g++` to compile instead of gcc.
>
> ```bash {filename=Bash}
> g++ -Wall -Werror --std=c++17 -o xor xor_template.cpp
> ```

### Submission

{{< callout type="info" >}}

Submit a markdown file with any code you wrote and the answers to the following
questions to [ELMS](https://umd.instructure.com/courses/1374508/assignments).

{{< /callout >}}
