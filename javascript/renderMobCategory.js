import { setupPagination } from './pagination.js';
import { setupHeartButtons, syncHeartButtonsUI } from './setupHeart.js';
import { initAddToCartTracking } from './trackPurchase.js';
import { initDarkMode } from './theme.js';

async function fetchAndRenderCategoryProducts() {
  const urlParams = new URLSearchParams(window.location.search);
  const category = urlParams.get('category');

  if (!category) {
    return;
  }

  try {
    const res = await fetch('/json/products.json');
    const data = await res.json();

    const filtered = data.filter(p => p.section === category);
    const container = document.querySelector('.mob-items-container');
    const pagination = document.querySelector('.mob-pagination');

    if (!container || !pagination) return;

    setupPagination(filtered, 4, (pageItems) => {
      renderMobProducts(container, pageItems, filtered);
    }, pagination);

  
    initAddToCartTracking('.mob-items-container');

  } catch (e) {
    console.error('Error fetching category products:', e);
  }
}

function renderMobProducts(container, products, allProducts) {
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

}

export { fetchAndRenderCategoryProducts };
