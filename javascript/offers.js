import { initDarkMode } from "./theme.js";

export function renderOffers(containerSelector = '.offers-card-container') {
  fetch('/json/offers.json')
    .then(res => res.json())
    .then(offers => {
      const container = document.querySelector(containerSelector);
      if (!container) return;

      container.innerHTML = ''; // Clear previous offers

      offers.forEach(offer => {
        const card = document.createElement('div');
        card.className = 'offer-card cont-border';
        card.dataset.id = offer.id;

        // Circle for discount
        const circle = document.createElement('div');
        circle.className = 'offer-circle cont-border';

        const circleBackdrop = document.createElement('div');
        circleBackdrop.className = 'circle-backdrop';

        const circleText = document.createElement('p');

        if (offer.offer.discountAmount) {
          // Calculate percentage from discountAmount and priceRaw
          const percent = Math.round((offer.offer.discountAmount / offer.priceRaw) * 100);
          circleText.textContent = `${percent}%`;
        } else if (offer.offer.discountPercentage) {
          circleText.textContent = `${offer.offer.discountPercentage}%`;
        } else {
          circleText.textContent = '';
        }

        circle.appendChild(circleText);
        circle.appendChild(circleBackdrop);

        // Product Image
        const imgWrapper = document.createElement('div');
        imgWrapper.className = 'offer-pic';

        const img = document.createElement('img');
        img.src = offer.image[0];
        img.alt = offer.name;

        imgWrapper.appendChild(img);

        // Details
        const details = document.createElement('div');
        details.className = 'offer-details';

        const brand = document.createElement('p');
        brand.className = 'product-offer-comp';
        brand.textContent = offer.brand;

        const name = document.createElement('h1');
        name.className = 'product-offer-name';
        name.textContent = offer.name;

        const price = document.createElement('p');
        price.className = 'product-offer-price';
        price.textContent = offer.priceDisplay;

        details.appendChild(brand);
        details.appendChild(name);
        details.appendChild(price);

        // Assemble card
        card.appendChild(circle);
        card.appendChild(imgWrapper);
        card.appendChild(details);

        // Click to view product
        card.addEventListener('click', () => {
          localStorage.setItem('selectedProduct', JSON.stringify(offer));
          window.location.href = '/product/product.html';
        });

        container.appendChild(card);
      });

      initDarkMode();
    })
    .catch(err => console.error('Failed to load offers:', err));
}
