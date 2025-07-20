import { initDarkMode } from "../javascript/theme.js";
import { setupPagination } from "./pagination.js";
import { setupHeartButtons, syncHeartButtonsUI } from './setupHeart.js';
import { initAddToCartTracking } from './trackPurchase.js';

async function fetchAndRenderHeadphones() {
  try {
    const response = await fetch('/json/products.json');
    if (!response.ok) throw new Error('Failed to fetch products');

    const products = await response.json();

    // Filter products where category === 'Headphones'
    const headphones = products.filter(product => product.category === 'Headphones');

    const container = document.querySelector('.mob-headphones-container');
    const paginationContainer = document.querySelector('.mob-headphones-pagination');

    if (!container || !paginationContainer) {
      return;
    }

    const itemsPerPage = 4;

    setupPagination(headphones, itemsPerPage, (pageItems) => {
      renderHeadphones(container, pageItems, headphones);
    }, paginationContainer);

    setupHeartButtons('.mob-headphones-container');
    initAddToCartTracking('.mob-headphones-container');

  } catch (err) {
    console.error('Error loading headphones:', err);
  }
}

function renderHeadphones(container, products, allProducts) {
  container.innerHTML = products.map(product => `
    <div class="mob-item-card cont-border product-card"
         data-id="${product.id}"
         data-name="${product.name}"
         data-price="${product.priceRaw}"
         data-brand="${product.brand}">
      <div class="mob-item-pic cont-border">
        <img class="product-image" src="${product.image[0]}" alt="${product.name}">
      </div>
      <div class="mob-item-details">
        <p class="comp-name">${product.brand}</p>
        <h1 class="mob-item-name">${product.name}</h1>
        <p class="mob-item-price">${product.priceDisplay}</p>
      </div>
      <div class="interaction-buttons">
        <div class="heart cont-border"><i class="bi bi-suit-heart"></i></div>
        <div class="add-to-cart cont-border"><i class="bi bi-plus"></i></div>
      </div>
    </div>
  `).join('');

  container.querySelectorAll('.mob-item-card').forEach(card => {
    card.addEventListener('click', (e) => {
      if (e.target.closest('.add-to-cart') || e.target.closest('.heart')) return;

      const productId = card.dataset.id;
      const product = allProducts.find(p => p.id == productId);
      if (!product) return;

      localStorage.setItem('selectedProduct', JSON.stringify(product));
      window.location.href = '/product/product.html';
    });
  });

  initDarkMode();
  syncHeartButtonsUI('.mob-headphones-container');
}

export { fetchAndRenderHeadphones };
