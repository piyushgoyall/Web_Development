const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  text: String,
  user: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model("comment", commentSchema);
