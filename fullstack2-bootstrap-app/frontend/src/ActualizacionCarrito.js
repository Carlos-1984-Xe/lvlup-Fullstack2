//esto actualiza el numero del carrito en el navbar
function updateCartCount() {
  // Asegurarse de que el HTML esté cargado
  const cartCountElement = document.getElementById('cart-count');
  // Si existe, actualizar su contenido
  if (cartCountElement) {
    // Obtener carrito desde localStorage o inicializar vacío
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    cartCountElement.textContent = carrito.length;
  }
}
// Llamar a la función para actualizar el contador al cargar la página
updateCartCount();
