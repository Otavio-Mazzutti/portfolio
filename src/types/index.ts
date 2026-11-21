import type { ComponentType } from 'react'

export type Locale = 'pt' | 'en'

export type Theme = 'dark' | 'light'

/** A string available in every supported locale. */
export type LocalizedString = Record<Locale, string>

export type IconComponent = ComponentType<{ size?: number | string; className?: string; 'aria-hidden'?: boolean }>

export interface SocialLink {
  label: string
  href: string
  icon: IconComponent
}

export interface Profile {
  name: string
  initials: string
  role: string
  location: LocalizedString
  email: string
  /** Path to a file in /public, e.g. "/resume/cv.pdf". */
  resume: string
  /** Imported image URL, or null to render the placeholder frame. */
  photo: string | null
  availability: {
    open: boolean
    label: LocalizedString
  }
  headline: LocalizedString
  summary: LocalizedString
  education: {
    degree: LocalizedString
    institution: string
    institutionShort: string
    period: string
  }
  interests: LocalizedString[]
  goal: LocalizedString
  github: {
    username: string
    url: string
    /** Repository names shown in the GitHub section, in this order. */
    highlightedRepos: string[]
  }
  linkedin: string
  siteUrl: string
}

/** "YYYY-MM", "present", or null when not filled in yet. */
export type DateValue = string | 'present' | null

export interface Experience {
  id: string
  company: string
  role: LocalizedString
  start: DateValue
  end: DateValue
  location?: LocalizedString
  highlights: LocalizedString[]
  stack: string[]
}

export interface Skill {
  name: string
  icon: IconComponent
  /** Featured skills get a larger tile in the Tech Stack grid. */
  featured?: boolean
}

export interface SkillCategory {
  id: string
  title: LocalizedString
  description: LocalizedString
  skills: Skill[]
}

export type ProjectCategory = 'distributed-systems' | 'web' | 'data' | 'fullstack' | 'mobile'

export interface Project {
  slug: string
  title: LocalizedString
  category: ProjectCategory
  summary: LocalizedString
  /** Optional cover image URL; a typographic cover is generated when missing. */
  image?: string
  stack: string[]
  repo: string
  demo?: string
  year?: string
  details: {
    overview: LocalizedString
    features: LocalizedString[]
    architecture: LocalizedString[]
    /** Short "how to run" hint shown in the modal. */
    run?: string[]
  }
}
