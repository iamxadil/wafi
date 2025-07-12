import '../javascript/theme.js';
import { initDarkMode } from '../javascript/theme.js';

document.addEventListener('DOMContentLoaded', () => {
  const product = JSON.parse(localStorage.getItem('selectedProduct'));
  if (!product) {
    document.body.innerHTML = '<h2>Product not found.</h2>';
    return;
  }

  const container = document.querySelector('.product-container');
  if (!container) return;

  container.innerHTML = `
    <!-- Left: Product Image -->
    <div class="product-image-box">
      <button class="nav-arrow left"><i class="bi bi-chevron-left"></i></button>
      <img src="${product.image[0] || product.image}" alt="${product.name}" class="product-image">
      <button class="nav-arrow right"><i class="bi bi-chevron-right"></i></button>
    </div>

    <!-- Right: Product Details -->
    <div class="product-details-box">

      <!-- Details Content -->
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
            <p>Price:</p>
            <p>SKU:</p>
            <p>Brand:</p>
            <p>Color:</p>
            <p>Form:</p>
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

      <!-- Bottom Buttons -->
      <div class="product-buttons">
        <button class="btn add-to-cart">Add to Cart</button>
        <button class="btn buy-now">Buy Now</button>
      </div>
    </div>
  `;

  // Handle image carousel (for future multi-images)
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

  // === CART FUNCTIONALITY ===

  const addToCartBtn = container.querySelector('.add-to-cart');
  const buyNowBtn = container.querySelector('.buy-now');

  addToCartBtn.addEventListener('click', () => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const existing = cart.find(p => p.id === product.id);

    if (existing) {
      existing.quantity = (existing.quantity || 1) + 1;
    } else {
      cart.push({ ...product, quantity: 1 });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    alert('Added to cart!');
  });

  buyNowBtn.addEventListener('click', () => {
    const newCart = [{ ...product, quantity: 1 }];
    localStorage.setItem('cart', JSON.stringify(newCart));
    window.location.href = '/cart/cart.html';
  });

  initDarkMode();
});
