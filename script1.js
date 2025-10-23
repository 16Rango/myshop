// --- Select elements from the page ---
const addToCartButtons = document.querySelectorAll('.add-to-cart');
const cartCount = document.getElementById('cart-count');
const cartTotal = document.getElementById('cart-total');
const viewCartBtn = document.getElementById('view-cart-btn');
const cartPopup = document.getElementById('cart-popup');
const closeCartBtn = document.getElementById('close-cart-btn');
const cartItemsList = document.getElementById('cart-items-list');
const popupTotal = document.getElementById('popup-total');
const clearCartBtn = document.getElementById('clear-cart-btn');

// --- Cart data storage ---
let cartItems = [];

// --- Add item to cart ---
addToCartButtons.forEach(button => {
  button.addEventListener('click', () => {
    const productCard = button.parentElement;
    const name = productCard.querySelector('h3').textContent;
    const priceText = productCard.querySelector('p').textContent;
    const price = parseFloat(priceText.replace('$', ''));

    // Add new item to cart
    cartItems.push({ name, price });

    updateCartDisplay();
    alert(`${name} added to cart!`);
  });
});

// --- View Cart button opens popup ---
viewCartBtn.addEventListener('click', () => {
  showCartPopup();
});

// --- Close Cart button hides popup ---
closeCartBtn.addEventListener('click', () => {
  cartPopup.style.display = 'none';
});

// --- Clear Cart button empties everything ---
clearCartBtn.addEventListener('click', () => {
  cartItems = []; // empty array
  updateCartDisplay();
  showCartPopup(); // refresh popup view
  alert('Cart cleared!');
});

// --- Update the cart totals in the header ---
function updateCartDisplay() {
  const count = cartItems.length;
  const total = cartItems.reduce((sum, item) => sum + item.price, 0);

  cartCount.textContent = count;
  cartTotal.textContent = total.toFixed(2);
}

// --- Show all items in popup ---
function showCartPopup() {
  cartPopup.style.display = 'flex';
  cartItemsList.innerHTML = '';

  let total = 0;
  cartItems.forEach((item, index) => {
    total += item.price;

    const li = document.createElement('li');
    li.textContent = `${item.name} - $${item.price.toFixed(2)}`;

    const removeBtn = document.createElement('button');
    removeBtn.textContent = 'Remove';
    removeBtn.classList.add('remove-btn');

    removeBtn.addEventListener('click', () => {
      removeItem(index);
    });

    li.appendChild(removeBtn);
    cartItemsList.appendChild(li);
  });

  popupTotal.textContent = total.toFixed(2);
}

// --- Remove item from cart ---
function removeItem(index) {
  cartItems.splice(index, 1); // Remove item by index
  updateCartDisplay();        // Update top display
  showCartPopup();            // Refresh popup
}
