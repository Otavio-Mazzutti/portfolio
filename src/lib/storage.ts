/** localStorage helpers that never throw (private mode, disabled storage, SSR). */
export function readStorage(key: string): string | null {
  try {
    return window.localStorage.getItem(key)
  } catch {
    return null
  }
}

export function writeStorage(key: string, value: string): void {
  try {
    window.localStorage.setItem(key, value)
  } catch {
    // Storage unavailable — preference simply won't persist.
  }
}

export const STORAGE_KEYS = {
  theme: 'om:theme',
  locale: 'om:locale',
  github: 'om:github:v1',
} as const
