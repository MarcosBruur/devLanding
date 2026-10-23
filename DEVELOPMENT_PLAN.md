# Plan de desarrollo — catálogo MBU

## Resumen ejecutivo y alcance

Landing responsive para explorar inicialmente dos productos, comparar dos versiones y continuar a una pantalla de resumen. No se implementan compras, formularios, pagos, cuentas, licencias ni suscripciones. Los productos y recursos visuales son ejemplos; no se inventan datos comerciales.

## Arquitectura y carpetas

Django sirve la plantilla `backend/templates/index.html`, las rutas `/` y `/contratar/:producto/:plan` y el build de Vite en `backend/static/frontend/build/`. React y TypeScript representan la interfaz; no se necesita un router ni una API ni base de datos en el MVP. `frontend/src/data/products.ts` define el catálogo; `frontend/src/types/` contiene sus contratos; `frontend/src/components/` contiene tarjetas, medios, selección y footer; `frontend/src/views/` contiene landing y siguiente paso. `backend/static/frontend/previews/` contiene los recursos de los productos, que sobreviven a cada compilación. Tailwind CSS y las variables de `frontend/src/app.css` resuelven los estilos. `frontend/src/api/` queda reservado para una etapa que realmente precise una API. MySQL se configura solo si se define `DB_NAME`.

## UX y componentes

La landing incluye presentación breve sin header, enlace al catálogo, tarjetas con gran superficie visual y footer amplio negro mate. Cada `ProductCard` posee su propio estado de selección; `ProductMedia` presenta imagen y vídeo opcional; `PlanSelector` usa controles de radio agrupados; la acción «Continuar» solo se activa con un plan elegido. `NextStepView` resuelve los IDs desde la URL, muestra el resumen o un enlace inválido y permite regresar. Los medios se ajustan sin recorte; en móvil el contenido se apila y el vídeo por hover no es necesario para comprender el producto. El foco visible y la preferencia por movimiento reducido se respetan.

## Modelo de datos

Cada producto tiene ID estable, nombre, descripción, imagen y vídeo opcionales y lista de planes. Cada plan tiene ID, nombre, descripción, precio (`null` mientras no esté definido), funcionalidades y restricciones. Un importe cero indica gratuidad solo cuando se configura de forma explícita. Añadir un producto consiste en agregar su entrada y sus recursos, sin copiar componentes.

## Fases, aceptación y pruebas

1. **Base técnica** (sin dependencias previas): crear Django, Vite/React/TS, Tailwind y ejemplos de entorno; servir plantilla y build desde Django. Aceptación: `manage.py check`, build y `/` funcionales.
2. **Catálogo y diseño** (depende de 1): definir datos locales, variables visuales, presentación, footer y medios opcionales. Aceptación: dos tarjetas responsive con recursos de ejemplo, aun sin datos comerciales.
3. **Comparación y selección** (depende de 2): implementar radios por producto, estados destacados, listas opcionales y acción habilitada con plan válido. Aceptación: elegir en una tarjeta no altera otra; usar teclado y foco visible; precio ausente nunca figura como gratis.
4. **Siguiente paso** (depende de 3): servir `/contratar/:producto/:plan` y resolver IDs en la vista de resumen. Aceptación: acceso directo y recarga conservan los IDs; enlaces desconocidos muestran regreso; no se recogen datos.
5. **Calidad y preparación** (depende de 4): comprobar tipado, build, rutas Django, estáticos, navegación móvil, teclado, contraste, carga de imágenes y metadatos. Aceptación: verificaciones automatizadas exitosas y revisión manual del flujo completo. Comprobar el HTML que reciben rastreadores antes de publicar contenido definitivo; si la indexación del catálogo exige HTML renderizado en servidor, evaluar ese cambio después de medirlo.

## Riesgos y decisiones pendientes

**Necesario antes de publicar:** nombres, descripciones, funcionalidades, restricciones, precios, moneda, duración de prueba si aplica, capturas/vídeos reales y texto corporativo aprobado. Los actuales son ilustrativos. **Posponible:** activar MySQL y ampliar metadatos de producto según necesidad real de SEO. **Opcional:** incorporar contenido multimedia real y medir métricas de experiencia en dispositivos representativos. **Fuera del MVP:** formularios comerciales, autenticación, pagos, licencias, suscripciones y panel de clientes.

## Checklist por dependencias

- [x] Confirmar React y leer `AGENTS.md`.
- [x] Crear entorno Django/Vite sin base de datos obligatoria.
- [x] Definir catálogo local y dos productos de ejemplo.
- [x] Crear landing, tarjetas, medios y footer responsive.
- [x] Implementar comparación y selección exclusiva por producto.
- [x] Conservar producto y plan en la URL y mostrar resumen.
- [x] Añadir scripts de comprobación y documentación de arranque.
- [ ] Revisar manualmente en navegadores móviles y de escritorio antes de publicar.
- [ ] Sustituir y aprobar contenido comercial y recursos visuales definitivos.
- [ ] Verificar indexación del contenido definitivo y configurar despliegue y estáticos de producción.
