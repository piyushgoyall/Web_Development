// theme.js

document.addEventListener("DOMContentLoaded", () => {
  const isDarkMode = localStorage.getItem("theme") === "dark";
  document.body.classList.toggle("dark-theme", isDarkMode);

  // Update the checkbox to match the stored theme preference
  const themeToggle = document.getElementById("theme-toggle");
  if (themeToggle) {
    themeToggle.checked = isDarkMode;
  }
});

function toggleDarkTheme() {
  const isDark = document.body.classList.toggle("dark-theme");
  localStorage.setItem("theme", isDark ? "dark" : "light");

  // Update the checkbox state explicitly
  const themeToggle = document.getElementById("theme-toggle");
  if (themeToggle) {
    themeToggle.checked = isDark;
  }
}
