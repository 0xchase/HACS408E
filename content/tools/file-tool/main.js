// Page Elements
const dropzone = document.getElementById("dropzone");
const fileInput = document.getElementById("fileInput");
const progress = document.getElementById("progress-bar");

// Table body for results
const tbody = document.getElementsByTagName("tbody")[0];

// Used for reading file contents
const reader = new FileReader();
reader.addEventListener("loadstart", onReaderEvent);
reader.addEventListener("load", onReaderEvent);
reader.addEventListener("loadend", onReaderEvent);
reader.addEventListener("progress", onReaderEvent);
reader.addEventListener("error", onReaderEvent);
reader.addEventListener("abort", onReaderEvent);

dropzone
    .addEventListener("dragover", (event) => {
        // Prevent default behavior (Prevent file from being opened)
        event.stopPropagation();
        event.preventDefault();
    });

dropzone
    .addEventListener("drop", (event) => {
        // Prevent default behavior (Prevent file from being opened)
        event.stopPropagation();
        event.preventDefault();

        if (event.dataTransfer.items) {
            // Use DataTransferItemList interface to access the file(s)
            [...event.dataTransfer.items].forEach((item, _i) => {
                // If dropped items aren't files, reject them
                if (item.kind === "file") {
                    processFile(item.getAsFile());
                }
            });
        } else {
            // Use DataTransfer interface to access the file(s)
            [...event.dataTransfer.files].forEach((file, _i) => {
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
    [...event.target.files].forEach((file, _i) => {
        processFile(file);
    });
});

function processFile(file) {
    // Validate file existence and type
    if (!file) {
        return;
    }

    const data = reader.readAsArrayBuffer(file);
    updateTableResults(file, "");
}

// This function is responsible for updating the progress bar
function onReaderEvent(event) {
    console.log(event);

    if (event.type === "progress") {
        // TODO
    } else if (event.type === "load") {
        // TODO
    }
}

function updateTableResults(file, mime_type, description) {
    console.log("updateTable");

    // Add a row to the end of the table
    const row = tbody.insertRow(-1);

    var cell = row.insertCell();
    cell.textContent = file.name || "-";

    cell = row.insertCell();
    cell.textContent = file.type || "-";

    cell = row.insertCell();
    cell.textContent = mime_type || "-";

    cell = row.insertCell();
    cell.textContent = description || "-";
}
