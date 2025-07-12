// preloader.js

function injectPreloader() {
  const preloaderContainer = document.getElementById('preloader');

if (preloaderContainer) {
  preloaderContainer.innerHTML = `
    <svg id="logo-preloader" viewBox="0 0 500 500" xmlns="http://www.w3.org/2000/svg">
      <path class="logo-stroke" d="M280.5,291.49l21.72,38.32c3.51,6.23,12.29,6.23,15.97.16l63.39-106.18,25.55-44.39c3.51-6.23-.96-13.89-7.98-13.89h-45.83c-3.35,0-6.39,1.76-7.98,4.63l-30.98,53.65-33.85,58.6c-1.6,2.87-1.6,6.39,0,9.1Z"/>
      <path class="logo-stroke" d="M219.5,291.49l-21.72,38.32c-3.51,6.23-12.29,6.23-15.97.16l-63.39-106.18-25.55-44.39c-3.51-6.23.96-13.89,7.98-13.89h45.83c3.35,0,6.39,1.76,7.98,4.63l30.98,53.65,33.85,58.6c1.6,2.87,1.6,6.39,0,9.1Z"/>
      <path class="logo-stroke" d="M276.67,165.5h-52.53c-7.03,0-11.5,7.66-7.98,13.89l26.19,45.67c3.51,6.23,12.45,6.23,15.97,0l26.35-45.67c3.51-6.23-.96-13.89-7.98-13.89Z"/>
    </svg>
  `;
}
}



function applyPreloaderDarkBackground() {
  const isDark = localStorage.getItem('darkMode') === 'true';
  const preloader = document.getElementById('preloader');
  if (preloader) {
    preloader.style.backgroundColor = isDark ? '#121212' : '#ffffff';
    preloader.querySelectorAll('.logo-stroke').forEach(path => {
      path.style.stroke = isDark ? 'white' : 'black';
      path.style.fill = 'none';
    });
  }
}

function runPreloaderAnimation() {
  window.addEventListener("load", () => {
    setTimeout(() => {
      document.querySelectorAll('.logo-stroke').forEach(path => path.classList.add('filled'));
      const preloader = document.getElementById("preloader");
      if (preloader) {
        preloader.style.transition = "opacity 0.5s ease";
        preloader.style.opacity = "0";
        setTimeout(() => preloader.style.display = "none", 200);
      }
    }, 1500);
  });
}


function initPreloader() {
  injectPreloader();
  applyPreloaderDarkBackground();
  runPreloaderAnimation();
}



export {
  initPreloader
};
