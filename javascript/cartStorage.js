// cartStorage.js

function getCartItems() {
  return JSON.parse(localStorage.getItem('cartItems')) || [];
}

function setCartItems(items) {
  localStorage.setItem('cartItems', JSON.stringify(items));
}

function addItem(product) {
  const items = getCartItems();
  const existing = items.find(i => i.name === product.name);

  if (existing) {
    existing.quantity++;
  } else {
    items.push({ ...product, quantity: 1 });
  }

  setCartItems(items);
}

function updateQuantity(name, delta) {
  let items = getCartItems();
  items = items.map(item => {
    if (item.name === name) {
      const newQty = item.quantity + delta;
      return newQty > 0 ? { ...item, quantity: newQty } : null;
    }
    return item;
  }).filter(Boolean);

  setCartItems(items);
}

function removeItem(name) {
  const items = getCartItems().filter(item => item.name !== name);
  setCartItems(items);
}

export {
  getCartItems,
  setCartItems,
  addItem,
  updateQuantity,
  removeItem
};
