const express = require("express");
const app = express();
const userModel = require("./models/user");
const postModel = require("./models/post");

app.get("/", (req, res) => {
  res.send("Hello");
});

app.get("/create", async (req, res) => {
  let user = await userModel.create({
    username: "zxcv",
    email: "zxcv@gmail.com",
    age: "21",
  });
  res.send(user);
});

app.get("/post/create", async (req, res) => {
  const post = await postModel.create({
    postdata: "Nothing",
    user: "672f6fd82025596ab068d896",
  });

  const user = await userModel.findOne({ _id: "672f6fd82025596ab068d896" });
  user.posts.push(post._id);
  await user.save();

  res.send({ post, user });
});

app.listen(2000);
