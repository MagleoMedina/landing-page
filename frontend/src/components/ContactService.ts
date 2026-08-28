export interface ContactPayload {
  name: string
  email: string
  message: string
}

const API_URL: string = import.meta.env.VITE_CONTACT_API_URL || '/api/contact'

export async function sendMessage(payload: ContactPayload): Promise<void> {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })
  if (!response.ok) {
    throw new Error(`El servicio respondió con el estado ${response.status}`)
  }
}