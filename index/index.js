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


// Import cart page init (only runs on cart page)
import { initCartPage } from "../javascript/cartPage.js";

document.addEventListener('DOMContentLoaded', () => {
    initNavbar();
    initSideMenu();
    initDarkMode();
    initPreloader();
    injectProductHeaders();
    fetchAndRenderPCCards();
    initPopup();
    initCartCountBadge();
    injectBackButton();
    initCategoryPage();
    initMainSearch();


    // Run cart page init only if cart-wrapper container is present on page
    if (document.querySelector('#cart-items-container')) {
      initCartPage();
    }
});
