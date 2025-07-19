// secSlider.js
function injectSectionSliders(containerSelector = '.sections-slider') {
  const container = document.querySelector(containerSelector);
  if (!container) return;

  const categories = [
    'Laptops', 'Headphones', 'Mice', 'Keyboards', 'Joysticks', 'Routers', 'Computers'
  ];

  container.innerHTML = categories.map(cat => `
    <div class="sec-slide cont-border" data-category="${cat}">
      <p>${cat}</p>
    </div>
  `).join('');

  document.querySelectorAll('.sec-slide').forEach(slide => {
    slide.addEventListener('click', () => {
      const category = slide.getAttribute('data-category');
      window.location.href = `/mobCategory/mob-category.html?category=${encodeURIComponent(category)}`;
    });
  });
}

export { injectSectionSliders };
