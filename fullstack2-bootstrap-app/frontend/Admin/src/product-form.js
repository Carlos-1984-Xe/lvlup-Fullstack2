// product-form.js
// Simple client behavior for AdminNuevoProducto: price validation and image preview
document.addEventListener('DOMContentLoaded', ()=>{
  const form = document.querySelector('#product-form');
  if(!form) return;

  const precio = form.querySelector('#precio');
  const imagenInput = form.querySelector('#imagenFile');
  const preview = form.querySelector('#imagenPreview');
  const errors = form.querySelector('.validation-errors');

  function setError(msg){
    if(errors){ errors.textContent = msg; errors.style.display = msg? 'block' : 'none'; }
  }

  // Image preview
  if(imagenInput && preview){
    imagenInput.addEventListener('change', (e)=>{
      const file = e.target.files && e.target.files[0];
      if(!file){ preview.src = ''; preview.style.display = 'none'; return; }
      if(!file.type.startsWith('image/')){ setError('El archivo debe ser una imagen.'); imagenInput.value = ''; return; }
      if(file.size > 2 * 1024 * 1024){ setError('La imagen debe pesar menos de 2 MB.'); imagenInput.value = ''; return; }
      const reader = new FileReader();
      reader.onload = ()=>{
        preview.src = reader.result;
        preview.style.display = 'block';
        setError('');
      };
      reader.readAsDataURL(file);
    });
  }

  // Validate on submit
  form.addEventListener('submit', (evt)=>{
    let valid = true;
    setError('');
    if(precio){
      const v = parseFloat(precio.value);
      if(Number.isNaN(v) || v < 0){ setError('Ingrese un precio válido (>= 0).'); valid = false; }
    }
    // image optional but if present must be an image
    if(imagenInput && imagenInput.files && imagenInput.files[0]){
      const f = imagenInput.files[0];
      if(!f.type.startsWith('image/')){ setError('El archivo debe ser una imagen.'); valid = false; }
      if(f.size > 2 * 1024 * 1024){ setError('La imagen debe pesar menos de 2 MB.'); valid = false; }
    }
    if(!valid) evt.preventDefault();
  });
});
