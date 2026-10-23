# MBU — catálogo de software

Landing con productos y versiones seleccionables. React, TypeScript, Vite y Tailwind CSS generan los recursos que **Django sirve** junto con las rutas `/` y `/contratar/:producto/:plan`. No se usa base de datos; el formulario de contacto envía email y mensaje por correo sin almacenarlos.

## Requisitos

Python 3.13+ y Node.js 20.19+ (o 22.12+). Comandos para PowerShell en Windows.

## Instalación

Desde la raíz:

```powershell
python -m venv venv
.\venv\Scripts\python.exe -m pip install -r requirements.txt
```

Desde `frontend/`:

```powershell
npm install
npm run build
npm run dev
```

`npm run dev` observa los cambios del frontend y arranca Django en http://127.0.0.1:8000/. En desarrollo, la página se recarga automáticamente cuando termina la compilación de Vite; no se usa el servidor web de Vite. No ejecutes otra instancia de `runserver` en el puerto 8000 al mismo tiempo. Para arrancar únicamente Django tras compilar, ejecutá `..\venv\Scripts\python.exe manage.py runserver` desde `backend/`.

## Contenido y configuración

- Editá `frontend/src/data/products.ts` para añadir productos y planes. La selección se hace de manera independiente por producto y los IDs se preservan en la URL. El precio `null` significa «a definir»; para indicar gratuidad configurá explícitamente importe `0` y moneda.
- Colocá tus imágenes y vídeos en `backend/static/frontend/previews/` y configurá `img` y, si corresponde, `video` en `frontend/src/data/products.ts` con rutas como `/static/frontend/previews/tpv.png` y `/static/frontend/previews/tpv.mp4`. Reemplazá o eliminá allí los SVG de ejemplo cuando tengas recursos definitivos. Es recomendable una proporción 3:2; las imágenes se muestran enteras, sin recorte. En pantalla táctil o con movimiento reducido permanece la imagen. Vite solo limpia `backend/static/frontend/build/` al compilar, de modo que los archivos de `previews/` se conservan; Django los sirve desde `/static/frontend/previews/`.
- Los colores y transparencias están en `frontend/src/app.css`, bajo `:root`. Cada producto tiene planes Regular y Enterprise; sus características incluidas (`features`) y no incluidas (`restrictions`) se muestran como checks y cruces. Por ahora no hay características definidas: completá ambas listas en `frontend/src/data/products.ts` con información confirmada. Los precios también están pendientes de definición.
- `backend/.env.example` documenta las variables de Django, SMTP y la configuración opcional de MySQL. Si asignás `DB_NAME`, necesitás servidor MySQL y `mysqlclient`. Para esta etapa no hace falta configurar base de datos. `frontend/.env.example` indica que no hay variables frontend requeridas.

### Envío del formulario de contacto

Copiá `backend/.env.example` a `backend/.env` y completá `EMAIL_HOST`, `EMAIL_PORT`, `EMAIL_HOST_USER`, `EMAIL_HOST_PASSWORD` y `DEFAULT_FROM_EMAIL` con los datos de tu proveedor SMTP. `CONTACT_EMAIL_TO` ya apunta a `marcosbruur@gmail.com`. El remitente debe ser una dirección autorizada por tu proveedor; el email ingresado en el formulario se usa como `Reply-To`. Para Gmail, el host es `smtp.gmail.com`, el puerto `587`, `EMAIL_USE_TLS=True` y la contraseña debe ser una contraseña de aplicación. El endpoint `/api/contacto/` requiere el token CSRF de la página servida por Django; si faltan los datos SMTP, devuelve un mensaje de indisponibilidad sin intentar enviar el correo. No guardes contraseñas en el repositorio.

## Verificación y despliegue

Desde `frontend/`, ejecutá `npm run typecheck` y `npm run build`. Desde la raíz, ejecutá `.\venv\Scripts\python.exe backend\manage.py check` y `.\venv\Scripts\python.exe backend\manage.py test tests`. Verificá manualmente selección, teclado, móvil, recarga de `/contratar/1/regular` y enlaces inválidos.

Para un despliegue, definí `DJANGO_SECRET_KEY`, `DJANGO_DEBUG=False` y `DJANGO_ALLOWED_HOSTS`; ejecutá `collectstatic` y serví `backend/staticfiles/` desde un servidor web apropiado. Django solo sirve recursos estáticos automáticamente en desarrollo. Sustituí los datos de ejemplo y revisá los metadatos antes de publicar.
