
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    const lista = document.getElementById('lista-carrito');
    const vacio = document.getElementById('carrito-vacio');

function renderCarrito() {
  lista.innerHTML = '';
  let total = 0;
  const carritoContainer = document.querySelector('.carrito-container');
  if (carrito.length === 0) {
    vacio.style.display = 'block';
    carritoContainer.classList.add('vacio');
    document.getElementById('carrito-total').textContent = '';
    return;
  }
  vacio.style.display = 'none';
  carritoContainer.classList.remove('vacio');
  carrito.forEach(id => {
    const producto = productos.find(p => p.id === id);
    if (producto) {
      const precioNumerico = Number(
  String(producto.precio)
    .replace(/[^0-9]/g, '') 
);
total += precioNumerico
      const li = document.createElement('li');
      li.innerHTML = `
        <img src="${producto.imagen}" alt="${producto.nombre}" class="carrito-img" />
        <div>
          <h5 style="margin:0 0 8px 0;">${producto.nombre}</h5>
          <p style="margin:0;"><strong>Precio:</strong> ${producto.precio}</p>
        </div>
      `;
      lista.appendChild(li);
    }
  });
  document.getElementById('carrito-total').textContent =
  `Total a pagar: $${total.toLocaleString('es-CL', { minimumFractionDigits: 0, maximumFractionDigits: 0 })} CLP`;
}


    renderCarrito();

    

    document.getElementById('proceder-compra').onclick = function() {
      if (carrito.length === 0) {
        alert('El carrito está vacío.');
        return;
      }
      alert('¡Compra realizada con éxito!');
      localStorage.removeItem('carrito');
      carrito = [];
      renderCarrito();
    };


    document.getElementById('borrar-carrito').onclick = function() {
      if (carrito.length === 0) {
        alert('El carrito ya está vacío.');
        return;
      }
      if (confirm('¿Seguro que deseas borrar todo el carrito?')) {
        localStorage.removeItem('carrito');
        carrito = [];
        renderCarrito();
      }
    };
    
    
