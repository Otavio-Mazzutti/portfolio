/**
 * Minimal client for the public (unauthenticated) GitHub REST API.
 * No token is used or needed — the unauthenticated limit is 60 requests/hour/IP,
 * which is why responses are cached client-side (see useGitHub).
 */
const API = 'https://api.github.com'

export interface GitHubUser {
  login: string
  name: string | null
  avatar_url: string
  html_url: string
  bio: string | null
  public_repos: number
  followers: number
  following: number
  created_at: string
}

export interface GitHubRepo {
  id: number
  name: string
  description: string | null
  html_url: string
  homepage: string | null
  language: string | null
  stargazers_count: number
  forks_count: number
  fork: boolean
  archived: boolean
  pushed_at: string
}

export interface LanguageShare {
  name: string
  count: number
  share: number
}

export interface GitHubData {
  user: GitHubUser
  repos: GitHubRepo[]
  fetchedAt: number
}

async function request<T>(path: string, signal?: AbortSignal): Promise<T> {
  const res = await fetch(`${API}${path}`, {
    signal,
    headers: { Accept: 'application/vnd.github+json', 'X-GitHub-Api-Version': '2022-11-28' },
  })
  if (!res.ok) {
    const limited = res.status === 403 && res.headers.get('x-ratelimit-remaining') === '0'
    throw new Error(limited ? 'GitHub API rate limit exceeded' : `GitHub API responded ${res.status}`)
  }
  return res.json() as Promise<T>
}

export async function fetchGitHubData(username: string, signal?: AbortSignal): Promise<GitHubData> {
  const [user, repos] = await Promise.all([
    request<GitHubUser>(`/users/${encodeURIComponent(username)}`, signal),
    request<GitHubRepo[]>(`/users/${encodeURIComponent(username)}/repos?per_page=100&sort=pushed`, signal),
  ])
  return { user, repos, fetchedAt: Date.now() }
}

/** Share of non-fork repositories by primary language. */
export function aggregateLanguages(repos: GitHubRepo[], limit = 6): LanguageShare[] {
  const counts = new Map<string, number>()
  for (const repo of repos) {
    if (repo.fork || !repo.language) continue
    counts.set(repo.language, (counts.get(repo.language) ?? 0) + 1)
  }
  const total = [...counts.values()].reduce((a, b) => a + b, 0)
  if (total === 0) return []
  return [...counts.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, limit)
    .map(([name, count]) => ({ name, count, share: count / total }))
}

/** Keeps only the configured repositories, in the configured order. */
export function pickRepos(repos: GitHubRepo[], names: string[]): GitHubRepo[] {
  const byName = new Map(repos.map((r) => [r.name.toLowerCase(), r]))
  return names.map((n) => byName.get(n.toLowerCase())).filter((r): r is GitHubRepo => r !== undefined)
}
