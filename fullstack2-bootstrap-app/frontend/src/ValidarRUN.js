// Validación de RUN chileno
function validarRun(run) {
  run = run.toUpperCase();
  if (!/^[0-9K]{7,9}$/.test(run)) return false;
  let cuerpo = run.slice(0, -1);
  let dv = run.slice(-1);
  let suma = 0, multiplo = 2;
  for (let i = cuerpo.length - 1; i >= 0; i--) {
    suma += parseInt(cuerpo[i]) * multiplo;
    multiplo = multiplo === 7 ? 2 : multiplo + 1;
  }
  let dvEsperado = 11 - (suma % 11);
  dvEsperado = dvEsperado === 11 ? '0' : dvEsperado === 10 ? 'K' : dvEsperado.toString();
  return dv === dvEsperado;
}

document.querySelector('form').addEventListener('submit', function(e) {
  const rutInput = document.getElementById('rut');
  const rut = rutInput.value.trim();
  if (!validarRun(rut)) {
    rutInput.classList.add('is-invalid');
    rutInput.focus();
    e.preventDefault();
  } else {
    rutInput.classList.remove('is-invalid');
  }
});