const mongoose = require("mongoose");

mongoose
  .connect(
    "mongodb+srv://admin:fLIcrR9jP3hqF3a4@cluster0.81w0e.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => console.log("Database connection established"))
  .catch(() => console.log("Database connection establishment failed"));

const userSchema = new mongoose.Schema({
  username: { type: String, unique: true, required: true },
  name: { type: String, required: true },
  email: String,
  password: String, // This will store the hashed password
  bio: String,
  tweets: [String],
  createdAt: { type: Date, default: Date.now },
  posts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "post", // Reference to the post model
    },
  ],
  followers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  following: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
});

module.exports = mongoose.model("user", userSchema);
