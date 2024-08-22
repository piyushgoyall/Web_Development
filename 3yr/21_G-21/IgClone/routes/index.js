var express = require("express");
var router = express.Router();
var userModel = require("./users");
const passport = require("passport");
const localStrategy = require("passport-local");

passport.use(new localStrategy(userModel.authenticate()));

/* GET home page.=> register page */
router.get("/", function (req, res, next) {
  res.render("index");
});

//loginpage route
router.get("/login", (req, res) => {
  res.render("login");
});

router.get("/profile", isLoggedIn, (req, res) => {
  res.render("profile");
});

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
