# To-Do App

Este es un proyecto de aplicación de lista de tareas (To-Do List) que utiliza React para el frontend y FastAPI para el backend. La aplicación permite a los usuarios crear, leer, actualizar y eliminar tareas de manera sencilla.

## Estructura del Proyecto

El proyecto está organizado de la siguiente manera:

```
to-do-app
├── backend
│   ├── app
│   │   ├── main.py          # Punto de entrada de la aplicación backend
│   │   ├── models.py        # Modelos de datos para las tareas
│   │   ├── routes.py        # Rutas de la API para manejar las tareas
│   │   └── schemas.py       # Esquemas de Pydantic para validación de datos
│   ├── requirements.txt      # Dependencias del backend
│   └── README.md            # Documentación del backend
├── frontend
│   ├── public
│   │   └── index.html       # Plantilla HTML principal
│   ├── src
│   │   ├── App.jsx          # Componente principal de la aplicación React
│   │   ├── components
│   │   │   └── TodoList.jsx # Componente para mostrar la lista de tareas
│   │   └── index.js         # Punto de entrada de la aplicación React
│   ├── package.json         # Configuración de npm para el frontend
│   └── README.md            # Documentación del frontend
└── README.md                # Documentación general del proyecto
```

## Requisitos

Para ejecutar este proyecto, necesitarás tener instalados los siguientes programas:

- Python 3.x
- Node.js y npm

## Instalación

### Backend

1. Navega al directorio del backend:
   ```
   cd backend
   ```

2. Instala las dependencias:
   ```
   pip install -r requirements.txt
   ```

3. Ejecuta el servidor backend:
   ```
   uvicorn app.main:app --reload
   ```

### Frontend

1. Navega al directorio del frontend:
   ```
   cd frontend
   ```

2. Instala las dependencias:
   ```
   npm install
   ```

3. Ejecuta la aplicación frontend:
   ```
   npm start
   ```

## Uso

Una vez que ambos servidores estén en funcionamiento, podrás acceder a la aplicación en tu navegador en `http://localhost:3000` para el frontend y `http://localhost:8000` para el backend.

## Contribuciones

Las contribuciones son bienvenidas. Si deseas mejorar este proyecto, siéntete libre de abrir un issue o enviar un pull request.