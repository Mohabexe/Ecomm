document.addEventListener("DOMContentLoaded", function () {
  const menuToggle = document.getElementById("menu-toggle")
  const mobileMenu = document.getElementById("mobile-menu")
  const closeMenu = document.getElementById("close-menu")

  let cart = JSON.parse(localStorage.getItem("cart")) || []
  let wishlist = JSON.parse(localStorage.getItem("wishlist")) || []

  updateCartCountBadge()

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

  const addToCartButtons = document.querySelectorAll(".add-to-cart")
  if (addToCartButtons.length > 0) {
    addToCartButtons.forEach((button) => {
      button.addEventListener("click", function () {
        const productItem = this.closest(".product-item")
        const productName = productItem.querySelector(
          ".product-details h3"
        ).textContent
        const productPrice =
          productItem.querySelector(".product-price").textContent
        const productImage = productItem.querySelector(".product-image img").src

        const product = {
          id: Date.now(),
          name: productName,
          price: productPrice,
          image: productImage,
          quantity: 1,
        }

        const existingProductIndex = cart.findIndex(
          (item) => item.name === productName
        )

        if (existingProductIndex > -1) {
          cart[existingProductIndex].quantity += 1
          showNotification(`Increased ${productName} quantity in cart`)
        } else {
          cart.push(product)
          showNotification(`${productName} added to cart`)
        }

        saveCartToLocalStorage()
        updateCartCountBadge()
      })
    })
  }

  const saveToListButtons = document.querySelectorAll(".save-to-list")
  if (saveToListButtons.length > 0) {
    saveToListButtons.forEach((button) => {
      button.addEventListener("click", function () {
        const productItem = this.closest(".product-item")
        const productName = productItem.querySelector(
          ".product-details h3"
        ).textContent
        const productPrice =
          productItem.querySelector(".product-price").textContent
        const productImage = productItem.querySelector(".product-image img").src

        const product = {
          id: Date.now(),
          name: productName,
          price: productPrice,
          image: productImage,
        }

        const productExists = wishlist.some((item) => item.name === productName)

        if (!productExists) {
          wishlist.push(product)
          showNotification(`${productName} saved to your list`)
          saveWishlistToLocalStorage()
        } else {
          showNotification(`${productName} is already in your list`)
        }
      })
    })
  }

  const viewButtons = document.querySelectorAll(".view-product")
  if (viewButtons.length > 0) {
    viewButtons.forEach((button) => {
      button.addEventListener("click", function () {
        const productItem = this.closest(".product-item")
        const productName = productItem.querySelector(
          ".product-details h3"
        ).textContent

        const productPrice =
          productItem.querySelector(".product-price").textContent
        const productImage = productItem.querySelector(".product-image img").src

        const product = {
          id: Date.now(),
          name: productName,
          price: productPrice,
          image: productImage,
          quantity: 1,
        }

        cart.push(product)
        showNotification(`${productName} added to cart`)

        saveCartToLocalStorage()
        updateCartCountBadge()
      })
    })
  }

  function saveCartToLocalStorage() {
    localStorage.setItem("cart", JSON.stringify(cart))
  }

  function saveWishlistToLocalStorage() {
    localStorage.setItem("wishlist", JSON.stringify(wishlist))
  }

  function updateCartCountBadge() {
    let cartCountBadge = document.querySelector(".cart-count")

    if (!cartCountBadge) {
      const header = document.querySelector("header div")
      if (header) {
        const cartContainer = document.createElement("div")
        cartContainer.className = "cart-container"
        cartContainer.style.position = "relative"
        cartContainer.style.cursor = "pointer"

        const cartIcon = document.createElement("img")
        cartIcon.src = "./Assets/grocery-store.png"
        cartIcon.alt = "Cart"
        cartIcon.style.width = "24px"
        cartIcon.style.height = "24px"

        cartCountBadge = document.createElement("span")
        cartCountBadge.className = "cart-count"
        cartCountBadge.style.position = "absolute"
        cartCountBadge.style.top = "-8px"
        cartCountBadge.style.right = "-8px"
        cartCountBadge.style.backgroundColor = "#4169FF"
        cartCountBadge.style.color = "white"
        cartCountBadge.style.borderRadius = "50%"
        cartCountBadge.style.width = "20px"
        cartCountBadge.style.height = "20px"
        cartCountBadge.style.display = "flex"
        cartCountBadge.style.justifyContent = "center"
        cartCountBadge.style.alignItems = "center"
        cartCountBadge.style.fontSize = "12px"
        cartCountBadge.style.fontWeight = "bold"

        cartContainer.appendChild(cartIcon)
        cartContainer.appendChild(cartCountBadge)
        header.insertBefore(cartContainer, header.firstChild)

        cartContainer.addEventListener("click", function () {
          window.location.href = "checkout.html"
        })
      }
    }

    const totalQuantity = cart.reduce((total, item) => total + item.quantity, 0)

    if (cartCountBadge) {
      cartCountBadge.textContent = totalQuantity
      cartCountBadge.style.display = totalQuantity > 0 ? "flex" : "none"
    }
  }

  function showNotification(message) {
    let notification = document.querySelector(".cart-notification")

    if (!notification) {
      notification = document.createElement("div")
      notification.className = "cart-notification"
      notification.style.position = "fixed"
      notification.style.bottom = "20px"
      notification.style.right = "20px"
      notification.style.backgroundColor = "#4169FF"
      notification.style.color = "white"
      notification.style.padding = "12px 20px"
      notification.style.borderRadius = "4px"
      notification.style.boxShadow = "0 2px 10px rgba(0, 0, 0, 0.2)"
      notification.style.zIndex = "1000"
      notification.style.opacity = "0"
      notification.style.transition = "opacity 0.3s ease"
      document.body.appendChild(notification)
    }

    notification.textContent = message
    notification.style.opacity = "1"

    setTimeout(() => {
      notification.style.opacity = "0"
    }, 3000)
  }

  if (window.location.pathname.includes("checkout.html")) {
    displayCartItems()
  }

  function displayCartItems() {
    const checkoutContainer = document.querySelector(".checkout-container")
    if (!checkoutContainer || cart.length === 0) return

    const cartSummary = document.createElement("div")
    cartSummary.className = "cart-summary"
    cartSummary.style.marginTop = "30px"
    cartSummary.style.width = "100%"

    const cartHeader = document.createElement("div")
    cartHeader.style.display = "flex"
    cartHeader.style.justifyContent = "space-between"
    cartHeader.style.alignItems = "center"
    cartHeader.style.marginBottom = "20px"

    const cartTitle = document.createElement("h2")
    cartTitle.textContent = "Your Cart"
    cartTitle.style.color = "#4169FF"
    cartTitle.style.margin = "0"

    const clearCartButton = document.createElement("button")
    clearCartButton.textContent = "Clear Cart"
    clearCartButton.className = "clear-cart-btn"
    clearCartButton.style.backgroundColor = "#ff4169"
    clearCartButton.style.color = "white"
    clearCartButton.style.border = "none"
    clearCartButton.style.borderRadius = "4px"
    clearCartButton.style.padding = "8px 16px"
    clearCartButton.style.cursor = "pointer"
    clearCartButton.style.fontSize = "14px"
    clearCartButton.style.fontWeight = "bold"
    clearCartButton.style.transition = "background-color 0.3s ease"

    clearCartButton.addEventListener("mouseover", function () {
      this.style.backgroundColor = "#e03050"
    })
    clearCartButton.addEventListener("mouseout", function () {
      this.style.backgroundColor = "#ff4169"
    })

    clearCartButton.addEventListener("click", function () {
      cart = []
      saveCartToLocalStorage()
      updateCartCountBadge()
      showNotification("Your cart has been cleared")
      cartSummary.remove()
      const emptyCartMessage = document.createElement("p")
      emptyCartMessage.textContent =
        "Your cart is empty. Add some products from our shop!"
      emptyCartMessage.style.textAlign = "center"
      emptyCartMessage.style.marginTop = "20px"
      emptyCartMessage.style.color = "#666"

      const shopLink = document.createElement("a")
      shopLink.href = "products.html"
      shopLink.textContent = "Continue Shopping"
      shopLink.style.display = "block"
      shopLink.style.textAlign = "center"
      shopLink.style.marginTop = "20px"
      shopLink.style.textDecoration = "none"
      shopLink.style.color = "#4169FF"
      shopLink.style.fontWeight = "bold"

      const checkoutDetails = document.querySelector(".checkout-details")
      if (checkoutDetails) {
        checkoutDetails.appendChild(emptyCartMessage)
        checkoutDetails.appendChild(shopLink)
      }
    })

    cartHeader.appendChild(cartTitle)
    cartHeader.appendChild(clearCartButton)
    cartSummary.appendChild(cartHeader)

    let total = 0

    cart.forEach((item) => {
      const itemPrice = parseFloat(item.price.replace("$", ""))
      total += itemPrice * item.quantity

      const cartItem = document.createElement("div")
      cartItem.style.display = "flex"
      cartItem.style.justifyContent = "space-between"
      cartItem.style.alignItems = "center"
      cartItem.style.marginBottom = "15px"
      cartItem.style.padding = "10px"
      cartItem.style.borderBottom = "1px solid #eee"

      const itemInfo = document.createElement("div")
      itemInfo.innerHTML = `
        <p><strong>${item.name}</strong> x ${item.quantity}</p>
        <p>${item.price} each</p>
      `

      const itemTotal = document.createElement("div")
      itemTotal.innerHTML = `<p><strong>$${(itemPrice * item.quantity).toFixed(
        2
      )}</strong></p>`

      cartItem.appendChild(itemInfo)
      cartItem.appendChild(itemTotal)
      cartSummary.appendChild(cartItem)
    })

    const totalRow = document.createElement("div")
    totalRow.style.display = "flex"
    totalRow.style.justifyContent = "space-between"
    totalRow.style.marginTop = "20px"
    totalRow.style.padding = "10px"
    totalRow.style.borderTop = "2px solid #4169FF"

    const totalLabel = document.createElement("p")
    totalLabel.innerHTML = "<strong>Total:</strong>"
    totalLabel.style.fontSize = "18px"

    const totalAmount = document.createElement("p")
    totalAmount.innerHTML = `<strong>$${total.toFixed(2)}</strong>`
    totalAmount.style.fontSize = "18px"
    totalAmount.style.color = "#4169FF"

    totalRow.appendChild(totalLabel)
    totalRow.appendChild(totalAmount)
    cartSummary.appendChild(totalRow)

    const checkoutDetails = document.querySelector(".checkout-details")
    if (checkoutDetails) {
      checkoutDetails.appendChild(cartSummary)
    }
  }

  function initializeCarousel() {
    const slidesContainer = document.getElementById("carousel-slides")
    const prevButton = document.getElementById("prev-slide")
    const nextButton = document.getElementById("next-slide")
    const dotsContainer = document.getElementById("carousel-dots")

    if (!slidesContainer || !prevButton || !nextButton || !dotsContainer) return

    const slides = slidesContainer.querySelectorAll(".carousel-slide")
    if (slides.length === 0) return

    let currentSlide = 0

    slides.forEach((_, index) => {
      const dot = document.createElement("div")
      dot.classList.add("carousel-dot")
      if (index === 0) dot.classList.add("active")

      dot.addEventListener("click", () => {
        goToSlide(index)
      })

      dotsContainer.appendChild(dot)
    })

    function goToSlide(slideIndex) {
      if (slideIndex < 0) {
        slideIndex = slides.length - 1
      } else if (slideIndex >= slides.length) {
        slideIndex = 0
      }

      slidesContainer.style.transform = `translateX(-${slideIndex * 100}%)`

      document.querySelectorAll(".carousel-dot").forEach((dot, index) => {
        dot.classList.toggle("active", index === slideIndex)
      })

      currentSlide = slideIndex
    }

    prevButton.addEventListener("click", () => {
      goToSlide(currentSlide - 1)
    })

    nextButton.addEventListener("click", () => {
      goToSlide(currentSlide + 1)
    })

    let autoSlideInterval = setInterval(() => {
      goToSlide(currentSlide + 1)
    }, 5000)

    slidesContainer.addEventListener("mouseenter", () => {
      clearInterval(autoSlideInterval)
    })

    slidesContainer.addEventListener("mouseleave", () => {
      autoSlideInterval = setInterval(() => {
        goToSlide(currentSlide + 1)
      }, 5000)
    })

    let touchStartX = 0
    let touchEndX = 0

    slidesContainer.addEventListener("touchstart", (e) => {
      touchStartX = e.changedTouches[0].screenX
    })

    slidesContainer.addEventListener("touchend", (e) => {
      touchEndX = e.changedTouches[0].screenX
      handleSwipe()
    })

    function handleSwipe() {
      if (touchEndX < touchStartX) {
        goToSlide(currentSlide + 1)
      } else if (touchEndX > touchStartX) {
        goToSlide(currentSlide - 1)
      }
    }

    goToSlide(0)
  }

  initializeCarousel()
})
