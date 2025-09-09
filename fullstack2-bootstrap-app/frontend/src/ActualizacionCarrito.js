//esto actualiza el numero del carrito en el navbar
function updateCartCount() {
  const cartCountElement = document.getElementById('cart-count');
  if (cartCountElement) {
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    cartCountElement.textContent = carrito.length;
  }
}
updateCartCount();
