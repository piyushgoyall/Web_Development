const express = require("express");
const app = express();
const userModel = require("./models/user");
const postModel = require("./models/post");
const cookieParser = require("cookie-parser");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const path = require("path");
const multer = require("multer");
const upload = require("./config/multerconfig");

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
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

// Route to display the feed page with tweets from the current user and other users
app.get("/feed", isLoggedIn, async (req, res) => {
  // Fetch all posts (tweets) from the database, including the user who posted them
  let posts = await postModel.find().populate("user"); // Populate user data with each post

  res.render("feed", { posts, user: req.user }); // Pass posts and current user to the view
});

// Create new post
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
  let post = await postModel.findOne({ _id: req.params.id }).populate("user");
  res.render("editPost", { post });
});

// Route for updating the post content
app.post("/update/:id", isLoggedIn, async (req, res) => {
  let post = await postModel
    .findOneAndUpdate(
      { _id: req.params.id },
      {
        content: req.body.content,
        edited: true,
        lastEdited: new Date(),
      },
      { new: true } // Return updated post
    )
    .populate("user");

  res.redirect("/profile"); // Redirect to profile after updating
});

// Route for deleting a post
app.post("/delete/:id", isLoggedIn, async (req, res) => {
  try {
    // Find and delete the post by ID
    await postModel.findByIdAndDelete(req.params.id);

    // Optionally, remove the post ID from the user's posts array
    let user = await userModel.findOne({ email: req.user.email });
    user.posts = user.posts.filter(
      (postId) => postId.toString() !== req.params.id
    );
    await user.save();

    // Redirect to profile after deletion
    res.redirect("/profile");
  } catch (err) {
    console.error(err);
    res.status(500).send("Error deleting the post.");
  }
});

// Edit Profile
app.get("/profile/editProfile", isLoggedIn, async (req, res) => {
  // Fetch the user from the database using the logged-in user's email
  const user = await userModel.findOne({ email: req.user.email });

  // Render the 'editProfile' template and pass the user data
  res.render("editProfile", { user });
});

app.post(
  "/upload",
  isLoggedIn,
  upload.single("profilePic"), // Multer middleware to handle file upload
  async (req, res) => {
    const user = await userModel.findOne({ email: req.user.email });

    // Check if the user exists
    if (!user) {
      return res.status(404).send("User not found.");
    }

    // Update fields only if provided in the form
    if (req.body.name) user.name = req.body.name;
    if (req.body.username) user.username = req.body.username;
    if (req.body.bio) user.bio = req.body.bio;

    // If a new file is uploaded, update the profile picture field
    if (req.file) {
      user.profilePic = req.file.filename;
    }

    // Save the updated user data to the database
    await user.save();

    // console.log(user.profilePic);
    // Redirect to the profile page after successful update
    res.redirect("/profile");
  }
);

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
