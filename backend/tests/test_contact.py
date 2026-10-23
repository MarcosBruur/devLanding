import json
from unittest.mock import patch

from django.core import mail
from django.test import Client, SimpleTestCase, override_settings


class ContactEmailTests(SimpleTestCase):
    def setUp(self):
        self.client = Client(enforce_csrf_checks=True)
        self.client.get("/")
        self.token = self.client.cookies["csrftoken"].value

    def post_message(self, payload, *, csrf=True):
        headers = {"HTTP_X_CSRFTOKEN": self.token} if csrf else {}
        return self.client.post(
            "/api/contacto/",
            data=json.dumps(payload),
            content_type="application/json",
            **headers,
        )

    @override_settings(
        EMAIL_BACKEND="django.core.mail.backends.locmem.EmailBackend",
        EMAIL_HOST="smtp.example.com",
        DEFAULT_FROM_EMAIL="sitio@example.com",
        CONTACT_EMAIL_TO="marcosbruur@gmail.com",
    )
    def test_sends_message_with_reply_to(self):
        response = self.post_message({"email": "persona@example.com", "message": "Quiero conversar sobre una idea."})
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(mail.outbox), 1)
        sent = mail.outbox[0]
        self.assertEqual(sent.to, ["marcosbruur@gmail.com"])
        self.assertEqual(sent.from_email, "sitio@example.com")
        self.assertEqual(sent.reply_to, ["persona@example.com"])
        self.assertIn("Quiero conversar sobre una idea.", sent.body)

    @override_settings(EMAIL_HOST="smtp.example.com", DEFAULT_FROM_EMAIL="sitio@example.com")
    def test_rejects_invalid_input_and_missing_csrf(self):
        self.assertEqual(self.post_message({"email": "no-es-email", "message": "Hola"}).status_code, 400)
        self.assertEqual(self.post_message({"email": "persona@example.com", "message": "   "}).status_code, 400)
        self.assertEqual(self.post_message({"email": "persona@example.com", "message": "Hola"}, csrf=False).status_code, 403)
        self.assertEqual(self.client.get("/api/contacto/").status_code, 405)

    @override_settings(EMAIL_HOST="", DEFAULT_FROM_EMAIL="")
    def test_unconfigured_email_reports_unavailable(self):
        response = self.post_message({"email": "persona@example.com", "message": "Hola"})
        self.assertEqual(response.status_code, 503)

    @override_settings(EMAIL_HOST="smtp.example.com", DEFAULT_FROM_EMAIL="sitio@example.com")
    @patch("backend.email.EmailMessage.send", side_effect=OSError("SMTP disconnected"))
    def test_smtp_failure_reports_error(self, _send):
        with self.assertLogs("backend.email", level="ERROR"):
            response = self.post_message({"email": "persona@example.com", "message": "Hola"})
        self.assertEqual(response.status_code, 503)
        self.assertNotIn("SMTP disconnected", response.content.decode())
