// ============================================================
//  services/api.js — Cliente HTTP base reutilizable
//  Centraliza la URL base y los headers comunes.
//  Todos los demás servicios (tasks.js, users.js) lo usan.
// ============================================================

const BASE_URL = 'http://localhost:3000' // URL de json-server

// Construye los headers que van en cada petición
// Si tu API usa tokens de autenticación, agrégalos aquí
const getHeaders = () => ({
  'Content-Type': 'application/json',
  // Si usas Bearer Token descomenta esto:
  // 'Authorization': `Bearer ${getSession()?.token}`
})

export const api = {

  // GET — traer datos (no lleva body)
  // Ejemplo: api.get('/tasks') → trae todas las tareas
  // Ejemplo: api.get('/tasks/1') → trae la tarea con id 1
  get: (path) =>
    fetch(`${BASE_URL}${path}`, { headers: getHeaders() })
      .then(res => {
        if (!res.ok) throw new Error(`Error ${res.status}`)
        return res.json()
      }),

  // POST — crear un registro nuevo
  // Ejemplo: api.post('/tasks', { title: 'nueva tarea', status: 'todo' })
  post: (path, body) =>
    fetch(`${BASE_URL}${path}`, {
      method:  'POST',
      headers: getHeaders(),
      body:    JSON.stringify(body) // objeto JS → texto JSON
    }).then(res => res.json()),

  // PUT — reemplazar un registro COMPLETO (todos los campos)
  // Ejemplo: api.put('/tasks/1', { id:1, title: 'editada', status: 'done', assignedTo: 2 })
  put: (path, body) =>
    fetch(`${BASE_URL}${path}`, {
      method:  'PUT',
      headers: getHeaders(),
      body:    JSON.stringify(body)
    }).then(res => res.json()),

  // PATCH — actualizar SOLO algunos campos (no toca los demás)
  // Ejemplo: api.patch('/tasks/1', { status: 'done' }) → solo cambia el status
  patch: (path, body) =>
    fetch(`${BASE_URL}${path}`, {
      method:  'PATCH',
      headers: getHeaders(),
      body:    JSON.stringify(body)
    }).then(res => res.json()),

  // DELETE — eliminar un registro
  // Ejemplo: api.delete('/tasks/1') → borra la tarea con id 1
  delete: (path) =>
    fetch(`${BASE_URL}${path}`, { method: 'DELETE' }),
}
