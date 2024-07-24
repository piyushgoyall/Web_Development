const fs = require("fs");
const path = require("path");

// Function to create directories recursively
function createNestedFolders(baseDir) {
  const nestedPath = path.join(
    baseDir,
    "folder1",
    "folder2",
    "folder3",
    "folder4"
  );
  fs.mkdirSync(nestedPath, { recursive: true });
  return nestedPath;
}

// Function to create files in a specified directory
function createFiles(directory, numberOfFiles) {
  for (let i = 1; i <= numberOfFiles; i++) {
    const filePath = path.join(directory, `file${i}.txt`);
    fs.writeFileSync(filePath, `This is file number ${i}`);
  }
}

// Base directory where the nested folders will be created
const baseDirectory = "C:\\Users\\piyus\\Coding\\webd_temp\\3_G-21\\make_dir";

// Create the nested folders
const nestedDirectory = createNestedFolders(baseDirectory);

// Create 10 files in the innermost folder
createFiles(nestedDirectory, 10);

console.log("Nested folders and files created successfully.");
