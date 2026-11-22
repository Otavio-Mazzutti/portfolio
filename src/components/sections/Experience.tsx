import { experiences } from '../../data/experience'
import { useTranslation } from '../../hooks/useTranslation'
import { formatRange } from '../../lib/format'
import { Reveal } from '../ui/Reveal'
import { Section } from '../ui/Section'
import { SectionHeading } from '../ui/SectionHeading'
import { Tag } from '../ui/Tag'

export function Experience() {
  const { t, l, locale } = useTranslation()

  return (
    <Section id="experience" labelledBy="experience-title">
      <SectionHeading
        id="experience-title"
        index={t.experience.index}
        eyebrow={t.experience.eyebrow}
        title={t.experience.title}
      />

      <ol className="relative before:absolute before:top-3 before:bottom-2 before:left-[5px] before:w-px before:bg-line md:ml-[25%]">
        {experiences.map((job, i) => {
          const range = formatRange(job.start, job.end, locale, t.experience.present)
          const isCurrent = job.end === 'present'

          return (
            <li key={job.id} className="relative pb-14 pl-10 last:pb-0">
              <span
                aria-hidden="true"
                className={`absolute top-2.5 left-0 size-[11px] rounded-full border-2 border-bg ring-1 ring-line-strong ${
                  isCurrent ? 'bg-accent' : 'bg-line-strong'
                }`}
              />
              <Reveal delay={i * 0.05}>
                <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
                  <h3 className="text-2xl font-semibold tracking-[-0.03em]">{job.company}</h3>
                  <p className="font-mono text-[12px] text-subtle">
                    {range ?? <span title="src/data/experience.ts">{t.experience.datesTbd}</span>}
                  </p>
                </div>
                <p className="mt-1 text-muted">{l(job.role)}</p>

                <ul className="mt-6 grid gap-x-8 gap-y-3 sm:grid-cols-2">
                  {job.highlights.map((highlight) => (
                    <li key={highlight.en} className="flex gap-3 text-[15px] leading-relaxed text-muted">
                      <span aria-hidden="true" className="mt-[0.7em] h-px w-3 shrink-0 bg-subtle" />
                      {l(highlight)}
                    </li>
                  ))}
                </ul>

                <ul className="mt-6 flex flex-wrap gap-2" aria-label="Stack">
                  {job.stack.map((tech) => (
                    <li key={tech}>
                      <Tag>{tech}</Tag>
                    </li>
                  ))}
                </ul>
              </Reveal>
            </li>
          )
        })}
      </ol>
    </Section>
  )
}
