const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");

app.use(cookieParser());


app.get("/", (req, res) => {
  var token = jwt.sign({ email: "xyz@gmail.com" }, "chalchalkedikha");
  res.cookie("username", token);
  console.log(token);
  res.send("cookies saved");
});

// app.get("/readtoken", (req, res) => {
//   console.log(req.cookies.username);
//   res.send("received cookies");
// });

app.get("/decodingtoken", (req, res) => {
  // verify a token symmetric - synchronous
  var decoded = jwt.verify(req.cookies.username, "chalchalkedikha");
  console.log(decoded);
  res.send("Decoded token successfully");
});

/////////////////////////////////////////

// app.get("/", (req, res) => {
//   bcrypt.genSalt(10, function (err, salt) {
//     // console.log(salt);
//     bcrypt.hash("switchchalateraho", salt, function (err, hash) {
//       console.log(hash);
//     });
//   });
// });

// app.get("/", (req, res) => {
//   bcrypt.compare(
//     "switchchalateraho",
//     "$2b$10$rLHF8CG.Qhltl1GnGmA.cOuecsszuCUZ5TbAFYhGRf3Ooa5NqrcSu",
//     function (err, result) {
//       console.log(result);
//     }
//   );
// });

///////////////////////////////

// app.get("/", (req, res) => {
//   res.cookie("MahaanClass", "G21");
//   res.send("Mahaan class allocated on the browser");
// });

// app.get("/temp", (req, res) => {
//   res.send("Check cookies");
// });

// app.get("/readCookies", (req, res) => {
//   console.log(req.cookies);
//   res.send("cookies read");
// });

app.listen(4000);
