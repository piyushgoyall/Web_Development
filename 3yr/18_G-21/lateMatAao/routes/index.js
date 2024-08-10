var express = require("express");
const passport = require("passport");
var router = express.Router();
const userModel = require("./users"); // Import userModel

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

// Configure Passport with the local strategy
const LocalStrategy = require("passport-local").Strategy;
passport.use(new LocalStrategy(userModel.authenticate()));

// Register route
router.post("/register", function (req, res) {
  var userData = new userModel({
    username: req.body.username,
    secret: req.body.secret,
  });

  userModel
    .register(userData, req.body.password)
    .then(function (registeredUser) {
      passport.authenticate("local")(req, res, function () {
        res.redirect("./profile"); // Corrected redirect path
      });
    })
    .catch(function (err) {
      res.send("Error registering user: " + err.message);
    });
});

module.exports = router;
