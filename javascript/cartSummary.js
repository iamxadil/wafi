import { initDarkMode } from "./theme.js";

let buttonsInitialized = false;

function initCartSummary() {
  function formatIQD(amount) {
    return new Intl.NumberFormat('en-US').format(amount) + ' IQD';
  }

  function calculateCartTotal() {
    const itemPrices = document.querySelectorAll('.item-price h3');
    let subtotal = 0;

    itemPrices.forEach(priceEl => {
      const rawText = priceEl.textContent.replace(/[^\d]/g, '');
      subtotal += parseInt(rawText) || 0;
    });

    const delivery = 5000;
    const total = subtotal + delivery;

    const subtotalEl = document.getElementById('subtotal');
    const deliveryEl = document.getElementById('delivery-fee');
    const totalEl = document.getElementById('total-price');

    if (subtotalEl) subtotalEl.textContent = formatIQD(subtotal);
    if (deliveryEl) deliveryEl.textContent = formatIQD(delivery);
    if (totalEl) totalEl.textContent = formatIQD(total);
  }

  function injectClearCartPopup() {
    if (document.getElementById('clear-cart-popup')) return;

    const popupHTML = `
      <div id="clear-cart-popup" class="cart-confirm-overlay hidden">
        <div class="cart-confirm-box">
          <p>Are you sure you want to clear the cart?</p>
          <div class="popup-buttons">
            <button id="confirm-clear">Yes, Clear</button>
            <button id="cancel-clear">Cancel</button>
          </div>
        </div>
      </div>
    `;
    document.body.insertAdjacentHTML('beforeend', popupHTML);
  }

  function setupClearCartPopupActions() {
    const popup = document.getElementById('clear-cart-popup');
    const confirmBtn = document.getElementById('confirm-clear');
    const cancelBtn = document.getElementById('cancel-clear');

    if (!popup || !confirmBtn || !cancelBtn) return;

    confirmBtn.addEventListener('click', () => {
      localStorage.removeItem('cartItems');
      localStorage.setItem('cartCount', 0);
      location.reload();
    });

    cancelBtn.addEventListener('click', () => {
      popup.classList.add('hidden');
    });
  }

  function setupActions() {
    if (buttonsInitialized) return;
    buttonsInitialized = true;

    injectClearCartPopup();
    setupClearCartPopupActions();

    const clearBtn = document.getElementById('clear-cart');
    const proceedBtn = document.getElementById('proceed-payment');

    if (clearBtn) {
      clearBtn.addEventListener('click', () => {
        document.getElementById('clear-cart-popup')?.classList.remove('hidden');
      });
    }

    if (proceedBtn) {
      proceedBtn.addEventListener('click', () => {
        alert("Redirecting to payment gateway...");
      });
    }
  }

  calculateCartTotal();
  setupActions();
  initDarkMode();
}

export { initCartSummary };
