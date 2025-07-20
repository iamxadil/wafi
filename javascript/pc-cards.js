//pcCards.js
import { initDarkMode } from "../javascript/theme.js";
import { setupPagination } from "./pagination.js";
import {initAddToCartTracking} from './trackPurchase.js';

async function fetchAndRenderPCCards() {
  try {
    const response = await fetch('/json/products.json');
    if (!response.ok) throw new Error('Failed to fetch products');

    const products = await response.json();
    const allProductContainers = document.querySelectorAll('.product-cards');

    allProductContainers.forEach(container => {
      let filteredProducts = [];

      if (container.classList.contains('laptops-cards')) {
        filteredProducts = products.filter(p => p.section === 'Laptops');
      } else if (container.classList.contains('accessories-cards')) {
        filteredProducts = products.filter(p => p.section === 'Accessories');
      } else if (container.classList.contains('headphones-cards')) {
        filteredProducts = products.filter(p => p.form === 'Headphones');
      } else {
        filteredProducts = products;
      }

      // Select the immediate next sibling pagination container
      const paginationContainer = container.nextElementSibling;
      if (!paginationContainer || !paginationContainer.classList.contains('pc-pagination')) {
        console.warn('PC pagination container not found for', container);
        return;
      }

      const itemsPerPage = 6;

      setupPagination(
        filteredProducts,
        itemsPerPage,
        (pageItems) => renderProducts(container, pageItems),
        paginationContainer
      );
      
       initAddToCartTracking('.product-cards');
    });
  } catch (err) {
    console.error('Error loading PC products:', err);
  }
}

function renderProducts(container, products) {
  container.innerHTML = products.map(product => `
    <div class="pc-card product-card cont-border"
         data-id="${product.id}"
         data-name="${product.name}"
         data-price="${product.priceRaw}"
         data-brand="${product.brand}">
      <div class="pc-product-img">
        <img src="${product.image[0]}" alt="${product.name}">
      </div>

      <div class="pc-product-details">
        <h1 class="pc-product-company">${product.brand}</h1>
        <h1 class="pc-product-name">${product.name}</h1>
        <p class="pc-product-price">${product.priceDisplay}</p>
      </div>

      <div class="pc-add-to-cart">
        <button class="add-to-cart pc-add-to-cart">Add to cart</button>
      </div>
    </div>
  `).join('');

  container.querySelectorAll('.pc-card').forEach(card => {
    card.addEventListener('click', e => {
      if (e.target.closest('.add-to-cart')) return;

      const productId = card.dataset.id;
      const product = products.find(p => p.id == productId);
      if (!product) return;

      localStorage.setItem('selectedProduct', JSON.stringify(product));
      window.location.href = '/product/product.html';
    });
  });

 
  initDarkMode();
}

export { fetchAndRenderPCCards };
