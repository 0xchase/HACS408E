// Page Elements
const dropzone = document.getElementById("dropzone");
const fileInput = document.getElementById("fileInput");

dropzone
    .addEventListener("dragover", (event) => {
        // Prevent default behavior (Prevent file from being opened)
        event.preventDefault();
    });

dropzone
    .addEventListener("drop", (event) => {
        // Prevent default behavior (Prevent file from being opened)
        event.preventDefault();

        if (event.dataTransfer.items) {
            // Use DataTransferItemList interface to access the file(s)
            [...event.dataTransfer.items].forEach((item, i) => {
                // If dropped items aren't files, reject them
                if (item.kind === "file") {
                    processFile(item.getAsFile());
                }
            });
        } else {
            // Use DataTransfer interface to access the file(s)
            [...event.dataTransfer.files].forEach((file, i) => {
                processFile(file);
            });
        }
    });

// New click event listener for opening the file input dialog
dropzone
    .addEventListener("click", () => {
        document.getElementById("fileInput")
            .click();
    });

// Event listener to handle file selection from the input dialog
fileInput.addEventListener("change", (event) => {
    processFile(event.target.files[0]);
});

function processFile(file) {
    // Validate file existence and type
    if (!file) {
        console.log("No file selected. Please choose a file.");
        return;
    }

    console.log(file);
}
