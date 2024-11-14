const express = require("express");
const app = express();
const userModel = require("./models/user");
const postModel = require("./models/post");
const cookieParser = require("cookie-parser");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(express.static(path.join(__dirname, "public")));
app.use(cookieParser());

app.get("/", (req, res) => {
  res.render("signup");
});

app.get("/signup", (req, res) => {
  res.render("signup");
});

app.get("/signin", (req, res) => {
  res.render("signin");
});

app.get("/profile", isLoggedIn, async (req, res) => {
  // Find the user based on the logged-in user's email
  let user = await userModel
    .findOne({ email: req.user.email }) // Assuming req.user.email is set after login
    .populate("posts"); // Populate the posts array with actual post data

  // Render the profile page and pass the user data to the template
  res.render("profile", { user });
});

app.get("/logout", (req, res) => {
  res.cookie("token", "");
  res.redirect("/signin");
});

// Signup Route
app.post("/signup", async (req, res) => {
  let { username, name, email, password } = req.body;

  // Check if the user already exists
  let user = await userModel.findOne({ email });
  if (user) {
    return res.status(500).send("User already registered");
  }

  // Hash the password
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(password, salt, async (err, hash) => {
      // Create a new user
      let newUser = new userModel({
        username,
        name,
        email,
        password: hash,
      });

      await newUser.save();
      console.log("User registered successfully");
      res.redirect("/signin");
    });
  });
});

// Signin Route
app.post("/signin", async (req, res) => {
  let { email, password } = req.body;

  // Find user by email
  let user = await userModel.findOne({ email });
  if (!user) return res.status(500).send("Invalid email or password");

  // Compare provided password with stored hashed password
  bcrypt.compare(password, user.password, function (err, result) {
    if (result) {
      // Successful login, generate a token
      let token = jwt.sign({ email: email, userid: user._id }, "shhhh");
      res.cookie("token", token);
      res.status(200).redirect("/profile");
    } else {
      res.redirect("/signin"); // Redirect to signin on failure
    }
  });
});

app.post("/post", isLoggedIn, async (req, res) => {
  try {
    let user = await userModel.findOne({ email: req.user.email }); // Retrieve the current user

    // Extract content of the new post from the request body
    let { content } = req.body;

    // Create the new post
    let post = await postModel.create({
      user: user._id,
      content,
    });

    // Add the new post's ID to the user's posts array
    user.posts.push(post._id);
    await user.save();

    // Redirect back to the profile page
    res.redirect("/profile");
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error while creating the post");
  }
});

app.get("/like/:id", isLoggedIn, async (req, res) => {
  try {
    // Find the post by ID and populate the user field
    let post = await postModel.findOne({ _id: req.params.id }).populate("user");

    // Toggle like status
    if (post.likes.indexOf(req.user.userid) === -1) {
      post.likes.push(req.user.userid); // Like the post
    } else {
      post.likes.splice(post.likes.indexOf(req.user.userid), 1); // Unlike the post
    }

    // Save the post with updated likes
    await post.save();

    // Redirect to the profile page
    res.redirect("/profile");
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error while liking the post");
  }
});

// Route for rendering the edit post page
app.get("/edit/:id", isLoggedIn, async (req, res) => {
  try {
    let post = await postModel.findOne({ _id: req.params.id }).populate("user");
    res.render("edit", { post });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error fetching post for editing.");
  }
});

// Route for updating the post content
app.post("/update/:id", isLoggedIn, async (req, res) => {
  try {
    let post = await postModel
      .findOneAndUpdate(
        { _id: req.params.id },
        { content: req.body.content },
        { new: true } // Return updated post
      )
      .populate("user");

    res.redirect("/profile"); // Redirect to profile after updating
  } catch (err) {
    console.error(err);
    res.status(500).send("Error updating the post.");
  }
});

// Middleware to check if the user is logged in
function isLoggedIn(req, res, next) {
  if (req.cookies.token === "") res.redirect("/login");
  else {
    let data = jwt.verify(req.cookies.token, "shhhh");
    req.user = data;
    next();
  }
}

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
