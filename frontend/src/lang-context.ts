import { createContext } from 'react'
import type { Lang, MessageKey } from './i18n/messages'

export interface LangContextValue {
  lang: Lang
  toggleLang: () => void
  t: (key: MessageKey) => string
}

export const LangContext = createContext<LangContextValue | null>(null)