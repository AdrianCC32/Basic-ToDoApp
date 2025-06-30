# To-Do App Backend

Este es el backend de una aplicación de lista de tareas (To-Do List) construida con FastAPI y Python. A continuación se detallan las instrucciones para configurar y ejecutar el backend.

## Estructura del Proyecto

- `app/main.py`: Punto de entrada de la aplicación. Configura FastAPI y define las rutas principales.
- `app/models.py`: Define los modelos de datos para las tareas.
- `app/routes.py`: Contiene las rutas de la API para manejar las tareas.
- `app/schemas.py`: Define los esquemas de Pydantic para la validación de datos.

## Requisitos

Asegúrate de tener Python 3.7 o superior instalado. También necesitarás `pip` para instalar las dependencias.

## Instalación

1. Clona el repositorio:

   ```
   git clone <URL_DEL_REPOSITORIO>
   cd to-do-app/backend
   ```

2. Instala las dependencias:

   ```
   pip install -r requirements.txt
   ```

## Ejecución

Para ejecutar el servidor, utiliza Uvicorn:

```
uvicorn app.main:app --reload
```

Esto iniciará el servidor en `http://127.0.0.1:8000`.

## API

La API proporciona las siguientes rutas:

- `GET /tasks`: Obtiene la lista de tareas.
- `POST /tasks`: Crea una nueva tarea.
- `PUT /tasks/{id}`: Actualiza una tarea existente.
- `DELETE /tasks/{id}`: Elimina una tarea.

## Contribuciones

Las contribuciones son bienvenidas. Si deseas mejorar este proyecto, por favor abre un issue o un pull request.

## Licencia

Este proyecto está bajo la Licencia MIT.