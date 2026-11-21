import { useCallback, useEffect, useMemo, useState, type ReactNode } from 'react'
import { readStorage, STORAGE_KEYS, writeStorage } from '../lib/storage'
import type { Theme } from '../types'
import { ThemeContext } from './theme-context'

/** Dark is the default; the saved preference wins (also applied pre-paint in index.html). */
function getInitialTheme(): Theme {
  return readStorage(STORAGE_KEYS.theme) === 'light' ? 'light' : 'dark'
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>(getInitialTheme)

  useEffect(() => {
    const root = document.documentElement
    root.classList.toggle('dark', theme === 'dark')
    document
      .querySelectorAll<HTMLMetaElement>('meta[name="theme-color"]')
      .forEach((meta) => (meta.content = theme === 'dark' ? '#0A0A0B' : '#FAFAFA'))
    writeStorage(STORAGE_KEYS.theme, theme)
  }, [theme])

  const toggleTheme = useCallback(() => setTheme((t) => (t === 'dark' ? 'light' : 'dark')), [])

  const value = useMemo(() => ({ theme, toggleTheme }), [theme, toggleTheme])

  return <ThemeContext value={value}>{children}</ThemeContext>
}
