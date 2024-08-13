const mongoose = require("mongoose");
const plm = require("passport-local-mongoose");
mongoose
  .connect(
    "mongodb+srv://admin:NEQHinC51yOYvCwR@cluster0.yg2pzbu.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => {
    console.log("Connected to MongoDB");
  });

const userSchema = mongoose.Schema({
  username: String,
  name: String,
  email: String,
  password: String,
  profileImage: String,
  bio: String,
  post: [{ type: mongoose.Schema.Types.ObjectId, ref: "post" }],
});

userSchema.plugin(plm);
module.exports = mongoose.model("user", userSchema);
