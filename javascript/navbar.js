import { initDarkMode } from "./theme.js";

function initNavbar() {
  const navbar = document.getElementById('navbar');

  if (!navbar) {
    console.error("Navbar container not found!");
    return;
  }

  navbar.innerHTML = `
    <div class="navbar-container">
      <div class="navbar-left">
        <a href="../index/index.html">
          <img src="../assets/Icons/wafi-logo-outline.svg" alt="logo" class="navbar-logo" />
        </a>
        <h1 id="login-icon">
          <a href="../product/product.html">
            <i class="bi bi-person" style="color: #000;"></i>
          </a>
        </h1>
        <h1>
          <a href="../cart/cart.html" style="position: relative;">
            <i class="bi bi-cart" style="color: #000;"></i>
            <span class="cart-count-badge" id="cart-count">0</span>
          </a>
        </h1>
        <h1 class="dark-mode"><i class="bi bi-moon dark-mode"></i></h1>
      </div>

      <div class="navbar-right">
        <h1 class="home">
          <a href="../index/index.html" class="home-button" style="color: black;">Home</a>
        </h1>

        <!-- Laptops Dropdown -->
        <div class="dropdown nav-dropdown">
          <h1 class="nav-link">
            <a href="../laptops/laptops.html" style="color: black;">Laptops</a>
          </h1>
          <ul class="dropdown-menu">
            <li><a href="/category/category.html?brand=Asus">Asus</a></li>
            <li><a href="/category/category.html?brand=Acer">Acer</a></li>
            <li><a href="/category/category.html?brand=Apple">Apple</a></li>
            <li><a href="/category/category.html?brand=MSI">MSI</a></li>
            <li><a href="/category/category.html?brand=DELL">DELL</a></li>
            <li><a href="/category/category.html?brand=HP">HP</a></li>
            <li><a href="/category/category.html?brand=Lenovo">Lenovo</a></li>
          </ul>
        </div>

        <!-- Accessories Dropdown -->
        <div class="dropdown nav-dropdown">
          <h1 class="nav-link">
            <a href="../accessories/accessories.html" style="color: black;">Accessories</a>
          </h1>
          <ul class="dropdown-menu">
            <li><a href="/category/category.html?category=Cooling Pads & Stands">Cooling Pads & Stands</a></li>
            <li><a href="/category/category.html?category=Bags">Bags</a></li>
            <li><a href="/category/category.html?category=COMBO">COMBO</a></li>
            <li><a href="/headphones/headphones.html">Headphones</a></li>
            <li><a href="/category/category.html?category=Speakers">Speakers</a></li>
            <li><a href="/category/category.html?category=Microphones">Microphones</a></li>
            <li><a href="/category/category.html?category=Other">Other</a></li>
          </ul>
        </div>

        <!-- Products & Services Dropdown -->
        <div class="dropdown nav-dropdown">
          <h1 class="nav-link">Products & Services</h1>
          <ul class="dropdown-menu">
            <li><a href="/category/category.html?category=UPS">UPS</a></li>
            <li><a href="/category/category.html?category=Network">Network</a></li>
            <li><a href="/category/category.html?category=Audios">Audios</a></li>
            <li><a href="/category/category.html?category=RAM & Storage">RAM & Storage</a></li>
            <li><a href="/category/category.html?category=USB Drives">USB Drives</a></li>
          </ul>
        </div>

        <h1>
          <a href="../contact/contact.html" style="color: #000;">Contact</a>
        </h1>

        <div class="menu-toggle-btn">
          <div class="first-bar"></div>
          <div class="second-bar"></div>
        </div>
      </div>
    </div>
  `;

  // Attach dark mode toggle AFTER injection
  document.querySelectorAll('.dark-mode').forEach(button => {
    button.addEventListener('click', initDarkMode);
  });
}

export { initNavbar };
