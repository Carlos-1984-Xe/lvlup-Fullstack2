// js para mostrar los productos en version lista en el html de productos, asi evitar creacion de muchos html
import { productos } from './Productos.js';

// obtener categoria desde la URL
const params = new URLSearchParams(window.location.search);
const categoria = params.get('categoria') || '';
document.getElementById('titulo-categoria').textContent = categoria;

//filtracion de productos por su categoria
const productosFiltrados = productos.filter(p => p.categoria === categoria);

//muestra de los productos
const contenedor = document.getElementById('contenedor-productos');
//uso de map para recorrer el array y crear las cajas de productos
contenedor.innerHTML = productosFiltrados.map(producto => `
  <div class="col-12 col-sm-6 col-md-4 col-lg-3">
    <div class="card h-100">
      <div class="bg-light d-flex align-items-center justify-content-center" style="height: 180px; overflow: hidden; border-radius: 8px;">
        <img src="${producto.imagen}" alt="${producto.nombre}" class="w-100 h-100" style="object-fit: cover; border-radius: 8px;" />
      </div>
      <div class="card-body bg-dark text-light d-flex flex-column h-100">
        <h5 class="card-title">${producto.nombre}</h5>
        <p class="fw-bold mb-2">$${producto.precio.toLocaleString('es-CL')} CLP</p>
        <a href="DetalleProducto.html?id=${producto.id}" class="btn btn-success w-100 mt-auto">Ver detalle</a>
      </div>
    </div>
  </div>
`).join('');