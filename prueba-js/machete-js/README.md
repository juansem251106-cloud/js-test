# Machete JS — SPA, CRUD, API, Sesión, Roles, Módulos

Proyecto de referencia para la prueba. Cada archivo está comentado línea por línea.

## Estructura

```
machete-js/
├── index.html              ← único HTML, contiene el #app
├── db.json                 ← "base de datos" de json-server
├── package.json            ← scripts y dependencias
└── src/
    ├── main.js             ← arranca la app, registra los event listeners
    ├── router.js           ← lee el hash, aplica guardias, llama a la vista
    ├── auth.js             ← saveSession / getSession / clearSession / login / logout
    ├── permissions.js      ← can('accion') / getRole()
    ├── services/
    │   ├── api.js          ← cliente HTTP base (GET, POST, PUT, PATCH, DELETE)
    │   ├── tasks.js        ← CRUD completo de tareas
    │   └── users.js        ← CRUD de usuarios
    └── views/
        ├── home.js         ← página de inicio (pública)
        ├── login.js        ← formulario de login
        ├── dashboard.js    ← tablero principal (protegido)
        └── notFound.js     ← pantalla 404
```

## Cómo usarlo

```bash
# 1. Instalar dependencias
npm install

# 2. Arrancar json-server (terminal 1)
npm run api
# → API disponible en http://localhost:3000

# 3. Arrancar Vite (terminal 2)
npm run dev
# → App disponible en http://localhost:5173
```

## Usuarios de prueba (en db.json)

| Email              | Password | Rol   |
|--------------------|----------|-------|
| admin@mail.com     | 1234     | admin |
| coder@mail.com     | 1234     | coder |

## Rutas disponibles

| Hash          | Protegida | Descripción            |
|---------------|-----------|------------------------|
| `#/`          | No        | Página de inicio       |
| `#/login`     | No        | Formulario de login    |
| `#/dashboard` | Sí        | Tablero principal      |

## Permisos por rol

| Acción        | admin | coder |
|---------------|-------|-------|
| read          | ✓     | ✓     |
| create        | ✓     | ✓     |
| update        | ✓     | ✓     |
| delete        | ✓     | ✗     |
| manage_users  | ✓     | ✗     |

## Endpoints de json-server

```
GET    /tasks              → todas las tareas
GET    /tasks/1            → tarea con id=1
GET    /tasks?status=done  → filtrar por campo
POST   /tasks              → crear tarea
PUT    /tasks/1            → reemplazar tarea completa
PATCH  /tasks/1            → actualizar solo algunos campos
DELETE /tasks/1            → borrar tarea

GET    /users?email=x&password=y  → buscar usuario (login)
```
