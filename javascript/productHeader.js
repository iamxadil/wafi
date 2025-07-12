import { initDarkMode } from '../javascript/theme.js';

function injectProductHeaders() {
  const productHeaders = document.querySelectorAll('.product-header');

  // Get URL params once
  const params = new URLSearchParams(window.location.search);
  const brandParam = params.get('brand');
  const categoryParam = params.get('category');

  productHeaders.forEach(header => {
    let title = 'Products';

    const classList = header.classList;

    // Existing fixed titles by class
    if (classList.contains('laptops-cards-title')) title = 'Laptops';
    else if (classList.contains('accessories-cards-title')) title = 'Accessories';
    else if (classList.contains('headphones-cards-title')) title = 'Headphones';

    // NEW: If the container is for category page, override title dynamically
    if (classList.contains('category-cards-title')) {
      if (brandParam) title = brandParam;
      else if (categoryParam) title = categoryParam;
      else title = 'Products';
    }

    header.innerHTML = `
      <div class="product-title"><h1>${title}</h1></div>
      <div class="product-actions">
        <div class="product-actions">
          <div class="product-filter toggle-btn">
            <h1>Filter</h1>
            <i class="bi bi-funnel"></i>
            <div class="dropdown-panel filter-panel">
              <label><input type="checkbox" value="Asus" /> Asus</label>
              <label><input type="checkbox" value="Apple" /> Apple</label>
              <label><input type="checkbox" value="Lenovo" /> Lenovo</label>
            </div>
          </div>

          <div class="product-sort toggle-btn">
            <h1>Sort By</h1>
            <i class="bi bi-filter-left"></i>
            <div class="dropdown-panel sort-panel">
              <label><input type="radio" name="sort" value="price-asc" /> Price: Low to High</label>
              <label><input type="radio" name="sort" value="price-desc" /> Price: High to Low</label>
              <label><input type="radio" name="sort" value="a-z" /> Alphabetical: A to Z</label>
              <label><input type="radio" name="sort" value="z-a" /> Alphabetical: Z to A</label>
            </div>
          </div>
        </div>
      </div>

      <div class="card-search-bar cont-border">
        <input type="search" class="search-input" placeholder="Search for your product">
      </div>
    `;

    // Toggle logic for filter & sort panels
    const filterBtn = header.querySelector('.product-filter');
    const sortBtn = header.querySelector('.product-sort');
    const filterPanel = header.querySelector('.filter-panel');
    const sortPanel = header.querySelector('.sort-panel');

    const closePanels = () => {
      filterPanel.style.display = 'none';
      sortPanel.style.display = 'none';
    };

    filterBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = filterPanel.style.display === 'block';
      closePanels();
      filterPanel.style.display = isOpen ? 'none' : 'block';
    });

    sortBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = sortPanel.style.display === 'block';
      closePanels();
      sortPanel.style.display = isOpen ? 'none' : 'block';
    });

    document.addEventListener('click', closePanels);
    filterPanel.addEventListener('click', e => e.stopPropagation());
    sortPanel.addEventListener('click', e => e.stopPropagation());
  });

  initDarkMode();
}

export { injectProductHeaders };
