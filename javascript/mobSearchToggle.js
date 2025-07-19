export function initMobSearchToggle() {
  const filterButton = document.querySelector('.filter-button');
  const filterMenu = document.querySelector('.filter-menu');
  const searchSection = document.querySelector('.search-section');

  if (!filterButton || !filterMenu || !searchSection) {
    console.warn('One or more required elements not found.');
    return;
  }

  // Toggle visibility and position
  filterButton.addEventListener('click', () => {
    const isVisible = filterMenu.style.display === 'block';

    if (!isVisible) {
      const rect = searchSection.getBoundingClientRect();
      const scrollTop = window.scrollY || document.documentElement.scrollTop;

      filterMenu.style.position = 'absolute';
      filterMenu.style.top = `${rect.top + scrollTop + searchSection.offsetHeight + 15}px`;
      filterMenu.style.right = '2.5rem';
      filterMenu.style.display = 'block';
    } else {
      filterMenu.style.display = 'none';
    }
  });

  // Optional: click outside to close
  document.addEventListener('click', (e) => {
    if (!filterMenu.contains(e.target) && !filterButton.contains(e.target)) {
      filterMenu.style.display = 'none';
    }
  });

  // 🔁 Live update price value when range input changes
  const priceRange = document.getElementById('priceRange');
  const priceValue = document.getElementById('priceValue');

  if (priceRange && priceValue) {
    priceRange.addEventListener('input', () => {
      priceValue.textContent = parseInt(priceRange.value).toLocaleString();
    });
  }
}
