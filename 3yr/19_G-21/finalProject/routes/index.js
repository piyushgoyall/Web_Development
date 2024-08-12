var express = require("express");
var router = express.Router();
var userModel = require("./users");
const passport = require("passport");
const localStratergy = require("passport-local");

passport.use(new localStratergy(userModel.authenticate()));

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

router.post("/register", (req, res) => {
  var userdata = new userModel({
    username: req.body.username,
    secret: req.body.secret,
  });
  userModel
    .register(userdata, req.body.password)
    .then(function (registereduser) {
      passport.authenticate("local")(req, res, function () {
        res.redirect("/profile");
      });
    });
});

router.get("/profile", (req, res) => {
  res.send("Welcome to profile page");
});

router.get(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/profile",
    failureRedirect: "/",
  }),
  function (req, res) {}
);

router.get("/logout", (req, res, next) => {
  req.logout(function (err) {
    if (err) return next(err);
    res.redirect("/");
  });
});

module.exports = router;
