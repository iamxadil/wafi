import { initDarkMode } from "./theme.js";

export async function initCategoryPage() {
  const container = document.querySelector('.category-cards-container');
  if (!container) return;

  function getQueryParams() {
    const params = new URLSearchParams(window.location.search);
    return {
      brand: params.get('brand') || null,
      category: params.get('category') || null,
    };
  }

  async function fetchProducts() {
    try {
      const response = await fetch('/json/products.json'); // adjust path
      if (!response.ok) throw new Error('Failed to fetch products');
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
      return [];
    }
  }

  function filterProducts(products, filters) {
    return products.filter(product => {
      if (filters.brand) {
        return product.brand.toLowerCase() === filters.brand.toLowerCase();
      }
      if (filters.category) {
        return product.category.toLowerCase() === filters.category.toLowerCase();
      }
      return true;
    });
  }

  function renderProducts(container, products) {
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


  
  const filters = getQueryParams();
  const products = await fetchProducts();
  const filteredProducts = filterProducts(products, filters);

  renderProducts(container, filteredProducts);
}
