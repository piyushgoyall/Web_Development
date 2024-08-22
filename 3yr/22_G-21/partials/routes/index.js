var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index");
});

router.get("/profile", (req, res) => {
  res.send("Profile page");
});

router.get("/about", (req, res) => {
  res.send("About page");
});


module.exports = router;
