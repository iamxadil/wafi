// cart.js
function addToCart(product) {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];

  // Check if item already exists
  const existing = cart.find(item => item.id === product.id);
  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }

  localStorage.setItem('cart', JSON.stringify(cart));
}

export { addToCart };
