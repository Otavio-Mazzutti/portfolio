import { motion } from 'motion/react'
import { useTranslation } from '../../hooks/useTranslation'
import type { Locale } from '../../types'

const options: Locale[] = ['pt', 'en']

export function LanguageToggle({ layoutId = 'lang-pill' }: { layoutId?: string }) {
  const { locale, toggleLocale, t } = useTranslation()

  return (
    <button
      type="button"
      onClick={toggleLocale}
      aria-label={t.a11y.switchLanguage}
      title={t.a11y.switchLanguage}
      className="relative inline-flex h-9 items-center rounded-full p-1 font-mono text-[11px] uppercase transition-colors hover:bg-elevated"
    >
      {options.map((option) => (
        <span
          key={option}
          className={`relative z-10 px-2 py-1 transition-colors ${locale === option ? 'text-fg' : 'text-subtle'}`}
        >
          {locale === option ? (
            <motion.span
              layoutId={layoutId}
              className="absolute inset-0 -z-10 rounded-full border border-line-strong bg-surface"
              transition={{ type: 'spring', stiffness: 500, damping: 35 }}
            />
          ) : null}
          {option}
        </span>
      ))}
    </button>
  )
}
