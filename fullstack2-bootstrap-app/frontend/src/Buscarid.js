import { productos } from './Productos.js';

document.addEventListener('DOMContentLoaded', () => {
    const idProductoInput = document.getElementById('idProducto');
    const buscarProductoBtn = document.getElementById('buscarProductoBtn');
    const nombreProductoInput = document.getElementById('nombreProducto');
    const descripcionInput = document.getElementById('descripcion');
    const categoriaSelect = document.getElementById('categoria');
    const precioInput = document.getElementById('precio');
    const stockInput = document.getElementById('stock');
    const imagenInput = document.getElementById('imagen');

    buscarProductoBtn.addEventListener('click', () => {
        const idBuscado = idProductoInput.value.trim().toUpperCase();
        const productoEncontrado = productos.find(producto => producto.id === idBuscado);

        if (productoEncontrado) {
            nombreProductoInput.value = productoEncontrado.nombre;
            descripcionInput.value = productoEncontrado.descripcion;

            const precioNumero = parseFloat(productoEncontrado.precio.replace(/[^0-9]/g,""));
            const precioFormateado = new Intl.NumberFormat("es-CL", {
                style: "currency",
                currency: "CLP",
                minimumFractionDigits: 0
            }).format(precioNumero);

            precioInput.value = precioFormateado;

            imagenInput.value = productoEncontrado.imagen;

            const categoriaId = idBuscado.substring(0, 2);
            let categoriaNombre = '';

            switch (categoriaId) {
                case 'JM':
                    categoriaNombre = 'Juegos de Mesa';
                    break;
                case 'MS':
                    categoriaNombre = 'Mouse';
                    break;
                case 'MP':
                    categoriaNombre = 'Mousepads';
                    break;
                case 'PC':
                    categoriaNombre = 'Computadores Gamer';
                    break;
                case 'RP':
                    categoriaNombre = 'Ropa';
                    break;
                case 'SG':
                    categoriaNombre = 'Sillas Gamer';
                    break;
                case 'CS':
                    categoriaNombre = 'Consolas';
                    break;
                case 'AC':
                    categoriaNombre = 'Accesorios';
                    break;
                default:
                    categoriaNombre = 'Otra';
            }

            categoriaSelect.value = categoriaNombre;
        } else {
            alert('Producto no encontrado. Por favor, verifica el ID.');
            nombreProductoInput.value = '';
            descripcionInput.value = '';
            categoriaSelect.value = 'Seleccione la categoría...';
            precioInput.value = '';
            stockInput.value = '';
            imagenInput.value = '';
        }
    });
});