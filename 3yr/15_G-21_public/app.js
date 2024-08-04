const express = require("express");
const app = express();
const port = 3000;

app.listen(port, () => {
  console.log(`Server runnging on port ${port}`);
});

app.set("view engine", "ejs");
app.use(express.static("./public")); // here we are telling express to look into public directory for static files(stylesheets, photos, javascript files)

app.get("/home/:name", (req, res) => {
  let name = req.params.name;
  res.render("home", { name: "aap log" });
});
