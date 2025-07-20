import { initDarkMode } from '../javascript/theme.js';

// footer.js
export function injectFooter(targetSelector = '#footer') {
  const target = document.querySelector(targetSelector);
  if (!target) return; // do nothing if container not found

  const footer = document.createElement('footer');
  footer.className = 'site-footer';

  footer.innerHTML = `
    <div class="footer-inner">
      <div class="footer-logo">
        <h2>alwafi<span>.</span></h2>
      </div>

      <div class="footer-social" aria-label="Social Media Links">
        <a href="#" aria-label="Facebook"><i class="bi bi-facebook"></i></a>
        <a href="#" aria-label="Twitter"><i class="bi bi-twitter"></i></a>
        <a href="#" aria-label="Instagram"><i class="bi bi-instagram"></i></a>
        <a href="#" aria-label="YouTube"><i class="bi bi-youtube"></i></a>
      </div>
    </div>

    <div class="footer-bottom">
      <p>&copy; ${new Date().getFullYear()} Awlafi. All rights reserved.</p>
    </div>
  `;

  target.appendChild(footer);
  initDarkMode();
}
