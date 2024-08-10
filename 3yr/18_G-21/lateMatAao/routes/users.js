const mongoose = require("mongoose");
const plm = require("passport-local-mongoose");

mongoose.connect(
  "mongodb+srv://admin:ZdkOI5DVAAnL3308@cluster0.7flio.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
);

const userSchema = mongoose.Schema({
  username: String,
  password: String,
  secret: String,
});

userSchema.plugin(plm);
module.exports = mongoose.model("user", userSchema);
