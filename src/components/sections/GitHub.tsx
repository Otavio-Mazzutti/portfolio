import { ArrowUpRight, GitFork, RefreshCw, Star } from 'lucide-react'
import { motion } from 'motion/react'
import { useMemo } from 'react'
import { SiGithub } from 'react-icons/si'
import { profile } from '../../data/profile'
import { useGitHub } from '../../hooks/useGitHub'
import { useTranslation } from '../../hooks/useTranslation'
import { aggregateLanguages, pickRepos, type GitHubRepo } from '../../lib/github'
import { formatRelativeDate, formatYear } from '../../lib/format'
import { buttonClass } from '../ui/buttonClass'
import { Card } from '../ui/Card'
import { ExternalLink } from '../ui/ExternalLink'
import { Reveal } from '../ui/Reveal'
import { Section } from '../ui/Section'
import { SectionHeading } from '../ui/SectionHeading'

/** GitHub linguist colors for languages likely to appear; others fall back to gray. */
const LANGUAGE_COLORS: Record<string, string> = {
  TypeScript: '#3178c6',
  JavaScript: '#f1e05a',
  Python: '#3572A5',
  Java: '#b07219',
  Kotlin: '#A97BFF',
  PHP: '#4F5D95',
  HTML: '#e34c26',
  CSS: '#663399',
  Swift: '#F05138',
  'Jupyter Notebook': '#DA5B0B',
  C: '#555555',
  'C++': '#f34b7d',
  Shell: '#89e051',
}

const colorFor = (language: string | null) => (language && LANGUAGE_COLORS[language]) || '#8b8b93'

function Skeleton({ className = '' }: { className?: string }) {
  return <div className={`animate-pulse rounded-md bg-elevated ${className}`} />
}

function Stat({ label, value }: { label: string; value: string | number | undefined }) {
  return (
    <div className="bg-surface p-5 sm:p-6">
      <p className="label-mono mb-2">{label}</p>
      {value === undefined ? (
        <Skeleton className="h-8 w-14" />
      ) : (
        <p className="text-3xl font-semibold tracking-[-0.04em] tabular-nums">{value}</p>
      )}
    </div>
  )
}

function RepoRow({ repo }: { repo: GitHubRepo }) {
  const { t, locale } = useTranslation()
  return (
    <li>
      <ExternalLink
        href={repo.html_url}
        className="group flex flex-col gap-2 border-b border-line px-1 py-5 transition-colors last:border-b-0 hover:bg-elevated/40 sm:flex-row sm:items-center sm:gap-6 sm:px-3"
      >
        <div className="min-w-0 flex-1">
          <p className="flex items-center gap-2 font-mono text-sm text-fg">
            {repo.name}
            <ArrowUpRight
              size={14}
              aria-hidden="true"
              className="text-subtle opacity-0 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100"
            />
          </p>
          <p className="mt-1 truncate text-sm text-muted">{repo.description ?? t.github.noDescription}</p>
        </div>
        <div className="flex shrink-0 items-center gap-4 font-mono text-[12px] text-subtle">
          {repo.language ? (
            <span className="inline-flex items-center gap-1.5">
              <span aria-hidden="true" className="size-2 rounded-full" style={{ background: colorFor(repo.language) }} />
              {repo.language}
            </span>
          ) : null}
          <span className="inline-flex items-center gap-1" title="Stars">
            <Star size={12} aria-hidden="true" />
            {repo.stargazers_count}
          </span>
          <span className="inline-flex items-center gap-1" title="Forks">
            <GitFork size={12} aria-hidden="true" />
            {repo.forks_count}
          </span>
          <span className="hidden md:inline">
            {t.github.updated} {formatRelativeDate(repo.pushed_at, locale)}
          </span>
        </div>
      </ExternalLink>
    </li>
  )
}

export function GitHub() {
  const { t, locale } = useTranslation()
  const { username, url, highlightedRepos } = profile.github
  const { status, data, fromCache, retry } = useGitHub(username)

  const languages = useMemo(() => (data ? aggregateLanguages(data.repos) : []), [data])
  const repos = useMemo(() => (data ? pickRepos(data.repos, highlightedRepos) : []), [data, highlightedRepos])

  const user = data?.user
  const loading = status === 'loading' && !data
  const failed = status === 'error'

  return (
    <Section id="github" labelledBy="github-title">
      <SectionHeading id="github-title" index={t.github.index} eyebrow={t.github.eyebrow} title={t.github.title} />

      <div aria-live="polite" aria-busy={loading} className="grid grid-cols-1 gap-4 md:grid-cols-12">
        <p className="sr-only">{loading ? t.github.loading : ''}</p>

        {/* Profile card */}
        <Reveal className="md:col-span-4">
          <Card interactive className="flex h-full flex-col p-7">
            <div className="flex items-center gap-4">
              <img
                src={user?.avatar_url ?? `https://github.com/${username}.png`}
                alt=""
                width={64}
                height={64}
                loading="lazy"
                className="size-16 rounded-full border border-line bg-elevated"
              />
              <div className="min-w-0">
                <p className="truncate text-lg font-semibold tracking-tight">{user?.name ?? profile.name}</p>
                <p className="truncate font-mono text-[13px] text-subtle">@{user?.login ?? username}</p>
              </div>
            </div>
            {user?.bio ? <p className="mt-5 text-sm leading-relaxed text-muted">{user.bio}</p> : null}

            {failed ? (
              <output className="mt-5 block rounded-xl border border-line bg-elevated/40 p-4 text-sm text-muted">
                <p>{t.github.error}</p>
                <button
                  type="button"
                  onClick={retry}
                  className="mt-3 inline-flex items-center gap-1.5 text-fg transition-colors hover:text-accent"
                >
                  <RefreshCw size={13} aria-hidden="true" />
                  {t.github.retry}
                </button>
              </output>
            ) : null}

            <div className="mt-auto pt-8">
              <ExternalLink href={url} className={buttonClass('secondary', 'w-full')}>
                <SiGithub size={15} aria-hidden={true} />
                {t.github.viewProfile}
              </ExternalLink>
            </div>
          </Card>
        </Reveal>

        {/* Stats + languages */}
        <Reveal delay={0.05} className="md:col-span-8">
          <Card className="flex h-full flex-col">
            <div className="grid grid-cols-2 gap-px border-b border-line bg-line sm:grid-cols-4">
              <Stat label={t.github.repos} value={failed ? '—' : user?.public_repos} />
              <Stat label={t.github.followers} value={failed ? '—' : user?.followers} />
              <Stat label={t.github.following} value={failed ? '—' : user?.following} />
              <Stat label={t.github.since} value={failed ? '—' : user ? formatYear(user.created_at, locale) : undefined} />
            </div>

            <div className="flex flex-1 flex-col justify-center p-6 sm:p-7">
              <p className="label-mono mb-1">{t.github.languages}</p>
              <p className="mb-5 text-[13px] text-subtle">{t.github.languagesNote}</p>
              {loading ? (
                <Skeleton className="h-2 w-full" />
              ) : languages.length > 0 ? (
                <>
                  <div className="h-2 w-full overflow-hidden rounded-full bg-elevated" aria-hidden="true">
                    <motion.div
                      className="flex h-full w-full origin-left gap-0.5"
                      initial={{ scaleX: 0 }}
                      whileInView={{ scaleX: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                    >
                      {languages.map((lang) => (
                        <span
                          key={lang.name}
                          className="h-full"
                          style={{ width: `${lang.share * 100}%`, background: colorFor(lang.name) }}
                        />
                      ))}
                    </motion.div>
                  </div>
                  <ul className="mt-5 flex flex-wrap gap-x-6 gap-y-2 font-mono text-[12px] text-muted">
                    {languages.map((lang) => (
                      <li key={lang.name} className="inline-flex items-center gap-2">
                        <span aria-hidden="true" className="size-2 rounded-full" style={{ background: colorFor(lang.name) }} />
                        {lang.name}
                        <span className="text-subtle">
                          {lang.count} repo{lang.count > 1 ? 's' : ''}
                        </span>
                      </li>
                    ))}
                  </ul>
                </>
              ) : (
                <p className="text-sm text-subtle">—</p>
              )}
            </div>
          </Card>
        </Reveal>

        {/* Highlighted repositories */}
        <Reveal delay={0.05} className="md:col-span-12">
          <Card className="p-4 sm:p-6">
            <div className="flex items-center justify-between px-1 pb-2 sm:px-3">
              <h3 className="label-mono">{t.github.highlighted}</h3>
              {fromCache && data ? (
                <span className="font-mono text-[11px] text-subtle">{t.github.cached}</span>
              ) : null}
            </div>
            {loading ? (
              <div className="space-y-4 p-3">
                {highlightedRepos.map((name) => (
                  <Skeleton key={name} className="h-12 w-full" />
                ))}
              </div>
            ) : repos.length > 0 ? (
              <ul>
                {repos.map((repo) => (
                  <RepoRow key={repo.id} repo={repo} />
                ))}
              </ul>
            ) : (
              // Static fallback when the API is unavailable
              <ul>
                {highlightedRepos.map((name) => (
                  <li key={name}>
                    <ExternalLink
                      href={`${url}/${name}`}
                      className="flex items-center justify-between border-b border-line px-1 py-5 font-mono text-sm transition-colors last:border-b-0 hover:bg-elevated/40 sm:px-3"
                    >
                      {name}
                      <ArrowUpRight size={14} aria-hidden="true" className="text-subtle" />
                    </ExternalLink>
                  </li>
                ))}
              </ul>
            )}
          </Card>
        </Reveal>
      </div>
    </Section>
  )
}
