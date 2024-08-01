const express = require("express");
const app = express();
const port = 3002;
app.listen(port, () => {
  console.log(`listening on port ${port}`);
});

// middleware
app.use(express.json());

/////////////

let users = [];

app.get("/user", (req, res) => {
  res.send(users);
});

app.post("/user", (req, res) => {
  console.log(req.body);
  users.push(req.body);
  //   res.send("We got the data");
  res.json({
    message: "user added successfully",
    user: user,
  });
});

app.patch()