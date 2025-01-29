import express from "express";
import router from "./routes/user.routes.js";
import "dotenv/config";

const app = express();
const port = process.env.PORT||3000;

app.get("/", (req, res) => {
  res.send("Hello");
});

app.use("/", router);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
