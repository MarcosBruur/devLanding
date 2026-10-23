# Servicio Gunicorn en Debian 12

`mbu.service.example` es una plantilla para instalar en `/etc/systemd/system/mbu.service`.
Está configurada para ejecutarse con `User=root` y `Group=root`. Antes de instalarla,
ajusta `WorkingDirectory` y la ruta de `ExecStart` a la ubicación real del proyecto
y del entorno virtual en EC2.
Gunicorn escucha únicamente en `127.0.0.1:8001`; ajusta el puerto si ya está
ocupado. La aplicación WSGI es `backend.wsgi:application` y carga la configuración
desde `backend/.env` a través de `backend/backend/settings.py`.

Tras instalar las dependencias de `requirements.txt` en el entorno virtual y
copiar la unidad ajustada:

```bash
sudo systemctl daemon-reload
sudo systemctl enable --now mbu.service
sudo systemctl status mbu.service
```

Después de actualizar el código, reinicia con `sudo systemctl restart mbu.service`.
Para consultar los errores, usa `sudo journalctl -u mbu.service -n 100 --no-pager`.
