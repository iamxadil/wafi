function initDarkMode() {

  const pageBody = document.querySelector('body');
  if (!pageBody) return;

  const SearchButton = document.querySelector('.search-button');
  const homeButton = document.querySelector('.home-button');
  const popupBox = document.querySelector('.cart-popup-box');

  const applyDarkModeToPage = (isDark) => {
    const wafiLogos = document.querySelectorAll('.navbar-logo');
    const elements = {
      texts: document.querySelectorAll('h1, h2, h3, h4, a, .bi-person, p, span, .name, .price, .cart-item, .quantity-controls, .remove-btn, i'),
      allButtons: document.querySelectorAll('button'),
      allInputs: document.querySelectorAll('input'),
      theTwoBars: document.querySelectorAll('.first-bar, .second-bar'),
      labels: document.querySelectorAll('label'),
      citySelect: document.querySelector('#citySelect'),
      contBorders: document.querySelectorAll('.cont-border'),
      sliderBorders: document.querySelectorAll('.slider-border'),
      filterButton: document.querySelector('.filter-button')
    };
    const dotsContainer = document.querySelector('.hot-slider-dots');
    const dots = document.querySelectorAll('.hot-slider-dots .hot-dot');

    pageBody.classList.toggle('dark-mode-style', isDark);
    elements.texts.forEach(el => el.classList.toggle('dark-text', isDark));
    elements.allButtons.forEach(el => el.classList.toggle('dark-button', isDark));
    elements.allInputs.forEach(el => el.classList.toggle('dark-button', isDark));
    elements.theTwoBars.forEach(el => el.classList.toggle('dark-bars', isDark));
    elements.labels.forEach(el => el.classList.toggle('dark-label', isDark));
    elements.contBorders.forEach(el => el.classList.toggle('dark-border', isDark));
    elements.sliderBorders.forEach(el => el.classList.toggle('dark-border', isDark));
    if(elements.citySelect) elements.citySelect.classList.toggle('dark-border', isDark);
    if(elements.filterButton) elements.filterButton.classList.toggle('dark-border', isDark);
    if(SearchButton) SearchButton.classList.toggle('dark-search-button', isDark);
    if(homeButton) homeButton.style.color = isDark ? 'white' : 'black';
    if(popupBox) popupBox.style.background = isDark ? 'rgba(19, 20, 80, 0.4)' : '';
    if (dotsContainer) dotsContainer.classList.toggle('dark-dots-container', isDark);
    dots.forEach(dot => dot.classList.toggle('dark-dot', isDark));

    wafiLogos.forEach(logo => {
      logo.src = isDark
        ? '/assets/Icons/wafi-logo-outline-white.svg'
        : '/assets/Icons/wafi-logo-outline.svg';
    });
  };

  // Load preference and apply
  const saved = localStorage.getItem('darkMode') === 'true';
  applyDarkModeToPage(saved);


     // Setup toggle listeners
  document.querySelectorAll('.dark-mode').forEach(button => {
    button.addEventListener('click', () => {
      const isDark = !pageBody.classList.contains('dark-mode-style');
      localStorage.setItem('darkMode', isDark);
      applyDarkModeToPage(isDark);
    });
  });
 
}

export { initDarkMode, };
