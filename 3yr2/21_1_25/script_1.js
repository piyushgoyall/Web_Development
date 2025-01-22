import express from "express";
import bcrypt from "bcrypt";
const app = express();

app.use(express.json());

app.get("/", function (req, res) {
  res.send("Hello World!");
});

// register
// login
// post
// getAllPost

const Users = [];

app.post("/register", async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res
      .status(400)
      .json({ error: "Please provide both username and password" });
  }
  if (Users.find((user) => user.username === username)) {
    return res.status(400).json({ error: "User already exists" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = {
    id: Users.length + 1,
    username,
    password: hashedPassword,
  };
  Users.push(newUser);
  return res.status(201).json({ message: "User registered successfully" });
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
