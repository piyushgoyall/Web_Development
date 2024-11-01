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

router.get("/test-image", (req, res) => {
  res.sendFile(path.join(__dirname, "public/images/uploads/example.jpg"));
});

router.get("/signup", (req, res) => {
  res.render("signup");
});

router.get("/signin", (req, res) => {
  res.render("signin");
});

router.get("/feed", isLoggedIn, async (req, res) => {
  const user = await userModel.findOne({ username: req.session.passport.user });
  const posts = await postModel.find().populate("user");
  // console.log(user);
  // console.log(posts);
  res.render("feed", { user, posts });
});

router.get("/upload", isLoggedIn, (req, res) => {
  res.render("upload");
});

router.get("/editprofile", isLoggedIn, (req, res) => {
  res.render("editprofile", { user: req.user });
});

router.get("/myProfile", isLoggedIn, async (req, res) => {
  const username = req.session.passport.user;
  const user = await userModel
    .findOne({ username })
    .populate("posts") // Populate posts
    .populate("followers") // Populate followers
    .populate("following"); // Populate following

  res.render("profile", {
    user: user,
    username: user.username,
    bio: user.bio,
    profileImage: user.profileImage,
    posts: user.posts,
    followers: user.followers, // Include followers
    following: user.following, // Include following
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
    res.redirect("/myProfile");
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

// Search users by partial username
router.get("/searchUser", isLoggedIn, async (req, res) => {
  try {
    const searchQuery = req.query.username || "";
    const users = await userModel
      .find({
        username: { $regex: `^${searchQuery}`, $options: "i" },
      })
      .select("username profileImage"); // Select only required fields

    res.json({ success: true, users });
  } catch (error) {
    console.error("Error in searchUser route:", error);
    res.json({ success: false, message: "Server error" });
  }
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
router.post("/acceptFollowRequest/:username", isLoggedIn, async (req, res) => {
  try {
    const currentUser = await userModel.findById(req.user._id);
    const requester = await userModel.findOne({
      username: req.params.username,
    });

    if (!requester) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    if (currentUser.followRequests.includes(requester._id)) {
      if (!currentUser.followers.includes(requester._id)) {
        currentUser.followers.push(requester._id);
      }
      if (!requester.following.includes(currentUser._id)) {
        requester.following.push(currentUser._id);
      }
      currentUser.followRequests.pull(requester._id);
      requester.requestedFollowing.pull(currentUser._id);
    }

    await currentUser.save();
    await requester.save();
    res.json({ success: true });
  } catch (err) {
    console.error("Error accepting follow request:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// Reject follow request
router.post("/rejectFollowRequest/:username", isLoggedIn, async (req, res) => {
  try {
    const currentUser = await userModel.findById(req.user._id);
    const requester = await userModel.findOne({
      username: req.params.username,
    });

    if (!requester) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

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
    console.error("Error rejecting follow request:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

router.get("/profile/:username", isLoggedIn, async (req, res) => {
  try {
    const currentUserId = req.user._id;
    const targetUser = await userModel
      .findOne({ username: req.params.username })
      .populate({
        path: "posts",
        populate: { path: "user", select: "username profileImage" },
      }); // Populate posts and user within each post

    if (!targetUser) {
      return res.status(404).send("User not found.");
    }

    const isFollowing = targetUser.followers.includes(currentUserId);
    const hasRequestedFollow =
      targetUser.followRequests.includes(currentUserId);

    if (targetUser._id.equals(currentUserId)) {
      return res.redirect("/myProfile");
    }

    console.log(targetUser.posts); // Check if posts are populated

    res.render("viewProfilePage", {
      targetUser,
      currentUserId,
      isFollowing,
      hasRequestedFollow,
    });
  } catch (error) {
    console.error("Error displaying profile:", error);
    res.status(500).send("Server error");
  }
});

router.get("/followers/:userId", async (req, res) => {
  try {
    const user = await User.findById(req.params.userId).populate(
      "followers",
      "username"
    );
    res.json(user.followers);
  } catch (error) {
    res.status(500).json({ error: "Could not fetch followers" });
  }
});

router.get("/following/:userId", async (req, res) => {
  try {
    const user = await User.findById(req.params.userId).populate(
      "following",
      "username"
    );
    res.json(user.following);
  } catch (error) {
    res.status(500).json({ error: "Could not fetch following" });
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

module.exports = router;
