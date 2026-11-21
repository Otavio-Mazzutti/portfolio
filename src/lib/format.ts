import { htmlLang } from '../locales'
import type { DateValue, Locale } from '../types'

/** "2025-03" → "mar. 2025" / "Mar 2025". */
export function formatMonth(value: string, locale: Locale): string {
  const [year, month] = value.split('-').map(Number)
  if (!year) return value
  const date = new Date(Date.UTC(year, (month || 1) - 1, 1))
  return new Intl.DateTimeFormat(htmlLang[locale], { month: 'short', year: 'numeric', timeZone: 'UTC' }).format(date)
}

/** Returns a "start — end" label, or null when no dates are configured. */
export function formatRange(start: DateValue, end: DateValue, locale: Locale, presentLabel: string): string | null {
  if (!start) return null
  const from = formatMonth(start, locale)
  const to = !end || end === 'present' ? presentLabel : formatMonth(end, locale)
  return `${from} — ${to}`
}

export function formatYear(iso: string, locale: Locale): string {
  return new Intl.DateTimeFormat(htmlLang[locale], { year: 'numeric' }).format(new Date(iso))
}

export function formatRelativeDate(iso: string, locale: Locale): string {
  return new Intl.DateTimeFormat(htmlLang[locale], { month: 'short', day: 'numeric', year: 'numeric' }).format(new Date(iso))
}
