import json
import logging

from django import forms
from django.conf import settings
from django.core.mail import EmailMessage
from django.http import JsonResponse
from django.views.decorators.http import require_POST

logger = logging.getLogger(__name__)


class ContactForm(forms.Form):
    email = forms.EmailField(max_length=254)
    message = forms.CharField(max_length=5000, strip=True)


@require_POST
def send_contact_email(request):
    if len(request.body) > 10000:
        return JsonResponse({"error": "El mensaje es demasiado largo."}, status=400)

    try:
        payload = json.loads(request.body)
    except (ValueError, UnicodeDecodeError):
        return JsonResponse({"error": "No se pudo leer el mensaje."}, status=400)

    if not isinstance(payload, dict):
        return JsonResponse({"error": "Los datos enviados no son válidos."}, status=400)

    form = ContactForm(payload)
    if not form.is_valid():
        return JsonResponse({"error": "Ingresá un email válido y un mensaje de hasta 5000 caracteres."}, status=400)

    if not settings.EMAIL_HOST or not settings.DEFAULT_FROM_EMAIL or not settings.CONTACT_EMAIL_TO:
        return JsonResponse({"error": "El correo de contacto no está disponible en este momento."}, status=503)

    email = form.cleaned_data["email"]
    message = form.cleaned_data["message"]
    try:
        EmailMessage(
            subject="Nuevo mensaje desde el sitio web",
            body=f"Email de contacto: {email}\n\nMensaje:\n{message}",
            from_email=settings.DEFAULT_FROM_EMAIL,
            to=[settings.CONTACT_EMAIL_TO],
            reply_to=[email],
        ).send(fail_silently=False)
    except Exception:
        logger.exception("No se pudo enviar el correo de contacto")
        return JsonResponse({"error": "No pudimos enviar tu mensaje. Intentá nuevamente más tarde."}, status=503)

    return JsonResponse({"message": "Tu mensaje se envió correctamente."})
