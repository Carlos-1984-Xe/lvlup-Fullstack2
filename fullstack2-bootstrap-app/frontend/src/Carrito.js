import { productos } from './Productos.js';

const lista = document.getElementById('lista-carrito');
const vacio = document.getElementById('carrito-vacio');
const totalDiv = document.getElementById('carrito-total');

let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

// Si tu carrito guarda solo IDs, conviértelo a [{id, cantidad}]
if (carrito.length && typeof carrito[0] === 'string') {
  carrito = carrito.map(id => ({ id, cantidad: 1 }));
}
//funcion para mostrar lo basico del carrito tambien se bloquean botones cuando este vacia
function renderCarrito() {
  lista.innerHTML = '';
  let total = 0;  

  const btnPagar = document.getElementById('proceder-compra');
  const btnVaciar = document.getElementById('borrar-carrito');
  const btnCupon = document.getElementById('aplicar-cupon');

  if (carrito.length === 0) {
    vacio.style.display = 'block';
    totalDiv.textContent = 'Total: $0';
    btnPagar.disabled = true;
    btnVaciar.disabled = true;
    btnCupon.disabled = true;
    return;
  } else {
    vacio.style.display = 'none';
    btnPagar.disabled = false;
    btnVaciar.disabled = false;
    btnCupon.disabled = false;
  }

  //se recorre el carrito mostrando los productos agregados al localstorage
  carrito.forEach(item => {
    const producto = productos.find(p => p.id === item.id);
    if (!producto) return;
    const precioNumero = Number(producto.precio);
    const precioFormateado = precioNumero.toLocaleString('es-CL');
    total += precioNumero * item.cantidad;
    //2da verificacion, creacion posterior a la 1era
    const desactivarSumar = item.cantidad >= producto.stock ? 'disabled' : '';
    //se crea una lista li con los productos
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
          <button class="btn btn-outline-dark btn-sm cantidad-btn" data-id="${item.id}" data-action="sumar" ${desactivarSumar}>+</button>
        </div>
      </div>
    `;
    lista.appendChild(li);
  });

  totalDiv.textContent = `Total: $${total.toLocaleString('es-CL')}`;
  localStorage.setItem('carrito', JSON.stringify(carrito));
}

// Aqui tenemos el boton para sumar cantidad y restarla desde el carrito
lista.addEventListener('click', e => {
  if (e.target.classList.contains('cantidad-btn')) {
    const id = e.target.getAttribute('data-id');
    const action = e.target.getAttribute('data-action');
    const item = carrito.find(i => i.id === id);
    const producto = productos.find(p => p.id === id);
    if (item && producto) {
      if (action === 'sumar') {
        //1era verificacion para no pasarse del stcok
        if (item.cantidad < producto.stock) {
          item.cantidad++;
        } else {
          alert('No puedes agregar más, alcanzaste el stock disponible.');
        }
      }
      if (action === 'restar' && item.cantidad > 1) {
        item.cantidad--;
      }
      renderCarrito();
    }
  }
});

//limpieza del carrito
document.getElementById('borrar-carrito').addEventListener('click', () => {
  carrito = [];
  localStorage.removeItem('carrito');
  renderCarrito();
});

//aqui se envia un mensaje de compra y se limpia el carrito
document.getElementById('proceder-compra').addEventListener('click', () => {
  alert('¡Gracias por tu compra!');
  carrito = [];
  renderCarrito();
});

// aqui se hace el descuento siendo la palabra DESCUENTO10
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

// se muestra el carrito al cargar la pagina
renderCarrito();