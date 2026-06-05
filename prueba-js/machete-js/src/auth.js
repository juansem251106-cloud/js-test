// ============================================================
//  auth.js — Manejo de sesión con localStorage
//  Responsabilidad única: guardar, leer y borrar la sesión.
//
//  localStorage es una mini base de datos del navegador:
//    - Sobrevive al F5 y al cierre del navegador
//    - Solo guarda texto → usamos JSON.stringify / JSON.parse
//    - Específica del dominio (no se comparte entre sitios)
// ============================================================

const SESSION_KEY = 'session' // nombre de la clave en localStorage

// GUARDAR SESIÓN — llamar cuando el login sea exitoso
// JSON.stringify convierte el objeto JS → texto para poder guardarlo
// Ejemplo: {id:1, name:'Juan'} → '{"id":1,"name":"Juan"}'
export const saveSession = (user) => {
  localStorage.setItem(SESSION_KEY, JSON.stringify(user))
}

// LEER SESIÓN — llamar en el router y donde necesites saber si hay sesión
// JSON.parse hace lo inverso: texto → objeto JS
// Si no hay nada guardado, localStorage.getItem devuelve null → devolvemos null
export const getSession = () => {
  const raw = localStorage.getItem(SESSION_KEY) // leer el texto guardado
  return raw ? JSON.parse(raw) : null           // si existe → parsear; si no → null
}

// BORRAR SESIÓN — llamar al hacer logout
// Después de esto, getSession() devolverá null
export const clearSession = () => {
  localStorage.removeItem(SESSION_KEY)
}

// VERIFICAR si hay sesión activa (devuelve true o false)
export const isAuthenticated = () => getSession() !== null

// LOGIN — busca el usuario en json-server y guarda la sesión
// json-server no tiene endpoint de login real, así que filtramos por email y password
export const login = async (email, password) => {
  // La URL filtra usuarios por los dos campos a la vez
  // Si coincide → devuelve array con el usuario. Si no → array vacío []
  const res   = await fetch(`http://localhost:3000/users?email=${email}&password=${password}`)
  const users = await res.json()

  // Array vacío = credenciales incorrectas
  if (users.length === 0) {
    throw new Error('Credenciales incorrectas')
    // quien llame a login() debe envolver en try/catch para mostrar este mensaje
  }

  const user = users[0]  // tomar el primer (y único) resultado
  saveSession(user)       // persistir en localStorage
}

// LOGOUT — borrar sesión y redirigir
export const logout = () => {
  clearSession()
  window.location.hash = '#/login'
}
