// slash route

const express = require("express");
const path = require("path"); // Ensure 'path' is required
const app = express();

app.get("/", function (req, res) {
  res.send("Hello World");
});

app.get("/home", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/about", (req, res) => {
  res.sendFile(path.join(__dirname, "about.html"));
});

app.get("/contact", (req, res) => {
  res.sendFile(path.join(__dirname, "contact.html"));
});

let port = 1000;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
