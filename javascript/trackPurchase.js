function initAddToCartTracking(containerSelector = '.mob-items-container') {
  const container = document.querySelector(containerSelector);
  if (!container) return;

 

  // Use delegation so new elements get tracked automatically
  container.addEventListener('click', (e) => {
    const addToCartBtn = e.target.closest('.add-to-cart');
    if (!addToCartBtn) return;

    const productCard = addToCartBtn.closest('.product-card');
    if (!productCard) return;

    const productId = productCard.dataset.id;
    if (!productId) return;

    console.log('Add to cart clicked for product:', productId);

    // Get current counts from localStorage or initialize
    let addedToCartCounts = JSON.parse(localStorage.getItem('addedToCartCounts') || '{}');

    addedToCartCounts[productId] = (addedToCartCounts[productId] || 0) + 1;

    localStorage.setItem('addedToCartCounts', JSON.stringify(addedToCartCounts));
  });
}

export { initAddToCartTracking };
