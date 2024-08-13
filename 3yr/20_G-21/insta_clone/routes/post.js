const mongoose = require("mongoose");

const postSchema = mongoose.Schema({
  picture: String,
  user: {
    type: mongoose.mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  caption: String,
  date: {
    type: date,
    default: date.now(),
  },
  likes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
  ],
});

mongoose.exports = mongoose.model("user", postSchema);
