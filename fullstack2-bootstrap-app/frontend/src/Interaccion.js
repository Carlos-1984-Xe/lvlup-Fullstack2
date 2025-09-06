function incrementarInteraccion(productoId) {
  const key = `interacciones_${productoId}`;
  let count = Number(localStorage.getItem(key)) || 0;
  localStorage.setItem(key, count + 1);
}