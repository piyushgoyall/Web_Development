const mongoose = require("mongoose");
const plm = require("passport-local-mongoose");

mongoose
  .connect(
    "mongodb+srv://admin:FpJ6gEYC7z0JPHjd@cluster0.gz2nd.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => console.log("Database connection established"))
  .catch(() => console.log("Database connection establishment failed"));

const userSchema = mongoose.Schema({
  username: String,
  name: String,
  email: String,
  password: String,
  profileImage: { type: String },
  bio: String,
  posts: [{ type: mongoose.Schema.Types.ObjectId, ref: "post" }],
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "likes" }],
  // comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "comments" }],
  followers: [{ type: mongoose.Schema.Types.ObjectId, ref: "followers" }],
  following: [{ type: mongoose.Schema.Types.ObjectId, ref: "following" }],
});

userSchema.plugin(plm);
module.exports = mongoose.model("user", userSchema);
