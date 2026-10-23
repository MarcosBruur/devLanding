## Proyecto web de venta de software

### Modelo de productos

- Catálogo inicial de 2 productos, con modificacion y ampliacion.
- Cada producto tiene 2 planes: Regular y Enterprise.
- Cada plan tiene descripción, funcionalidades, restricciones y precio configurable.
- No inventar precios, características ni restricciones.

### Estructura de carpetas principal

venv
frontend/
src/
views/
components/
api/
.env
.env.example

backend/
backend/
media/
imagenes/
videos/
static/
asetts/
templates/
.env
.env.example

### Interfaz

- Mostrar imagen de los productos para que el usuario seleccione
- Al pasar el mouse por imagen reproducir video del producto
- Una card reutilizable por producto.
- Nombre, descripción e imagen opcional.
- Selector visual de planes.
- Destacar el plan seleccionado.
- Botón "Continuar".
- Diseño responsive y accesible.

### Interacción

- Solo un plan seleccionado por producto.
- Conservar productId y planId al continuar.
- Ruta futura: /contratar/:producto/:plan.
- Por ahora mostrar una pantalla de siguiente paso.
- No recopilar datos ni simular compras todavía.

### Futuras etapas (no implementar)

- Formularios de contratación.
- Registro y autenticación.
- Procesamiento de pagos.
- Entrega y activación de licencias.
- Gestión de suscripciones.
- Panel de clientes.

### Tecnologias

- Backend - servidor: Python, Django, entorno virtual venv
- Base de datos: Mysql
- Frontend: Vite, Typescript + React + Tailwindcss

### Reglas

- No utilizar WhatsApp como canal de venta.
- No integrar pagos todavía.
- No requerir base de datos inicialmente.
- Separar UI de lógica de contratación.
- Facilitar nuevos productos y planes.
- Toda la aplicacion es servida por el servidor django no desde el frontend

### Levantar proyecto

- Crear entorno virtual con python -m venv venv en la raiz del proyecto
- Inicializar proyecto vite+typescript en frontend asegurandose de mantener la estructura de carpetas principal definida
- Crear proyecto django backend y asegurarse de mantener la estructura de carpetas principal del definidas
- Instalar dependencias vite npm i
- Instalar tailwindcss postcss y autoprefixer
- levantar entorno virtual python venv/scripts/activate
- Intalar django y pillow en entorno virtual pip install django, pillow
- crear archivo requirements.txt con las dependencias del entorno virtual
- Configurar backend para servir el frontend
- Levantar servidor con backend/ python manage.py runserver
- dejar el archivo .env.example con los nombres de todas las variables de entorno necesarias para configurar base de datos

### Estructura de datos

products = [
{
id: "1",
name: "Producto 1",
description: "descripcion",
img: "/ruta/de/imagen.webp"
plans: [
{
id: "regular",
name: "Plan regular",
price: null,
features: [],
restrictions: []
},
{
id: "enterprise",
name: "Plan Enterprise",
price: null,
features: [],
restrictions: []
}
]
}
]

### Estilo visual del proyecto

- Utilizar una paleta de colores naranja, azul y bordes en un negro mate
- Hacer enfasis en las imagenes de los producto
- Dejar mucho espacio para las imagenes/videos
- Sin header
- Footer grande color negro claro mate y letras blancas
- Agregar sombreados y transparencias
- Bordes redondeados

### Estado actual y puesta en marcha

El catálogo inicial está implementado con dos productos **de ejemplo** y dos planes
por producto. Los precios, las funcionalidades y las restricciones no están definidos: sustituye los datos
de `frontend/src/data/products.ts` y los recursos de `backend/static/frontend/previews/`
por los reales antes de publicar. Para añadir un vídeo, asigna la ruta pública a
`video` en el producto (por ejemplo, `/static/frontend/previews/demo.mp4`) y
coloca el archivo en `backend/static/frontend/previews/`. Vite compila solo en
`backend/static/frontend/build/` y no borra los recursos de `previews/`. Si no hay vídeo, se muestra la
imagen sin controles de reproducción.

La paleta y sus transparencias se editan en `frontend/src/app.css`, dentro de
`:root`. Las tarjetas reservan una zona amplia para la imagen: se recomiendan
capturas de producto en formato 3:2 y resolución de al menos 1500 × 1000 px.
La imagen se ajusta completa sin recortarse y también puede omitirse mientras
se prepara el material definitivo.

Requisitos: Python 3.13+ y Node.js 20.19+ (o 22.12+).

En la **raíz** del proyecto (PowerShell):

```powershell
python -m venv venv
.\venv\Scripts\python.exe -m pip install -r requirements.txt
```

En `frontend/`:

```powershell
npm install
npm run dev
```

Esto compila el frontend, observa los cambios y arranca Django. Abrir
`http://127.0.0.1:8000/`; el navegador se recarga automáticamente tras compilar cambios del frontend.
Detener el proceso con Ctrl+C. Si ya está ejecutándose `manage.py runserver`,
detenlo primero para liberar el puerto 8000.

Para ejecutar solo el servidor, compilar con `npm run build` desde `frontend/`
y después, en `backend/`, ejecutar:

```powershell
..\venv\Scripts\python.exe manage.py runserver
```

Django sirve tanto el catálogo como `/contratar/:producto/:plan` y los archivos
compilados de Vite. `npm run typecheck` comprueba los tipos.
No hace falta ejecutar Vite como servidor web ni configurar MySQL para esta etapa.

Las variables disponibles están documentadas en `backend/.env.example` y
`frontend/.env.example`. La configuración de MySQL es opcional: al asignar `DB_NAME`
en `backend/.env` se activa su configuración; en ese caso hace falta instalar
`mysqlclient` y disponer del servidor MySQL. Las imágenes futuras pueden
organizarse en `backend/media/imagenes/`, los vídeos en `backend/media/videos/`
y los recursos estáticos de Django en `backend/static/assets/`. Los recursos
del catálogo se sirven directamente desde `backend/static/frontend/previews/`.

Para despliegues, definir `DJANGO_SECRET_KEY`, `DJANGO_DEBUG=False`,
`DJANGO_ALLOWED_HOSTS` y servir los estáticos recopilados con
`python manage.py collectstatic` desde el servidor web apropiado. La ruta de
contratación muestra únicamente un resumen, sin recoger datos ni procesar pagos.
