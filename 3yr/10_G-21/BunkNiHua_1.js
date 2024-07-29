const express = require("express");
const path = require("path"); // Import the path module
const app = express();

app.get("/", function (req, res) {
  res.send("Shaadi ka khana khaake jana");
});

app.get("/shaadiKraKarHiJaana", (req, res) => {
  res.sendFile(path.join(__dirname, "index_1.html")); // Use res.sendFile to serve HTML files
});

app.listen(3005, () => {
  console.log("Server is running on port 3000");
});
