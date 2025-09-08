import { usuarios as usuariosBase } from './UsuariosC.js';

// Cargar usuarios desde localStorage o usar los del archivo
let usuarios = [];
const usuariosLS = localStorage.getItem('usuarios');
if (usuariosLS) {
  usuarios = JSON.parse(usuariosLS);
} else {
  usuarios = [...usuariosBase];
}

const form = document.querySelector('form');
const mensajeRegistro = document.getElementById('mensaje-registro');

function mostrarMensaje(texto, tipo = "success") {
  mensajeRegistro.innerHTML = `
    <div class="alert alert-${tipo} alert-dismissible fade show mt-2 mb-0" role="alert">
      ${texto}
      <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Cerrar"></button>
    </div>
  `;
}

form.addEventListener('submit', async function(e) {
  e.preventDefault();

  // Obtén los valores de los campos
  const nombre = document.getElementById('nombre').value.trim();
  const correo = document.getElementById('correo').value.trim().toLowerCase();
  const contraseña = document.getElementById('contraseña').value;
  const confirmar = document.getElementById('confirmar').value;
  const fechaNacimiento = document.getElementById('fechaNacimiento').value;
  const rut = document.getElementById('rut').value.trim().toUpperCase();
  const region = document.getElementById('region').value;
  const comuna = document.getElementById('comuna').value;

  // Validar campos requeridos
  if (!nombre || !correo || !contraseña || !confirmar || !rut || !region || !comuna || !direccion) {
    mostrarMensaje('Por favor, completa todos los campos requeridos.', 'danger');
    return;
  }

  // Validar contraseñas iguales
  if (contraseña !== confirmar) {
    mostrarMensaje('Las contraseñas no coinciden.', 'danger');
    return;
  }

  // Validar si el usuario ya existe (por correo o rut)
  const existe = usuarios.some(u => u.correo === correo || u.rut === rut);
  if (existe) {
    mostrarMensaje('Ya existe un usuario con ese correo o RUN.', 'danger');
    return;
  }

  // Generar nuevo ID autoincremental
  let nuevoId = 1;
  if (usuarios.length > 0) {
    const ids = usuarios.map(u => u.id);
    nuevoId = Math.max(...ids) + 1;
  }

  // Crear el nuevo usuario
  const nuevoUsuario = {
    id: nuevoId,
    nombre,
    correo,
    contraseña,
    rut,
    fechaNacimiento,
    region,
    comuna,
    // Puedes agregar dirección y teléfono si quieres
    direccion: document.getElementById('direccion').value.trim(),
    telefono: document.getElementById('telefono').value.trim()
  };

  // Agregar al array de usuarios (en memoria)
  usuarios.push(nuevoUsuario);

  // Guardar en localStorage (opcional, para persistencia en el navegador)
  localStorage.setItem('usuarios', JSON.stringify(usuarios));

  mostrarMensaje('¡Usuario registrado exitosamente!', 'success');
  form.reset();
});