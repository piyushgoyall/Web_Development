var express = require("express");
var router = express.Router();
var userModel = require("./users");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

// router.get("/create", async function (req, res) {
//   const createdUser = await userModel.create({
//     username: "Piyush",
//     name: "Piyush",
//     age: 20,
//   });
//   res.send(createdUser);
// });

router.post("/create", async (req, res) => {
  const newUser = req.body;
  const newWalaUser = await userModel.create(newUser);
  res.json({
    message: "User created successfully",
    user: newWalaUser,
  });
});

router.get("/allusers", async (req, res) => {
  let allUsers = await userModel.find();
  res.json({
    message: "All users found",
    users: allUsers,
  });
});

module.exports = router;
