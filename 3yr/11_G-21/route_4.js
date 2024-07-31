// slash route

const express = require("express");
const app = express();

app.get("/", function (req, res) {
  res.send("Hello World");
});

app.get("/zindagiMatJioZindagiKhulKeJio", (req, res) => {
  res.send("Zindagi hi zindagi");
});

let port = 1000;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
