const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const express = require("express");
const app = express();
app.use(express.json());

// app.post("/check", async (req, res) => {
//   const email = "p@gmail.com";
//   const pass = "Hello@123";

//   const hashed = await bcrypt.hash(pass, 10);
//   const token = jwt.sign({ email }, "Hi");
//   console.log(hashed);
//   console.log(token);
//   res.send({ hashed });
// });

// app.post("/", (req, res) => {
//   const email = "omil@gmail.com";
//   const token = jwt.sign({ email }, "hi");
//   console.log({ token });
//   res.send("Hi");
// });

app.post("/", (req, res) => {
  bcrypt.genSalt(10, function (err, salt) {
    bcrypt.hash("pass", salt, function (err, hash) {
      res.send({ hash });
    });
  });
});

app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
