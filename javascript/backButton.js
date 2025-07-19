
function injectBackButton() {
  document.querySelectorAll('.back-btn-container').forEach(container => {
    container.innerHTML = `
      <i class="bi bi-arrow-bar-left"></i>
      <h2>Browse</h2>
      
    `;

    // Add click functionality to the icon or container
    container.addEventListener('click', () => {
      history.back();
    });
  });
}

export { injectBackButton };
