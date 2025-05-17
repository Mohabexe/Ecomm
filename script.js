document.addEventListener("DOMContentLoaded", function () {
  const menuToggle = document.getElementById("menu-toggle")
  const mobileMenu = document.getElementById("mobile-menu")
  const closeMenu = document.getElementById("close-menu")

  if (menuToggle && mobileMenu && closeMenu) {
    menuToggle.addEventListener("click", () => {
      mobileMenu.classList.add("active")
    })

    closeMenu.addEventListener("click", () => {
      mobileMenu.classList.remove("active")
    })
  }

  const accordionHeaders = document.querySelectorAll(".accordion-header")
  if (accordionHeaders) {
    accordionHeaders.forEach((header) => {
      header.addEventListener("click", function () {
        const accordionItem = this.parentElement

        accordionItem.classList.toggle("active")
        this.classList.toggle("active")

        const allItems = document.querySelectorAll(".accordion-item")
        allItems.forEach((item) => {
          if (item !== accordionItem && item.classList.contains("active")) {
            item.classList.remove("active")
            item.querySelector(".accordion-header").classList.remove("active")
          }
        })
      })
    })
  }

  const signupForm = document.querySelector(".signup-form")
  if (signupForm) {
    signupForm.addEventListener("submit", function (event) {
      event.preventDefault()

      const fullname = document.getElementById("fullname")
      const email = document.getElementById("email")
      const password = document.getElementById("password")
      const confirmPassword = document.getElementById("confirm-password")

      clearErrors()

      let isValid = true

      if (!fullname.value || fullname.value.trim().length < 3) {
        showError(fullname, "Please enter a valid name (at least 3 characters)")
        isValid = false
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!email.value || !emailRegex.test(email.value)) {
        showError(email, "Please enter a valid email address")
        isValid = false
      }

      const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{8,}$/
      if (!password.value || !passwordRegex.test(password.value)) {
        showError(
          password,
          "Password must be at least 8 characters with at least one number and one uppercase letter"
        )
        isValid = false
      }

      if (confirmPassword.value !== password.value) {
        showError(confirmPassword, "Passwords do not match")
        isValid = false
      }

      if (isValid) {
        alert("Signup successful! Redirecting to login...")
        window.location.href = "signin.html"
      }
    })
  }

  const signinForm = document.querySelector(".signin-form")
  if (signinForm) {
    signinForm.addEventListener("submit", function (event) {
      event.preventDefault()

      const email = document.getElementById("email")
      const password = document.getElementById("password")

      clearErrors()

      let isValid = true

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!email.value || !emailRegex.test(email.value)) {
        showError(email, "Please enter a valid email address")
        isValid = false
      }

      if (!password.value || password.value.trim() === "") {
        showError(password, "Please enter your password")
        isValid = false
      }

      if (isValid) {
        alert("Login successful! Redirecting to home page...")
        window.location.href = "index.html"
      }
    })
  }

  const checkoutForm = document.querySelector(".card-details")
  if (checkoutForm) {
    const payBtn = document.querySelector(".pay-btn")
    if (payBtn) {
      payBtn.addEventListener("click", function (event) {
        event.preventDefault()

        const cardNumber = document.getElementById("card-number")
        const expiration = document.getElementById("expiration")
        const cvv = document.getElementById("cvv")
        const cardHolder = document.getElementById("card-holder")

        clearErrors()

        let isValid = true

        const cardNumberRegex = /^[\d\s]{15,19}$/
        if (
          !cardNumber.value ||
          !cardNumberRegex.test(cardNumber.value.replace(/\s/g, ""))
        ) {
          showError(cardNumber, "Please enter a valid card number")
          isValid = false
        }

        const expirationRegex = /^(0[1-9]|1[0-2])\/([0-9]{2})$/
        if (!expiration.value || !expirationRegex.test(expiration.value)) {
          showError(expiration, "Please enter a valid expiration date (MM/YY)")
          isValid = false
        } else {
          const today = new Date()
          const currentMonth = today.getMonth() + 1
          const currentYear = today.getFullYear() % 100

          const [month, year] = expiration.value.split("/").map(Number)

          if (
            year < currentYear ||
            (year === currentYear && month < currentMonth)
          ) {
            showError(expiration, "Card has expired")
            isValid = false
          }
        }

        const cvvRegex = /^[0-9]{3,4}$/
        if (!cvv.value || !cvvRegex.test(cvv.value)) {
          showError(cvv, "Please enter a valid CVV (3 or 4 digits)")
          isValid = false
        }

        if (!cardHolder.value || cardHolder.value.trim().length < 3) {
          showError(cardHolder, "Please enter the cardholder's name")
          isValid = false
        }

        if (isValid) {
          alert("Payment successful! Thank you for your purchase!")
        }
      })
    }
  }

  const contactForm = document.querySelector(".contact-form")
  if (contactForm) {
    contactForm.addEventListener("submit", function (event) {
      event.preventDefault()

      const firstName = document.getElementById("firstName")
      const lastName = document.getElementById("lastName")
      const email = document.getElementById("email")
      const message = document.getElementById("message")

      clearErrors()

      let isValid = true

      if (!firstName.value || firstName.value.trim().length < 2) {
        showError(firstName, "Please enter your first name")
        isValid = false
      }

      if (!lastName.value || lastName.value.trim().length < 2) {
        showError(lastName, "Please enter your last name")
        isValid = false
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!email.value || !emailRegex.test(email.value)) {
        showError(email, "Please enter a valid email address")
        isValid = false
      }

      if (!message.value || message.value.trim().length < 10) {
        showError(message, "Please enter a message with at least 10 characters")
        isValid = false
      }

      if (isValid) {
        alert(
          "Thank you for your message! Our team will get back to you shortly."
        )
        contactForm.reset()
      }
    })
  }

  function showError(inputElement, message) {
    const parent = inputElement.parentElement
    const existingError = parent.querySelector(".error-message")
    if (existingError) {
      existingError.remove()
    }

    const errorElement = document.createElement("div")
    errorElement.className = "error-message"
    errorElement.textContent = message
    errorElement.style.color = "red"
    errorElement.style.fontSize = "0.8rem"
    errorElement.style.marginTop = "5px"

    inputElement.style.borderColor = "red"

    parent.appendChild(errorElement)
  }

  function clearErrors() {
    const errorMessages = document.querySelectorAll(".error-message")
    errorMessages.forEach((error) => error.remove())

    const formInputs = document.querySelectorAll("input, textarea")
    formInputs.forEach((input) => {
      input.style.borderColor = ""
    })
  }

  function addSearchBarFunctionality(
    formId,
    inputId,
    productSelector,
    nameSelector
  ) {
    const searchForm = document.getElementById(formId)
    const searchInput = document.getElementById(inputId)
    if (searchForm && searchInput) {
      searchForm.addEventListener("submit", function (e) {
        e.preventDefault()
        filterProducts()
      })
      searchInput.addEventListener("input", filterProducts)

      function filterProducts() {
        const query = searchInput.value.trim().toLowerCase()
        const products = document.querySelectorAll(productSelector)
        products.forEach((item) => {
          const name = item.querySelector(nameSelector)
          if (name && name.textContent.toLowerCase().includes(query)) {
            item.style.display = ""
          } else {
            item.style.display = "none"
          }
        })
      }
    }
  }

  addSearchBarFunctionality(
    "product-search-form",
    "product-search-input",
    ".product-item",
    ".product-details h3"
  )
  addSearchBarFunctionality(
    "trending-search-form",
    "trending-search-input",
    ".trending-item",
    ".trending-details h3"
  )
})
