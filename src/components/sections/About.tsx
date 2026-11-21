import { Compass, GraduationCap, MapPin, Sparkles, Target } from 'lucide-react'
import type { ReactNode } from 'react'
import { profile } from '../../data/profile'
import { useTranslation } from '../../hooks/useTranslation'
import { Card } from '../ui/Card'
import { Reveal } from '../ui/Reveal'
import { Section } from '../ui/Section'
import { SectionHeading } from '../ui/SectionHeading'

function CardLabel({ icon, children }: { icon: ReactNode; children: ReactNode }) {
  return (
    <p className="label-mono mb-6 flex items-center gap-2">
      <span className="text-muted" aria-hidden="true">
        {icon}
      </span>
      {children}
    </p>
  )
}

export function About() {
  const { t, l } = useTranslation()

  return (
    <Section id="about" labelledBy="about-title">
      <SectionHeading id="about-title" index={t.about.index} eyebrow={t.about.eyebrow} title={t.about.title} />

      <div className="grid grid-cols-1 gap-4 md:grid-cols-12">
        <Reveal className="md:col-span-7 md:row-span-2">
          <Card interactive className="flex h-full flex-col justify-between gap-10 p-7 sm:p-9">
            <p className="text-xl leading-[1.5] tracking-[-0.01em] text-fg sm:text-2xl">{l(profile.summary)}</p>
            <div className="flex flex-wrap gap-x-8 gap-y-3 border-t border-line pt-6">
              <div>
                <p className="label-mono mb-1">{t.about.focus}</p>
                <ul className="flex flex-wrap gap-x-3 gap-y-1 text-sm text-muted">
                  {t.about.focusItems.map((focus, i) => (
                    <li key={focus} className="flex items-center gap-3">
                      {i > 0 ? <span aria-hidden="true" className="text-line-strong">/</span> : null}
                      {focus}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Card>
        </Reveal>

        <Reveal delay={0.05} className="md:col-span-5">
          <Card interactive className="h-full p-7">
            <CardLabel icon={<GraduationCap size={14} />}>{t.about.education}</CardLabel>
            <p className="text-lg font-medium tracking-tight">{l(profile.education.degree)}</p>
            <p className="mt-1 text-sm text-muted">
              {profile.education.institution} · {profile.education.institutionShort}
            </p>
            <p className="mt-4 font-mono text-[12px] text-subtle">{profile.education.period}</p>
          </Card>
        </Reveal>

        <Reveal delay={0.1} className="md:col-span-5">
          <Card interactive className="h-full p-7">
            <CardLabel icon={<MapPin size={14} />}>{t.about.basedIn}</CardLabel>
            <p className="text-lg font-medium tracking-tight">{l(profile.location)}</p>
            <p className="mt-4 font-mono text-[12px] text-subtle">18.91° S · 48.27° W · UTC−3</p>
          </Card>
        </Reveal>

        <Reveal delay={0.05} className="md:col-span-5">
          <Card interactive className="h-full p-7">
            <CardLabel icon={<Sparkles size={14} />}>{t.about.interests}</CardLabel>
            <ul className="flex flex-wrap gap-2">
              {profile.interests.map((interest) => (
                <li
                  key={interest.en}
                  className="rounded-full border border-line bg-elevated/50 px-3.5 py-1.5 text-sm text-fg transition-colors hover:border-line-strong"
                >
                  {l(interest)}
                </li>
              ))}
            </ul>
          </Card>
        </Reveal>

        <Reveal delay={0.1} className="md:col-span-7">
          <Card interactive className="h-full p-7">
            <CardLabel icon={<Target size={14} />}>{t.about.goal}</CardLabel>
            <div className="flex items-start gap-4">
              <Compass size={20} aria-hidden="true" className="mt-1 shrink-0 text-accent" />
              <p className="text-lg leading-relaxed tracking-tight text-fg">{l(profile.goal)}</p>
            </div>
          </Card>
        </Reveal>
      </div>
    </Section>
  )
}
