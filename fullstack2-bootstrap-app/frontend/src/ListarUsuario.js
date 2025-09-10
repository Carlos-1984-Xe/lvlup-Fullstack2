import { usuarios as usuariosBase } from './UsuariosC.js';
// Cargar usuarios desde localStorage y combinar con los del archivo
let usuariosLS = [];
try {
  usuariosLS = JSON.parse(localStorage.getItem('usuarios')) || [];
} catch {
  usuariosLS = [];
}

// Unir ambos arrays, evitando duplicados por RUT o correo
const usuariosMap = new Map();
[...usuariosBase, ...usuariosLS].forEach(u => {
  // Usa rut como clave principal, si no existe usa correo
  const clave = u.rut || u.correo;
  if (clave && !usuariosMap.has(clave)) {
    usuariosMap.set(clave, u);
  }
});
const usuarios = Array.from(usuariosMap.values());

const listado = document.getElementById('listado-usuarios');

if (usuarios.length === 0) {
  listado.innerHTML = `<p class="text-muted">No hay usuarios registrados en la tienda.</p>`;
} else {
  listado.innerHTML = `
    <div class="table-responsive">
      <table class="table table-striped table-hover align-middle">
        <thead class="table-dark">
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Apellidos</th>
            <th>Correo</th>
            <th>RUN</th>
            <th>Región</th>
            <th>Comuna</th>
            <th>Dirección</th>
            <th>Teléfono</th>
            <th>Rol</th>
          </tr>
        </thead>
        <tbody>
          ${usuarios.map(u => `
            <tr>
              <td>${u.id || ''}</td>
              <td>${u.nombre || ''}</td>
              <td>${u.apellidos || ''}</td>
              <td>${u.correo || ''}</td>
              <td>${u.rut || ''}</td>
              <td>${u.region || ''}</td>
              <td>${u.comuna || ''}</td>
              <td>${u.direccion || ''}</td>
              <td>${u.telefono || ''}</td>
              <td>${u.rol ? u.rol : 'Cliente'}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    </div>
  `;
}