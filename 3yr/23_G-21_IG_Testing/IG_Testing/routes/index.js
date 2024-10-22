var express = require("express");
var router = express.Router();
const userModel = require("./users");
const postModel = require("./post");
const passport = require("passport");
const localStrategy = require("passport-local");

passport.use(new localStrategy(userModel.authenticate()));

router.get("/signup", (req, res) => {
  res.render("signup");
});

router.get("/signin", (req, res) => {
  res.render("signin");
});

router.get("/feed", isLoggedIn, async (req, res) => {
  const user = await userModel.findOne({ username: req.session.passport.user });
  console.log(user);
  res.render("feed");
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
      res.redirect("/feed");
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
