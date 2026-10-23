import { useState, type FormEvent } from "react";
import { sendContact, WHATSAPP_URL } from "../api/contact";
import { ScrollReveal } from "./ScrollReveal";

export function ContactSection() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);
  const [feedback, setFeedback] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (sending) return;
    setFeedback(null);
    setSending(true);
    try {
      const confirmation = await sendContact(email.trim(), message.trim());
      setFeedback({ type: "success", text: confirmation });
      setEmail("");
      setMessage("");
    } catch (error) {
      setFeedback({
        type: "error",
        text:
          error instanceof Error && error.message !== "Failed to fetch"
            ? error.message
            : "No pudimos enviar tu mensaje. Intentá nuevamente.",
      });
    } finally {
      setSending(false);
    }
  }

  return (
    <section
      className="contact-section"
      id="contacto"
      aria-labelledby="contact-title"
    >
      <div className="contact-inner">
        <ScrollReveal className="contact-intro">
          <h2 id="contact-title">
            Construyamos
            <br />
            <em>Algo Juntos</em>
          </h2>
          <p>
            Contanos qué tenés en mente. Dejanos un mensaje para que y
            conversemos.
          </p>
          <span className="contact-decor" aria-hidden="true">
            ↗
          </span>
        </ScrollReveal>
        <ScrollReveal className="contact-form-reveal" delay={120}>
          <div className="contact-panel">
            <p className="contact-panel-heading">
              DEJANOS UN MENSAJE <span aria-hidden="true">01 / 02</span>
            </p>
            <form onSubmit={handleSubmit} className="contact-form">
              <label htmlFor="contact-email">Email</label>
              <input
                id="contact-email"
                name="email"
                type="email"
                autoComplete="email"
                placeholder="tu@email.com"
                required
                maxLength={254}
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                disabled={sending}
              />
              <label htmlFor="contact-message">Mensaje</label>
              <textarea
                id="contact-message"
                name="message"
                placeholder="Contanos sobre tu idea..."
                required
                maxLength={5000}
                rows={6}
                value={message}
                onChange={(event) => setMessage(event.target.value)}
                disabled={sending}
              />
              <button
                className="contact-submit"
                type="submit"
                disabled={sending}
              >
                {sending ? "Enviando..." : "Enviar mensaje"}{" "}
                <span aria-hidden="true">↗</span>
              </button>
              {feedback && (
                <p
                  className={`contact-feedback contact-feedback--${feedback.type}`}
                  role={feedback.type === "error" ? "alert" : "status"}
                >
                  {feedback.text}
                </p>
              )}
            </form>
            <div className="contact-alternative">
              <span>O SI PREFERÍS</span>
              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
                Escribenos por Whatsapp <span aria-hidden="true">↗</span>
              </a>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
