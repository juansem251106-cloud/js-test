// ============================================================
//  services/tasks.js — CRUD completo de tareas
//  Usa el cliente base (api.js) para no repetir código.
//  Cada función tiene UNA responsabilidad HTTP.
// ============================================================

import { api } from './api.js'

// READ ALL — trae TODAS las tareas como un array
// Uso: const tasks = await getTasks()
export const getTasks = () => api.get('/tasks')

// READ ONE — trae UNA tarea por su id
// Uso: const task = await getTask(1)
export const getTask = (id) => api.get(`/tasks/${id}`)

// READ con FILTRO — trae tareas filtrando por campo
// Uso: const doneTasks = await getTasksByStatus('done')
// La URL queda: /tasks?status=done
export const getTasksByStatus = (status) => api.get(`/tasks?status=${status}`)

// Filtrar por usuario asignado
// Uso: const myTasks = await getTasksByUser(2)
// La URL queda: /tasks?assignedTo=2
export const getTasksByUser = (userId) => api.get(`/tasks?assignedTo=${userId}`)

// CREATE — crea una tarea nueva
// json-server le asigna el id automáticamente
// Uso: const newTask = await createTask({ title: 'mi tarea', status: 'todo', assignedTo: 2 })
export const createTask = (data) => api.post('/tasks', data)

// UPDATE (PUT) — reemplaza la tarea COMPLETA
// Usar cuando tienes TODOS los datos del objeto actualizado
// Uso: await updateTask(1, { id:1, title: 'editada', status: 'in-progress', assignedTo: 2 })
export const updateTask = (id, data) => api.put(`/tasks/${id}`, data)

// UPDATE (PATCH) — actualiza solo los campos que mandes
// Más seguro cuando solo quieres cambiar una cosa
// Uso: await patchTask(1, { status: 'done' })
export const patchTask = (id, fields) => api.patch(`/tasks/${id}`, fields)

// DELETE — elimina la tarea con ese id
// Uso: await deleteTask(1)
export const deleteTask = (id) => api.delete(`/tasks/${id}`)
