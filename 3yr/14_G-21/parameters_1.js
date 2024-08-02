const express = require("express");
const app = express();
const port = 3000;

// Define the route for /user/:name
app.get("/user/:name", (req, res) => {
  // Accessing the route parameter
  console.log(req.params);
  res.json({
    message: "We got the parameter",
    name: req.params.name,
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

// const express = require("express");
// const app = express();
// const port = 3000;
// app.listen(port, () => {
//   console.log(`Example app listening at http://localhost:${port}`);
// });

// //req access from params for variables
// app.use("/user/:name", (req, res) => {
//   //localhost:3000/user/rohan
//   console.log(req.params);
//   res.json({
//     message: "we got the parameter",
//   });
// });
