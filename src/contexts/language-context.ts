import { createContext } from 'react'
import type { Dictionary } from '../locales'
import type { Locale, LocalizedString } from '../types'

export interface LanguageContextValue {
  locale: Locale
  t: Dictionary
  /** Picks the current-locale value from a localized data field. */
  l: (value: LocalizedString) => string
  toggleLocale: () => void
}

export const LanguageContext = createContext<LanguageContextValue | null>(null)
