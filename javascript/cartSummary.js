import { initDarkMode } from "./theme.js";

let buttonsInitialized = false;

function initCartSummary() {
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
    if (clearBtn) {
      clearBtn.addEventListener('click', () => {
        document.getElementById('clear-cart-popup')?.classList.remove('hidden');
      });
    }

    // Proceed button logic is now handled in cartRenderer.js
  }

  setupActions();
  initDarkMode();
}

export { initCartSummary };
