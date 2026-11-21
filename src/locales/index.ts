import type { Locale } from '../types'
import { en } from './en'
import { pt, type Dictionary } from './pt'

export const dictionaries: Record<Locale, Dictionary> = { pt, en }

export const htmlLang: Record<Locale, string> = { pt: 'pt-BR', en: 'en' }

export type { Dictionary }
