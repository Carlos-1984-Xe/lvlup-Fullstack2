//feuncion en proceso de creacion, no terminada
// Guarda en localStorage la interaccion (click) con un producto
function incrementarInteraccion(productoId) {
  const key = `interacciones_${productoId}`;
  let count = Number(localStorage.getItem(key)) || 0;
  localStorage.setItem(key, count + 1);
}