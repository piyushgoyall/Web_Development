const mongoose = require("mongoose");

mongoose
  .connect(
    "mongodb+srv://admin:vBVcmyylMZRrCOjb@cluster0.u1fen.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => console.log("Database connection established"))
  .catch(() => console.log("Database connection establishment failed"));

const userSchema = mongoose.Schema({
  username: String,
  email: String,
  name: String,
  age: Number,
  password: String,
  posts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "post",
    },
  ],
});

module.exports = mongoose.model("user", userSchema);
