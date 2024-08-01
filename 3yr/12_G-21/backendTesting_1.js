const express = require("express");
const app = express();
const port = 3001;
app.listen(port, () => {
  console.log(`listening on port ${port}`);
});

// middleware
app.use((req, res, next) => {
  console.log("Hello from middleware bhulgaye kya hume Mirzapur hmara hai");
  next();
});

app.use((req, res, next) => {
  console.log("Hello from middleware2");
  next();
});

// routes

app.get("/", (req, res) => {
  res.send("Home page 1000");
});

//////////////////////////

// run this using nodemon backendTesting_1.js

/////////////////////////

app.get("/home", (req, res) => {
  res.send("middleware ko bulau kya?");
});

app.get("/profile", (req, res) => {
  res.send("aree mat bula");
});

app.post