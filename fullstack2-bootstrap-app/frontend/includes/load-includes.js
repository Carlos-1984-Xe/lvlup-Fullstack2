// load-includes.js
// Normaliza la carga de CSS/JS y carga header/footer por fetch.
(function(){
  // Detect the script's own URL and use it to resolve include paths reliably.
  const currentScript = document.currentScript || (function(){
    const scripts = document.getElementsByTagName('script');
    return scripts[scripts.length-1];
  })();
  const scriptSrc = currentScript && currentScript.src ? currentScript.src : './';

  // Resolve helpers using URL relative to scriptSrc
  const resolve = (rel)=> new URL(rel, scriptSrc).href;

  // Inyecta CSS/JS comunes si no están presentes
  function ensureCSS(href){
    if(!document.querySelector(`link[href="${href}"]`)){
      const l = document.createElement('link'); l.rel = 'stylesheet'; l.href = href; document.head.appendChild(l);
    }
  }
  function ensureScript(src, attrs){
    if(!document.querySelector(`script[src="${src}"]`)){
      const s = document.createElement('script'); s.src = src; if(attrs) Object.assign(s, attrs); document.body.appendChild(s);
    }
  }

  // Default CSS / Bootstrap
  ensureCSS('https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css');
  ensureCSS(resolve('../src/styles/style.css'));

  // Load header and footer
  async function loadFragment(selector, path){
    try{
      const res = await fetch(path, {cache:'no-cache'});
      if(!res.ok) return;
      const html = await res.text();
      const container = document.querySelector(selector);
      if(container) container.innerHTML = html;
    }catch(e){ console.error('loadFragment error', e); }
  }

  document.addEventListener('DOMContentLoaded', ()=>{
    // Lugar donde se inyecta header/footer
    loadFragment('#include-header', resolve('header.html'));
    loadFragment('#include-footer', resolve('footer.html'));

    // Asegurar bootstrap bundle si no existe (para collapse, dropdowns, carousel)
    ensureScript('https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js');
  });

})();
