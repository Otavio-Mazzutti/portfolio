import { ArrowUp } from 'lucide-react'
import { profile, socialLinks } from '../../data/profile'
import { useTranslation } from '../../hooks/useTranslation'
import { ExternalLink } from '../ui/ExternalLink'

const YEAR = new Date().getFullYear()

export function Footer() {
  const { t } = useTranslation()

  return (
    <footer className="border-t border-line">
      <div className="container-page flex flex-col gap-6 py-10 text-sm text-muted md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-fg">
            © {YEAR} {profile.name}. <span className="text-muted">{t.footer.rights}</span>
          </p>
          <p className="mt-1 text-[13px] text-subtle">{t.footer.built}</p>
        </div>

        <ul className="flex flex-wrap items-center gap-x-6 gap-y-2">
          {socialLinks.map(({ label, href }) => (
            <li key={label}>
              <ExternalLink href={href} className="transition-colors hover:text-fg">
                {label}
              </ExternalLink>
            </li>
          ))}
          <li>
            <a href={`mailto:${profile.email}`} className="transition-colors hover:text-fg">
              E-mail
            </a>
          </li>
          <li>
            <a href="#top" className="group inline-flex items-center gap-1.5 transition-colors hover:text-fg">
              {t.footer.backToTop}
              <ArrowUp size={14} aria-hidden="true" className="transition-transform group-hover:-translate-y-0.5" />
            </a>
          </li>
        </ul>
      </div>
    </footer>
  )
}
