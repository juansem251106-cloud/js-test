// ============================================================
//  views/home.js — Vista de la página de inicio
// ============================================================

import { isAuthenticated } from '../auth.js'
import { navigate }        from '../router.js'

export const renderHome = (container) => {
  container.innerHTML = `
    <div>
      <h1>Bienvenido a la app</h1>
      <p>Esta es la página pública, accesible sin login.</p>

      ${isAuthenticated()
        ? `<button id="btn-go-dashboard">Ir al dashboard</button>`
        : `<button id="btn-go-login">Iniciar sesión</button>`
      }
    </div>
  `

  if (isAuthenticated()) {
    document.getElementById('btn-go-dashboard').addEventListener('click', () => navigate('#/dashboard'))
  } else {
    document.getElementById('btn-go-login').addEventListener('click', () => navigate('#/login'))
  }
}
