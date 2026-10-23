import { WHATSAPP_URL } from '../api/contact'

export function WhatsAppButton() {
  return (
    <a
      className="whatsapp-button"
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Consultar por WhatsApp (abre una nueva pestaña)"
      title="Consultar por WhatsApp"
    >
      <svg viewBox="0 0 32 32" width="30" height="30" fill="none" aria-hidden="true" focusable="false">
        <path d="M16 3.5a12.5 12.5 0 0 0-10.7 19L3.5 28.5l6.2-1.8A12.5 12.5 0 1 0 16 3.5Z" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round" />
        <path d="M11.2 10.2c-.8.5-1.2 1.3-1.2 2.4 0 3.5 5.9 9.4 9.4 9.4 1.1 0 1.9-.4 2.4-1.2l.7-1.3-4.1-2.4-1.7 1.7a11 11 0 0 1-3.5-3.5l1.7-1.7-2.4-4.1-1.3.7Z" fill="currentColor" />
      </svg>
    </a>
  )
}
