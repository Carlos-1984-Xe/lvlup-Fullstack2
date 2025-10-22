// Cliente: validaciones simples para formularios admin
document.addEventListener('DOMContentLoaded', () => {
  function addValidation(formSelector) {
    const form = document.querySelector(formSelector);
    if (!form) return;

    form.addEventListener('submit', (e) => {
      const pw = form.querySelector('input[name="password"]');
      const confirm = form.querySelector('input[name="confirm_password"]');
      let valid = true;

      // reset
      [pw, confirm].forEach(inp => {
        if (!inp) return;
        inp.classList.remove('is-invalid');
      });

      if (pw && pw.value.length < 8) {
        pw.classList.add('is-invalid');
        valid = false;
      }

      if (pw && confirm && pw.value !== confirm.value) {
        confirm.classList.add('is-invalid');
        valid = false;
      }

      if (!valid) {
        e.preventDefault();
        const errRegion = form.querySelector('.validation-errors');
        if (errRegion) {
          errRegion.textContent = 'Corrige los errores marcados antes de continuar.';
        }
      }
    });
  }

  // Añadir validación a los formularios esperados
  addValidation('form');
});
