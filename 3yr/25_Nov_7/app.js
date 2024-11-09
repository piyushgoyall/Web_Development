const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const path = require("path");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userModel = require("./models/user");

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(cookieParser());

app.get("/", (req, res) => {
  res.render("index");
});

app.post("/create", async (req, res) => {
  let { username, email, password, age } = req.body;

  bcrypt.genSalt(10, function (err, salt) {
    bcrypt.hash(password, salt, async function (err, hash) {
      let createdUser = await userModel.create({
        username,
        email,
        password: hash,
        age,
      });
    });
  });

  let token = jwt.sign({ username }, "Pg_Nc_Og_Ka_Pk_Rsr");
  res.cookie("token", token);

  res.send("User received and token sent");
});

app.get("/login", (req, res) => {
  res.render("login");
});

app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  // Find user in the database
  const user = await userModel.findOne({ username });
  if (!user) {
    return res.status(400).send("Something went wrong");
  }

  // Compare the provided password with the hashed password in the database
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(400).send("Something went wrong");
  }

  // Encrypt the username with JWT and set it in a cookie
  const token = jwt.sign({ username }, "your_secret_key", { expiresIn: "1h" });
  res.cookie("username", token);

  res.send("Login successful");
});

app.get("/logout", (req, res) => {
  // res.clearCookie("token");
  res.cookie("token", "");

  console.log("Logged out successfully");
  res.redirect("/");
});

///////////////////////////////////////////////////

// app.post("/create", async (req, res) => {
//   let { username, email, password, age } = req.body;

//   // Encrypt the password with bcrypt
//   const saltRounds = 10;
//   const hashedPassword = await bcrypt.hash(password, saltRounds);

//   // Store hashedPassword instead of the plain password
//   let createdUser = await userModel.create({
//     username,
//     email,
//     password: hashedPassword,
//     age,
//   });

//   // Encrypt the username and send it as a cookie
//   const token = jwt.sign({ username: req.body.username }, "Pg_Nc_Og_Ka_Pk_Rsr");

//   res.cookie("token", token);

//   res.send(createdUser);
// });

app.listen(4000, () => {
  console.log("Server running on port 4000");
});
