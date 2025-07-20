import { getCartItems, updateQuantity, removeItem, setCartItems } from './cartStorage.js';
import { initDarkMode } from './theme.js';
import { setCartCount } from './cartCount.js';

function formatPrice(price) {
  return price.toLocaleString() + ' IQD';
}

function renderCartItems(wrapper) {
  const cartItems = getCartItems();
  const pcContainer = wrapper.querySelector('#cart-items-container');
  const mobContainer = document.querySelector('.mob-pr-card-container');

  if (cartItems.length === 0) {
    if (pcContainer) pcContainer.innerHTML = '<p>Your cart is empty.</p>';
    if (mobContainer) mobContainer.innerHTML = '<p>Your cart is empty.</p>';
    updateTotals(0);
    setCartCount(0);
    initDarkMode();
    return;
  }

  if (pcContainer) {
    pcContainer.innerHTML = cartItems.map(item => `
      <div class="item-container grid-row" data-name="${item.name}">
        <div class="cancel-container"><i class="bi bi-x-circle"></i></div>
        <div class="item-image-name">
          <div class="item-image"><img src="${item.image}" alt="${item.bra}"></div>
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
  }

  if (mobContainer) {
    mobContainer.innerHTML = cartItems.map(item => `
      <div class="pr-content" data-name="${item.name}">
        <div class="pr-cart-img cont-border">
          <img src="${item.image}" alt="${item.name}">
        </div>
        <div class="pr-cart-details">
          <div class="pr-company"><p>${item.brand}</p></div>
          <div class="pr-name"><h1>${item.name}</h1></div>
          <p>${item.priceDisplay}</p>
        </div>
        <div class="quantity-selector">
          <button class="increase-btn"><i class="bi bi-plus"></i></button>
          <span>${item.quantity}</span>
          <button class="decrease-btn"><i class="bi bi-dash"></i></button>
        </div>
      </div>
    `).join('');
  }

  updateCartCountFromItems();
  updateTotals(calculateSubtotal(cartItems));
  initDarkMode();
}

function calculateSubtotal(items) {
  return items.reduce((sum, item) => {
    const price = parseInt(item.priceDisplay.replace(/[^\d]/g, ''), 10) || 0;
    return sum + price * item.quantity;
  }, 0);
}

function updateTotals(subtotal) {
  const delivery = subtotal > 1000000 ? 0 : 10000;
  const total = subtotal + delivery;

  const pcSubtotal = document.querySelector('#subtotal');
  const pcDelivery = document.querySelector('#delivery-fee');
  const pcTotal = document.querySelector('#total-price');

  const mobDelivery = document.querySelector('.deliv p:last-child');
  const mobTotal = document.querySelector('.total p:last-child');

  if (pcSubtotal) pcSubtotal.textContent = formatPrice(subtotal);
  if (pcDelivery) pcDelivery.textContent = formatPrice(delivery);
  if (pcTotal) pcTotal.textContent = formatPrice(total);

  if (mobDelivery) mobDelivery.textContent = formatPrice(delivery);
  if (mobTotal) mobTotal.textContent = formatPrice(total);
}

function updateCartCountFromItems() {
  const cartItems = getCartItems();
  const totalCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  setCartCount(totalCount);
}

function attachCartItemListeners(wrapper) {
  const pcContainer = wrapper.querySelector('#cart-items-container');
  const mobContainer = document.querySelector('.mob-pr-card-container');

  if (pcContainer) {
    pcContainer.addEventListener('click', e => {
      const itemEl = e.target.closest('.item-container');
      if (!itemEl) return;
      const name = itemEl.dataset.name;

      if (e.target.classList.contains('qty-increase')) {
        updateQuantity(name, +1);
      } else if (e.target.classList.contains('qty-decrease')) {
        updateQuantity(name, -1);
      } else if (e.target.closest('.cancel-container')) {
        removeItem(name);
      } else {
        return;
      }

      renderCartItems(wrapper);
    });
  }

  if (mobContainer) {
    mobContainer.addEventListener('click', e => {
      const itemEl = e.target.closest('.pr-content');
      if (!itemEl) return;
      const name = itemEl.dataset.name;

      if (e.target.closest('.increase-btn')) {
        updateQuantity(name, +1);
      } else if (e.target.closest('.decrease-btn')) {
        updateQuantity(name, -1);
      } else {
        return;
      }

      renderCartItems(wrapper);
    });
  }

  // Custom popup handling
  const clearBtn = wrapper.querySelector('#clear-cart');
  const popup = document.getElementById('cart-clear-popup');
  const confirmBtn = document.getElementById('confirm-clear-cart');
  const cancelBtn = document.getElementById('cancel-clear-cart');

  if (clearBtn && popup && confirmBtn && cancelBtn) {
    clearBtn.addEventListener('click', () => {
      popup.classList.remove('hidden');
    });

    confirmBtn.addEventListener('click', () => {
      setCartItems([]);
      renderCartItems(wrapper);
      popup.classList.add('hidden');
    });

    cancelBtn.addEventListener('click', () => {
      popup.classList.add('hidden');
    });
  }

  const pcCheckoutBtn = wrapper.querySelector('#proceed-payment');
  if (pcCheckoutBtn) {
    pcCheckoutBtn.addEventListener('click', () => {
      const cartItems = getCartItems();
      if (cartItems.length === 0) return alert("Your cart is empty!");
      window.location.href = "/payment/payment.html";
    });
  }

  const mobCheckoutBtn = document.querySelector('.checkout-container button');
  if (mobCheckoutBtn) {
    mobCheckoutBtn.addEventListener('click', () => {
      const cartItems = getCartItems();
      if (cartItems.length === 0) return alert("Your cart is empty!");
      window.location.href = "/payment/payment.html";
    });
  }

  initDarkMode();
}

export {
  renderCartItems,
  attachCartItemListeners,
  updateCartCountFromItems
};
