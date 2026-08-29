import { useCallback, useEffect, useState } from 'react'
import type { ProjectCategory } from './data/portfolio'
import { fetchProjects } from './components/ProjectsService'

export type ProjectsStatus = 'loading' | 'ready' | 'error'

interface UseProjectsResult {
  categories: ProjectCategory[]
  status: ProjectsStatus
  retry: () => void
}

interface ProjectResult {
  attempt: number
  categories: ProjectCategory[]
}

export function useProjects(): UseProjectsResult {
  const [attempt, setAttempt] = useState(0)
  const [result, setResult] = useState<ProjectResult | null>(null)
  const [failedAttempt, setFailedAttempt] = useState<number | null>(null)

  useEffect(() => {
    const controller = new AbortController()
    let cancelled = false

    fetchProjects(controller.signal)
      .then((data) => {
        if (cancelled) return
        setResult({ attempt, categories: data })
        setFailedAttempt(null)
      })
      .catch(() => {
        if (cancelled) return
        setFailedAttempt(attempt)
      })

    return () => {
      cancelled = true
      controller.abort()
    }
  }, [attempt])

  const status: ProjectsStatus =
    result && result.attempt === attempt
      ? 'ready'
      : failedAttempt === attempt
        ? 'error'
        : 'loading'

  const categories = status === 'ready' && result ? result.categories : []

  const retry = useCallback(() => setAttempt((value) => value + 1), [])

  return { categories, status, retry }
}