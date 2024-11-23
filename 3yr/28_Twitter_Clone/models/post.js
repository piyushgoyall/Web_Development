// post.js
const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user", // Reference to the user who created the post
    required: true,
  },
  date: {
    type: Date,
    default: Date.now, // Automatically sets the current date
  },
  content: {
    type: String,
    required: true, // Ensures content is provided for each post
  },
  likes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user", // References users who liked the post
    },
  ],
  edited: { type: Boolean, default: false },
  lastEdited: Date,
});

module.exports = mongoose.model("post", postSchema);
