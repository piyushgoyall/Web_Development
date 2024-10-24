var express = require("express");
var router = express.Router();
const userModel = require("./users");
const postModel = require("./post");
const passport = require("passport");
const localStrategy = require("passport-local");
const upload = require("./multer");
const uploadProfile = require("./multer2");

passport.use(new localStrategy(userModel.authenticate()));

router.get("/signup", (req, res) => {
  res.render("signup");
});

router.get("/signin", (req, res) => {
  res.render("signin");
});

router.get("/feed", isLoggedIn, async (req, res) => {
  const user = await userModel.findOne({ username: req.session.passport.user });
  const posts = await postModel.find().populate("user");
  console.log(user);
  console.log(posts);
  res.render("feed", { user, posts });
});

router.get("/upload", isLoggedIn, (req, res) => {
  res.render("upload");
});

router.get("/editprofile", isLoggedIn, (req, res) => {
  res.render("editprofile", { user: req.user });
});

router.get("/profile", isLoggedIn, async (req, res) => {
  const username = req.session.passport.user;
  const user = await userModel.findOne({ username }).populate("posts");

  res.render("profile", {
    user: user,
    username: user.username,
    bio: user.bio,
    profileImage: user.profileImage,
    posts: user.posts,
  });
});

router.post("/upload", isLoggedIn, upload.single("image"), async (req, res) => {
  const user = await userModel.findOne({ username: req.session.passport.user });
  const post = await postModel.create({
    picture: req.file.filename,
    user: user._id,
    caption: req.body.caption,
  });

  user.posts.push(post._id);
  await user.save();

  res.redirect("/feed");
});

router.post(
  "/editProfile",
  uploadProfile.single("image"),
  isLoggedIn,
  async (req, res) => {
    const user = await userModel.findOne({
      username: req.session.passport.user,
    });

    user.name = req.body.name;
    user.bio = req.body.bio;

    if (req.file) {
      user.profileImage = req.file.filename;
    }

    await user.save();
    res.redirect("/profile");
  }
);

router.post("/likePost/:postId", isLoggedIn, async (req, res) => {
  const user = await userModel.findOne({ username: req.session.passport.user });
  const post = await postModel.findById(req.params.postId);

  const hasLiked = post.likes.includes(user._id);

  if (hasLiked) {
    // Unlike the post
    post.likes.pull(user._id);
    user.likes.pull(post._id);
  } else {
    // Like the post
    post.likes.push(user._id);
    user.likes.push(post._id);
  }

  await post.save();
  await user.save();

  res.json({ success: true, liked: !hasLiked, likeCount: post.likes.length });
});

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

router.get("/profile", (req, res) => {
  res.json({
    message: "profile page found",
  });
});

//register
router.post("/register", function (req, res, next) {
  const userData = new userModel({
    username: req.body.username,
    email: req.body.email,
    name: req.body.name,
  });

  userModel.register(userData, req.body.password).then(function () {
    passport.authenticate("local")(req, res, function () {
      // res.redirect("/feed");
      res.send("Picture Posted");
    });
  });
});

//login
router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/feed",
    failureRedirect: "/login",
  }),
  function (req, res) {}
);

// logout
router.get("/logout", function (req, res) {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
});

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/login");
}

// profile

module.exports = router;
