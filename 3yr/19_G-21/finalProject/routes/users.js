const mongoose = require("mongoose");
const plm = require("passport-local-mongoose");

mongoose.connect(
  "mongodb+srv://admin:uDExmHODqqI9S4Lv@cluster0.iswuf.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
);

const userSchema = mongoose.Schema({
  username: String,
  password: String,
  secret: String,
});

userSchema.plugin(plm);
// const User = mongoose.model("user", userSchema);
// module.exports = User
module.exports = mongoose.model("user", userSchema);
