import { ArrowUpRight, Check, Copy, Download, Mail, X } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import { profile, socialLinks } from '../../data/profile'
import { useCopyToClipboard } from '../../hooks/useCopyToClipboard'
import { useTranslation } from '../../hooks/useTranslation'
import { Card } from '../ui/Card'
import { ExternalLink } from '../ui/ExternalLink'
import { Reveal } from '../ui/Reveal'
import { Section } from '../ui/Section'
import { SectionHeading } from '../ui/SectionHeading'

const linkRow =
  'group flex items-center justify-between gap-4 border-b border-line py-5 text-fg transition-colors last:border-b-0 hover:text-accent'

export function Contact() {
  const { t } = useTranslation()
  const { status, copy } = useCopyToClipboard()

  const copyLabel = status === 'copied' ? t.contact.copied : status === 'error' ? t.contact.copyFailed : t.contact.copy

  return (
    <Section id="contact" labelledBy="contact-title">
      <SectionHeading id="contact-title" index={t.contact.index} eyebrow={t.contact.eyebrow} title={t.contact.title}>
        <p>{t.contact.subtitle}</p>
      </SectionHeading>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-12">
        <Reveal className="md:col-span-7">
          <Card interactive className="flex h-full flex-col justify-between gap-10 p-7 sm:p-9">
            <p className="label-mono flex items-center gap-2">
              <Mail size={14} aria-hidden="true" />
              E-mail
            </p>
            <a
              href={`mailto:${profile.email}`}
              className="text-[clamp(1.4rem,4.2vw,2.75rem)] font-semibold tracking-[-0.04em] break-all transition-colors hover:text-accent"
            >
              {profile.email}
            </a>
            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => copy(profile.email)}
                className="inline-flex h-11 min-w-[11rem] items-center justify-center gap-2 rounded-full bg-fg px-5 text-sm font-medium text-bg transition-[background-color,transform] hover:bg-fg/85 active:scale-[0.98]"
              >
                <AnimatePresence mode="wait" initial={false}>
                  <motion.span
                    key={status}
                    initial={{ opacity: 0, scale: 0.6 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.6 }}
                    transition={{ duration: 0.15 }}
                    className="flex"
                  >
                    {status === 'copied' ? (
                      <Check size={16} aria-hidden="true" />
                    ) : status === 'error' ? (
                      <X size={16} aria-hidden="true" />
                    ) : (
                      <Copy size={16} aria-hidden="true" />
                    )}
                  </motion.span>
                </AnimatePresence>
                {copyLabel}
              </button>
              <a
                href={`mailto:${profile.email}`}
                className="inline-flex h-11 items-center gap-2 rounded-full border border-line-strong px-5 text-sm font-medium transition-colors hover:bg-elevated"
              >
                {t.contact.send}
                <ArrowUpRight size={15} aria-hidden="true" />
              </a>
            </div>
            <output className="sr-only" aria-live="polite">
              {status === 'idle' ? '' : copyLabel}
            </output>
          </Card>
        </Reveal>

        <Reveal delay={0.05} className="md:col-span-5">
          <Card className="h-full px-7 py-2">
            <ul>
              {socialLinks.map(({ label, href, icon: Icon }) => (
                <li key={label}>
                  <ExternalLink href={href} className={linkRow}>
                    <span className="flex items-center gap-3 text-lg font-medium tracking-tight">
                      <Icon size={18} aria-hidden={true} />
                      {label}
                    </span>
                    <ArrowUpRight
                      size={18}
                      aria-hidden="true"
                      className="text-subtle transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent"
                    />
                  </ExternalLink>
                </li>
              ))}
              <li>
                <a href={profile.resume} download className={linkRow}>
                  <span className="flex items-center gap-3 text-lg font-medium tracking-tight">
                    <Download size={18} aria-hidden="true" />
                    {t.contact.resume}
                  </span>
                  <span className="font-mono text-[11px] text-subtle uppercase">{t.contact.resumeCta}</span>
                </a>
              </li>
            </ul>
          </Card>
        </Reveal>
      </div>
    </Section>
  )
}
