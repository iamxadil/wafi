
import { initDarkMode } from "../javascript/theme.js";

// pc-cards.js

async function fetchAndRenderPCCards() {
  try {
    const response = await fetch('/json/products.json');
    if (!response.ok) throw new Error('Failed to fetch products');

    const products = await response.json();
    const allProductContainers = document.querySelectorAll('.product-cards');

    allProductContainers.forEach(container => {
      if (container.classList.contains('laptops-cards')) {
        const laptops = products.filter(p => p.section === 'Laptops');
        renderProducts(container, laptops);
      } else if (container.classList.contains('accessories-cards')) {
        const accessories = products.filter(p => p.section === 'Accessories');
        renderProducts(container, accessories);
      } else if (container.classList.contains('headphones-cards')) {
        const audios = products.filter(p => p.section === 'Audios');
        renderProducts(container, audios);
      }
    });
  } catch (err) {
    console.error('Error loading PC products:', err);
  }
}

function renderProducts(container, products) {
  container.innerHTML = products.map(product => `
    <div class="pc-card product-card cont-border"
         data-name="${product.name}"
         data-price="${product.priceRaw}"
         data-brand="${product.brand}
         onclick="viewProduct(${product.id})"
         data-id="${product.id}">

      <div class="pc-product-img">
        <img src="${product.image}" alt="${product.name}">
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
    
  initDarkMode(); // Reinitialize dark mode styles after rendering
}

export { fetchAndRenderPCCards };
