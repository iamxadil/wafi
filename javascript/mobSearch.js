import { initMobSearchToggle } from './mobSearchToggle.js';
import { initDarkMode } from './theme.js';

export function injectMobileSearch(containerSelector = '.search-section') {
  const container = document.querySelector(containerSelector);
  if (!container) return;

  container.innerHTML = `
    <!-- Search Input -->
    <div class="mob-input-wrapper">
      <i class="bi bi-search"></i>
      <input type="search" name="search" id="products-search" placeholder="Search For Your Product" autocomplete="off">
    </div>

    <!-- Results -->
    <ul class="mob-search-results"></ul>

    <!-- Filter button & menu wrapper -->
    <div class="filter-wrapper">
      <div class="filter-button" style="cursor: pointer;">
        <i class="bi bi-sliders"></i>
      </div>
      <div class="filter-menu" style="display: none;">
        <div class="filter-group sort-dropdown">
          <label for="sortOptions">Sort By:</label>
          <select id="sortOptions" class="cont-border">
            <option value="" disabled selected>Select...</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="a-z">Alphabetical: A to Z</option>
            <option value="z-a">Alphabetical: Z to A</option>
          </select>
        </div>

        <div class="filter-group filter-price">
          <label for="priceRange">Max Price: <span id="priceValue">3000000</span> IQD</label>
          <input type="range" id="priceRange" min="200000" max="3000000" step="100000" value="3000000">
        </div>

        <div class="action-buttons filter-group">
          <button id="apply-button">Apply</button>
          <button id="reset-button">Reset</button>
        </div>
      </div>
    </div>
  `;

  initMobSearchToggle();

  const input = container.querySelector('#products-search');
  const resultsList = container.querySelector('.mob-search-results');
  let products = [];
  let selectedIndex = -1;

  fetch('/json/products.json')
    .then(res => res.json())
    .then(data => {
      products = data;
    });

  input.addEventListener('input', () => {
    const searchValue = input.value.trim().toLowerCase();
    resultsList.innerHTML = '';
    selectedIndex = -1;

    if (!searchValue) return;

    const matches = products.filter(p =>
      p.name.toLowerCase().includes(searchValue) ||
      p.brand?.toLowerCase().includes(searchValue)
    ).slice(0, 5);

    if (matches.length === 0) return;

    matches.forEach(product => {
      const li = document.createElement('li');
      li.className = 'mob-search-result-item';
      li.textContent = product.name;

      li.addEventListener('click', () => {
        localStorage.setItem('selectedProduct', JSON.stringify(product));
        window.location.href = '/product/product.html';
      });

      resultsList.appendChild(li);
    });
    initDarkMode();
  });

  input.addEventListener('keydown', e => {
    const items = [...resultsList.querySelectorAll('.mob-search-result-item')];
    if (items.length === 0) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      selectedIndex = (selectedIndex + 1) % items.length;
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      selectedIndex = (selectedIndex - 1 + items.length) % items.length;
    } else if (e.key === 'Enter' && selectedIndex >= 0) {
      e.preventDefault();
      items[selectedIndex].click();
      return;
    }

    items.forEach((item, i) => {
      item.classList.toggle('selected', i === selectedIndex);
    });
  });

  initDarkMode();
}
