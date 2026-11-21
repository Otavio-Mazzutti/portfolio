import { useCallback, useEffect, useRef, useState } from 'react'

export type CopyStatus = 'idle' | 'copied' | 'error'

/** Copies text to the clipboard and resets the status after `resetMs`. */
export function useCopyToClipboard(resetMs = 2000) {
  const [status, setStatus] = useState<CopyStatus>('idle')
  const timer = useRef<number | undefined>(undefined)

  useEffect(() => () => window.clearTimeout(timer.current), [])

  const copy = useCallback(
    async (text: string) => {
      try {
        await navigator.clipboard.writeText(text)
        setStatus('copied')
      } catch {
        setStatus('error')
      }
      window.clearTimeout(timer.current)
      timer.current = window.setTimeout(() => setStatus('idle'), resetMs)
    },
    [resetMs],
  )

  return { status, copy }
}
