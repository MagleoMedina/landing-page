import { useContext } from 'react'
import { LangContext } from './lang-context'

export function useLang() {
  const context = useContext(LangContext)
  if (!context) throw new Error('useLang debe usarse dentro de LangProvider')
  return context
}