# Task Manager

Aplicación web para gestionar tareas usando React, Redux Toolkit, Material UI y Vite.

## Requisitos

* Node.js 18+
* npm o yarn

## Instalación

```bash
npm install
```

## Configuración

1. Crear un archivo `.env` en la raíz del proyecto.
2. Agregar la URL de tu API:

```env
VITE_API_URL=http://localhost:5000
```

## Ejecutar en desarrollo

```bash
npm run dev
```

La aplicación se abrirá en `http://localhost:5173`.

## Construir para producción

```bash
npm run build
```

Los archivos listos para producción estarán en la carpeta `dist/`.

## Servir build de producción

```bash
npm run preview
```

## Estructura de carpetas

```
src/
├── App.jsx
├── components/
│   └── tasks/
│       ├── TaskForm.jsx
│       ├── TaskModal.jsx
│       └── TaskTable.jsx
├── context/
│   └── EnvContext.jsx
├── services/
│   └── tasksApi.js
├── styles/
│   ├── App.css
│   └── index.css
└── theme/
    └── theme.js
```

## Tecnologías utilizadas

* React
* Redux Toolkit
* Material UI
* Vite

## Scripts disponibles

* `npm run dev` – Ejecuta el entorno de desarrollo.
* `npm run build` – Genera el build optimizado.
* `npm run preview` – Sirve el build de producción.

## Notas

Asegúrate de que tu API esté activa y accesible desde la URL configurada en el archivo `.env`.
