import type { ProjectCategory } from '../data/portfolio'

export const PROJECTS_API_URL: string = import.meta.env.VITE_PROJECTS_API_URL || 'http://localhost:8080/api/projects'

export async function fetchProjects(signal?: AbortSignal): Promise<ProjectCategory[]> {
  const response = await fetch(PROJECTS_API_URL, { signal })
  if (!response.ok) {
    throw new Error(`El servicio respondió con el estado ${response.status}`)
  }
  return (await response.json()) as ProjectCategory[]
}