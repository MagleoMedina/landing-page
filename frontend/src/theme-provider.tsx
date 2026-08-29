import { useEffect, useState, type ReactNode } from 'react'
import { ThemeContext, type Theme } from './theme-context'

function getInitialTheme(): Theme {
  const value = document.documentElement.dataset.theme
  return value === 'light' || value === 'dark' ? value : 'light'
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>(getInitialTheme)

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    try {
      localStorage.setItem('theme', theme)
    } catch {
      // localStorage no disponible: el tema forzado vale solo para la sesión
    }
  }, [theme])

  const applyTheme = (next: Theme) => {
    document.documentElement.dataset.theme = next
    setTheme(next)
  }

  const toggleTheme = () => {
    const next = theme === 'dark' ? 'light' : 'dark'
    if (typeof document.startViewTransition === 'function') {
      document.startViewTransition(() => applyTheme(next))
    } else {
      applyTheme(next)
    }
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>
  )
}