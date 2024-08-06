const mongoose = require("mongoose");

mongoose
  .connect(
    "mongodb+srv://admin:1Pjf0fLEFTgtWhbU@cluster0.wckll5g.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
  )

  .then(() => {
    console.log("Saanu assi database chala vange chak doo");
  })
  .catch((err) => {
    console.log("Database connection failed", err);
  });

const userSchema = mongoose.Schema({
  username: String,
  name: String,
  age: Number,
});

module.exports = mongoose.model("user", userSchema);
