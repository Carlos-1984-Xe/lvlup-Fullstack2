Resumen de recomendaciones — Panel Administrador (carpeta `frontend/Admin`)

Objetivo

Consolidar y priorizar mejoras aplicadas y pendientes en los HTML del panel de administración. El foco es: accesibilidad, semántica, consistencia (DRY), seguridad ligera y UX de formularios.

Cambio ya aplicado (resumen)

- Un loader (`frontend/includes/load-includes.js`) centraliza la inyección de fragmentos (header/footer/admin sidebar/admin footer).
- Se crearon los fragmentos reutilizables:
  - `frontend/includes/admin-sidebar.html`
  - `frontend/includes/admin-footer.html`
- Se normalizó la ruta del logo en Admin pages y se añadió `loading="lazy"` y textos alternativos descriptivos.
- Se corrigieron formularios clave (usuarios): ids duplicados, `type="correo"` → `type="email"`, `name` y `autocomplete` añadidos.
- Se añadió un pequeño módulo cliente `frontend/Admin/src/admin-forms.js` para validaciones básicas (contraseña mínima y confirmación).
- Se añadieron placeholders en cada Admin HTML:
  - `<div id="include-admin-sidebar"></div>`
  - `<div id="include-admin-footer"></div>`
- Se aplicaron mejoras de accesibilidad en `AdminUsuario.html`: skip-link, H1 oculto, role/aria-label en submenú, enlaces corregidos.

Prioridad — Acciones recomendadas (rápido, medio, largo plazo)

Alta (hacer ahora)

1) Validación servidor-side y sanitización
   - Asegura que todas las validaciones hechas en cliente (admin-forms.js) se repitan y validen en el backend (backend/src).
   - Motivo: evitar inyección, entrada inválida o bypass por requests HTTP.

2) Inputs numéricos y moneda
   - Cambiar campos de precio a `input type="number" step="0.01" min="0"` o usar `inputmode="decimal"` para mejorar UX móvil.
   - Ejemplo:
     <input type="number" step="0.01" min="0" id="precio" name="precio" inputmode="decimal" class="form-control" required>

3) Accesibilidad mínima en todas las páginas
   - Añadir `lang="es"` (ya aplicado en la mayoría), `role="main"` en el main y `aria-label` descriptivos (ya parcial).
   - Añadir skip-link en el header global (incluir en `header.html`) para navegadores con teclado.

Medio (plan de 1–2 sprints)

4) Formularios: feedback inline y estados
   - Añadir `aria-describedby` para mensajes de error y `role="alert"` en contenedores de error.
   - Implementar componentes de validación reutilizables.

5) Imágenes y previews de upload
   - Preparar un control file input con preview (cliente) para nuevos productos.
   - Usar FileReader para previsualizar y validar tamaño/tipo antes de subir.

6) Seguridad: CSP y headers
   - Añadir Content Security Policy (CSP) básico en las respuestas del servidor o meta tag temporal.
   - Verificar sanitización en backend antes de persistir HTML/strings.

Bajo (mejoras nice-to-have)

7) Consolidar scripts y dependencias
   - Poner referencias a Bootstrap y Bootstrap Icons en `header.html` para DRY, y eliminar duplicados.

8) Tests mínimos
   - Añadir tests unitarios/automatizados para funciones JS críticas (p. ej. validación de formulario).

Ejemplos prácticos (snippets)

- Skip link (incluir en `header.html`):
  <a class="visually-hidden-focusable" href="#main-admin">Saltar al contenido</a>

- Input precio (mejorado):
  <label for="precio">PRECIO</label>
  <input type="number" id="precio" name="precio" step="0.01" min="0" inputmode="decimal" class="form-control" required>

- Campo email (correcto):
  <label for="email">Correo</label>
  <input type="email" id="email" name="email" autocomplete="email" class="form-control" required>

- Mensaje de error accesible:
  <div id="error-pass" class="validation-errors" role="alert" aria-live="assertive"></div>

Checklist técnico para revisión rápida

- [ ] Backend valida `precio` como número >= 0
- [ ] Backend valida `email` con formato y unicidad
- [ ] Archivo `frontend/includes/load-includes.js` está cargado desde el header global
- [ ] Todas las páginas Admin usan los placeholders `include-admin-sidebar` y `include-admin-footer`
- [ ] Probar subida de imagen con preview antes del upload

Siguientes pasos recomendados (mi propuesta)

- Puedo aplicar los cambios de `precio` y añadir previews de imagen en `AdminNuevoProducto.html` (implementación cliente ligera). ¿Quieres que lo haga ahora?
- Puedo mover los tags de CSS/JS a `includes/header.html` y eliminar duplicados en los Admin html para completar el DRY.
- Puedo generar un pequeño checklist `README.md` con comandos para servir localmente y probar (Live Server / http-server) si quieres probar visualmente.

Si quieres, aplico cualquiera de las acciones anteriores (elige 1 o varias):
- 1: Cambiar campo precio → número con step y añadir validación cliente.
- 2: Añadir preview de imagen para `AdminNuevoProducto.html`.
- 3: Mover includes a `header.html` y reducir duplicados.
- 4: Generar README con comandos para servir localmente.

---
Archivo creado automáticamente por la sesión de mejoras del panel administrador.
