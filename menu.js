// Mobile menu toggle functionality
document.addEventListener("DOMContentLoaded", function () {
  const menuToggle = document.getElementById("menu-toggle")
  const mobileMenu = document.getElementById("mobile-menu")
  const closeMenu = document.getElementById("close-menu")

  menuToggle.addEventListener("click", () => {
    mobileMenu.classList.add("active")
  })

  closeMenu.addEventListener("click", () => {
    mobileMenu.classList.remove("active")
  })
})
