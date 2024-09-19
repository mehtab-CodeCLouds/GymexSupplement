// Fixed navbar
$(window).scroll(function () {
  if ($(this).scrollTop() > 200) {
    $("header").addClass("fixed-nav");
  } else {
    $("header").removeClass("fixed-nav");
  }
});
// Fixed navbar End

// ===============================================================================
// Select all elements that have the 'aria-current' attribute set to 'page'
const currentPageLinks = document.querySelectorAll('[aria-current="page"]');

// Loop through each element and add the 'active' class
currentPageLinks.forEach((link) => {
  link.classList.add("active");
});
// ===============================================================================

$("#offer-items").owlCarousel({
  loop: true,
  margin: 24,
  nav: true,
  dots: false,
  navText: [
    '<svg id="Layer_1" enable-background="new 0 0 100 100" height="44" viewBox="0 0 100 100" width="44" xmlns="http://www.w3.org/2000/svg"><path d="m65.4 52h-51.69c-1.1 0-2-.9-2-2s.9-2 2-2h51.69c1.1 0 2 .9 2 2s-.9 2-2 2z"/><circle clip-rule="evenodd" cx="83.55" cy="50" fill-rule="evenodd" r="2"/><circle clip-rule="evenodd" cx="74.47" cy="50" fill-rule="evenodd" r="2"/><path d="m26.99 67.62c-.57 0-1.13-.24-1.52-.7l-13.28-15.62c-.63-.75-.63-1.84 0-2.59l13.28-15.62c.71-.84 1.98-.94 2.82-.23.84.72.94 1.98.23 2.82l-12.18 14.32 12.18 14.33c.72.84.61 2.1-.23 2.82-.38.32-.84.47-1.3.47z"/></svg>',
    '<svg id="Layer_1" enable-background="new 0 0 100 100" height="44" viewBox="0 0 100 100" width="44" xmlns="http://www.w3.org/2000/svg"><path d="m86.29 52h-51.69c-1.1 0-2-.9-2-2s.9-2 2-2h51.69c1.1 0 2 .9 2 2s-.9 2-2 2z"/><path clip-rule="evenodd" d="m16.45 48c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .89-2 2-2z" fill-rule="evenodd"/><circle clip-rule="evenodd" cx="25.52" cy="50" fill-rule="evenodd" r="2"/><path d="m73 67.62c-.46 0-.92-.16-1.29-.48-.84-.72-.94-1.98-.23-2.82l12.18-14.32-12.18-14.33c-.72-.84-.61-2.1.23-2.82s2.1-.61 2.82.23l13.28 15.62c.63.75.63 1.84 0 2.59l-13.28 15.63c-.4.47-.96.7-1.53.7z"/></svg>',
  ],
  responsive: {
    0: {
      items: 1,
    },
    560: {
      items: 2,
    },
    767: {
      items: 3,
    },
    1200: {
      items: 4,
    },
  },
});

// Scroll Top navbar
$(window).scroll(function () {
  if ($(this).scrollTop() > 300) {
    $(".scroll-top").addClass("scroll-top-show");
  } else {
    $(".scroll-top").removeClass("scroll-top-show");
  }
});
// Scroll Top End

// Bootstrap Tooltip
const tooltipTriggerList = document.querySelectorAll(
  '[data-bs-toggle="tooltip"]'
);
const tooltipList = [...tooltipTriggerList].map(
  (tooltipTriggerEl) => new bootstrap.Tooltip(tooltipTriggerEl)
);
// Bootstrap Tooltip End

// ======================================================================================
// Add to cart functionality
const viewCartBtn = document.getElementById("view-cart-btn");
const myCartContainer = document.querySelector(".cart-item-wrap");
const productContainer = document.querySelectorAll(".product-wrap");
const totalCartPrice = document.getElementById("cart-total");
const cartCount = document.getElementById("cart-count");
const checkoutBtn = document.getElementById("checkout-btn");

myCartContainer.innerHTML = [];
let productsAll = [];

// Load cart items from localStorage on page load
function loadCartFromLocalStorage() {
  const storedCart = localStorage.getItem("cartItems");
  if (storedCart) {
    productsAll = JSON.parse(storedCart);
    updateCart(); // Render the cart
    updateCartCount(); // Update cart count after loading cart items
  }
}

// Save cart items to localStorage
function saveCartToLocalStorage() {
  localStorage.setItem("cartItems", JSON.stringify(productsAll));
}

// Update cart count
function updateCartCount() {
  cartCount.textContent = productsAll.length; // Count only unique products
}
updateCartCount();

// Format numbers with commas
function formattedNumber(number) {
  return number.toLocaleString("en-IN");
}

// Create cart item element
function cartItemList(productData) {
  const cartItem = document.createElement("div");
  cartItem.classList.add("cart-item");
  cartItem.dataset.id = productData.id;
  cartItem.innerHTML = `
    <a href="#" class="cart-img-wrap">
      <img src="${productData.image}" alt="">
    </a>
    <div class="cart-content">
      <a href="#">
        <h5>${productData.name}</h5>
      </a>
      <div class="price">
        <span>INR ${formattedNumber(productData.price * 1.2)}</span>
        INR ${formattedNumber(parseInt(productData.price))}
      </div>
      <div class="d-flex align-items-center">
        <div class="quantity-wrap">
          <button class="quantity-btn quantity-minus">
            <i class="fa-regular fa-minus"></i>
          </button>
          <input type="number" class="quantity__input" value="${
            productData.quantity
          }" min="1">
          <button class="quantity-btn quantity-plus">
            <i class="fa-regular fa-plus"></i>
          </button>
        </div>
        <a href="#" class="item-remove">remove</a>
      </div>
    </div>`;

  myCartContainer.appendChild(cartItem);

  // Add event listeners for plus and minus buttons
  cartItem
    .querySelector(".quantity-minus")
    .addEventListener("click", () => changeQuantity(productData.id, -1));
  cartItem
    .querySelector(".quantity-plus")
    .addEventListener("click", () => changeQuantity(productData.id, 1));
  cartItem
    .querySelector(".quantity__input")
    .addEventListener("input", (e) => updateQuantityInput(productData.id, e));
}

// Show empty cart message if no products in the cart
function emptyCart() {
  if (productsAll.length === 0) {
    const emptyCartContent = document.createElement("div");
    emptyCartContent.classList.add("empty-cart-content");
    emptyCartContent.innerHTML = `<i class="fa-solid fa-cart-plus"></i>
          <h3>Your cart is empty</h3>
          <p>
            Before proceeding to checkout, you must add some products to your
            shopping cart. You will find a lot of interesting products on our
            "Shop" page.
          </p>`;
    myCartContainer.appendChild(emptyCartContent);
    checkoutBtn && (checkoutBtn.disabled = true);
  } else {
    removeEmptyCart(); // Remove empty cart content if cart is not empty
  }
}

// Remove empty cart content
function removeEmptyCart() {
  const emptyCartElement = myCartContainer.querySelector(".empty-cart-content");
  if (emptyCartElement) {
    emptyCartElement.remove();
    checkoutBtn && (checkoutBtn.disabled = false);
  }
}

// Function to handle product data when added to cart
function ProductData(e) {
  const currProduct = e.target.closest(".product-item");
  const productId = currProduct.dataset.id;
  const existingProduct = productsAll.find(
    (product) => product.id === productId
  );

  if (existingProduct) {
    // If product exists, increase its quantity
    existingProduct.quantity += 1;
    updateCart();
  } else {
    // Create new product object and add to array
    const productData = {
      id: productId,
      name: currProduct.dataset.name,
      price: parseFloat(currProduct.dataset.price),
      image: currProduct.dataset.image,
      quantity: 1,
    };
    productsAll.push(productData);
    cartItemList(productData); // Add to cart display
  }

  calculateTotalPrice();
  updateCartCount();
  saveCartToLocalStorage(); // Save updated cart to localStorage
}

// Add event listener to each product's "Add to Cart" button
productContainer.forEach((currSec) => {
  currSec.addEventListener("click", function (e) {
    if (!e.target) return;

    const addCartBtn = e.target.closest(".add-cart-btn");

    if (!addCartBtn) return;
    e.preventDefault();
    ProductData(e);
    emptyCart();
  });
});

// Remove product from cart
myCartContainer.addEventListener("click", function (e) {
  const btnRemove = e.target.classList.contains("item-remove");

  if (!btnRemove) return;

  e.preventDefault();
  const cartItemElement = e.target.closest(".cart-item");
  const productId = cartItemElement.dataset.id;
  cartItemElement.remove();

  // Filter the product out of the array
  productsAll = productsAll.filter((product) => product.id !== productId);

  // Recalculate the total price
  calculateTotalPrice();
  updateCartCount();
  saveCartToLocalStorage(); // Save updated cart to localStorage
  updateCart();
});

// Update the cart display after quantity change
function updateCart() {
  myCartContainer.innerHTML = ""; // Clear the container
  productsAll.forEach((product) => cartItemList(product)); // Re-render all products
  calculateTotalPrice();
  emptyCart();
}

// Change quantity of a product
function changeQuantity(id, change) {
  const product = productsAll.find((item) => item.id === id);
  if (!product) return;

  product.quantity += change;
  if (product.quantity <= 0) {
    // Remove product if quantity is zero
    productsAll = productsAll.filter((item) => item.id !== id);
  }

  updateCart();
  updateCartCount();
  saveCartToLocalStorage(); // Save updated cart to localStorage
}

// Handle quantity input changes directly from input field
function updateQuantityInput(id, e) {
  const newQuantity = parseInt(e.target.value, 10);
  if (isNaN(newQuantity) || newQuantity < 1) return;

  const product = productsAll.find((item) => item.id === id);
  if (product) {
    product.quantity = newQuantity;
    updateCart();
    updateCartCount();
    saveCartToLocalStorage(); // Save updated cart to localStorage
  }
}

// Calculate total price of all products in cart
function calculateTotalPrice() {
  const totalPrice = productsAll.reduce((accumulator, product) => {
    return accumulator + product.price * product.quantity; // Ensure price is treated as a number
  }, 0); // Start the accumulator at 0

  totalCartPrice.innerText = `${formattedNumber(totalPrice)}`;
}

// =================================================================================
// Product Details Page Functionality
const productDetailsQty = document.querySelector("#product-details-quantity");
if (productDetailsQty) {
  const productQtyInput = productDetailsQty.querySelector(".quantity__input");

  productDetailsQty.addEventListener("click", function (e) {
    if (e.target.closest(".quantity-minus")) {
      productQtyInput.stepDown();
    } else if (e.target.closest(".quantity-plus")) {
      productQtyInput.stepUp();
    }
  });

  const productCartBtn = document.querySelectorAll(".product-cart-button");

  productCartBtn.forEach((curr) => {
    curr.addEventListener("click", function (e) {
      e.preventDefault();

      const currProduct = curr.closest(".product-details-content");
      const productQtyValue = parseInt(productQtyInput.value);

      // Check if quantity is valid
      if (isNaN(productQtyValue) || productQtyValue < 1) return;

      // Get product details from the data attributes on the page
      const productId = currProduct.dataset.id;
      const productName = currProduct.dataset.name;
      const productPrice = parseFloat(currProduct.dataset.price);
      const productImage = currProduct.dataset.image;

      // Check if product already exists in the cart
      const existingProduct = productsAll.find(
        (product) => product.id === productId
      );

      if (existingProduct) {
        // If product exists, increase its quantity
        existingProduct.quantity += productQtyValue;
        updateCart();
      } else {
        // Create new product object and add it to the array
        const productData = {
          id: productId,
          name: productName,
          price: productPrice,
          image: productImage,
          quantity: productQtyValue,
        };

        productsAll.push(productData); // Add the product to the cart array
        cartItemList(productData); // Add to cart display
      }

      // Update the cart UI, total price, and localStorage
      calculateTotalPrice();
      updateCartCount();
      saveCartToLocalStorage();
      emptyCart();
    });
  });
}

// Load cart items from localStorage on page load
window.onload = function () {
  loadCartFromLocalStorage();
  loadWishlistFromLocalStorage();
  addActiveWishlist();
  loadWishlistCount();
};

// Wishlist functionality
// ===============================================
const wishlistBtns = document.querySelectorAll(".add-wishlist-btn");
const wishlistCount = document.getElementById("wishlist-count");
const wishlistItemsContainer = document.getElementById("wishlist-items-wrap");

let wishlistAll = [];
wishlistItemsContainer ? (wishlistItemsContainer.innerHTML = "") : null;

// Load wishlist items from localStorage on page load
function loadWishlistFromLocalStorage() {
  const storedWishlist = localStorage.getItem("wishlistItems");
  if (storedWishlist) {
    wishlistAll = JSON.parse(storedWishlist);
    if (wishlistAll.length === 0) {
      emptyWishlistContent(); // Show empty wishlist if no items are present
    } else {
      addWishlistItems();
      loadWishlistCount();
    }
  } else {
    emptyWishlistContent(); // Show empty wishlist if no stored items
  }
}

// Save wishlist items to localStorage
function saveWishlistToLocalStorage() {
  localStorage.setItem("wishlistItems", JSON.stringify(wishlistAll));
}

// Add active class to wishlist items based on localStorage
function addActiveWishlist() {
  wishlistAll.forEach((wishlistItem) => {
    wishlistBtns.forEach((btn) => {
      const btnId = btn.closest(".product-item")?.dataset.id;
      if (btnId === wishlistItem.id) {
        btn.classList.add("wishlist-active");
      }
    });
    productWishlistBtn.forEach((btn) => {
      const btnId = btn.closest(".product-details-content")?.dataset.id;
      if (btnId === wishlistItem.id) {
        btn.classList.add("wishlist-active");
      }
    });
  });
}

// Load the wishlist count
function loadWishlistCount() {
  wishlistCount.innerHTML = wishlistAll.length;
}

const productWishlistBtn = document.querySelectorAll(".product-wishlist-btn");

productWishlistBtn.forEach((currBtn) => {
  currBtn?.addEventListener("click", function (e) {
    e.preventDefault();
    const wishlistData = e.target.closest(".product-details-content");

    const currWishlist = {
      name: wishlistData.dataset.name,
      price: wishlistData.dataset.price,
      id: wishlistData.dataset.id,
      img: wishlistData.dataset.image,
    };

    const existingItem = wishlistAll.find(
      (wishlist) => wishlist.id === currWishlist.id
    );

    if (existingItem) {
      // If the item already exists, remove it from the wishlist
      wishlistAll = wishlistAll.filter(
        (wishlist) => wishlist.id !== currWishlist.id
      );
      currBtn.classList.remove("wishlist-active");
    } else {
      // Otherwise, add it to the wishlist
      wishlistAll.push(currWishlist);
      currBtn.classList.add("wishlist-active");
    }

    // Update the wishlist count and save the updated wishlist to localStorage
    loadWishlistCount();
    saveWishlistToLocalStorage();

    // Re-check if the wishlist is empty
    if (wishlistAll.length === 0) {
      emptyWishlistContent();
    }
  });
});

// Add event listener to each product for adding/removing to/from the wishlist
document.querySelectorAll(".product-item").forEach((curr) => {
  curr.addEventListener("click", function (e) {
    const addWishlistBtn = e.target.closest(".add-wishlist-btn");

    if (!addWishlistBtn) return;

    e.preventDefault();

    const wishlistData = e.target.closest(".product-item");
    const currWishlist = {
      name: wishlistData.dataset.name,
      price: wishlistData.dataset.price,
      id: wishlistData.dataset.id,
      img: wishlistData.dataset.image,
    };

    const existingItem = wishlistAll.find(
      (wishlist) => wishlist.id === currWishlist.id
    );

    if (existingItem) {
      // If the item already exists, remove it from the wishlist
      wishlistAll = wishlistAll.filter(
        (wishlist) => wishlist.id !== currWishlist.id
      );
      addWishlistBtn.classList.remove("wishlist-active");
    } else {
      // Otherwise, add it to the wishlist
      wishlistAll.push(currWishlist);
      addWishlistBtn.classList.add("wishlist-active");
    }

    // Update the wishlist count and save the updated wishlist to localStorage
    loadWishlistCount();
    saveWishlistToLocalStorage();

    // Re-check if the wishlist is empty
    if (wishlistAll.length === 0) {
      emptyWishlistContent();
    }
  });
});

// Add wishlist items to the DOM
function addWishlistItems() {
  wishlistAll.forEach((item) => {
    const wishlistProduct = document.createElement("div");
    wishlistProduct.className = "col-lg-3 col-md-4 col-sm-6";
    wishlistProduct.innerHTML = `<div
                class="product-item"
                data-id="${item.id}"
                data-name="${item.name}"
                data-price="${item.price}"
                data-image="${item.img}"
              >
                <a class="remove-item" href="#">
                  <i class="fa-solid fa-xmark"></i>
                </a>
                <a href="product-details.html">
                  <img src="${item.img}" alt="" />
                </a>
                <a href="product-details.html">
                  <h3 class="small-head">${item.name}</h3>
                </a>
                <div class="price">INR ${item.price}</div>
                <div class="icons-wrap">
                  <a href="checkout.html" class="secondary-btn">buy now</a>
                  <a href="#" class="add-cart-btn">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <g clip-path="url(#clip0_256_15)">
                        <mask id="mask0_256_15" style="mask-type: luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="20" height="20">
                          <path d="M20 0H0V20H20V0Z" fill="white"></path>
                        </mask>
                        <g mask="url(#mask0_256_15)">
                          <mask id="mask1_256_15" style="mask-type: luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="20" height="20">
                            <path d="M0 2.46366e-06H20V20H0V2.46366e-06Z" fill="white"></path>
                          </mask>
                          <g mask="url(#mask1_256_15)">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M2.10173 17.2469C2.29001 18.8177 3.62245 20 5.20454 20H14.8579C16.4488 20 17.7857 18.8048 17.9633 17.2239C18.0115 16.7952 17.703 16.4085 17.2742 16.3603C16.8454 16.3121 16.4588 16.6207 16.4106 17.0495C16.3218 17.8399 15.6533 18.4375 14.8579 18.4375H5.20454C4.4135 18.4375 3.74727 17.8464 3.65313 17.0609C3.65313 17.0609 3.65313 17.0609 3.65313 17.0609L2.777 9.7508C2.72565 9.32239 2.33674 9.01672 1.90833 9.06807C1.47992 9.11941 1.17425 9.50833 1.2256 9.93673L2.10173 17.2469L2.10173 17.2469Z" fill="white"></path>
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M17.5121 14.2433C17.9409 14.2915 18.3276 13.983 18.3757 13.5542L18.7049 10.625H19.2187C19.6502 10.625 20 10.2752 20 9.84375V6.71875C20 6.28728 19.6502 5.9375 19.2187 5.9375H0.78125C0.349777 5.9375 0 6.28728 0 6.71875V9.84375C0 10.2752 0.349777 10.625 0.78125 10.625H14.8828C15.3143 10.625 15.6641 10.2752 15.6641 9.84375C15.6641 9.41228 15.3143 9.0625 14.8828 9.0625H1.5625V7.5H18.4375V9.0625H18.0065C17.6088 9.0625 17.2745 9.36129 17.2301 9.75652L16.823 13.3797C16.7748 13.8085 17.0834 14.1951 17.5121 14.2433Z" fill="white"></path>
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M16.4289 7.1921C16.7767 6.93663 16.8514 6.44765 16.596 6.09994L12.3484 0.318691C12.0929 -0.0290209 11.6039 -0.103798 11.2562 0.151671C10.9085 0.407141 10.8337 0.896117 11.0892 1.24383L15.3368 7.02508C15.5923 7.37279 16.0812 7.44757 16.4289 7.1921Z" fill="white"></path>
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M3.59998 7.1921C3.9477 7.44757 4.43667 7.37279 4.69214 7.02508L8.93972 1.24383C9.19519 0.896117 9.12041 0.407141 8.7727 0.151671C8.42499 -0.103798 7.93601 -0.0290209 7.68054 0.318691L3.43296 6.09994C3.17749 6.44765 3.25227 6.93663 3.59998 7.1921Z" fill="white"></path>
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M10 16.875C10.4315 16.875 10.7812 16.5252 10.7812 16.0938V12.9688C10.7812 12.5373 10.4315 12.1875 10 12.1875C9.56853 12.1875 9.21875 12.5373 9.21875 12.9688V16.0938C9.21875 16.5252 9.56853 16.875 10 16.875Z" fill="white"></path>
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M13.125 16.875C13.5565 16.875 13.9062 16.5252 13.9062 16.0938V12.9688C13.9062 12.5373 13.5565 12.1875 13.125 12.1875C12.6935 12.1875 12.3438 12.5373 12.3438 12.9688V16.0938C12.3438 16.5252 12.6935 16.875 13.125 16.875Z" fill="white"></path>
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M6.875 16.875C7.30647 16.875 7.65625 16.5252 7.65625 16.0938V12.9688C7.65625 12.5373 7.30647 12.1875 6.875 12.1875C6.44353 12.1875 6.09375 12.5373 6.09375 12.9688V16.0938C6.09375 16.5252 6.44353 16.875 6.875 16.875Z" fill="white"></path>
                          </g>
                        </g>
                      </g>
                      <defs>
                        <clipPath id="clip0_256_15">
                          <rect width="20" height="20" fill="white"></rect>
                        </clipPath>
                      </defs>
                    </svg>
                  </a>
                </div>
              </div>`;

    wishlistItemsContainer?.appendChild(wishlistProduct);
  });
}

// Show the empty wishlist message
function emptyWishlistContent() {
  wishlistItemsContainer ? (wishlistItemsContainer.innerHTML = "") : null; // Clear existing items
  const emptyWishlistItem = document.createElement("div");
  emptyWishlistItem.classList.add("empty-cart-content");
  emptyWishlistItem.innerHTML = `
    <i class="fa-regular fa-heart"></i>
    <h3>Your wishlist is empty</h3>
    <p>
      You don't have any products in your wishlist yet. You will find a lot of
      interesting products on our "Shop" page.
    </p>`;

  wishlistItemsContainer?.appendChild(emptyWishlistItem);
}

// Remove from the wishlist
const wishlistProductsContainer = document.getElementById(
  "wishlist-products-container"
);
wishlistProductsContainer?.addEventListener("click", function (e) {
  const wishlistRemoveBtn = e.target.closest(".remove-item");

  if (!wishlistRemoveBtn) return;
  e.preventDefault();

  // Remove the product from the wishlist visually
  const productToRemove = wishlistRemoveBtn.closest(".col-sm-6");
  if (productToRemove) {
    productToRemove.remove();
  }

  // Remove the product from the wishlist array
  const selectedProduct = wishlistRemoveBtn.closest(".product-item");
  wishlistAll = wishlistAll.filter(
    (wishlist) => wishlist.id !== selectedProduct.dataset.id
  );

  // Update the wishlist count and save to localStorage
  loadWishlistCount();
  saveWishlistToLocalStorage();

  // If the wishlist is empty after removal, show the emptyWishlistItem
  if (wishlistAll.length === 0) {
    emptyWishlistContent();
  }
});
// Wishlist functionality
// ======================================================================================

// ==================== Thumbnail Carousel ===============================
$(document).ready(function () {
  var sync1 = $("#sync1");
  var sync2 = $("#sync2");
  var slidesPerPage = 4; // globally define number of elements per page
  var syncedSecondary = true;

  sync1
    .owlCarousel({
      items: 1,
      slideSpeed: 2000,
      nav: false,
      autoplay: false,
      dots: false,
      responsiveRefreshRate: 200,
    })
    .on("changed.owl.carousel", syncPosition);

  sync2
    .on("initialized.owl.carousel", function () {
      sync2.find(".owl-item").eq(0).addClass("current"); // Add 'current' to the first thumbnail
    })
    .owlCarousel({
      items: slidesPerPage,
      dots: false,
      nav: false,
      smartSpeed: 200,
      slideSpeed: 500,
      slideBy: slidesPerPage, // alternatively you can slide by 1
      responsiveRefreshRate: 100,
      loop: false, // Disable loop since there are only 4 items
      mouseDrag: false, // Disable dragging of thumbnails
      touchDrag: false, // Disable touch dragging for better stability
    })
    .on("changed.owl.carousel", syncPosition2);

  // Sync the main carousel with the thumbnail carousel
  function syncPosition(el) {
    var current = el.item.index; // Get the index of the current main carousel item

    // Remove 'current' from all items in sync2 and add to the current item
    sync2
      .find(".owl-item")
      .removeClass("current")
      .eq(current)
      .addClass("current");

    var onscreen = sync2.find(".owl-item.active").length - 1;
    var start = sync2.find(".owl-item.active").first().index();
    var end = sync2.find(".owl-item.active").last().index();

    // Ensure the correct thumbnail is visible only if there are more items than visible thumbnails
    if (sync2.find(".owl-item").length > slidesPerPage) {
      if (current > end) {
        sync2.data("owl.carousel").to(current, 100, true);
      }
      if (current < start) {
        sync2.data("owl.carousel").to(current - onscreen, 100, true);
      }
    }
  }

  // Sync the thumbnail carousel with the main carousel
  function syncPosition2(el) {
    if (syncedSecondary) {
      var number = el.item.index;
      sync1.data("owl.carousel").to(number, 100, true); // Sync the main carousel with the thumbnail
    }
  }

  // Add click event to thumbnails to navigate the main carousel
  sync2.on("click", ".owl-item", function (e) {
    e.preventDefault();
    var number = $(this).index();
    sync1.data("owl.carousel").to(number, 300, true);
  });
});

// ==================== Thumbnail Carousel End ===============================
// ==============================================================================

// ==================== Thumbnail Carousel ===============================
$(document).ready(function () {
  var modalsync1 = $("#modalsync1");
  var modalsync2 = $("#modalsync2");
  var slidesPerPage = 4; // globally define number of elements per page
  var syncedSecondary = true;

  modalsync1
    .owlCarousel({
      items: 1,
      slideSpeed: 2000,
      nav: false,
      autoplay: false,
      dots: false,
      responsiveRefreshRate: 200,
    })
    .on("changed.owl.carousel", syncPosition);

  modalsync2
    .on("initialized.owl.carousel", function () {
      modalsync2.find(".owl-item").eq(0).addClass("current"); // Add 'current' to the first thumbnail
    })
    .owlCarousel({
      items: slidesPerPage,
      dots: false,
      nav: false,
      smartSpeed: 200,
      slideSpeed: 500,
      slideBy: slidesPerPage, // alternatively you can slide by 1
      responsiveRefreshRate: 100,
      loop: false, // Disable loop since there are only 4 items
      mouseDrag: false, // Disable dragging of thumbnails
      touchDrag: false, // Disable touch dragging for better stability
    })
    .on("changed.owl.carousel", syncPosition2);

  // Sync the main carousel with the thumbnail carousel
  function syncPosition(el) {
    var current = el.item.index; // Get the index of the current main carousel item

    // Remove 'current' from all items in modalsync2 and add to the current item
    modalsync2
      .find(".owl-item")
      .removeClass("current")
      .eq(current)
      .addClass("current");

    var onscreen = modalsync2.find(".owl-item.active").length - 1;
    var start = modalsync2.find(".owl-item.active").first().index();
    var end = modalsync2.find(".owl-item.active").last().index();

    // Ensure the correct thumbnail is visible only if there are more items than visible thumbnails
    if (modalsync2.find(".owl-item").length > slidesPerPage) {
      if (current > end) {
        modalsync2.data("owl.carousel").to(current, 100, true);
      }
      if (current < start) {
        modalsync2.data("owl.carousel").to(current - onscreen, 100, true);
      }
    }
  }

  // Sync the thumbnail carousel with the main carousel
  function syncPosition2(el) {
    if (syncedSecondary) {
      var number = el.item.index;
      modalsync1.data("owl.carousel").to(number, 100, true); // Sync the main carousel with the thumbnail
    }
  }

  // Add click event to thumbnails to navigate the main carousel
  modalsync2.on("click", ".owl-item", function (e) {
    e.preventDefault();
    var number = $(this).index();
    modalsync1.data("owl.carousel").to(number, 300, true);
  });
});

// ==================== Thumbnail Carousel End ===============================
// ==============================================================================

// Toggle promocode content
// ==============================================================================
$(".coupon-code-btn").on("click", function (e) {
  e.preventDefault();
  $(".coupon-field-wrap").slideToggle();
});
// Toggle promocode content end
