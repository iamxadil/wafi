import { getCartItems } from '../javascript/cartStorage.js';
import { initDarkMode } from '../javascript/theme.js';

function formatPrice(num) {
  return `${num.toLocaleString()} IQD`;
}

function calculateTotals(items) {
  const subtotal = items.reduce((sum, item) => {
    const price = parseInt(item.priceDisplay.replace(/[^\d]/g, '')) || 0;
    return sum + price * item.quantity;
  }, 0);
  const delivery = subtotal > 1000000 ? 0 : 10000;
  const total = subtotal + delivery;

  return { subtotal, delivery, total };
}

function renderPaymentCart() {
  const cartItems = getCartItems();

  const container = document.querySelector('.cart-items');
  if (!container) return;

  if (cartItems.length === 0) {
    container.innerHTML = `<p>Your cart is empty.</p>`;
    return;
  }

  const itemsHTML = cartItems.map(item => `
    <div class="item-card">
      <div class="item-details"> 
        <div class="pr-pic cont-border"><img src="${item.image}" alt="${item.name}"></div>
        <div class="pr-info">
          <h1 id="pr-name">${item.name}</h1>
          <p><strong>Brand:</strong> ${item.brand || 'N/A'}</p>
          <p><strong>Quantity:</strong> ${item.quantity}</p>
          <h1 id="pr-price">${item.priceDisplay}</h1>
        </div>
      </div>
    </div>
  `).join('');

  const { subtotal, delivery, total } = calculateTotals(cartItems);

  const totalsHTML = `
    <div class="totals">
      <h1 id="totals-title">Cart Totals</h1>
      <div class="sub-total"><p>Sub-Total</p><p>${formatPrice(subtotal)}</p></div>
      <div class="shipping-fee"><p>Shipping Fee</p><p>${formatPrice(delivery)}</p></div>
      <div class="total"><p>Total</p><p>${formatPrice(total)}</p></div>
    </div>
  `;

  container.innerHTML = itemsHTML + totalsHTML;

  const deliveryBox = document.querySelector('.delivery-price');
  const totalBox = document.querySelector('.total p:last-child');

  if (deliveryBox) deliveryBox.textContent = formatPrice(delivery);
  if (totalBox) totalBox.textContent = formatPrice(total);

  initDarkMode();
}


function createConfirmationPopup() {
  if (document.getElementById('order-confirmation-popup')) return; // Already exists

  const popupHTML = `
    <div id="order-confirmation-popup" class="popup-overlay hidden">
      <div class="popup-content">
        <p>Are you sure you want to place this order?</p>
        <div class="popup-buttons">
          <button id="confirm-order">Yes, Place Order</button>
          <button id="cancel-order">Cancel</button>
        </div>
      </div>
    </div>
  `;

  document.body.insertAdjacentHTML('beforeend', popupHTML);

  // Attach events for buttons
  const popup = document.getElementById('order-confirmation-popup');
  const confirmBtn = document.getElementById('confirm-order');
  const cancelBtn = document.getElementById('cancel-order');

  confirmBtn.addEventListener('click', () => {
    localStorage.removeItem('cartItems');
    localStorage.setItem('cartCount', 0);
    popup.classList.add('hidden');
    alert('Your order has been placed successfully!');
    window.location.href = "/index.html"; // redirect after order
  });

  cancelBtn.addEventListener('click', () => {
    popup.classList.add('hidden');
  });
}

function setupPlaceOrder() {
  const btn = document.getElementById('place-order');
  if (!btn) return;

  createConfirmationPopup();

  btn.addEventListener('click', () => {
    const cartItems = getCartItems();
    if (cartItems.length === 0) return alert("Cart is empty!");

    const popup = document.getElementById('order-confirmation-popup');
    if (popup) popup.classList.remove('hidden');
  });
}

document.addEventListener('DOMContentLoaded', () => {
  renderPaymentCart();
  setupPlaceOrder();
});
