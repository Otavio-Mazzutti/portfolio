import { useCallback, useEffect, useMemo, useState, type ReactNode } from 'react'
import { dictionaries, htmlLang } from '../locales'
import { readStorage, STORAGE_KEYS, writeStorage } from '../lib/storage'
import type { Locale, LocalizedString } from '../types'
import { LanguageContext } from './language-context'

function getInitialLocale(): Locale {
  const saved = readStorage(STORAGE_KEYS.locale)
  if (saved === 'pt' || saved === 'en') return saved
  return navigator.language?.toLowerCase().startsWith('pt') ? 'pt' : 'en'
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState<Locale>(getInitialLocale)
  const t = dictionaries[locale]

  useEffect(() => {
    document.documentElement.lang = htmlLang[locale]
    document.title = t.meta.title
    document.querySelector<HTMLMetaElement>('meta[name="description"]')?.setAttribute('content', t.meta.description)
    writeStorage(STORAGE_KEYS.locale, locale)
  }, [locale, t])

  const toggleLocale = useCallback(() => setLocale((l) => (l === 'pt' ? 'en' : 'pt')), [])
  const l = useCallback((value: LocalizedString) => value[locale], [locale])

  const value = useMemo(() => ({ locale, t, l, toggleLocale }), [locale, t, l, toggleLocale])

  return <LanguageContext value={value}>{children}</LanguageContext>
}
