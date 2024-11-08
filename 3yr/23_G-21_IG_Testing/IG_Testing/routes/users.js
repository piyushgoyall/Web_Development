const mongoose = require("mongoose");
const plm = require("passport-local-mongoose");

mongoose
  .connect(
    "mongodb+srv://admin:FpJ6gEYC7z0JPHjd@cluster0.gz2nd.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => console.log("Database connection established"))
  .catch(() => console.log("Database connection establishment failed"));

const userSchema = mongoose.Schema({
  username: { type: String, unique: true, required: true },
  name: String,
  email: String,
  password: String,
  profileImage: { type: String },
  bio: String,
  posts: [{ type: mongoose.Schema.Types.ObjectId, ref: "post" }],
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "post" }],
  followers: [{ type: mongoose.Schema.Types.ObjectId, ref: "user" }],
  following: [{ type: mongoose.Schema.Types.ObjectId, ref: "user" }],
  followRequests: [{ type: mongoose.Schema.Types.ObjectId, ref: "user" }], // New field for follow requests
  requestedFollowing: [{ type: mongoose.Schema.Types.ObjectId, ref: "user" }], // New field for tracking follow requests sent

  // New fields for OTP handling
  otp: String,
  otpExpires: Date,
});

userSchema.plugin(plm);
userSchema.index({ username: 1 }, { unique: true });

module.exports = mongoose.model("user", userSchema);
