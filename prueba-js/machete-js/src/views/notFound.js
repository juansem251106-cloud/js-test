// ============================================================
//  views/notFound.js — Pantalla 404
// ============================================================

import { navigate } from '../router.js'

export const render404 = (container) => {
  container.innerHTML = `
    <div>
      <h2>404 — Página no encontrada</h2>
      <p>La ruta que buscas no existe.</p>
      <button id="btn-home">Volver al inicio</button>
    </div>
  `
  document.getElementById('btn-home').addEventListener('click', () => navigate('#/'))
}
