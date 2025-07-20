// mobItemCards.js
import { showCartPopup } from './cartPopup.js';

function initMobAddToCart() {
  const containers = [
    '.mob-items-container',
    '.most-popular-container',
    '.mob-cat-container',
    '.mob-laptops-container',
    '.mob-accessories-container',
    '.mob-headphones-container'
  ];

  containers.forEach(selector => {
    const container = document.querySelector(selector);
    if (!container) return;

    container.addEventListener('click', (e) => {
      const addToCartBtn = e.target.closest('.add-to-cart');
      if (!addToCartBtn) return;

      const card = addToCartBtn.closest('.product-card');
      if (!card) return;

      const product = {
        name: card.dataset.name || '',
        priceDisplay: card.querySelector('.mob-item-price')?.textContent ||
                      card.querySelector('.pc-product-price')?.textContent ||
                      '',
        image: card.querySelector('img')?.src || '',
        priceRaw: card.dataset.price || undefined,
        brand: card.dataset.brand || undefined,
      };

      showCartPopup(product);
    });
  });
}

export { initMobAddToCart };
