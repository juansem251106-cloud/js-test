// ============================================================
//  services/users.js — CRUD de usuarios
// ============================================================

import { api } from './api.js'

// Trae todos los usuarios
export const getUsers = () => api.get('/users')

// Trae un usuario por id
export const getUser = (id) => api.get(`/users/${id}`)

// Filtra usuarios por rol
// Uso: const admins = await getUsersByRole('admin')
export const getUsersByRole = (role) => api.get(`/users?role=${role}`)

// Crea un usuario nuevo
// Uso: await createUser({ name: 'Pedro', email: 'p@mail.com', password: '1234', role: 'coder' })
export const createUser = (data) => api.post('/users', data)

// Actualiza un usuario
export const updateUser = (id, data) => api.put(`/users/${id}`, data)

// Borra un usuario
export const deleteUser = (id) => api.delete(`/users/${id}`)
