import { productos } from './Productos.js';

const lista = document.getElementById('lista-carrito');
const vacio = document.getElementById('carrito-vacio');
const totalDiv = document.getElementById('carrito-total');

let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

// Si tu carrito guarda solo IDs, conviértelo a [{id, cantidad}]
if (carrito.length && typeof carrito[0] === 'string') {
  carrito = carrito.map(id => ({ id, cantidad: 1 }));
}

function renderCarrito() {
  lista.innerHTML = '';
  let total = 0;

  if (carrito.length === 0) {
    vacio.style.display = 'block';
    totalDiv.textContent = 'Total: $0';
    return;
  } else {
    vacio.style.display = 'none';
  }

  console.log(carrito); // <-- Agrega esto para depurar

  carrito.forEach(item => {
    const producto = productos.find(p => p.id === item.id);
    if (!producto) return;
    const precioNumero = Number(producto.precio);
    const precioFormateado = precioNumero.toLocaleString('es-CL');
    total += precioNumero * item.cantidad;

    const li = document.createElement('li');
    li.className = 'carrito-item caja-clara list-group-item border-0';
    li.innerHTML = `
      <img src="${producto.imagen}" alt="${producto.nombre}" class="carrito-img">
      <div class="flex-grow-1">
        <div class="nombre-producto">${producto.nombre}</div>
        <div class="caja-precio">Precio: $${precioFormateado}</div>
        <div class="cantidad-control mt-2">
          <button class="btn btn-outline-dark btn-sm cantidad-btn" data-id="${item.id}" data-action="restar">-</button>
          <span class="mx-2">${item.cantidad}</span>
          <button class="btn btn-outline-dark btn-sm cantidad-btn" data-id="${item.id}" data-action="sumar">+</button>
        </div>
      </div>
    `;
    lista.appendChild(li);
  });

  // Formatea el total con puntos
  totalDiv.textContent = `Total: $${total.toLocaleString('es-CL')}`;
  localStorage.setItem('carrito', JSON.stringify(carrito));
}

lista.addEventListener('click', e => {
  if (e.target.classList.contains('cantidad-btn')) {
    const id = e.target.getAttribute('data-id');
    const action = e.target.getAttribute('data-action');
    const item = carrito.find(i => i.id === id);
    if (item) {
      if (action === 'sumar') item.cantidad++;
      if (action === 'restar' && item.cantidad > 1) item.cantidad--;
      renderCarrito();
    }
  }
});

document.getElementById('borrar-carrito').addEventListener('click', () => {
  carrito = [];
  localStorage.removeItem('carrito'); // <-- Limpia el almacenamiento local
  renderCarrito();
});

document.getElementById('proceder-compra').addEventListener('click', () => {
  alert('¡Gracias por tu compra!');
  carrito = [];
  renderCarrito();
});

document.getElementById('aplicar-cupon').addEventListener('click', () => {
  const cupon = document.getElementById('cupon').value.trim();
  if (cupon === 'DESCUENTO10') {
    let total = carrito.reduce((acc, item) => {
      const producto = productos.find(p => p.id === item.id);
      return acc + (producto ? producto.precio * item.cantidad : 0);
    }, 0);
    total = total * 0.9;
    totalDiv.textContent = `Total con cupón: $${total.toLocaleString('es-CL')}`;
  } else {
    alert('Cupón no válido');
  }
});

renderCarrito();