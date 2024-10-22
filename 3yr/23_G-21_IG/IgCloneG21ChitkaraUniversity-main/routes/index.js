var express = require("express");
var router = express.Router();
var userModel = require("./users");
var postModel = require("./post");
const passport = require("passport");
const localStrategy = require("passport-local");
const upload = require("./multer");
const profileUpload = require("./multer2");

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
  const user = await userModel
    .findOne({ username: req.session.passport.user })
    .populate("posts");
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

// edit

// // GET route to render the profile edit page
// router.get("/editProfile", isLoggedIn, (req, res) => {
//   res.render("editProfile");
// });

router.get("/editProfile", isLoggedIn, async (req, res) => {
  const user = await userModel.findOne({ username: req.session.passport.user });
  res.render("editProfile", { user });
});

// POST route to handle profile updates

router.post("/editProfile", upload.single("image"), async function (req, res) {
  const user = await userModel.findOneAndUpdate(
    { username: req.session.passport.user },
    { username: req.body.username, name: req.body.name, bio: req.body.bio }
  );

  if (req.file) {
    user.profileImage = req.file.filename;
  }

  await user.save();
  redirect("/profile");
});

// router.post(
//   "/editProfile",
//   isLoggedIn,
//   profileUpload.single("image"),
//   async function (req, res) {
//     const user = await userModel.findOne({
//       username: req.session.passport.user,
//     });

//     // Update the user's profile with new picture and bio
//     if (req.file) {
//       user.profileImage = req.file.filename;
//     }
//     if (req.body.bio) {
//       user.bio = req.body.bio;
//     }

//     await user.save();
//     res.redirect("/profile");
//   }
// );
/////

// router.post(
//   "/editProfile",
//   isLoggedIn,
//   upload.single("profileImage"),
//   async (req, res) => {
//     try {
//       const user = await userModel.findOne({
//         username: req.session.passport.user,
//       }).populate("user");
//       console.log(user);

//       if (!user) {
//         return res.status(404).send("User not found");
//       }

//       // Update profile picture and bio
//       if (req.file) {
//         user.profileImage = req.file.filename; // Save the filename or path as needed
//       }
//       if (req.body.bio) {
//         user.bio = req.body.bio;
//       }

//       // Save the updated user info
//       await user.save();

//       // Redirect to the profile page
//       res.redirect("/profile");
//     } catch (error) {
//       console.error(error);
//       res.status(500).send("Server Error");
//     }
//   }
// );

module.exports = router;
