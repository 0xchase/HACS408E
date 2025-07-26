import getMagicResults from "./getMagicResults.js";

// Page Elements
const dropzone = document.getElementById("dropzone");
const fileInput = document.getElementById("fileInput");
const progress = document.getElementById("progress-bar");
const tbody = document.getElementsByTagName("tbody")[0];

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

const MAX_SIZE = 1073741824;

function processFile(file) {
    // Validate file existence and type
    if (!file) {
        return;
    }

    // Set new value for progress calculations
    let data_size = Math.min(file.size, MAX_SIZE);
    progress.max = data_size;

    // Used for reading file contents
    const reader = new FileReader();

    // Error flag to be modified by the callbacks below
    let error = false;

    reader.addEventListener("loadend", (event) => {
        if (error) {
            console.log(event.target);
            updateTableResults(file, "error", event.target.error.message);
        } else {
            const buffer = event.target.result;
            const data = new Uint8Array(buffer);
            const results = getMagicResults(data);
            console.log(results);

            updateTableResults(
                file,
                results.mime_type,
                results.description,
            );
        }
    });

    reader.addEventListener("progress", async (event) => {
        progress.value = event.loaded;
        await new Promise((r) => setTimeout(r, 500));
    });

    // Update error if necessary
    reader.addEventListener("error", (_) => error = true);

    reader.readAsArrayBuffer(file.slice(0, MAX_SIZE));
}

function updateTableResults(file, mime_type, description) {
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

    // Reset progress bar after updating results
    progress.value = 0;
}
