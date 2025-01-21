const fs = require("fs");
const path = require("path");

console.log("Current working directory:", process.cwd()); // This will show where Node.js is running from

const filePath = path.join(__dirname, "test.txt"); // Ensures the file is created in the same folder as script.js

fs.writeFile(filePath, "Hello", function (err) {
  if (err) {
    console.error("Error writing file:", err);
  } else {
    console.log("File created successfully at:", filePath);
  }
});
