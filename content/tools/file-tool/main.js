// Page Elements
const dropzone = document.getElementById("dropzone");
const fileInput = document.getElementById("fileInput");

// Table body for results
const tbody = document.getElementsByTagName("tbody")[0];

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
    console.log(event);

    [...event.target.files].forEach((file, i) => {
        processFile(file);
    });
});

function processFile(file) {
    // Validate file existence and type
    if (!file) {
        console.log("No file selected. Please choose a file.");
        return;
    }

    updateTableResults(file.name, "", "");
}

function updateTableResults(filename, mime_type, description) {
    console.log("updateTable");

    // Add a row to the end of the table
    const row = tbody.insertRow(-1);

    var cell = row.insertCell();
    cell.textContent = filename;

    cell = row.insertCell();
    cell.textContent = mime_type;

    cell = row.insertCell();
    cell.textContent = description;
}
