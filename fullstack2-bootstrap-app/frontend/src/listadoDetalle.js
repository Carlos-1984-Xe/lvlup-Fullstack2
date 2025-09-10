import { productos } from './Productos.js';

  // Obtener el id de la URL
  const params = new URLSearchParams(window.location.search);
  const id = params.get('id');

  // Buscar el producto en la lista
  const producto = productos.find(p => p.id === id);

  // Mostrar los datos
  if (producto) {
    // Formatea el precio
    const precioFormateado = `$${producto.precio.toLocaleString('es-CL')}`;
    // Obtener la categoría del producto
    const categoria = producto.categoria || "Categoría";

    // Breadcrumb muestra la ruta hasta el producto
    const breadcrumb = `
      <nav aria-label="breadcrumb" class="mb-4">
        <ol class="breadcrumb bg-transparent p-0">
          <li class="breadcrumb-item"><a href="Home.html" class="text-success text-decoration-none">Home</a></li>
          <li class="breadcrumb-item"><a href="#" class="text-success text-decoration-none">${categoria}</a></li>
          <li class="breadcrumb-item active text-light" aria-current="page">${producto.nombre}</li>
        </ol>
      </nav>
    `;

    document.getElementById('detalle-producto').innerHTML = `
      ${breadcrumb}
      <div class="row align-items-center">
        <div class="col-md-6 d-flex justify-content-start align-items-center mb-4 mb-md-0">
          <img src="${producto.imagen}" alt="${producto.nombre}" class="detalle-img img-fluid rounded shadow" style="max-height:400px;object-fit:contain; margin-left:0;">
        </div>
        <div class="col-md-6">
          <div class="caja-detalle">
            <div class="d-flex align-items-center mb-3">
              <h2 class="mb-0 flex-grow-1">${producto.nombre}</h2>
              <span class="badge bg-success fs-4 ms-3">${precioFormateado}</span>
            </div>
            <div class="mb-4 text-secondary" style="font-size:1.1rem;">${producto.descripcion}</div>
            <button id="agregar-carrito" class="btn btn-success btn-lg px-4">Agregar producto</button>
          </div>
        </div>
      </div>
    `;

    // creacion del evento para agregar al carrito
    document.getElementById('agregar-carrito').addEventListener('click', function() {
      let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
      // Normaliza el carrito cargado
      carrito = carrito.map(item => typeof item === 'string' ? { id: item, cantidad: 1 } : item);

      const existente = carrito.find(item => item.id === producto.id);
      if (existente) {
        existente.cantidad++;
      } else {
        carrito.push({ id: producto.id, cantidad: 1 });
      }
      localStorage.setItem('carrito', JSON.stringify(carrito));
      alert('Producto agregado al carrito');
      if (typeof updateCartCount === 'function') {
        updateCartCount();
      }
    });
  } else {
    document.getElementById('detalle-producto').innerHTML = '<p>Producto no encontrado.</p>';
  }