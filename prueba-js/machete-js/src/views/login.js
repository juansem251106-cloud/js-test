// ============================================================
//  views/login.js — Vista del formulario de login
//  Responsabilidad: pintar el HTML del login y manejar el submit
// ============================================================

import { login }    from '../auth.js'
import { navigate } from '../router.js'

export const renderLogin = (container) => {

  // 1. Pintar el HTML del formulario
  container.innerHTML = `
    <div class="login-container">
      <h2>Iniciar sesión</h2>

      <input type="email"    id="email"    placeholder="Correo" />
      <input type="password" id="password" placeholder="Contraseña" />

      <button id="btn-login">Entrar</button>

      <p id="error-msg" style="color:red; display:none;"></p>
    </div>
  `

  // 2. Capturar los elementos del DOM que acabamos de crear
  const btnLogin  = document.getElementById('btn-login')
  const errorMsg  = document.getElementById('error-msg')

  // 3. Escuchar el clic del botón
  btnLogin.addEventListener('click', async () => {

    const email    = document.getElementById('email').value
    const password = document.getElementById('password').value

    // Ocultar el error anterior (si había)
    errorMsg.style.display = 'none'

    try {
      // login() busca en json-server → si existe guarda sesión
      await login(email, password)

      // Si llegamos aquí es que el login fue exitoso → navegar al dashboard
      navigate('#/dashboard')

    } catch (err) {
      // Si login() lanzó un error (credenciales incorrectas) → mostrarlo
      errorMsg.textContent   = err.message
      errorMsg.style.display = 'block'
    }
  })
}
