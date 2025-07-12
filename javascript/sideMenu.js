function injectSideMenu() {
  const sideMenu = document.getElementById('side-menu');

  if (sideMenu) {
    sideMenu.innerHTML = `
      <div class="cancel-btn">
        <i class="bi bi-x-lg"></i>
      </div>
      <div class="menu-items">

        <div class="non-toggle">
          <h1><i class="bi bi-house"></i></h1>
          <h1 class="side home"><a href="/index.html" style="color: white; text-decoration: none;">Home</a></h1>
        </div>

        <!-- Products -->
        <div class="products-menu">
          <div class="products-toggle">
            <h1><i class="bi bi-dice-3"></i></h1>
            <h1 class="side products">Products <i class="bi bi-caret-down-fill"></i></h1>
          </div>
          <div class="dropdown">
            <a href="../laptops/laptops.html" class="dropdown-item">Laptops</a>
            <a href="../accessories/accessories.html" class="dropdown-item">Accessories</a>
            <a href="../audios/audios.html" class="dropdown-item">Headphones</a>
            <a href="#" class="dropdown-item">PCs</a>
          </div>
        </div>

        <!-- Laptops -->
        <div class="products-menu">
          <div class="products-toggle">
            <h1><i class="bi bi-laptop"></i></h1>
            <h1 class="side products">Laptops <i class="bi bi-caret-down-fill"></i></h1>
          </div>
          <div class="dropdown">
            <a href="../category/category.html?brand=Asus" class="dropdown-item">Asus</a>
            <a href="../category/category.html?brand=Acer" class="dropdown-item">Acer</a>
            <a href="../category/category.html?brand=Apple" class="dropdown-item">Apple</a>
            <a href="../category/category.html?brand=MSI" class="dropdown-item">MSI</a>
            <a href="../category/category.html?brand=DELL" class="dropdown-item">DELL</a>
            <a href="../category/category.html?brand=HP" class="dropdown-item">HP</a>
            <a href="../category/category.html?brand=Lenovo" class="dropdown-item">Lenovo</a>
          </div>
        </div>

        <!-- Accessories -->
        <div class="products-menu">
          <div class="products-toggle">
            <h1><i class="bi bi-headset"></i></h1>
            <h1 class="side products">Accessories <i class="bi bi-caret-down-fill"></i></h1>
          </div>
          <div class="dropdown">
            <a href="../category/category.html?category=Cooling Pads & Stands" class="dropdown-item">Cooling Pads & Stands</a>
            <a href="../category/category.html?category=Bags" class="dropdown-item">Bags</a>
            <a href="../category/category.html?category=COMBO" class="dropdown-item">COMBO</a>
            <a href="../headphones/headphones.html" class="dropdown-item">Headphones</a>
            <a href="../category/category.html?category=Speakers" class="dropdown-item">Speakers</a>
            <a href="../category/category.html?category=Microphones" class="dropdown-item">Microphones</a>
            <a href="../category/category.html?category=Other" class="dropdown-item">Other</a>
          </div>
        </div>

        <!-- Products & Services -->
        <div class="products-menu">
          <div class="products-toggle">
            <h1><i class="bi bi-box-seam"></i></h1>
            <h1 class="side products">Items & Services <i class="bi bi-caret-down-fill"></i></h1>
          </div>
          <div class="dropdown">
            <a href="../category/category.html?category=UPS" class="dropdown-item">UPS</a>
            <a href="../category/category.html?category=Network" class="dropdown-item">Network</a>
            <a href="../category/category.html?category=Audios" class="dropdown-item">Audios</a>
            <a href="../category/category.html?category=RAM & Storage" class="dropdown-item">RAM & Storage</a>
            <a href="../category/category.html?category=USB Drives" class="dropdown-item">USB Drives</a>
          </div>
        </div>

        <!-- Login -->
        <div class="non-toggle">
          <h1><i class="bi bi-person-circle"></i></h1>
          <h1 class="side login"><a href="../login/login.html" style="color: white; text-decoration: none;">Login</a></h1>
        </div>

        <!-- Contact -->
        <div class="non-toggle">
          <h1><i class="bi bi-telephone"></i></h1>
          <h1 class="side contact"><a href="../contact/contact.html" style="color: white; text-decoration: none;">Contact</a></h1>
        </div>

      </div>
    `;
  }
}

function setupSideMenuToggle() {
  const sideMenu = document.querySelector('#side-menu');
  const cancelButton = document.querySelector('.cancel-btn');
  const hamburger = document.querySelector('.menu-toggle-btn');

  if (hamburger) {
    hamburger.addEventListener('click', () => {
      sideMenu.style.display = 'flex';
      sideMenu.style.opacity = '0';
      sideMenu.style.transition = 'opacity 0.5s ease';
      setTimeout(() => sideMenu.style.opacity = '1', 10);
    });
  }

  if (cancelButton) {
    cancelButton.addEventListener('click', () => {
      sideMenu.style.opacity = '0';
      setTimeout(() => (sideMenu.style.display = 'none'), 500);
    });
  }
}

function setupSubmenuToggle() {
  const toggles = document.querySelectorAll('.products-toggle');

  toggles.forEach(toggle => {
    toggle.addEventListener('click', () => {
      const parent = toggle.closest('.products-menu');

      // Close other active menus except this one
      toggles.forEach(otherToggle => {
        if (otherToggle !== toggle) {
          const otherParent = otherToggle.closest('.products-menu');
          otherParent.classList.remove('active');
        }
      });

      // Toggle clicked menu
      parent?.classList.toggle('active');
    });
  });
}

function initSideMenu() {
  injectSideMenu();
  setupSideMenuToggle();
  setupSubmenuToggle();
}

export { initSideMenu };
