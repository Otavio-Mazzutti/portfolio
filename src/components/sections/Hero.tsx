import { ArrowDown, ArrowRight, Download, MapPin } from 'lucide-react'
import { motion, type Variants } from 'motion/react'
import { profile, socialLinks } from '../../data/profile'
import { useTranslation } from '../../hooks/useTranslation'
import { ButtonLink } from '../ui/Button'
import { IconLink } from '../ui/IconLink'

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
}

const item: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
}

function Portrait() {
  const { t } = useTranslation()

  return (
    <div className="relative aspect-[4/5] w-full overflow-hidden rounded-3xl border border-line bg-surface">
      {profile.photo ? (
        <img
          src={profile.photo}
          alt={t.hero.photoAlt}
          width={800}
          height={1000}
          fetchPriority="high"
          className="size-full object-cover grayscale-[15%]"
        />
      ) : (
        // Placeholder — set `profile.photo` in src/data/profile.ts
        <div className="flex size-full flex-col items-center justify-center gap-4 border border-dashed border-line-strong/60 bg-elevated/30">
          <span className="text-6xl font-semibold tracking-[-0.06em] text-line-strong select-none">{profile.initials}</span>
          <span className="label-mono">{t.hero.photoPlaceholder}</span>
        </div>
      )}
      <div className="absolute inset-x-3 bottom-3 flex items-center justify-between rounded-2xl border border-line bg-bg/80 px-4 py-3 backdrop-blur-md">
        <div>
          <p className="text-sm font-medium">{profile.name}</p>
          <p className="font-mono text-[11px] text-subtle">{profile.role}</p>
        </div>
        <span className="font-mono text-[11px] text-subtle">{profile.education.institutionShort}</span>
      </div>
    </div>
  )
}

export function Hero() {
  const { t, l } = useTranslation()
  const [firstName, ...rest] = profile.name.split(' ')

  return (
    <section id="top" aria-labelledby="hero-title" className="relative overflow-hidden pt-32 pb-20 md:pt-40 md:pb-28">
      <div aria-hidden="true" className="bg-grid pointer-events-none absolute inset-0 -z-10" />

      <motion.div variants={container} initial="hidden" animate="show" className="container-page grid grid-cols-1 gap-14 md:grid-cols-12 md:items-end">
        <div className="md:col-span-8">
          {profile.availability.open ? (
            <motion.p
              variants={item}
              className="mb-8 inline-flex items-center gap-2.5 rounded-full border border-line bg-surface/70 py-1.5 pr-3.5 pl-3 text-[13px] text-muted backdrop-blur"
            >
              <span className="relative flex size-2">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-accent opacity-60 [animation-duration:2.4s]" />
                <span className="relative inline-flex size-2 rounded-full bg-accent" />
              </span>
              {l(profile.availability.label)}
            </motion.p>
          ) : null}

          <motion.p variants={item} className="label-mono mb-4">
            {t.hero.greeting}
          </motion.p>

          <motion.h1
            id="hero-title"
            variants={item}
            className="text-[clamp(3rem,10vw,7.5rem)] leading-[0.92] font-semibold tracking-[-0.055em]"
          >
            {firstName}
            <br />
            <span className="text-muted">{rest.join(' ')}</span>
            <span className="text-accent">.</span>
          </motion.h1>

          <motion.div variants={item} className="mt-8 flex flex-wrap items-center gap-x-4 gap-y-2">
            <p className="text-xl font-medium tracking-tight sm:text-2xl">{profile.role}</p>
            <span aria-hidden="true" className="hidden h-4 w-px bg-line-strong sm:block" />
            <p className="inline-flex items-center gap-1.5 font-mono text-[12px] text-subtle">
              <MapPin size={13} aria-hidden="true" />
              {l(profile.location)}
            </p>
          </motion.div>

          <motion.p variants={item} className="mt-6 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
            {l(profile.headline)}
          </motion.p>

          <motion.div variants={item} className="mt-10 flex flex-wrap items-center gap-3">
            <ButtonLink href="#projects">
              {t.hero.viewProjects}
              <ArrowRight size={16} aria-hidden="true" className="transition-transform group-hover:translate-x-0.5" />
            </ButtonLink>
            <ButtonLink href={l(profile.resume)} download variant="secondary">
              <Download size={16} aria-hidden="true" className="transition-transform group-hover:translate-y-0.5" />
              {t.hero.downloadCv}
            </ButtonLink>
            <div className="ml-1 flex items-center gap-2">
              {socialLinks.map((link) => (
                <IconLink key={link.label} href={link.href} label={link.label} icon={link.icon} className="size-11" />
              ))}
            </div>
          </motion.div>
        </div>

        <motion.div variants={item} className="mx-auto w-full max-w-sm md:col-span-4 md:max-w-none">
          <Portrait />
        </motion.div>
      </motion.div>

      <div className="container-page mt-20 hidden md:block">
        <a href="#about" className="group inline-flex items-center gap-2 label-mono transition-colors hover:text-fg">
          <ArrowDown size={14} aria-hidden="true" className="transition-transform group-hover:translate-y-0.5" />
          {t.hero.scroll}
        </a>
      </div>
    </section>
  )
}
