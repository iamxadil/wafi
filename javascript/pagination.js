function setupPagination(items, itemsPerPage, renderFunction, paginationContainer) {
  let currentPage = 1;
  const totalPages = Math.ceil(items.length / itemsPerPage);

  function renderPage(page) {
    currentPage = page;
    const start = (page - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    const pageItems = items.slice(start, end);

    renderFunction(pageItems);
    renderControls();
  }

  function renderControls() {
    if (!paginationContainer) return;

    let html = '';

    // First button
    html += `<button class="pagination-btn" data-page="1" ${currentPage === 1 ? 'disabled' : ''}>First</button>`;

    // Prev button
    html += `<button class="pagination-btn" data-page="${currentPage - 1}" ${currentPage === 1 ? 'disabled' : ''}>Prev</button>`;

    let startPage = Math.max(currentPage - 2, 1);
    let endPage = Math.min(startPage + 4, totalPages);
    if (endPage - startPage < 4) {
      startPage = Math.max(endPage - 4, 1);
    }

    // Show first page and ellipsis if needed
    if (startPage > 1) {
      html += `<button class="pagination-btn" data-page="1">1</button>`;
      if (startPage > 2) html += `<span class="ellipsis">...</span>`;
    }

    // Page numbers
    for (let i = startPage; i <= endPage; i++) {
      html += `<button class="pagination-btn ${i === currentPage ? 'active' : ''}" data-page="${i}">${i}</button>`;
    }

    // Show ellipsis and last page if needed
    if (endPage < totalPages) {
      if (endPage < totalPages - 1) html += `<span class="ellipsis">...</span>`;
      html += `<button class="pagination-btn" data-page="${totalPages}">${totalPages}</button>`;
    }

    // Next button
    html += `<button class="pagination-btn" data-page="${currentPage + 1}" ${currentPage === totalPages ? 'disabled' : ''}>Next</button>`;

    // Last button
    html += `<button class="pagination-btn" data-page="${totalPages}" ${currentPage === totalPages ? 'disabled' : ''}>Last</button>`;

    paginationContainer.innerHTML = html;

    paginationContainer.querySelectorAll('.pagination-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const page = Number(btn.dataset.page);
        if (page >= 1 && page <= totalPages && page !== currentPage) {
          renderPage(page);
        }
      });
    });
  }

  // Initial render
  renderPage(currentPage);
}

export { setupPagination };
