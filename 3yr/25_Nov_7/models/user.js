const mongoose = require("mongoose");
mongoose
  .connect(
    "mongodb+srv://admin:UXVUlczBYjJQ4lnb@cluster0.i8gxi.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => console.log("Database connection established"))
  .catch(() => console.log("Database connection establishment failed"));

const userSchema = mongoose.Schema({
  username: String,
  email: String,
  password: String,
  age: Number,
});

module.exports = mongoose.model("user", userSchema);
