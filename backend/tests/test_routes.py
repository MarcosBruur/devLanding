from django.test import override_settings
from django.test import SimpleTestCase


class LandingRoutesTests(SimpleTestCase):
    def test_landing_and_next_step_are_served_by_django(self):
        for url in ("/", "/contratar/1/regular", "/contratar/2/enterprise"):
            with self.subTest(url=url):
                response = self.client.get(url)
                self.assertEqual(response.status_code, 200)
                self.assertContains(response, 'id="root"')
                self.assertContains(response, "frontend/build/assets/app.js")

    @override_settings(DEBUG=True)
    def test_dev_reload_is_available_only_in_development(self):
        self.assertContains(self.client.get("/"), "/__dev__/build-version/")
        response = self.client.get("/__dev__/build-version/")
        self.assertEqual(response.status_code, 200)
        self.assertTrue(response.json()["version"])
        self.assertEqual(response["Cache-Control"], "no-store")

        with override_settings(DEBUG=False):
            self.assertNotContains(self.client.get("/"), "/__dev__/build-version/")
            self.assertEqual(self.client.get("/__dev__/build-version/").status_code, 404)
