import { useState } from "react";
import type { FormEvent } from "react";

const CONTACT_API_URL = import.meta.env.PROD
  ? "/contact.php"
  : (import.meta.env.VITE_CONTACT_API_URL ?? "/api/contact");

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [feedback, setFeedback] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;

    const formData = new FormData(form);
    const nombre = String(formData.get("nombre") ?? "").trim();
    const email = String(formData.get("email") ?? "").trim();
    const mensaje = String(formData.get("mensaje") ?? "").trim();

    if (!nombre || !email || !mensaje) {
      setFeedback({
        type: "error",
        message: "Completa todos los campos antes de enviar.",
      });
      return;
    }

    setIsSubmitting(true);
    setFeedback(null);

    try {
      const response = await fetch(CONTACT_API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: nombre,
          email,
          message: mensaje,
        }),
      });

      const result = (await response.json().catch(() => ({}))) as {
        ok?: boolean;
        error?: string;
      };

      if (!response.ok || !result.ok) {
        const fallbackMessage =
          response.status === 404
            ? "No se encontro el endpoint de contacto. Si estas en local, usa un endpoint activo con VITE_CONTACT_API_URL."
            : `Error ${response.status} al enviar el mensaje.`;
        throw new Error(result.error ?? fallbackMessage);
      }

      setFeedback({
        type: "success",
        message: "Mensaje enviado correctamente. Te respondere a la brevedad.",
      });
      form.reset();
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "No se pudo enviar el mensaje.";

      setFeedback({
        type: "error",
        message: errorMessage,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl border border-black/10 bg-white p-5 shadow-sm sm:p-6"
    >
      <div className="mb-4">
        <label htmlFor="nombre" className="mb-1 block text-sm font-medium">
          Nombre
        </label>
        <input
          id="nombre"
          name="nombre"
          type="text"
          required
          className="w-full rounded-md border border-black/20 bg-white px-3 py-2 text-sm outline-none ring-highlight transition focus:ring-2"
          placeholder="Tu nombre"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="email" className="mb-1 block text-sm font-medium">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          className="w-full rounded-md border border-black/20 bg-white px-3 py-2 text-sm outline-none ring-highlight transition focus:ring-2"
          placeholder="tu@email.com"
        />
      </div>
      <div className="mb-5">
        <label htmlFor="mensaje" className="mb-1 block text-sm font-medium">
          Mensaje
        </label>
        <textarea
          id="mensaje"
          name="mensaje"
          rows={4}
          required
          className="w-full rounded-md border border-black/20 bg-white px-3 py-2 text-sm outline-none ring-highlight transition focus:ring-2"
          placeholder="Contame brevemente tu necesidad"
        />
      </div>
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full rounded-lg bg-primary px-4 py-3 font-semibold text-white transition hover:bg-secondary"
      >
        {isSubmitting ? "Enviando..." : "Enviar consulta"}
      </button>
      {feedback && (
        <p
          role="status"
          aria-live="polite"
          className={`mt-3 text-sm ${
            feedback.type === "success" ? "text-green-700" : "text-red-700"
          }`}
        >
          {feedback.message}
        </p>
      )}
    </form>
  );
}
