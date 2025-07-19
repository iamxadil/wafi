import { initDarkMode } from "./theme.js";
import { initPopup, showCartPopup } from "./cartPopup.js"; 

document.addEventListener("DOMContentLoaded", () => {
  const productA = JSON.parse(localStorage.getItem("compareProductA"));
  const productB = JSON.parse(localStorage.getItem("compareProductB"));

  if (!productA || !productB) {
    document.body.innerHTML =
      '<h2 style="padding: 2rem;">Missing products for comparison.</h2>';
    return;
  }

  renderProduct(".left-card", productA, productB, true);
  renderProduct(".right-card", productB, productA, false);

  attachCompareCardListeners(".left-card", productA);
  attachCompareCardListeners(".right-card", productB);

  initDarkMode();
  initPopup(); // Initialize cart popup system once
});

function parseNumeric(val, key) {
  if (!val) return 0;

  const lower = val.toLowerCase().trim();

  if (key === "storage") {
    const tbMatch = lower.match(/([\d.]+)\s*tb/);
    if (tbMatch) return parseFloat(tbMatch[1]) * 1024;

    const gbMatch = lower.match(/([\d.]+)\s*gb/);
    if (gbMatch) return parseFloat(gbMatch[1]);

    return parseFloat(lower) || 0;
  }

  if (key === "ram") {
    const gbMatch = lower.match(/([\d.]+)\s*gb/);
    if (gbMatch) return parseFloat(gbMatch[1]);
    return parseFloat(lower) || 0;
  }

  if (key === "screen") {
    const inchMatch = lower.match(/([\d.]+)\s*('|''|inch|in)/);
    if (inchMatch) return parseFloat(inchMatch[1]);
    return parseFloat(lower) || 0;
  }

  if (key === "battery") {
    const mAhMatch = lower.match(/([\d.]+)\s*m?ah/);
    if (mAhMatch) return parseFloat(mAhMatch[1]);
    return parseFloat(lower) || 0;
  }

  return parseFloat(val) || 0;
}

function getHighlightClass(key, val, otherVal, isPrimary) {
  if (!val || !otherVal) return "";

  if (["ram", "storage", "screen", "battery"].includes(key)) {
    const valNum = parseNumeric(val, key);
    const otherNum = parseNumeric(otherVal, key);

    if (valNum === otherNum) return "";

    return valNum > otherNum ? "highlight-better" : "highlight-worse";
  }

  if (val !== otherVal) return "highlight-diff";

  return "";
}

function renderProduct(selector, product, otherProduct, isPrimary) {
  const container = document.querySelector(selector);
  if (!container) return;

  const imgSrc = Array.isArray(product.image) ? product.image[0] : product.image;
  const rating = product.rating || 4.2;
  const reviews = product.reviews || 120;
  const originalPrice = product.originalPrice || null;
  const priceRaw =
    product.priceRaw ||
    parseFloat((product.priceDisplay || "").replace(/[^0-9.]/g, "")) ||
    0;
  const savings = originalPrice
    ? Math.round(100 - (priceRaw / parseFloat(originalPrice)) * 100)
    : 0;

  const specsByForm = {
    Laptop: ["cpu", "ram", "storage", "screen", "gpu", "battery"],
    Bag: ["size", "material", "compartments"],
    Mouse: ["connectivity", "battery", "features"],
    Keyboard: ["type", "layout", "switchType", "backlight"],
    Headphones: ["type", "connectivity", "battery", "noiseCancellation"],
  };

  const form = product.form;
  const specsToShow = specsByForm[form] || [];

  let specsHTML = "";
  specsToShow.forEach((key) => {
    const val = product[key];
    const otherVal = otherProduct[key];

    if (!val) return;

    const label = key
      .replace(/([A-Z])/g, " $1")
      .replace(/^./, (str) => str.toUpperCase());

    const highlightClass = getHighlightClass(key, val, otherVal, isPrimary);

    specsHTML += `<p class="${highlightClass}"><strong>${label}:</strong> ${val}</p>`;
  });

  container.innerHTML = `
    <img src="${imgSrc}" alt="Image of ${product.name}" class="compare-img cont-border" />
    <h2>${product.name}</h2>

    <div class="rating-reviews">
      <span class="stars">⭐ ${rating}</span>
      <span class="review-count">(${reviews} reviews)</span>
    </div>

    <p><strong>Price:</strong> ${product.priceDisplay || "N/A"}</p>
    ${
      originalPrice
        ? `<p class="old-price"><strong>Original:</strong> ${originalPrice} <span class="discount">-${savings}%</span></p>`
        : ""
    }

    <p><strong>Brand:</strong> ${product.brand || "N/A"}</p>

    <p class="stock-status ${product.inStock ? "" : "out-of-stock"}">
      ${product.inStock ? "In Stock ✅" : "Out of Stock ❌"}
    </p>

    <div class="specs-block">
      ${specsHTML}
    </div>

    <div class="compare-actions">
      <button class="btn-view">View Product</button>
      <button class="btn-cart">Add to Cart</button>
    </div>
  `;
}

function attachCompareCardListeners(selector, product) {
  const container = document.querySelector(selector);
  if (!container) return;

  const viewBtn = container.querySelector(".btn-view");
  const cartBtn = container.querySelector(".btn-cart");

  if (viewBtn) {
    viewBtn.addEventListener("click", () => {
      localStorage.setItem("selectedProduct", JSON.stringify(product));
      window.location.href = "/product/product.html";
    });
  }

  if (cartBtn) {
    cartBtn.addEventListener("click", () => {
      showCartPopup(product);
    });
  }
}
