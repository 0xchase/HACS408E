#include <stdbool.h> /* bool */
#include <stddef.h>  /* NULL, size_t */
#include <stdint.h>  /* uint8_t */
#include <stdio.h>   /* printf, stdout, <file functions...>, rewind */
#include <stdlib.h>  /* EXIT_SUCCESS, EXIT_FAILURE, exit */

static const long MAX_INPUT_SIZE = 4 * 1024 * 1024; // 4 Megabytes
static const uint8_t KEY[] = "hacs408e";
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
 * This function XORs the data in the buffer with the key defined above.
 */
void xor_data(uint8_t *data, size_t size) {
  // Loop through the data buffer, xor-ing every byte with the KEY:
  for (size_t i = 0; i < size; i++) {
    data[i] = data[i] ^ KEY[i % sizeof(KEY)];
  }
}

/*
 * This function returns the size of the file pointed to by the handle. It
 * will do this by seeking to the end of the file and then returning the
 * current position. Finally, it will reset the file pointer to the beginning
 * of the file.
 */
size_t get_file_size(FILE *handle) {
  // Get file size, exit if larger than 4MiB:
  int fseek_res = fseek(handle, 0, SEEK_END);
  if (0 != fseek_res) {

    fprintf(stderr, "Couldn't seek to end of file.");
    exit(EXIT_FAILURE);
  }

  size_t file_size = (size_t)ftell(handle);
  if (-1L == file_size) {
    fprintf(stderr, "ftell() failed.");
    exit(EXIT_FAILURE);
  }

  // Don't forget to rewind file!
  rewind(handle);

  if (MAX_INPUT_SIZE < file_size) {
    fprintf(stderr, "Input file was larger than 4MiB!");
    exit(EXIT_FAILURE);
  }

  return file_size;
}

/*
 * This function allocates a buffer and reads in data from the file if the
 * size of the file is within the maximum allowed size. The buffer allocated
 * can be larger then the actual data but the actual size of the data should and
 * the buffer pointer should be stored in the passed in ciphertext struct.
 */
RESULT read_data_from_file_and_encrypt(FILE *handle, Ciphertext *p_ciphertext) {
  // Calculate size for malloc
  size_t file_size = get_file_size(handle);

  // Create a buffer with the correct size
  uint8_t *buffer = (uint8_t *)malloc(file_size);

  // Read the file contents into the allocated buffer
  unsigned long num_bytes = fread(buffer, 1, file_size, handle);
  if (num_bytes != file_size) {
    return FAILURE;
  }

  xor_data(buffer, file_size);

  // Update ciphertext struct values
  p_ciphertext->data = buffer;
  p_ciphertext->size = file_size;

  return SUCCESS;
}

/*
 * This function writes the encrypted data to the output file and frees the
 * memory allocated for the ciphertext struct.
 */
RESULT write_data_and_cleanup_struct(FILE *handle, Ciphertext ciphertext) {
  unsigned long num_bytes = fwrite(ciphertext.data, 1, ciphertext.size, handle);
  if (num_bytes != ciphertext.size) {
    return FAILURE;
  }

  return SUCCESS;
}

int main(int argc, char *argv[]) {
  Ciphertext ciphertext = {NULL, 0};
  int ret = EXIT_SUCCESS;

  if (3 != argc) {
    printf("USAGE: %s <input_file> <output_file>\n", argv[0]);
    return EXIT_FAILURE;
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

  if (ciphertext.data != NULL) {
    free(ciphertext.data);
    ciphertext.data = NULL;
  }

  if (error_msg)
    fprintf(stderr, "%s", error_msg);

  if (input_file)
    fclose(input_file);
  if (output_file)
    fclose(output_file);

  return ret;
}
