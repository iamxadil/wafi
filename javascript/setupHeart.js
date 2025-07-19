function setupHeartButtons(containerSelector = '.mob-items-container') {
  const container = document.querySelector(containerSelector);
  if (!container) return;

  // Delegate click on hearts inside the container
  container.addEventListener('click', (e) => {
    const heartBtn = e.target.closest('.heart');

    e.stopPropagation(); // ✅ prevent parent card click
    e.preventDefault();  // ✅ prevent default link behavior (if any
    if (!heartBtn) return;

    const productCard = heartBtn.closest('.product-card');
    const productId = productCard?.dataset?.id;
    if (!productId) return;

    let likedProducts = JSON.parse(localStorage.getItem('likedProducts') || '{}');

    if (heartBtn.classList.contains('active')) {
      // Unlike
      heartBtn.classList.remove('active');
      heartBtn.querySelector('i').classList.replace('bi-suit-heart-fill', 'bi-suit-heart');
      delete likedProducts[productId];
    } else {
      // Like
      heartBtn.classList.add('active');
      heartBtn.querySelector('i').classList.replace('bi-suit-heart', 'bi-suit-heart-fill');
      likedProducts[productId] = (likedProducts[productId] || 0) + 1;
    }

    localStorage.setItem('likedProducts', JSON.stringify(likedProducts));
  });
}

function syncHeartButtonsUI(containerSelector = '.mob-items-container') {
  const container = document.querySelector(containerSelector);
  if (!container) return;

  const likedProducts = JSON.parse(localStorage.getItem('likedProducts') || '{}');

  container.querySelectorAll('.product-card').forEach(card => {
    const productId = card.dataset.id;
    const heartIcon = card.querySelector('.heart i');
    const heartBtn = card.querySelector('.heart');

    if (likedProducts[productId]) {
      heartIcon.classList.add('bi-suit-heart-fill');
      heartIcon.classList.remove('bi-suit-heart');
      heartBtn.classList.add('active');
    } else {
      heartIcon.classList.add('bi-suit-heart');
      heartIcon.classList.remove('bi-suit-heart-fill');
      heartBtn.classList.remove('active');
    }
  });
}

export { setupHeartButtons, syncHeartButtonsUI };
