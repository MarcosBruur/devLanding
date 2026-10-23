export const WHATSAPP_URL = 'https://wa.me/543865452354'

export async function sendContact(email: string, message: string): Promise<string> {
  const csrfToken = document.cookie.split('; ').find((cookie) => cookie.startsWith('csrftoken='))?.split('=')[1]
  const response = await fetch('/api/contacto/', {
    method: 'POST',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
      'X-CSRFToken': csrfToken ? decodeURIComponent(csrfToken) : '',
    },
    body: JSON.stringify({ email, message }),
  })
  const result: { message?: string; error?: string } = await response.json().catch(() => ({}))
  if (!response.ok) throw new Error(result.error ?? 'No pudimos enviar tu mensaje. Intentá nuevamente.')
  return result.message ?? 'Tu mensaje se envió correctamente.'
}
