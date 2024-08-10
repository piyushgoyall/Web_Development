var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

router.get("/checkSession", (req, res) => {
  console.log(req.session);
  res.send("Check your terminal for sessions");
});

router.get("/ban", (req, res) => {
  req.session.ban = true;
  res.send("You've been banned!");
});

router.get("/checkBan", (req, res) => {
  console.log("your ban status is here", req.session.ban);
  res.send(req.session.ban);
});

router.get("/removeBan", (req, res) => {
  req.session.ban = false;
  console.log("your ban status is here", req.session.ban);
  res.send(
    "your ban is removed ab jor sai bola jai Jhansla City, Jai Banur,jai Rajpura Town, jai Dera bassi, Jai Mohali, jai Mata DI, Jai jawaan jai kisaan, Jai veeru"
  );
});

router.get("/deleteBan", (req, res) => {
  req.session.destroy((err) => {
    if (err) throw err;
    res.send("your ban is deleted");
  });
});

module.exports = router;
