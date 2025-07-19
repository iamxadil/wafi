import { initDarkMode } from "../javascript/theme.js";
import { setupPagination } from "./pagination.js";
import { setupHeartButtons, syncHeartButtonsUI } from './setupHeart.js';
import { initAddToCartTracking } from './trackPurchase.js';

async function fetchAndRenderMostPopular() {
  try {
    const response = await fetch('/json/products.json');
    if (!response.ok) throw new Error('Failed to fetch products');

    const allProducts = await response.json();

    const cartCounts = JSON.parse(localStorage.getItem('addedToCartCounts')) || {};
    const popularEntries = Object.entries(cartCounts);

    if (popularEntries.length < 4) {
      return;
    }

    const sortedIds = popularEntries
      .sort((a, b) => b[1] - a[1])
      .map(entry => entry[0]);

    const mostPopularProducts = sortedIds
      .map(id => allProducts.find(p => p.id.toString() === id))
      .filter(Boolean)
      .slice(0, 8);

    const container = document.querySelector('.most-popular-container');
    const paginationContainer = document.querySelector('.most-popular-pagination');

    if (!container || !paginationContainer) {
      return;
    }

    const itemsPerPage = 4;

    // Setup event listeners once here, on container
    setupHeartButtons('.most-popular-container');
    initAddToCartTracking('.most-popular-container');

    setupPagination(mostPopularProducts, itemsPerPage, (pageItems) => {
      renderMobProducts(container, pageItems);
      // After render, update heart UI states (fill/unfill hearts)
      syncHeartButtonsUI('.most-popular-container');
      initDarkMode(); // Keep your theme init here if needed
    }, paginationContainer);

  } catch (err) {
    console.error('Error loading most popular products:', err);
  }
}

function renderMobProducts(container, products) {
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
}

export { fetchAndRenderMostPopular };
