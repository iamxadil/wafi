function debounce(fn, delay = 300) {
  let timeout;
  return function(...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => fn.apply(this, args), delay);
  };
}

async function initMainSearch() {
  const containers = document.querySelectorAll('.main-search-container');

  let products = [];
  try {
    const res = await fetch('json/products.json');
    if (!res.ok) throw new Error('Failed to fetch products');
    products = await res.json();
  } catch (err) {
    console.error(err);
    return;
  }

  containers.forEach(container => {
    const input = container.querySelector('.search-input');

    let resultsContainer = container.querySelector('.search-results');
    if (!resultsContainer) {
      resultsContainer = document.createElement('div');
      resultsContainer.classList.add('search-results');
      resultsContainer.style.position = 'absolute';
      resultsContainer.style.top = '100%';
      resultsContainer.style.left = '0';
      resultsContainer.style.right = '0';
      resultsContainer.style.background = '#fff';
      resultsContainer.style.border = '1px solid #ccc';
      resultsContainer.style.maxHeight = '200px';
      resultsContainer.style.overflowY = 'auto';
      resultsContainer.style.zIndex = '1000';
      container.appendChild(resultsContainer);
    }

    let currentIndex = -1; // for keyboard navigation

   function renderResults(matched) {
  if (matched.length === 0) {
    resultsContainer.innerHTML = `<p style="padding: 8px; margin: 0;">No results found.</p>`;
    currentIndex = -1;
    return;
  }

  resultsContainer.innerHTML = matched.map((p, idx) => `
    <div 
      class="search-result-item" 
      role="option"
      tabindex="-1"
      data-index="${idx}"
      style="display: flex; align-items: center; gap: 10px; padding: 8px; cursor: pointer; border-bottom: 1px solid #eee;"
    >
      <img src="${p.image}" alt="${p.name}" style="width: 40px; height: 40px; object-fit: contain; border-radius: 4px;" />
      <div>
        <div style="font-weight: 600;">${p.name}</div>
        <div style="color: #666; font-size: 0.85rem;">${p.priceDisplay}</div>
      </div>
    </div>
  `).join('');

  currentIndex = -1;

  const items = resultsContainer.querySelectorAll('.search-result-item');
  
  items.forEach(itemEl => {
    itemEl.addEventListener('click', () => {
      const productName = itemEl.querySelector('div > div:first-child').textContent.trim();
      const product = products.find(p => p.name === productName);
      if (product) {
        const urlName = encodeURIComponent(product.name);
        window.location.href = `../product/product.html?name=${urlName}`;
      }
    });

    itemEl.addEventListener('mouseenter', () => {
      updateFocus(items, parseInt(itemEl.dataset.index));
    });
  });
}

function updateFocus(items, index) {
  items.forEach((item, i) => {
    if (i === index) {
      item.style.backgroundColor = '#f0f0f0';
      item.setAttribute('aria-selected', 'true');
      item.scrollIntoView({ block: 'nearest' });
    } else {
      item.style.backgroundColor = '';
      item.setAttribute('aria-selected', 'false');
    }
  });
}


    const debouncedSearch = debounce(() => {
      const query = input.value.trim().toLowerCase();
      if (!query) {
        resultsContainer.innerHTML = '';
        resultsContainer.style.display = 'none';
        return;
      }

      const matched = products.filter(p => p.name.toLowerCase().includes(query));
      renderResults(matched);
      resultsContainer.style.display = 'block';
    }, 300);

    input.addEventListener('input', debouncedSearch);

    input.addEventListener('keydown', (e) => {
      const items = resultsContainer.querySelectorAll('.search-result-item');
      if (items.length === 0) return;

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        currentIndex = (currentIndex + 1) % items.length;
        updateFocus(items, currentIndex);
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        currentIndex = (currentIndex - 1 + items.length) % items.length;
        updateFocus(items, currentIndex);
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (currentIndex >= 0 && currentIndex < items.length) {
          items[currentIndex].click();
        }
      } else if (e.key === 'Escape') {
        resultsContainer.style.display = 'none';
      }
    });

    function updateFocus(items, index) {
      items.forEach((item, i) => {
        if (i === index) {
          item.style.backgroundColor = '#f0f0f0';
          item.setAttribute('aria-selected', 'true');
          item.scrollIntoView({ block: 'nearest' });
        } else {
          item.style.backgroundColor = '';
          item.setAttribute('aria-selected', 'false');
        }
      });
    }

    document.addEventListener('click', e => {
      if (!container.contains(e.target)) {
        resultsContainer.style.display = 'none';
      }
    });
  });
}

export { initMainSearch };
