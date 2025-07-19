export function injectMobileSlider(containerSelector = '.slider-container') {
  const container = document.querySelector(containerSelector);

  if (!container) {
    return;
  }

  container.innerHTML = `
    <div class="pr-slide slider-border">
      <div class="pr-image">
        <a href="/laptops/laptops.html">
          <img src="/assets/Images/surface-laptop4.png" alt="keyboard" style="width: 135px;">
        </a>
      </div>
    </div>

    <div class="pr-slide slider-border">
      <div class="pr-image">
        <a href="/accessories/accessories.html">
          <img src="/assets/Images/Joystick.png" alt="joystick">
        </a>
      </div>
    </div>

    <div class="pr-slide slider-border">
      <div class="pr-image">
        <a href="/audios/audios.html">
          <img src="/assets/Images/Headphone.png" alt="headphone">
        </a>
      </div>
    </div>

    <div class="pr-slide slider-border">
      <div class="pr-image">
        <a href="/accessories/accessories.html">
          <img src="/assets/Images/Keyboard.png" alt="keyboard" style="width: 120px;">
        </a>
      </div>
    </div>

    <div class="pr-slide slider-border">
      <div class="pr-image">
        <a href="/laptops/laptops.html">
          <img src="/assets/Images/macbook-air.png" alt="laptop" style="width: 135px;">
        </a>
      </div>
    </div>
  `;
}
