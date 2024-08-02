const express = require("express");
const path = require("path");
const app = express();
const port = 3000;

// Set the view engine to EJS
app.set("view engine", "ejs");

// Set the views directory to the current directory
app.set("views", path.join(__dirname));

// Define a route to handle user requests
app.use("/user/:name", (req, res) => {
  let name = req.params.name;
  res.render("queryRequest_2", { name: name });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

// const express = require("express");
// const app = express();
// const port = 3000;

// app.listen(port, () => {
//   console.log(`Server runnging on port ${port}`);
// });
// app.set("view engine", "ejs");

// app.use("/user/:name", (req, res) => {
//   let name = req.params.name;
//   res.render("queryRequest_2", { name: name });
// });
