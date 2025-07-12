// cartRenderer.js
import { getCartItems, updateQuantity, removeItem } from './cartStorage.js';
import { initCartSummary } from './cartSummary.js'; 
import { initDarkMode } from './theme.js';
import { setCartCount } from './cartCount.js'; // Import setCartCount

function renderCartItems(wrapper) {
  const cartItems = getCartItems();
  const itemsContainer = wrapper.querySelector('#cart-items-container');

  if (!itemsContainer) {
    console.warn("Cart items container not found.");
    return;
  }

  if (cartItems.length === 0) {
    itemsContainer.innerHTML = '<p>Your cart is empty.</p>';
    return;
  }

  itemsContainer.innerHTML = cartItems.map(item => `
    <div class="item-container grid-row" data-name="${item.name}">
      <div class="cancel-container"><i class="bi bi-x-circle"></i></div>

      <div class="item-image-name">
        <div class="item-image"><img src="${item.image}" alt="${item.name}"></div>
        <div class="item-name"><h4>${item.name}</h4></div>
      </div>

      <div class="quantity-controllers">
        <button class="qty-decrease">-</button>
        <span>${item.quantity}</span>
        <button class="qty-increase">+</button>
      </div>

      <div class="item-price"><h3>${item.priceDisplay}</h3></div>
    </div>
  `).join('');

   initDarkMode();
}


function updateCartCountFromItems() {
  const cartItems = getCartItems();
  const totalCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  setCartCount(totalCount);
}

function attachCartItemListeners(container) {
  container.addEventListener('click', e => {
    const itemEl = e.target.closest('.item-container');
    if (!itemEl) return;
    const name = itemEl.dataset.name;

    if (e.target.classList.contains('qty-increase')) {
      updateQuantity(name, +1);
    } else if (e.target.classList.contains('qty-decrease')) {
      updateQuantity(name, -1);
    } else if (e.target.closest('.cancel-container')) {
      removeItem(name);
    }

    // Re-render and update count
    renderCartItems(container);
    attachCartItemListeners(container); // reattach handlers
    updateCartCountFromItems();         // ✅ update badge
  });

  initDarkMode();
}

export {
  renderCartItems,
  attachCartItemListeners
};
