function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('carrito')) || [];
    document.getElementById('cart-count').textContent = cart.length;
    }
updateCartCount();
window.addEventListener('storage', updateCartCount);
