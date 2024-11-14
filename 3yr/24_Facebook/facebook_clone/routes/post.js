const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  picture: { type: String, required: true }, // Required field for post image
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true, // User who created the post
  },
  caption: { type: String, required: true }, // Caption text
  date: {
    type: Date,
    default: Date.now, // Default value for creation date
  },
  likes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user", // Users who liked the post
    },
  ],
  shares: { type: Number, default: 0 }, // Track the number of shares
  tags: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user", // Users tagged in the post
    },
  ],
  isPublic: { type: Boolean, default: true }, // Public or private visibility
});

module.exports = mongoose.model("post", postSchema);
