import type { Dictionary } from '../../locales'

export const NAV_ITEMS = ['about', 'experience', 'stack', 'projects', 'github', 'contact'] as const

export type NavId = (typeof NAV_ITEMS)[number] & keyof Dictionary['nav']
