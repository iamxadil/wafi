export function initContact() {
  // Containers in your HTML where we inject the content
  const desktopContainer = document.querySelector('.component-container');
  const mobileContainer = document.querySelector('.mob-contact-container');

  if (!desktopContainer) {
    return;
  }
  if (!mobileContainer) {
    return;
  }

  // Inject desktop contact HTML
  if (desktopContainer) {
    desktopContainer.innerHTML = `
      <div class="snail-shape">
        <img src="../assets/Images/Snail-Shape.png" alt="snail" class="snail">
      </div>

      <div class="contact-box">
        <div class="left-info">
          <div class="top-layer"></div>
          <div class="left-info-texts">
            <div class="location">
              <h1>Location</h1>
              <p style="max-width: 160px;">Iraq, Baghdad<br>Nearby Techn-logical University.</p>
            </div>
            <div class="phone">
              <h1>Phone</h1>
              <p>+964 784 497 0384</p>
            </div>
            <div class="hours">
              <h1>Hours</h1>
              <p>9AM-8PM</p>
            </div>
          </div>
        </div>

        <div class="right-info">
          <div class="top-layer"></div>
          <div class="right-info-container">
            <h1 id="header-text">Feel Free and Contact Us</h1>
            <form action="#" method="POST" class="message-form">
              <div class="name-input">
                <h1>Full Name</h1>
                <input type="text" name="fullname" required>
              </div>
              <div class="email-input">
                <h1>Email</h1>
                <input type="email" name="email" required>
              </div>
              <div class="message-input">
                <h1>Message</h1>
                <textarea name="message" required></textarea>
              </div>
              <button type="submit">Send Message</button>
            </form>
          </div>
        </div>
      </div>
    `;
  }

  // Inject mobile contact HTML
  if (mobileContainer) {
    mobileContainer.innerHTML = `
      <div class="call-us-section">
        <div class="head-title">
          <h1>Contact us</h1>
          <p>Make your journey easier<br>feel free and contact us.</p>
        </div>

        <div class="contact-cards">
          <div class="call-us-card cont-border">
            <div class="icon-container">
              <div class="icon-subcontainer cont-border"><i class="bi bi-telephone"></i></div>
              <h1>Call us</h1>
            </div>
            <div class="content">
              <p>0784 497 0384</p>
              <p>Our team is online</p>
            </div>
          </div>

          <div class="email-us-card cont-border">
            <div class="icon-container">
              <div class="icon-subcontainer cont-border"><i class="bi bi-envelope-paper"></i></div>
              <h1>Email us</h1>
            </div>
            <div class="content">
              <p>Fast response & service</p>
              <p>Go to email section</p>
            </div>
          </div>
        </div>
      </div>

      <div class="social-media-section">
        <div class="head-title">
          <p>Social Media</p>
        </div>

        <div class="media-container">
          <div class="social-card cont-border">
            <div class="social-subcontainer">
              <div class="icon"><i class="bi bi-instagram"></i></div>
              <div class="social-content">
                <p>Instagram</p>
                <p>@alwafi.co1</p>
              </div>
            </div>
            <div class="status">
              <p>Currently</p>
              <div class="status-subcontent">
                <p class="on-off"></p>
                <div class="dot"></div>
              </div>
            </div>
            <div class="go-button"><i class="bi bi-link-45deg"></i></div>
          </div>

          <div class="social-card cont-border">
            <div class="social-subcontainer">
              <div class="icon"><i class="bi bi-whatsapp"></i></div>
              <div class="social-content">
                <p>Whatsapp</p>
                <p>@alwafi.co1</p>
              </div>
            </div>
            <div class="status">
              <p>Currently</p>
              <div class="status-subcontent">
                <p class="on-off"></p>
                <div class="dot"></div>
              </div>
            </div>
            <div class="go-button"><i class="bi bi-link-45deg"></i></div>
          </div>

          <div class="social-card cont-border">
            <div class="social-subcontainer">
              <div class="icon"><i class="lni lni-telegram"></i></div>
              <div class="social-content">
                <p>Telegram</p>
                <p>@alwafi.co1</p>
              </div>
            </div>
            <div class="status">
              <p>Currently</p>
              <div class="status-subcontent">
                <p class="on-off"></p>
                <div class="dot"></div>
              </div>
            </div>
            <div class="go-button"><i class="bi bi-link-45deg"></i></div>
          </div>

          <div class="social-card cont-border">
            <div class="social-subcontainer">
              <div class="icon" style="margin-left: 12px;"><i class="fa-brands fa-facebook-f"></i></div>
              <div class="social-content">
                <p>Facebook</p>
                <p>@alwafi.co1</p>
              </div>
            </div>
            <div class="status">
              <p>Currently</p>
              <div class="status-subcontent">
                <p class="on-off"></p>
                <div class="dot"></div>
              </div>
            </div>
            <div class="go-button"><i class="bi bi-link-45deg"></i></div>
          </div>
        </div>
      </div>
    `;
  }

  // Online/Offline Status animation logic
  const pulseAnimations = new WeakMap();

  function startPulseAnimation(dot) {
    if (pulseAnimations.has(dot)) return;

    let start = null;
    const duration = 1500;

    function pulse(timestamp) {
      if (!start) start = timestamp;
      const elapsed = timestamp - start;

      const progress = (elapsed % duration) / duration;
      const glowSize = 6 * progress;
      const alpha = 0.5 * (1 - progress);

      dot.style.boxShadow = `0 0 0 ${glowSize}px rgba(0, 128, 0, ${alpha.toFixed(2)})`;

      const frameId = requestAnimationFrame(pulse);
      pulseAnimations.set(dot, frameId);
    }

    const frameId = requestAnimationFrame(pulse);
    pulseAnimations.set(dot, frameId);
  }

  function cancelPulseAnimation(dot) {
    const frameId = pulseAnimations.get(dot);
    if (frameId) {
      cancelAnimationFrame(frameId);
      pulseAnimations.delete(dot);
    }
  }

  function updateStatus() {
    // We query both containers for all .status blocks
    const statusBlocks = [
      ...(desktopContainer ? desktopContainer.querySelectorAll('.status') : []),
      ...(mobileContainer ? mobileContainer.querySelectorAll('.status') : []),
    ];

    const hour = new Date().getHours();
    const isOnline = hour >= 8 && hour < 21;

    statusBlocks.forEach(block => {
      const label = block.querySelector('.on-off');
      const dot = block.querySelector('.dot');
      if (!label || !dot) return;

      label.textContent = isOnline ? 'Online' : 'Offline';

      if (!isOnline) {
        dot.style.backgroundColor = 'red';
        dot.style.boxShadow = 'none';
        cancelPulseAnimation(dot);
        return;
      }

      dot.style.backgroundColor = 'green';
      startPulseAnimation(dot);
    });
  }

  updateStatus();
  setInterval(updateStatus, 60 * 1000); // Update every 1 min
}
