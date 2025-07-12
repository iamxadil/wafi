// cartPage.js
import { renderCartItems, attachCartItemListeners } from './cartRenderer.js';
import { initCartSummary } from './cartSummary.js';

function initCartPage() {
  const cartContainer = document.querySelector('.cart-wrapper');
  if (!cartContainer) return;

  renderCartItems(cartContainer);
  attachCartItemListeners(cartContainer);
  initCartSummary();
}

export { initCartPage };
