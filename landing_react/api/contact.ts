import { Resend } from "resend";

type ContactPayload = {
  name?: string;
  email?: string;
  message?: string;
};

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export default async function handler(req: any, res: any): Promise<void> {
  if (req.method !== "POST") {
    res.status(405).json({ ok: false, error: "Metodo no permitido." });
    return;
  }

  const apiKey = process.env.RESEND_API_KEY ?? "";
  const fromEmail = process.env.RESEND_FROM_EMAIL ?? "";
  const toEmail = process.env.RESEND_TO_EMAIL ?? "";

  if (!apiKey || !fromEmail || !toEmail) {
    res.status(500).json({
      ok: false,
      error:
        "Configuracion incompleta. Define RESEND_API_KEY, RESEND_FROM_EMAIL y RESEND_TO_EMAIL.",
    });
    return;
  }

  let payload: ContactPayload;
  try {
    payload =
      typeof req.body === "string"
        ? (JSON.parse(req.body) as ContactPayload)
        : ((req.body ?? {}) as ContactPayload);
  } catch {
    res.status(400).json({ ok: false, error: "JSON invalido." });
    return;
  }

  const name = String(payload.name ?? "").trim();
  const email = String(payload.email ?? "").trim();
  const message = String(payload.message ?? "").trim();

  if (!name || !email || !message) {
    res.status(400).json({ ok: false, error: "Faltan campos obligatorios." });
    return;
  }

  if (!isValidEmail(email)) {
    res.status(400).json({ ok: false, error: "Email invalido." });
    return;
  }

  try {
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
      res.status(500).json({
        ok: false,
        error: error.message ?? "No se pudo enviar el email con Resend.",
      });
      return;
    }

    res.status(200).json({ ok: true });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Error interno al enviar el email.";
    res.status(500).json({ ok: false, error: message });
  }
}
