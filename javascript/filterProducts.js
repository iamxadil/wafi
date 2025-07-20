import { initDarkMode } from "./theme.js";

//filterProducts.js
export function filterProductsInContainers(containerSelectors = [], options = {}) {
  containerSelectors.forEach(containerSelector => {
    const container = document.querySelector(containerSelector);
    if (!container) {
      return;
    }

    const cards = Array.from(container.querySelectorAll('.product-card'));
    if (!cards.length) return;

    const {
      maxPrice = Infinity,
      sortBy = '',
      brands = [],
    } = options;

    // Filter cards by price and brand
    let filteredCards = cards.filter(card => {
      const price = parseInt(card.dataset.price, 10);
      const cardBrand = card.dataset.brand || '';
      const priceMatch = price <= maxPrice;
      const brandMatch = brands.length === 0 || brands.includes(cardBrand);
      return priceMatch && brandMatch;
    });

    // Sort filtered cards
    switch (sortBy) {
      case 'price-asc':
        filteredCards.sort((a, b) => parseInt(a.dataset.price, 10) - parseInt(b.dataset.price, 10));
        break;
      case 'price-desc':
        filteredCards.sort((a, b) => parseInt(b.dataset.price, 10) - parseInt(a.dataset.price, 10));
        break;
      case 'a-z':
        filteredCards.sort((a, b) => a.dataset.name.localeCompare(b.dataset.name));
        break;
      case 'z-a':
        filteredCards.sort((a, b) => b.dataset.name.localeCompare(a.dataset.name));
        break;
    }

    // Hide all cards initially
    cards.forEach(card => (card.style.display = 'none'));

    // Remove old no-results message
    const oldMsg = container.querySelector('.no-results-msg');
    if (oldMsg) oldMsg.remove();

    if (filteredCards.length > 0) {
      filteredCards.forEach(card => {
        card.style.display = 'flex'; 
        container.appendChild(card);
      });
    } else {
      const msg = document.createElement('div');
      msg.className = 'no-results-msg';
      msg.innerHTML = `<p>No products found.</p>`;
      container.appendChild(msg);
      
    }

    initDarkMode();
  });
}

export function initFiltering() {
  const container = document.querySelector('.search-section');
  if (!container) return;

  const applyBtn = container.querySelector('#apply-button');
  const resetBtn = container.querySelector('#reset-button');
  if (!applyBtn || !resetBtn) return;

  applyBtn.addEventListener('click', () => {
    const sortBy = container.querySelector('#sortOptions').value;
    const maxPrice = parseInt(container.querySelector('#priceRange').value, 10);

    // Get selected brands
    const brandCheckboxes = container.querySelectorAll('input[name="brand"]:checked');
    const selectedBrands = Array.from(brandCheckboxes).map(cb => cb.value);

    // List all containers to filter:
    const containersToFilter = [
      '.mob-items-container',
      '.most-popular-container',
      '.mob-cat-container',
      '.mob-laptops-container',
      '.mob-accessories-container',
      '.mob-headphones-container'

      // add more container selectors here as needed
      
    ];

    filterProductsInContainers(containersToFilter, {
      maxPrice,
      sortBy,
      brands: selectedBrands,
    });
    
  });

  resetBtn.addEventListener('click', () => {
    container.querySelector('#sortOptions').value = '';
    container.querySelector('#priceRange').value = 3000000;
    container.querySelector('#priceValue').textContent = '3,000,000';

    // Uncheck all brand checkboxes
    const brandCheckboxes = container.querySelectorAll('input[name="brand"]');
    brandCheckboxes.forEach(cb => cb.checked = false);

    // Reset filtering on all containers
    const containersToFilter = [
      '.mob-items-container',
      '.most-popular-container',
      '.mob-cat-container',
      '.mob-laptops-container',
      '.mob-accessories-container',
      '.mob-headphones-container'

      // add more container selectors here as needed
    ];

    filterProductsInContainers(containersToFilter, {});
    
  });
}
