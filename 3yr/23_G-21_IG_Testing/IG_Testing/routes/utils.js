const fs = require("fs");
const path = require("path");

// Load default profile images from the directory only once
const defaultImagesDir = path.join(
  __dirname,
  "..",
  "public",
  "images",
  "profiles",
  "def"
);
defaultImages = fs
  .readdirSync(defaultImagesDir)
  .filter((file) => file.endsWith(".png") || file.endsWith(".jpg"));

function getRandomDefaultImage() {
  return defaultImages[Math.floor(Math.random() * defaultImages.length)];
}

module.exports = {
  getRandomDefaultImage,
};
