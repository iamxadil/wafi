import { initDarkMode } from "../javascript/theme.js";
import { setupPagination } from "./pagination.js";
import { setupHeartButtons, syncHeartButtonsUI } from './setupHeart.js';
import { initAddToCartTracking } from './trackPurchase.js';

async function fetchAndRenderAccessories() {
  try {
    const response = await fetch('/json/products.json');
    if (!response.ok) throw new Error('Failed to fetch products');

    const products = await response.json();

    // Filter products where section === 'Accessories'
    const accessories = products.filter(product => product.section === 'Accessories');

    const container = document.querySelector('.mob-accessories-container');
    const paginationContainer = document.querySelector('.mob-accessories-pagination');

    if (!container || !paginationContainer) {
      return;
    }

    const itemsPerPage = 4;

    setupPagination(accessories, itemsPerPage, (pageItems) => {
      renderAccessories(container, pageItems, accessories);
    }, paginationContainer);

    setupHeartButtons('.mob-accessories-container');
    initAddToCartTracking('.mob-accessories-container');

  } catch (err) {
    console.error('Error loading accessories:', err);
  }
}

function renderAccessories(container, products, allProducts) {
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
  syncHeartButtonsUI('.mob-accessories-container');
}

export { fetchAndRenderAccessories };
