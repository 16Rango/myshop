let cartCount = 0;
let cartTotal = 0;
const cartCountElement = document.getElementById("cart-count");
const cartTotalElement = document.getElementById("cart-total");

// Load saved data when page opens
window.onload = function() {
  const savedCount = localStorage.getItem("cartCount");
  const savedTotal = localStorage.getItem("cartTotal");

  if (savedCount && savedTotal) {
    cartCount = parseInt(savedCount);
    cartTotal = parseFloat(savedTotal);
    cartCountElement.textContent = cartCount;
    cartTotalElement.textContent = cartTotal.toFixed(2);
  }
};

// Add-to-cart buttons
const buttons = document.querySelectorAll(".add-to-cart");
buttons.forEach(button => {
  button.addEventListener("click", () => {
    const productCard = button.closest(".product-card");
    const price = parseFloat(productCard.getAttribute("product-price").replace("$", ""));
    
    cartCount++;
    cartTotal += price;

    // Update display
    cartCountElement.textContent = cartCount;
    cartTotalElement.textContent = cartTotal.toFixed(2);

    // Save to localStorage
    localStorage.setItem("cartCount", cartCount);
    localStorage.setItem("cartTotal", cartTotal);
  });
});

