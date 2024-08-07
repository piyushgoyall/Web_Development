var express = require("express");
var router = express.Router();
var userModel = require("./users");

// /* GET home page. */
// router.get("/", function (req, res, next) {
//   res.render("index", { title: "Express" });
// });

// // router.get("/create", async function (req, res) {
// //   const createdUser = await userModel.create({
// //     username: "Piyush",
// //     name: "Piyush",
// //     age: 20,
// //   });
// //   res.send(createdUser);
// // });

// router.post("/create", async (req, res) => {
//   const newUser = req.body;
//   const newWalaUser = await userModel.create(newUser);
//   res.json({
//     message: "User created successfully",
//     user: newWalaUser,
//   });
// });

// router.get("/allusers", async (req, res) => {
//   let allUsers = await userModel.find();
//   res.json({
//     message: "All users found",
//     users: allUsers,
//   });
// });

// // UPDATE

// // router.post("/update", async (req, res) => {
// //   const filter = req.body.username;
// //   const update = req.body.age;
// //   const updatedUser = await userModel.findOneAndUpdate(
// //     { filter },
// //     { update },
// //     { new: true }
// //   );
// //   res.json({
// //     message: "User updated successfully",
// //     user: updatedUser,
// //   });
// // });

// // Update an existing user
// router.post("/update", async (req, res) => {
//   const { username, age } = req.body;
//   const updatedUser = await userModel.findOneAndUpdate(
//     { username }, // filter by username
//     { age }, // update age
//     { new: true } // return the updated document
//   );

//   res.json({
//     message: "User updated successfully",
//     user: updatedUser,
//   });
// });

// // DELETE

// router.get("/delete", async (req, res) => {
//   let deletedUser = await userModel.findOneAndDelete({
//     username: "Piyush",
//   });
//   res.send(deletedUser);
// });

///////// COOKIES

router.get("/", (req, res) => {
  res.cookie("age", 100);
  res.cookie("username", "zindagi");

  res.send("Your Cookie");
});

router.get("/delete", (req, res) => {
  // res.clearCookie("age");
  res.clearCookie("username");
  res.send("Cookie Deleted");
});

module.exports = router;
