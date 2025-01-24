import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
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
const todos = [];

// register
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

  // const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = {
    id: Users.length + 1,
    username,
    // password: hashedPassword,
    password,
  };
  Users.push(newUser);
  return res.status(201).json({ message: "User registered successfully" });
});

// login
app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ error: "Please enter valid username" });
  }

  // const isCorrectPassword = await bcrypt.compare(password, user.password);
  // if (!isCorrectPassword)
  //   return res.status(400).json({ message: "Password is not correct." });

  // const token = jwt.sign({ id: user.id }, "asdfghjkl", { expiresIn: "1h" });
  // res.json({ token });

  const user = Users.find((user) => user.username === username);
  if (!user) {
    return res.status(400).json({ error: "User not found" });
  }

  if (password !== user.password) {
    return res.status(400).json({ message: "Password is not correct." });
  }

  const token = jwt.sign({ id: user.id }, "asdfghjkl", { expiresIn: "1h" });
  res.json({ token });
});

// CURD
app.post("/api/todos", (req, res) => {
  const { title } = req.body;
  if (!title) {
    console.log("Please enter the title");
  }
  const newToDo = {
    id: todos.length + 1,
    title: title,
    complete: false,
  };

  todos.push(newToDo);
  return res
    .status(201)
    .json({ message: "To-Do created successfully", todo: newToDo });
});

// Get all to-do items
app.get("/api/todos", (req, res) => {
  return res.status(200).json({ todos });
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
