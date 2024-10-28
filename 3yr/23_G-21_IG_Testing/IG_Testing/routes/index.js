var express = require("express");
var router = express.Router();
const userModel = require("./users");
const postModel = require("./post");
const Comment = require("./comment");
const passport = require("passport");
const localStrategy = require("passport-local");
const upload = require("./multer");
const uploadProfile = require("./multer2");

passport.use(new localStrategy(userModel.authenticate()));

router.get("/signup", (req, res) => {
  res.render("signup");
});

router.get("/signin", (req, res) => {
  res.render("signin");
});

router.get("/feed", isLoggedIn, async (req, res) => {
  const user = await userModel.findOne({ username: req.session.passport.user });
  const posts = await postModel.find().populate("user");
  console.log(user);
  console.log(posts);
  res.render("feed", { user, posts });
});

router.get("/upload", isLoggedIn, (req, res) => {
  res.render("upload");
});

router.get("/editprofile", isLoggedIn, (req, res) => {
  res.render("editprofile", { user: req.user });
});

router.get("/profile", isLoggedIn, async (req, res) => {
  const username = req.session.passport.user;
  const user = await userModel.findOne({ username }).populate("posts");

  res.render("profile", {
    user: user,
    username: user.username,
    bio: user.bio,
    profileImage: user.profileImage,
    posts: user.posts,
  });
});

router.post("/upload", isLoggedIn, upload.single("image"), async (req, res) => {
  const user = await userModel.findOne({ username: req.session.passport.user });
  const post = await postModel.create({
    picture: req.file.filename,
    user: user._id,
    caption: req.body.caption,
  });

  user.posts.push(post._id);
  await user.save();

  res.redirect("/feed");
});

router.post(
  "/editProfile",
  uploadProfile.single("image"),
  isLoggedIn,
  async (req, res) => {
    const user = await userModel.findOne({
      username: req.session.passport.user,
    });

    user.name = req.body.name;
    user.bio = req.body.bio;

    if (req.file) {
      user.profileImage = req.file.filename;
    }

    await user.save();
    res.redirect("/profile");
  }
);

router.post("/likePost/:postId", isLoggedIn, async (req, res) => {
  const user = await userModel.findOne({ username: req.session.passport.user });
  const post = await postModel.findById(req.params.postId);

  const hasLiked = post.likes.includes(user._id);

  if (hasLiked) {
    // Unlike the post
    post.likes.pull(user._id);
    user.likes.pull(post._id);
  } else {
    // Like the post
    post.likes.push(user._id);
    user.likes.push(post._id);
  }

  await post.save();
  await user.save();

  res.json({ success: true, liked: !hasLiked, likeCount: post.likes.length });
});

// Route to fetch comments for a specific post
router.get("/getPostComments/:postId", async (req, res) => {
  const post = await postModel.findById(req.params.postId).populate({
    path: "comments",
    populate: { path: "user", select: "username" },
  });

  res.json({
    success: true,
    post: { picture: post.picture },
    comments: post.comments.map((comment) => ({
      user: { username: comment.user.username },
      text: comment.text,
    })),
  });
});

// Route to add a comment to a specific post
router.post("/addComment/:postId", isLoggedIn, async (req, res) => {
  const post = await postModel.findById(req.params.postId);

  const comment = await Comment.create({
    text: req.body.text,
    user: req.user._id,
  });

  post.comments.push(comment._id);
  await post.save();

  res.json({
    success: true,
    comment: { text: comment.text },
    user: { username: req.user.username },
  });
});

// Route to get 5 random users
router.get("/randomUsers", async (req, res) => {
  try {
    const userId = req.user._id; // Get the logged-in user's ID
    const users = await userModel.aggregate([
      { $match: { _id: { $ne: userId } } },
      { $sample: { size: 5 } }, // Retrieve 5 random users
    ]);
    res.json({ success: true, users });
  } catch (err) {
    res.json({ success: false, message: err.message });
  }
});

// router.post("/followRequest/:id", async (req, res) => {
//   const { id } = req.params; // FollowRequest ID
//   const { accepted } = req.body; // true for accept, false for reject

//   try {
//     const request = await FollowRequest.findById(id).populate(
//       "sender receiver"
//     ); // Retrieve the request and populate user info

//     if (!request) {
//       return res.json({ success: false, message: "Follow request not found" });
//     }

//     const sender = request.sender; // User who sent the follow request
//     const receiver = request.receiver; // User who received the follow request

//     if (accepted) {
//       // Add sender to receiver's followers and receiver to sender's following
//       await User.findByIdAndUpdate(receiver._id, {
//         $addToSet: { followers: sender._id },
//       });
//       await User.findByIdAndUpdate(sender._id, {
//         $addToSet: { following: receiver._id },
//       });
//     }

//     // Delete the follow request regardless of acceptance or rejection
//     await FollowRequest.findByIdAndDelete(id);

//     res.json({ success: true });
//   } catch (error) {
//     res.json({ success: false, message: error.message });
//   }
// });

// Follow/unfollow user
router.post("/follow/:userId", async (req, res) => {
  const currentUserId = req.user._id;
  const targetUserId = req.params.userId;

  try {
    const currentUser = await userModel.findById(currentUserId);
    const targetUser = await userModel.findById(targetUserId);

    // Check if a follow request has already been sent
    if (targetUser.followRequests.includes(currentUserId)) {
      // If request already exists, cancel the follow request
      targetUser.followRequests.pull(currentUserId);
      currentUser.requestedFollowing.pull(targetUserId);
    } else if (!targetUser.followers.includes(currentUserId)) {
      // Send a follow request if they aren't already following
      targetUser.followRequests.push(currentUserId);
      currentUser.requestedFollowing.push(targetUserId);
    } else {
      // If already following, remove the follow
      currentUser.following.pull(targetUserId);
      targetUser.followers.pull(currentUserId);
    }

    await currentUser.save();
    await targetUser.save();
    res.json({ success: true });
  } catch (err) {
    res.json({ success: false, message: err.message });
  }
});

// Fetch follow requests
router.get("/followRequests", isLoggedIn, async (req, res) => {
  try {
    const user = await userModel
      .findById(req.user._id)
      .populate("followRequests");
    res.render("followRequests", { user, followRequests: user.followRequests });
  } catch (error) {
    res.status(500).send("Error fetching follow requests.");
  }
});

// Accept follow request
router.post("/acceptFollowRequest/:userId", isLoggedIn, async (req, res) => {
  try {
    const currentUser = await userModel.findById(req.user._id);
    const requester = await userModel.findById(req.params.userId);

    if (currentUser.followRequests.includes(requester._id)) {
      // Add requester as a follower to current user
      if (!currentUser.followers.includes(requester._id)) {
        currentUser.followers.push(requester._id);
      }

      // Add current user to requester's following list
      if (!requester.following.includes(currentUser._id)) {
        requester.following.push(currentUser._id);
      }

      // Remove the follow request from both sides
      currentUser.followRequests.pull(requester._id);
      requester.requestedFollowing.pull(currentUser._id);

      await currentUser.save();
      await requester.save();

      res.json({ success: true });
    }

    // if (currentUser.followRequests.includes(requester._id)) {
    //   currentUser.followers.push(requester._id);
    //   requester.following.push(currentUser._id);
    //   currentUser.followRequests.pull(requester._id);
    //   requester.requestedFollowing.pull(currentUser._id);

    //   await currentUser.save();
    //   await requester.save();

    //   res.json({ success: true });
    // }
    else {
      res
        .status(404)
        .json({ success: false, message: "Follow request not found." });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Reject follow request
router.post("/rejectFollowRequest/:userId", isLoggedIn, async (req, res) => {
  try {
    const currentUser = await userModel.findById(req.user._id);
    const requester = await userModel.findById(req.params.userId);

    if (currentUser.followRequests.includes(requester._id)) {
      currentUser.followRequests.pull(requester._id);
      requester.requestedFollowing.pull(currentUser._id);

      await currentUser.save();
      await requester.save();

      res.json({ success: true });
    } else {
      res
        .status(404)
        .json({ success: false, message: "Follow request not found." });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

/* GET home page. */
router.get("/", function (req, res, next) {
  // res.render("index", { title: "Express" });
  res.render("signup");
});

// router.get("/profile", (req, res) => {
//   res.json({
//     message: "profile page found",
//   });
// });

//register
router.post("/register", function (req, res, next) {
  const userData = new userModel({
    username: req.body.username,
    email: req.body.email,
    name: req.body.name,
  });

  userModel
    .register(userData, req.body.password)
    .then(function () {
      passport.authenticate("local")(req, res, function () {
        res.redirect("feed");
        // res.send("Picture Posted");
      });
    })
    .catch(function (error) {
      if (error.code === 11000) {
        // MongoDB duplicate key error code
        res
          .status(400)
          .send("Username already taken. Please choose a different one.");
      } else {
        res.status(500).send("Registration failed. Please try again.");
      }
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

router.get("/login", (req, res) => {
  res.render("signin");
});

// logout
router.get("/logout", function (req, res) {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("/signin");
  });
});

router.get("/notifications", (req, res) => {
  res.render("notifications");
});

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/login");
}

// profile

module.exports = router;
