var express = require("express");
var router = express.Router();
var userModel = require("./users");
var postModel = require("./post");
const passport = require("passport");
const localStrategy = require("passport-local");
const upload = require("./multer");

passport.use(new localStrategy(userModel.authenticate()));

/* GET home page.=> register page */
router.get("/", function (req, res, next) {
  res.render("index");
});

//loginpage route
router.get("/login", (req, res) => {
  res.render("login");
});

router.get("/feed", isLoggedIn, async (req, res) => {
  const user = await userModel.findOne({ username: req.session.passport.user });
  const posts = await postModel.find().populate("user");
  res.render("feed", { user, posts });
});

router.get("/profile", isLoggedIn, async (req, res) => {
  const user = await userModel.findOne({ username: req.session.passport.user }).populate("posts");
  console.log(user);
  res.render("profile", { user });
});

router.get("/upload", isLoggedIn, function (req, res) {
  res.render("upload");
});

router.post(
  "/upload",
  isLoggedIn,
  upload.single("image"),
  async function (req, res) {
    const user = await userModel.findOne({
      username: req.session.passport.user,
    });
    const post = await postModel.create({
      picture: req.file.filename,
      user: user._id,
      caption: req.body.caption,
    });

    user.posts.push(post._id);
    await user.save();
    res.redirect("/feed");
  }
);

//register route
router.post("/register", function (req, res, next) {
  const userData = new userModel({
    username: req.body.username,
    name: req.body.name,
    email: req.body.email,
  });

  userModel.register(userData, req.body.password).then(function () {
    passport.authenticate("local")(req, res, function () {
      res.redirect("/profile");
    });
  });
});

//login route
router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/profile",
    failureRedirect: "/login",
  }),
  function (req, res) {}
);

//logout
router.get("/logout", function (req, res, next) {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
});

//isLoggedIn
function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) return next();
  res.redirect("/login");
}

module.exports = router;
