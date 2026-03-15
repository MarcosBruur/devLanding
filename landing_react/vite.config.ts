import { defineConfig, loadEnv, type Plugin } from "vite";
import react from "@vitejs/plugin-react-swc";
import tailwindcss from "@tailwindcss/vite";
import { resolve } from "node:path";
import { Resend } from "resend";

type ContactPayload = {
  name?: string;
  email?: string;
  message?: string;
};

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function sendJson(res: any, status: number, payload: Record<string, unknown>) {
  res.statusCode = status;
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.end(JSON.stringify(payload));
}

function parseBody(req: any): Promise<ContactPayload> {
  return new Promise((resolveBody, rejectBody) => {
    let raw = "";
    req.on("data", (chunk: Buffer) => {
      raw += chunk.toString("utf8");
    });
    req.on("end", () => {
      try {
        resolveBody((raw ? JSON.parse(raw) : {}) as ContactPayload);
      } catch {
        rejectBody(new Error("JSON invalido."));
      }
    });
    req.on("error", rejectBody);
  });
}

function devContactApiPlugin(env: Record<string, string>): Plugin {
  return {
    name: "dev-contact-api",
    configureServer(server) {
      server.middlewares.use("/api/contact", async (req, res) => {
        if (req.method !== "POST") {
          sendJson(res, 405, { ok: false, error: "Metodo no permitido." });
          return;
        }

        const apiKey = env.RESEND_API_KEY ?? process.env.RESEND_API_KEY ?? "";
        const fromEmail =
          env.RESEND_FROM_EMAIL ?? process.env.RESEND_FROM_EMAIL ?? "";
        const toEmail = env.RESEND_TO_EMAIL ?? process.env.RESEND_TO_EMAIL ?? "";

        if (!apiKey || !fromEmail || !toEmail) {
          sendJson(res, 500, {
            ok: false,
            error:
              "Configuracion incompleta. Define RESEND_API_KEY, RESEND_FROM_EMAIL y RESEND_TO_EMAIL.",
          });
          return;
        }

        try {
          const payload = await parseBody(req);
          const name = String(payload.name ?? "").trim();
          const email = String(payload.email ?? "").trim();
          const message = String(payload.message ?? "").trim();

          if (!name || !email || !message) {
            sendJson(res, 400, { ok: false, error: "Faltan campos obligatorios." });
            return;
          }

          if (!isValidEmail(email)) {
            sendJson(res, 400, { ok: false, error: "Email invalido." });
            return;
          }

          const resend = new Resend(apiKey);
          const { error } = await resend.emails.send({
            from: fromEmail,
            to: [toEmail],
            replyTo: email,
            subject: `Nuevo contacto desde landing - ${name}`,
            text: `Nuevo mensaje desde el formulario de contacto:

Nombre del remitente: ${name}
Email del remitente: ${email}

Mensaje:
${message}
`,
          });

          if (error) {
            sendJson(res, 500, {
              ok: false,
              error: error.message ?? "No se pudo enviar el email con Resend.",
            });
            return;
          }

          sendJson(res, 200, { ok: true });
        } catch (error) {
          const message =
            error instanceof Error ? error.message : "Error interno al enviar el email.";
          sendJson(res, 500, { ok: false, error: message });
        }
      });
    },
  };
}

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const projectEnv = loadEnv(mode, process.cwd(), "");
  const parentEnv = loadEnv(mode, resolve(process.cwd(), ".."), "");
  const mergedEnv = { ...parentEnv, ...projectEnv };

  return {
    plugins: [react(), tailwindcss(), devContactApiPlugin(mergedEnv)],
  };
});
