import { initDarkMode } from "./theme.js";
import { setupPagination } from "./pagination.js"; // adjust path if needed

export async function initCategoryPage() {
  const container = document.querySelector('.category-cards-container');
  const paginationContainer = document.querySelector('.pagination.pc-pagination');
  if (!container || !paginationContainer) return;

  // Parse URL query params for filters
  function getQueryParams() {
    const params = new URLSearchParams(window.location.search);
    return {
      brand: params.get('brand') || null,
      category: params.get('category') || null,
    };
  }

  // Fetch all products JSON
  async function fetchProducts() {
    try {
      const response = await fetch('/json/products.json'); // adjust path if needed
      if (!response.ok) throw new Error('Failed to fetch products');
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
      return [];
    }
  }

  // Filter products by brand and category if specified
  function filterProducts(products, filters) {
    return products.filter(product => {
      if (filters.brand && product.brand.toLowerCase() !== filters.brand.toLowerCase()) {
        return false;
      }
      if (filters.category && product.category.toLowerCase() !== filters.category.toLowerCase()) {
        return false;
      }
      return true;
    });
  }

  // Render product cards into container
  function renderProducts(products) {
    if (products.length === 0) {
      container.innerHTML = `<p>No products found for your selection.</p>`;
      return;
    }
    container.innerHTML = products.map(product => `
      <div class="pc-card product-card cont-border"
           data-name="${product.name}"
           data-price="${product.priceRaw}"
           data-brand="${product.brand}">

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

    initDarkMode();
  }

  // Attach click event listeners to cards for navigation
  function attachCardClickListeners(products) {
    const cards = document.querySelectorAll('.pc-card');
    cards.forEach(card => {
      card.addEventListener('click', (e) => {
        if (e.target.closest('.add-to-cart')) return;

        const productName = card.dataset.name;
        const product = products.find(p => p.name === productName);
        if (!product) return;

        localStorage.setItem('selectedProduct', JSON.stringify(product));
        window.location.href = '/product/product.html';
      });
    });
  }

  // Main execution
  const filters = getQueryParams();
  const products = await fetchProducts();
  const filteredProducts = filterProducts(products, filters);

  // Set items per page (adjust as you want)
  const itemsPerPage = 6;

  setupPagination(
    filteredProducts,
    itemsPerPage,
    (pageItems) => {
      renderProducts(pageItems);
      attachCardClickListeners(pageItems);
    },
    paginationContainer
  );
}
