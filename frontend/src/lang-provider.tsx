import { useEffect, useState, type ReactNode } from 'react'
import { LangContext } from './lang-context'
import { messages, type Lang } from './i18n/messages'

function getInitialLang(): Lang {
  return document.documentElement.lang === 'en' ? 'en' : 'es'
}

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>(getInitialLang)

  useEffect(() => {
    document.documentElement.lang = lang
    document.title = messages[lang].metaTitle
    try {
      localStorage.setItem('lang', lang)
    } catch {
      // localStorage no disponible: el idioma vale solo para la sesión
    }
  }, [lang])

  const t = (key: keyof (typeof messages)[Lang]) => messages[lang][key]

  const toggleLang = () => {
    setLang((current) => (current === 'es' ? 'en' : 'es'))
  }

  return <LangContext.Provider value={{ lang, toggleLang, t }}>{children}</LangContext.Provider>
}