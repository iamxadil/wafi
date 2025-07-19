import { incrementCartCount } from '../javascript/cartCount.js';

export function initMobileProduct() {
  const product = JSON.parse(localStorage.getItem('selectedProduct'));
  if (!product) {
    document.body.innerHTML = '<h2>Product not found.</h2>';
    return;
  }

  const mobContainer = document.querySelector('.mob-only');
  if (!mobContainer) return;

  mobContainer.innerHTML = `
    <div class="navbar-spacer"></div>
    <div class="mob-product-wrapper cont-border">
      <div class="mob-image-navigator">
        <div class="navigate cont-border"></div>
        <div class="navigate cont-border"></div>
        <div class="navigate cont-border"></div>
      </div>
      <div class="mob-image-wrapper">
        <img class="mob-product-image" src="${Array.isArray(product.image) ? product.image[0] : product.image}" alt="${product.name}">
      </div>
      <div class="mob-product-details">
        <div class="mob-product-name"><h1>${product.name}</h1></div>
        <div class="mob-product-status">
          <h1 id="mob-product-price">${product.priceDisplay || 'N/A'}</h1>
          <h1 id="mob-product-status" style="color: ${product.inStock ? 'lightgreen' : 'red'}">
            ${product.inStock ? 'In Stock' : 'Out of Stock'}
          </h1>
        </div>
        <div class="mob-product-description">
          ${product.description || 'No description available.'}
        </div>
        <div class="mob-action-buttons">
          <button class="add-to-cart"><i class="bi bi-caret-right-fill"></i> Add to cart</button>
          <button class="buy-now"><i class="bi bi-caret-right-fill"></i> Buy now</button>
        </div>
      </div>
    </div>

    <div class="mob-specs-wrapper cont-border">
      <button class="mob-spec-toggle"><i class="bi bi-caret-right-fill"></i> Specifications</button>
      <ul class="mob-spec-list"></ul>
    </div>

    <div class="mob-compare-wrapper cont-border">
      <button class="mob-compare-toggle"><i class="bi bi-caret-right-fill"></i> Compare with:</button>
      <div class="mob-compare-content" style="display:none;">
        <input type="text" class="mob-compare-input" placeholder="Search product...">
        <div class="mob-compare-results" style="display:none;"></div>
      </div>
    </div>
  `;

  // === Image Navigator Logic ===
  const images = Array.isArray(product.image) ? product.image : [product.image];
  let currentIndex = 0;

  const imgElement = mobContainer.querySelector('.mob-product-image');
  const navigatorDots = mobContainer.querySelectorAll('.mob-image-navigator .navigate');

  function updateDots(index) {
    navigatorDots.forEach((dot, i) => {
      dot.style.transition = 'all 0.3s ease';
      if (i === index) {
        dot.style.height = '50px';
        dot.style.backgroundColor = '#757575';
        dot.style.borderColor = '#757575';
      } else {
        dot.style.height = '24px';
        dot.style.backgroundColor = 'transparent';
        dot.style.borderColor = '#000';
      }
    });
  }

  function updateImage(index) {
    if (currentIndex === index) return;
    imgElement.classList.add('fade-out');
    setTimeout(() => {
      imgElement.src = images[index];
      imgElement.classList.remove('fade-out');
    }, 150);
    currentIndex = index;
    updateDots(index);
  }

  updateImage(0); // Initialize first image

  // === Swipe left/right Logic ===
  let startX = 0;
  let isSwiping = false;

  imgElement.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
    isSwiping = true;
  });

  imgElement.addEventListener('touchmove', (e) => {
    if (!isSwiping) return;
  });

  imgElement.addEventListener('touchend', (e) => {
    if (!isSwiping) return;
    const endX = e.changedTouches[0].clientX;
    const diffX = endX - startX;
    if (diffX > 30) {
      // swipe right - prev image
      updateImage((currentIndex - 1 + images.length) % images.length);
    } else if (diffX < -30) {
      // swipe left - next image
      updateImage((currentIndex + 1) % images.length);
    }
    isSwiping = false;
  });

  // === Add to Cart ===
  mobContainer.querySelector('.add-to-cart').addEventListener('click', () => {
    const cart = JSON.parse(localStorage.getItem('cartItems')) || [];
    const existing = cart.find(p => p.id === product.id);
    if (existing) {
      existing.quantity = (existing.quantity || 1) + 1;
    } else {
      cart.push({ ...product, quantity: 1 });
    }
    localStorage.setItem('cartItems', JSON.stringify(cart));
    incrementCartCount();
    alert('Added to cart!');
  });

  // === Buy Now ===
  mobContainer.querySelector('.buy-now').addEventListener('click', () => {
    localStorage.setItem('cartItems', JSON.stringify([{ ...product, quantity: 1 }]));
    window.location.href = '/cart/cart.html';
  });

  // === Specs Toggle and Insert specs + descriptionList ===
  const specsWrapper = mobContainer.querySelector('.mob-specs-wrapper');
  const specsToggleBtn = specsWrapper.querySelector('.mob-spec-toggle');
  const specList = specsWrapper.querySelector('.mob-spec-list');

  const formatKey = (key) =>
    key.replace(/_/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase());

  specsToggleBtn.addEventListener('click', () => {
    if (specList.children.length === 0) {
      const specs = product.specs || {};
      for (let key in specs) {
        const li = document.createElement('li');
        li.innerHTML = `<strong>${formatKey(key)}:</strong> ${specs[key]}`;
        specList.appendChild(li);
      }
      if (Array.isArray(product.descriptionList) && product.descriptionList.length) {
        const descHeader = document.createElement('li');
        specList.appendChild(descHeader);
        product.descriptionList.forEach(desc => {
          const descItem = document.createElement('li');
          descItem.textContent = desc;
          specList.appendChild(descItem);
        });
      }
    }
    specList.classList.toggle('visible');
    const icon = specsToggleBtn.querySelector('i');
    if (specList.classList.contains('visible')) {
      icon.className = 'bi bi-caret-down-fill';
    } else {
      icon.className = 'bi bi-caret-right-fill';
    }
  });

  // === Compare with Toggle + Search ===
  const compareWrapper = mobContainer.querySelector('.mob-compare-wrapper');
  const compareToggleBtn = compareWrapper.querySelector('.mob-compare-toggle');
  const compareContent = compareWrapper.querySelector('.mob-compare-content');
  const compareInput = compareWrapper.querySelector('.mob-compare-input');
  const compareResults = compareWrapper.querySelector('.mob-compare-results');

  compareToggleBtn.addEventListener('click', () => {
    const isVisible = compareContent.style.display === 'block';
    if (isVisible) {
      compareContent.style.display = 'none';
      compareResults.style.display = 'none';
      compareToggleBtn.querySelector('i').className = 'bi bi-caret-right-fill';
    } else {
      compareContent.style.display = 'block';
      compareToggleBtn.querySelector('i').className = 'bi bi-caret-down-fill';
    }
  });

  compareInput.addEventListener('input', async () => {
    const value = compareInput.value.trim().toLowerCase();
    compareResults.innerHTML = '';
    if (!value) {
      compareResults.style.display = 'none';
      return;
    }

    try {
      const res = await fetch('/json/products.json');
      const products = await res.json();
      const matches = products.filter(p => p.name.toLowerCase().includes(value) && p.id !== product.id);

      if (matches.length === 0) {
        compareResults.innerHTML = `<div style="padding: 0.5rem;">No matches</div>`;
      } else {
        compareResults.innerHTML = matches
          .map(p => `
            <div class="compare-result-item" data-id="${p.id}">
              <img src="${Array.isArray(p.image) ? p.image[0] : p.image}" alt="${p.name}">
              <span>${p.name}</span>
            </div>
          `).join('');
      }

      compareResults.style.display = 'block';

      compareResults.querySelectorAll('.compare-result-item').forEach(item => {
        item.addEventListener('click', () => {
          const selectedId = item.dataset.id;
          const matchedProduct = products.find(p => p.id === Number(selectedId));
          if (matchedProduct) {
            localStorage.setItem('compareProductA', JSON.stringify(product));
            localStorage.setItem('compareProductB', JSON.stringify(matchedProduct));
            window.location.href = '/compare/compare.html';
          }
        });
      });

    } catch {
      compareResults.innerHTML = `<div style="padding: 0.5rem; color: red;">Error loading products</div>`;
      compareResults.style.display = 'block';
    }
  });

  // Hide compare results if clicked outside
  document.addEventListener('click', e => {
    if (!compareWrapper.contains(e.target) && compareContent.style.display === 'block') {
      compareContent.style.display = 'none';
      compareResults.style.display = 'none';
      compareToggleBtn.querySelector('i').className = 'bi bi-caret-right-fill';
    }
  });
}

initMobileProduct();
