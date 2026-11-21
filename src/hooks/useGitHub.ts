import { useCallback, useEffect, useRef, useState } from 'react'
import { fetchGitHubData, type GitHubData } from '../lib/github'
import { readStorage, STORAGE_KEYS, writeStorage } from '../lib/storage'

const TTL_MS = 60 * 60 * 1000 // 1 hour

type Status = 'loading' | 'success' | 'error'

interface State {
  status: Status
  data: GitHubData | null
  /** True when data comes from cache (fresh or stale). */
  fromCache: boolean
}

const cacheKey = (username: string) => `${STORAGE_KEYS.github}:${username}`

function readCache(username: string): GitHubData | null {
  const raw = readStorage(cacheKey(username))
  if (!raw) return null
  try {
    const parsed = JSON.parse(raw) as GitHubData
    return parsed?.user && Array.isArray(parsed.repos) ? parsed : null
  } catch {
    return null
  }
}

const isFresh = (data: GitHubData | null) => data !== null && Date.now() - data.fetchedAt < TTL_MS

/**
 * Fetches public GitHub data with a localStorage cache (1h TTL).
 * On failure it falls back to stale cached data when available; otherwise
 * `status` is "error" and callers render static fallback content.
 */
export function useGitHub(username: string) {
  const [state, setState] = useState<State>(() => {
    const cached = readCache(username)
    return { status: isFresh(cached) ? 'success' : 'loading', data: cached, fromCache: cached !== null }
  })
  const controllerRef = useRef<AbortController | null>(null)

  /** Starts a request; the caller is responsible for the "loading" status. */
  const load = useCallback(() => {
    controllerRef.current?.abort()
    const controller = new AbortController()
    controllerRef.current = controller

    fetchGitHubData(username, controller.signal)
      .then((data) => {
        writeStorage(cacheKey(username), JSON.stringify(data))
        setState({ status: 'success', data, fromCache: false })
      })
      .catch((error: unknown) => {
        if (controller.signal.aborted) return
        console.warn('[github]', error)
        const stale = readCache(username)
        setState(
          stale ? { status: 'success', data: stale, fromCache: true } : { status: 'error', data: null, fromCache: false },
        )
      })
  }, [username])

  // Initial state is already "loading" whenever the cache is missing or stale.
  useEffect(() => {
    if (!isFresh(readCache(username))) load()
    return () => controllerRef.current?.abort()
  }, [username, load])

  const retry = useCallback(() => {
    setState((s) => ({ ...s, status: 'loading' }))
    load()
  }, [load])

  return { ...state, retry }
}
