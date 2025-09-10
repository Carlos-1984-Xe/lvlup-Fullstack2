// Importar el array de productos
import { productos } from './Productos.js';

// funcion para obtener N productos aleatorios de un array
function obtenerProductosAleatorios(arr, n) {
  //crea copia del array para no modificar
  const copia = [...arr];
  const resultado = [];
  //repite hasta la cantidad solicitada osea N en este caso 4
  while (resultado.length < n && copia.length > 0) {
    //elige un numero/indice aleagotorio desde 0 hasta la longitud del array
    const idx = Math.floor(Math.random() * copia.length);
    //saca el producto del array copia y lo agrega al array resultado
    resultado.push(copia.splice(idx, 1)[0]);
  }
  return resultado;
}
//indicanmos la cantidad de productos aleatorios a mostrar
const destacados = obtenerProductosAleatorios(productos, 4);

//muestra en pantalla los productos destacados/sugeridos
const destacadosContainer = document.getElementById('destacados');
destacados.forEach(producto => {
  const precioFormateado = `$${producto.precio.toLocaleString('es-CL')} CLP`;
  destacadosContainer.innerHTML += `
    <div class="col-6 col-md-4 col-lg-3">
      <div class="card h-100">
        <div class="bg-light d-flex align-items-center justify-content-center">
          <img src="${producto.imagen}" alt="${producto.nombre}" class="w-100 h-100" style="object-fit:contain;max-height:180px;">
        </div>
        <div class="card-body">
          <h5 class="card-title">${producto.nombre}</h5>
          <p class="card-text">${producto.descripcion.slice(0, 50)}...</p>
          <p class="fw-bold mb-2">${precioFormateado}</p>
          <a href="DetalleProducto.html?id=${producto.id}" class="btn btn-dark w-100">Ver detalle</a>
        </div>
      </div>
    </div>
  `;
});
