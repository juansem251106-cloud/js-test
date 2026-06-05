// ============================================================
//  permissions.js — Sistema de permisos por rol
//  Responsabilidad única: responder "¿puede el usuario hacer X?"
//
//  Por qué centralizar aquí:
//    - Si cambias los permisos de un rol, solo editas este archivo
//    - El resto del código solo hace: if (can('delete')) { ... }
// ============================================================

import { getSession } from './auth.js'

/*
  MAPA DE PERMISOS
  Cada rol tiene una lista de acciones que puede realizar.
  Los nombres de las acciones los inventas tú según tu app.
  Aquí: admin puede todo, coder puede menos cosas.
*/
const PERMISSIONS = {
  admin: ['read', 'create', 'update', 'delete', 'manage_users'],
  coder: ['read', 'create', 'update'],
  // el coder NO tiene 'delete' ni 'manage_users'
}

/*
  can('delete') → "¿el usuario actual tiene permiso de 'delete'?"

  Paso a paso:
  1. Lee la sesión de localStorage
  2. Si no hay sesión → false (no puede hacer nada)
  3. Busca los permisos de su rol en el mapa de arriba
  4. Verifica si el permiso pedido está en el array con .includes()
  5. Devuelve true o false
*/
export const can = (action) => {
  const session = getSession()
  if (!session) return false                     // sin sesión = sin permisos

  const perms = PERMISSIONS[session.role] || [] // permisos del rol ([] si el rol no existe)
  return perms.includes(action)                 // true si está en la lista
}

// Devuelve el rol del usuario actual ("admin", "coder", etc.)
// El ?. es "optional chaining": si getSession() es null, no da error → devuelve undefined
export const getRole = () => getSession()?.role
