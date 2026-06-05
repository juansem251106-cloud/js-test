// ============================================================
//  router.js — El "controlador de tráfico" de la SPA
//  Lee el hash de la URL y decide qué vista mostrar.
//  También protege rutas que requieren sesión o rol específico.
// ============================================================

import { getSession } from './auth.js'
import { getRole }    from './permissions.js'

// Importa las funciones que pintan cada pantalla
import { renderHome }      from './views/home.js'
import { renderLogin }     from './views/login.js'
import { renderDashboard } from './views/dashboard.js'
import { render404 }       from './views/notFound.js'

/*
  MAPA DE RUTAS
  Cada clave es el hash que aparece en la URL.
  Cada valor tiene:
    - view:      función que pinta esa pantalla
    - protected: true = solo usuarios con sesión activa pueden entrar
    - role:      (opcional) solo ese rol puede entrar
*/
const routes = {
  '#/':          { view: renderHome,      protected: false },
  '#/login':     { view: renderLogin,     protected: false },
  '#/dashboard': { view: renderDashboard, protected: true  },
  // Ejemplo de ruta solo para admins:
  // '#/admin': { view: renderAdmin, protected: true, role: 'admin' },
}

export const router = () => {

  // Leer el hash actual de la URL. Si no hay ninguno, usar '#/'
  const hash  = window.location.hash || '#/'

  // Buscar esa ruta en el mapa
  const route = routes[hash]

  // Si no existe → mostrar pantalla 404
  if (!route) {
    render404(document.getElementById('app'))
    return
  }

  // GUARDIA DE AUTENTICACIÓN:
  // Si la ruta es protected:true Y no hay sesión → redirigir al login
  // getSession() devuelve null si no hay sesión → !null = true → entra al if
  if (route.protected && !getSession()) {
    window.location.hash = '#/login'
    return
  }

  // GUARDIA DE ROL:
  // Si la ruta requiere un rol específico Y el usuario no lo tiene → sin permiso
  if (route.role && getRole() !== route.role) {
    document.getElementById('app').innerHTML = '<h2>No tienes permiso para ver esta página.</h2>'
    return
  }

  // Todo OK → limpiar el contenedor y pintar la vista correspondiente
  const app = document.getElementById('app')
  app.innerHTML = ''   // borrar la pantalla anterior
  route.view(app)      // llamar a la función de renderizado con el contenedor
}

// Navegar desde código (sin que el usuario haga clic en un enlace)
// Ejemplo: navigate('#/dashboard') → cambia el hash → dispara hashchange → router()
export const navigate = (path) => {
  window.location.hash = path
}
