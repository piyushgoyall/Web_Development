const express = require("express");
const app = express();
const port = 3000;

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`); // Added backticks and closing quote
});

app.use(express.json()); // Middleware function helps encode data from JSON to JS objects

let users = [];

// GET
app.get("/user", (req, res) => {
  res.json({
    message: "List of the users",
    users: users,
  });
});

// POST
app.post("/user", (req, res) => {
  console.log(req.body);
  users.push(req.body);
  res.json({
    message: "User added successfully",
    user: req.body,
  });
});

// PATCH
app.patch("/user", (req, res) => {
  console.log("new information", req.body);
  const newInfo = req.body;

  users = users.map((userelement) => {
    if (userelement.name === newInfo.name) {
      userelement.age = newInfo.age;
    }
    return userelement; // Return the element in each iteration
  });

  res.json({
    message: "User updated successfully",
    users: users, // Changed `user` to `users` to reflect the updated users array
  });
});

// DELETE

app.delete("/user", (req, res) => {
  let newUsers = users.filter(
    (userelement) => userelement.name != req.body.name
  );
  users = newUsers;
  res.json({
    message: "User deleted successfully",
    users: users,
  });
});
