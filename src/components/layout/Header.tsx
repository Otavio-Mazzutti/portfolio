import { Menu, X } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import { useCallback, useRef, useState } from 'react'
import { SiGithub } from 'react-icons/si'
import { profile } from '../../data/profile'
import { useActiveSection } from '../../hooks/useActiveSection'
import { useModalBehavior } from '../../hooks/useModalBehavior'
import { useScrolled } from '../../hooks/useScrolled'
import { useTranslation } from '../../hooks/useTranslation'
import { IconLink } from '../ui/IconLink'
import { LanguageToggle } from '../ui/LanguageToggle'
import { ThemeToggle } from '../ui/ThemeToggle'
import { NAV_ITEMS } from './navigation'

export function Header() {
  const { t } = useTranslation()
  const scrolled = useScrolled()
  const active = useActiveSection(NAV_ITEMS)
  const [open, setOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  const close = useCallback(() => setOpen(false), [])
  useModalBehavior(open, menuRef, close)

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-300 ${
        scrolled || open ? 'border-b border-line bg-bg/75 backdrop-blur-xl' : 'border-b border-transparent'
      }`}
    >
      <div ref={menuRef}>
        <div className="container-page flex h-16 items-center justify-between gap-6">
          <a
            href="#top"
            aria-label={`${profile.name} — ${t.a11y.home}`}
            className="group flex items-center gap-2.5"
            onClick={close}
          >
            <span className="relative inline-flex size-8 items-center justify-center rounded-lg border border-line-strong bg-surface font-mono text-[12px] font-semibold tracking-tight transition-colors group-hover:border-subtle">
              {profile.initials}
              <span aria-hidden="true" className="absolute -top-0.5 -right-0.5 size-1.5 rounded-full bg-accent" />
            </span>
            <span className="hidden text-sm font-medium tracking-tight sm:inline">{profile.name}</span>
          </a>

          <nav aria-label={t.a11y.mainNav} className="hidden lg:block">
            <ul className="flex items-center gap-1">
              {NAV_ITEMS.map((id) => (
                <li key={id}>
                  <a
                    href={`#${id}`}
                    aria-current={active === id ? 'location' : undefined}
                    className={`relative block rounded-full px-3.5 py-1.5 text-[13px] transition-colors ${
                      active === id ? 'text-fg' : 'text-muted hover:text-fg'
                    }`}
                  >
                    {active === id ? (
                      <motion.span
                        layoutId="nav-active"
                        className="absolute inset-0 -z-10 rounded-full bg-elevated"
                        transition={{ type: 'spring', stiffness: 420, damping: 36 }}
                      />
                    ) : null}
                    {t.nav[id]}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-1">
            <LanguageToggle />
            <ThemeToggle />
            <IconLink href={profile.github.url} label="GitHub" icon={SiGithub} className="ml-1 hidden size-9 sm:inline-flex" />
            <button
              type="button"
              className="ml-1 inline-flex size-9 items-center justify-center rounded-full text-muted transition-colors hover:bg-elevated hover:text-fg lg:hidden"
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? t.a11y.closeMenu : t.a11y.openMenu}
              onClick={() => setOpen((o) => !o)}
            >
              {open ? <X size={18} aria-hidden="true" /> : <Menu size={18} aria-hidden="true" />}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {open ? (
            <motion.nav
              id="mobile-menu"
              aria-label={t.a11y.mainNav}
              className="overflow-hidden border-t border-line lg:hidden"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            >
              <ul className="container-page flex h-[calc(100dvh-4rem)] flex-col gap-1 py-6">
                {NAV_ITEMS.map((id, i) => (
                  <motion.li
                    key={id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.04 * i + 0.05 }}
                  >
                    <a
                      href={`#${id}`}
                      data-autofocus={i === 0 ? true : undefined}
                      onClick={close}
                      className="flex items-baseline gap-4 border-b border-line py-4 text-3xl font-semibold tracking-[-0.03em] text-fg"
                    >
                      <span className="font-mono text-xs font-normal text-subtle">0{i + 1}</span>
                      {t.nav[id]}
                    </a>
                  </motion.li>
                ))}
                <li className="mt-auto flex items-center gap-2 pt-6">
                  <IconLink href={profile.github.url} label="GitHub" icon={SiGithub} />
                </li>
              </ul>
            </motion.nav>
          ) : null}
        </AnimatePresence>
      </div>
    </header>
  )
}
