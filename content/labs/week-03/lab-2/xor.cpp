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
