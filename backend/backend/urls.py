from django.conf import settings
from django.utils.decorators import method_decorator
from django.http import Http404, JsonResponse
from django.urls import path
from django.views.decorators.csrf import ensure_csrf_cookie
from django.views.generic import TemplateView

from backend.email import send_contact_email


@method_decorator(ensure_csrf_cookie, name="dispatch")
class FrontendView(TemplateView):
    template_name = "index.html"

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context["dev_reload"] = settings.DEBUG
        return context


def dev_build_version(request):
    if not settings.DEBUG:
        raise Http404
    build_dir = settings.BASE_DIR / "static" / "frontend" / "build" / "assets"
    files = (build_dir / "app.js", build_dir / "app.css", settings.BASE_DIR / "templates" / "index.html")
    try:
        version = ":".join(str(file.stat().st_mtime_ns) for file in files)
    except FileNotFoundError:
        version = None  # Vite may be replacing the files during a build.
    response = JsonResponse({"version": version})
    response["Cache-Control"] = "no-store"
    return response


urlpatterns = [
    path("", FrontendView.as_view(), name="home"),
    path("api/contacto/", send_contact_email, name="contact-email"),
    path(
        "contratar/<str:producto>/<str:plan>",
        FrontendView.as_view(),
        name="next-step",
    ),
    path("__dev__/build-version/", dev_build_version, name="dev-build-version"),
]
