document.addEventListener("DOMContentLoaded", function () {
  // Mobile Menu Toggle
  const menuToggle = document.querySelector(".menu-toggle");
  const navLinks = document.querySelector(".nav-links");

  if (menuToggle) {
    menuToggle.addEventListener("click", function () {
      navLinks.classList.toggle("active");
    });
  }
  // Close the menu when clicking outside
  document.addEventListener("click", function (event) {
    if (
      !event.target.closest(".navbar") &&
      navLinks.classList.contains("active")
    ) {
      navLinks.classList.remove("active");
    }
  });
});
