// cartCount.js

function getCartCount() {
  return parseInt(localStorage.getItem('cartCount')) || 0;
}

function setCartCount(count) {
  localStorage.setItem('cartCount', count);
  const badge = document.getElementById('cart-count');
  if (badge) badge.textContent = count;
}

function incrementCartCount() {
  const count = getCartCount() + 1;
  setCartCount(count);
}

function initCartCountBadge() {
  const badge = document.getElementById('cart-count');
  if (!badge) return;
  badge.textContent = getCartCount();
}

export {
  getCartCount,
  setCartCount,
  incrementCartCount,
  initCartCountBadge
};
