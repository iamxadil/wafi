//Index.js
import { initPreloader } from "../javascript/preloader.js";
import { initSideMenu } from "../javascript/sideMenu.js";
import { initNavbar } from "../javascript/navbar.js";
import { initDarkMode } from "../javascript/theme.js";
import { injectProductHeaders } from "../javascript/productHeader.js";
import { fetchAndRenderPCCards } from "../javascript/pc-cards.js";
import { initPopup } from "../javascript/cartPopup.js";
import { initCartCountBadge } from "../javascript/cartCount.js";
import { injectBackButton } from "../javascript/backButton.js";
import { initCategoryPage } from '../javascript/category.js';  
import { initMainSearch } from '../javascript/mainSearch.js';
import { injectMobileSearch } from "../javascript/mobSearch.js";
import { injectMobileSlider } from "../javascript/mobSilder.js";
import { fetchAndRenderMobCards } from "../javascript/mobCards.js";
import { fetchAndRenderMostPopular } from "../javascript/mostPopular.js";
import { injectSectionSliders } from "../javascript/sectionSlider.js";
import { fetchAndRenderCategoryProducts } from "../javascript/renderMobCategory.js";
import { renderOffers } from "../javascript/offers.js";
import { initContact } from "../javascript/contactRender.js";
import { initMobCategoryPage } from "../javascript/mobCatRender.js";
import { injectAnimatedHeadText } from "../javascript/animatedHeadText.js";
import { injectFooter } from '../javascript/footer.js';
import {initMobAddToCart} from '../javascript/mobItemCards.js';
import { initFiltering } from "../javascript/filterProducts.js";
import { fetchAndRenderLaptopCards } from "../javascript/mobLaptops.js";
import { fetchAndRenderAccessories } from "../javascript/mobAccessories.js";
import { fetchAndRenderHeadphones

 } from "../javascript/mobHeadphones.js";
// Import cart page init (only runs on cart page)
import { initCartPage } from "../javascript/cartPage.js";

document.addEventListener('DOMContentLoaded', () => {
    initNavbar();
    initSideMenu();
    initContact();
    initDarkMode();
    initPreloader();
    injectProductHeaders();
    injectAnimatedHeadText();
    fetchAndRenderPCCards();
    fetchAndRenderMobCards();
    fetchAndRenderMostPopular();
    fetchAndRenderLaptopCards();
    fetchAndRenderAccessories();
    fetchAndRenderHeadphones();
    initPopup();
    initCartCountBadge();
    injectBackButton();
    initCategoryPage();
    initMainSearch();
    injectMobileSearch();
    injectMobileSlider();
    injectSectionSliders();
    fetchAndRenderCategoryProducts();
    renderOffers();
    initMobCategoryPage();
    initPopup();
    initMobAddToCart();
    initFiltering();
    injectFooter();
    
    // Run cart page init only if cart-wrapper container is present on page
    if (document.querySelector('#cart-items-container')) {
      initCartPage();
    }
});
