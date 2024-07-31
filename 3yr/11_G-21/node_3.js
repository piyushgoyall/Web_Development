// express.js

const express = require("express"); // require the server => install the server on file
const app = express(); // humne ek app banai

app.get("/", function (req, res) {
  res.send("Hello World");
});

app.listen(1000, () => {
  console.log("Server running on port 3000");
});

// // node.js

// const { createServer } = require("node:http");
// const hostname = "127.0.0.1";
// const port = 3008;
// const server = createServer((req, res) => {
//   res.statusCode = 200;
//   res.setHeader("Content-Type", "text/plain");
//   res.end("Hello World");
// });
// server.listen(port, hostname, () => {
//   console.log(`Server running at http://${hostname}:${port}/`);
// });
