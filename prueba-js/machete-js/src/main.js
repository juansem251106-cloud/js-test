// ============================================================
//  main.js — Punto de entrada de la SPA
//  Este es el primer archivo que se ejecuta.
//  Su única responsabilidad: arrancar el router.
// ============================================================

import { router } from './router.js'

// "hashchange" se dispara cuando el usuario cambia la URL (ej: #/login → #/dashboard)
// Sin esto, navegar entre páginas no funcionaría.
window.addEventListener('hashchange', router)

// "load" se dispara la primera vez que se abre la página.
// Sin esto, al entrar directamente a la app no se pintaría nada.
window.addEventListener('load', router)
