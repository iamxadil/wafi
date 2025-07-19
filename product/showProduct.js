import { incrementCartCount } from '../javascript/cartCount.js';
import '../javascript/theme.js';
import { initDarkMode } from '../javascript/theme.js';

document.addEventListener('DOMContentLoaded', () => {
  const product = JSON.parse(localStorage.getItem('selectedProduct'));
  if (!product) return (document.body.innerHTML = '<h2>Product not found.</h2>');

  const container = document.querySelector('.product-container');
  if (!container) return;

  container.innerHTML = `
    <div class="left-side-wrapper">
      <div class="product-image-box">
        <button class="nav-arrow left"><i class="bi bi-chevron-left"></i></button>
        <img src="${product.image[0] || product.image}" alt="${product.name}" class="product-image">
        <button class="nav-arrow right"><i class="bi bi-chevron-right"></i></button>
      </div>

      <div class="compare-section">
        <h3>Compare with:</h3>
        <input type="text" class="compare-input" placeholder="Search product...">
        <div class="compare-results"></div>
      </div>
    </div>

    <div class="product-details-box">
      <div class="product-details-content">
        <h1 class="product-title">${product.name}</h1>
        <div class="product-details-header">
          <div class="details-title"><h3>Details</h3></div>
          <div class="stock-status"><h3 style="color:${product.inStock ? 'lightgreen' : 'red'}">
            ${product.inStock ? 'In Stock' : 'Out of Stock'}</h3>
          </div>
        </div>
        <div class="product-specs">
          <div class="spec-labels">
            <p>Price:</p><p>SKU:</p><p>Brand:</p><p>Color:</p><p>Form:</p>
          </div>
          <div class="spec-values">
            <p>${product.priceDisplay || 'N/A'}</p>
            <p>${product.sku || 'N/A'}</p>
            <p>${product.brand || 'N/A'}</p>
            <p>${product.color || 'N/A'}</p>
            <p>${product.form || product.formFactor || 'N/A'}</p>
          </div>
        </div>
      </div>

      <div class="product-description-section">
        <div class="description-heading-toggle">
          <h3 class="description-heading">Product Specs</h3>
          <button class="toggle-desc"><i class="bi bi-chevron-down"></i></button>
        </div>
        <div class="product-description-content hidden">
          <ul class="product-description">
            ${(product.descriptionList || [])
              .map(desc => `<li><i class="bi bi-check-circle-fill"></i> ${desc}</li>`)
              .join('') || "<li>No description available.</li>"}
          </ul>
        </div>
      </div>

      <div class="product-buttons">
        <button class="btn add-to-cart">Add to Cart</button>
        <button class="btn buy-now">Buy Now</button>
      </div>
    </div>
  `;

  // Carousel
  const images = Array.isArray(product.image) ? product.image : [product.image];
  let currentIndex = 0;
  const productImg = container.querySelector('.product-image');
  const leftArrow = container.querySelector('.nav-arrow.left');
  const rightArrow = container.querySelector('.nav-arrow.right');

  const updateImage = () => {
    productImg.src = images[currentIndex];
  };

  leftArrow?.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    updateImage();
  });

  rightArrow?.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % images.length;
    updateImage();
  });

  // Touch / Drag Support for Carousel Image
  let startX = 0;
  let isDragging = false;

  productImg.addEventListener('touchstart', e => {
    startX = e.touches[0].clientX;
    isDragging = true;
  });

  productImg.addEventListener('touchmove', e => {
    if (!isDragging) return;
    const currentX = e.touches[0].clientX;
    const diffX = currentX - startX;
    // Optional: Could add some visual feedback here on drag
  });

  productImg.addEventListener('touchend', e => {
    if (!isDragging) return;
    const endX = e.changedTouches[0].clientX;
    const diffX = endX - startX;
    if (diffX > 30) { // swipe right, go prev image
      currentIndex = (currentIndex - 1 + images.length) % images.length;
      updateImage();
    } else if (diffX < -30) { // swipe left, go next image
      currentIndex = (currentIndex + 1) % images.length;
      updateImage();
    }
    isDragging = false;
  });

  // Optional: mouse drag support
  productImg.addEventListener('mousedown', e => {
    startX = e.clientX;
    isDragging = true;
  });
  productImg.addEventListener('mouseup', e => {
    if (!isDragging) return;
    const endX = e.clientX;
    const diffX = endX - startX;
    if (diffX > 30) {
      currentIndex = (currentIndex - 1 + images.length) % images.length;
      updateImage();
    } else if (diffX < -30) {
      currentIndex = (currentIndex + 1) % images.length;
      updateImage();
    }
    isDragging = false;
  });
  productImg.addEventListener('mouseleave', () => {
    isDragging = false;
  });

  // Description Toggle
  const toggleBtn = container.querySelector('.toggle-desc');
  const descContent = container.querySelector('.product-description-content');
  toggleBtn?.addEventListener('click', () => {
    descContent.classList.toggle('hidden');
    toggleBtn.classList.toggle('rotate');
  });

  // Cart buttons
  container.querySelector('.add-to-cart')?.addEventListener('click', () => {
    const cart = JSON.parse(localStorage.getItem('cartItems')) || [];
    const existing = cart.find(p => p.id === product.id);
    if (existing) {
      existing.quantity = (existing.quantity || 1) + 1;
    } else {
      cart.push({ ...product, quantity: 1 });
    }
    localStorage.setItem('cartItems', JSON.stringify(cart));
    alert('Added to cart!');
    incrementCartCount();
  });

  container.querySelector('.buy-now')?.addEventListener('click', () => {
    localStorage.setItem('cartItems', JSON.stringify([{ ...product, quantity: 1 }]));
    window.location.href = '/cart/cart.html';
  });

  // Compare search
  const input = container.querySelector('.compare-input');
  const resultsBox = container.querySelector('.compare-results');

  input.addEventListener('input', async () => {
    const value = input.value.trim().toLowerCase();
    resultsBox.innerHTML = '';
    if (!value) return (resultsBox.style.display = 'none');

    try {
      const res = await fetch('/json/products.json');
      const products = await res.json();
      const matches = products.filter(p => p.name.toLowerCase().includes(value) && p.id !== product.id);

      if (matches.length === 0) {
        resultsBox.innerHTML = `<div style="padding: 0.5rem;">No matches</div>`;
      } else {
        resultsBox.innerHTML = matches
          .map(p => `
            <div class="compare-result-item" data-id="${p.id}">
              <img src="${p.image}" alt="${p.name}">
              <span>${p.name}</span>
            </div>
          `).join('');
      }

      resultsBox.style.display = 'block';

      // Add click events
      resultsBox.querySelectorAll('.compare-result-item').forEach(item => {
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

    } catch (err) {
      resultsBox.innerHTML = `<div style="padding: 0.5rem; color: red;">Error loading products</div>`;
      resultsBox.style.display = 'block';
    }
  });

  document.addEventListener('click', e => {
    if (!container.querySelector('.compare-section').contains(e.target)) {
      resultsBox.style.display = 'none';
    }
  });

  initDarkMode();
});


