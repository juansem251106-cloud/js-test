// ============================================================
//  views/dashboard.js — Vista principal (requiere sesión)
//  Muestra contenido diferente según el rol del usuario.
// ============================================================

import { getSession, logout } from '../auth.js'
import { can, getRole }       from '../permissions.js'
import { getTasks, deleteTask, patchTask } from '../services/tasks.js'

export const renderDashboard = async (container) => {

  const user = getSession() // leer los datos del usuario logueado
  const role = getRole()    // "admin" o "coder"

  // Pintar el esqueleto de la pantalla
  // can('accion') devuelve true/false → el ternario decide si mostrar el botón o no
  container.innerHTML = `
    <div class="dashboard">
      <header>
        <h2>Hola, ${user.name} (${role})</h2>
        <button id="btn-logout">Cerrar sesión</button>
      </header>

      <!-- Solo admin ve el botón de gestionar usuarios -->
      ${can('manage_users') ? `
        <button id="btn-admin">Panel de administración</button>
      ` : ''}

      <!-- Todos pueden crear tareas -->
      ${can('create') ? `
        <button id="btn-create">+ Nueva tarea</button>
      ` : ''}

      <!-- Aquí se renderizan las tareas -->
      <div id="tasks-container">Cargando tareas...</div>
    </div>
  `

  // Eventos de los botones del header
  document.getElementById('btn-logout').addEventListener('click', logout)

  if (can('manage_users')) {
    document.getElementById('btn-admin').addEventListener('click', () => {
      // aquí iría navigate('#/admin') o abrir un panel
      console.log('abrir panel de admin')
    })
  }

  // Cargar y mostrar las tareas
  await loadTasks(container, role)
}

// Función auxiliar — carga las tareas y las pinta
const loadTasks = async (container, role) => {
  try {
    const tasks = await getTasks() // GET /tasks → array de tareas
    const tasksContainer = document.getElementById('tasks-container')

    if (tasks.length === 0) {
      tasksContainer.innerHTML = '<p>No hay tareas.</p>'
      return
    }

    // Pintar cada tarea como una card
    tasksContainer.innerHTML = tasks.map(task => `
      <div class="task-card" data-id="${task.id}">
        <span>${task.title}</span>
        <span class="badge">${task.status}</span>

        <!-- Solo los que tienen permiso de update ven este botón -->
        ${can('update') ? `<button class="btn-status" data-id="${task.id}">Mover a done</button>` : ''}

        <!-- Solo los que tienen permiso de delete ven este botón -->
        ${can('delete') ? `<button class="btn-delete" data-id="${task.id}">Eliminar</button>` : ''}
      </div>
    `).join('') // .join('') convierte el array de strings en un solo string

    // Eventos para cada botón de status (delegación de eventos)
    tasksContainer.querySelectorAll('.btn-status').forEach(btn => {
      btn.addEventListener('click', async () => {
        const id = Number(btn.dataset.id) // leer el id del data attribute
        await patchTask(id, { status: 'done' }) // PATCH → solo cambia el status
        await loadTasks(container, role)         // recargar la lista
      })
    })

    // Eventos para cada botón de borrar
    tasksContainer.querySelectorAll('.btn-delete').forEach(btn => {
      btn.addEventListener('click', async () => {
        const id = Number(btn.dataset.id)
        if (confirm('¿Seguro que quieres borrar esta tarea?')) {
          await deleteTask(id)             // DELETE /tasks/:id
          await loadTasks(container, role) // recargar la lista
        }
      })
    })

  } catch (err) {
    document.getElementById('tasks-container').innerHTML = `<p>Error: ${err.message}</p>`
  }
}
