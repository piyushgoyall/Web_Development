const mongoose = require("mongoose");
const plm = require("passport-local-mongoose");
mongoose
  .connect(
    "mongodb+srv://admin:0FiFpFStdWTlCmy3@cluster0.5i6t0.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => console.log("database connection established"));

const userSchema = mongoose.Schema({
  // username: { type: String, required: true, unique: true },
  username: String,
  name: String,
  email: String,
  password: { type: String },
  profileImage: { type: String },
  bio: { type: String },
  posts: [{ type: mongoose.Schema.Types.ObjectId, ref: "post" }],
});

userSchema.plugin(plm);
module.exports = mongoose.model("user", userSchema);
