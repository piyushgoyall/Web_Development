const mongoose = require("mongoose");
const plm = require("passport-local-mongoose");

mongoose
  .connect(
    "mongodb+srv://admin:Lhhs0mHC1I2Ygzl6@cluster0.1ssyv.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => console.log("Database connection established"))
  .catch(() => console.log("Database connection establishment failed"));

const userSchema = mongoose.Schema({
  username: String,
  name: String,
  email: String,
  password: String,
  profileImage: { type: String },
  coverImage: { type: String },
  bio: String,
  birthdate: { type: Date },
  gender: String, 
  relationshipStatus: String,
  posts: [{ type: mongoose.Schema.Types.ObjectId, ref: "post" }],
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "likes" }],
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "comments" }],
  friends: [{ type: mongoose.Schema.Types.ObjectId, ref: "user" }],
  followers: [{ type: mongoose.Schema.Types.ObjectId, ref: "followers" }],
  following: [{ type: mongoose.Schema.Types.ObjectId, ref: "following" }],
});

userSchema.plugin(plm);
module.exports = mongoose.model("user", userSchema);
