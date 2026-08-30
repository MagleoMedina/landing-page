import type { ProjectCategory } from './data/portfolio'

const API_URL: string = 'http://localhost:8080'
 // import.meta.env.VITE_API_URL || (import.meta.env.DEV ? 'http://localhost:8080' : '')

export interface ContactPayload {
  name: string
  email: string
  message: string
}

export async function fetchProjects(signal?: AbortSignal): Promise<ProjectCategory[]> {
  const response = await fetch(`${API_URL}/api/projects`, { signal })
  if (!response.ok) {
    throw new Error(`El servicio respondió con el estado ${response.status}`)
  }
  return (await response.json()) as ProjectCategory[]
}

export async function sendMessage(payload: ContactPayload): Promise<void> {
  const response = await fetch(`${API_URL}/api/contact`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })
  if (!response.ok) {
    throw new Error(`El servicio respondió con el estado ${response.status}`)
  }
}