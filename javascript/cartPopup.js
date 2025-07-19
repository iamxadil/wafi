// cartPopup.js
import { incrementCartCount } from './cartCount.js';
import { addItem } from './cartStorage.js';

function injectCartPopup() {
  if (document.getElementById('cart-popup-overlay')) return;

  const popupHTML = `
    <div id="cart-popup-overlay" class="cart-popup-overlay hidden">
      <div class="cart-popup-box">
        <div class="popup-product-image">
          <img id="popup-product-img" src="" alt="Product Image" />
        </div>
        <div class="popup-product-details">
          <h1 id="popup-product-name"></h1>
          <p id="popup-product-price"></p>
        </div>
        <div class="popup-buttons">
          <button id="continue-shopping">Continue Shopping</button>
          <button id="go-to-cart">Go to Cart</button>
        </div>
        <div id="popup-progress-bar" class="popup-progress-bar"></div>
      </div>
    </div>
  `;

  document.body.insertAdjacentHTML('beforeend', popupHTML);
}

function showCartPopup(product) {
  const overlay = document.getElementById('cart-popup-overlay');
  const img = document.getElementById('popup-product-img');
  const name = document.getElementById('popup-product-name');
  const price = document.getElementById('popup-product-price');
  const progress = document.getElementById('popup-progress-bar');

  if (!overlay || !img || !name || !price || !progress) return;

  // Update popup data
  img.src = product.image || '';
  img.style.display = product.image ? '' : 'none';
  name.textContent = product.name;
  price.textContent = product.priceDisplay;

  overlay.classList.remove('hidden');
  progress.style.transition = 'none';
  progress.style.width = '0%';
  progress.offsetHeight; // force reflow

  setTimeout(() => {
    progress.style.transition = 'width 5s linear';
    progress.style.width = '100%';
  }, 50);

  setTimeout(() => {
    overlay.classList.add('hidden');
    progress.style.transition = 'none';
    progress.style.width = '0%';
  }, 4000);

  // Add to cart storage and update count badge
  addItem(product);
  incrementCartCount();
}

function attachAddToCartListeners() {
  document.body.addEventListener('click', e => {
    const target = e.target.closest('.add-to-cart');
    if (!target) return;

    const card = target.closest('.product-card');
    if (!card) return;

    const product = {
      name: card.dataset.name,
      priceDisplay:
        card.querySelector('.pc-product-price')?.textContent ||
        card.querySelector('.mob-item-price')?.textContent ||
        '',
      image: card.querySelector('img')?.src || ''
    };
    
    showCartPopup(product);
  });
}


function initPopup() {
  injectCartPopup();
  attachAddToCartListeners();

  document.addEventListener('click', e => {
    if (e.target.id === 'go-to-cart') {
      window.location.href = '/cart/cart.html';
    } else if (e.target.id === 'continue-shopping') {
      document.getElementById('cart-popup-overlay')?.classList.add('hidden');
    }
  });
}

export { initPopup, showCartPopup };
