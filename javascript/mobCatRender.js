import { setupHeartButtons, syncHeartButtonsUI } from './setupHeart.js';
import { initAddToCartTracking } from './trackPurchase.js';
import { initDarkMode } from './theme.js';
import { setupPagination } from './pagination.js';

function renderMobCategoryCards(container, products) {
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

function formatDisplayName(str) {
  return str
    .replace(/-/g, ' ')
    .replace(/\b\w/g, l => l.toUpperCase());
}

async function initMobCategoryPage() {
  const container = document.querySelector('.mob-cat-container');
  const paginationContainer = document.querySelector('.mob-pagination');
  const catNameEl = document.getElementById('cat-name');

  if (!container || !paginationContainer) return;

  try {
    const response = await fetch('/json/products.json');
    if (!response.ok) throw new Error('Failed to fetch products');
    const products = await response.json();

    // Get filters from URL
    const urlParams = new URLSearchParams(window.location.search);
    const category = urlParams.get('category')?.toLowerCase();
    const brand = urlParams.get('brand')?.toLowerCase();

    // Apply filters
    const filtered = products.filter(product => {
      const productCategory = product.category?.toLowerCase() || '';
      const productBrand = product.brand?.toLowerCase() || '';

      const matchesBrand = brand ? productBrand === brand : true;
      const matchesCategory = category ? productCategory === category : true;

      return matchesBrand && matchesCategory;
    });

    // Set category name in heading
    const displayName = category || brand ? formatDisplayName(category || brand) : 'All Products';
    if (catNameEl) catNameEl.textContent = displayName;

    const itemsPerPage = 4;

    setupHeartButtons('.mob-cat-container');
    initAddToCartTracking('.mob-cat-container');

    setupPagination(filtered, itemsPerPage, (pageItems) => {
      renderMobCategoryCards(container, pageItems);
      syncHeartButtonsUI('.mob-cat-container');
      initDarkMode();
    }, paginationContainer);

  } catch (err) {
    console.error('Error loading mobile category products:', err);
  }
}

// Initialize immediately
export {initMobCategoryPage};
