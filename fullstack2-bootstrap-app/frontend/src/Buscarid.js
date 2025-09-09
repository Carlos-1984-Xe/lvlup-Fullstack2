import { productos } from './Productos.js';

//primero se espera a que el html se cargue con el DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
    //luego se obtienen los elementos
    const idProductoInput = document.getElementById('idProducto');
    const buscarProductoBtn = document.getElementById('buscarProductoBtn');
    const nombreProductoInput = document.getElementById('nombreProducto');
    const descripcionInput = document.getElementById('descripcion');
    const categoriaSelect = document.getElementById('categoria');
    const precioInput = document.getElementById('precio');
    const stockInput = document.getElementById('stock');
    const imagenInput = document.getElementById('imagen');

    //se agrega un evento al boton buscar haciendo un trim y uppercase al id
    buscarProductoBtn.addEventListener('click', () => {
        const idBuscado = idProductoInput.value.trim().toUpperCase();
        const productoEncontrado = productos.find(producto => producto.id === idBuscado);
        //Si se llega a encontrar el producto se rellena si no mensaje de error
        if (productoEncontrado) {
            nombreProductoInput.value = productoEncontrado.nombre;
            descripcionInput.value = productoEncontrado.descripcion;
            //formateo del precio chileanPesos xd
            const precioNumero = parseFloat(productoEncontrado.precio.replace(/[^0-9]/g,""));
            const precioFormateado = new Intl.NumberFormat("es-CL", {
                style: "currency",
                currency: "CLP",
                minimumFractionDigits: 0
            }).format(precioNumero);

            precioInput.value = precioFormateado;
            stockInput.value = productoEncontrado.stock;
            imagenInput.value = productoEncontrado.imagen;

            //Aqui se ve la categoria segun el id
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