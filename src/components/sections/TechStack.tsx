import { motion } from 'motion/react'
import { skillCategories } from '../../data/skills'
import { useTranslation } from '../../hooks/useTranslation'
import type { Skill } from '../../types'
import { Card } from '../ui/Card'
import { Reveal } from '../ui/Reveal'
import { Section } from '../ui/Section'
import { SectionHeading } from '../ui/SectionHeading'

/** Column spans for the bento layout, applied in order and repeated. */
const SPANS = ['md:col-span-7', 'md:col-span-5', 'md:col-span-5', 'md:col-span-7', 'md:col-span-12']

function FeaturedSkill({ skill, coreLabel }: { skill: Skill; coreLabel: string }) {
  const Icon = skill.icon
  return (
    <motion.li
      whileHover={{ y: -3 }}
      transition={{ type: 'spring', stiffness: 400, damping: 28 }}
      className="group/skill flex flex-col justify-between gap-8 rounded-xl border border-line bg-elevated/40 p-5 transition-colors hover:border-line-strong hover:bg-elevated"
    >
      <Icon size={28} aria-hidden={true} className="text-muted transition-colors duration-300 group-hover/skill:text-fg" />
      <div className="flex items-end justify-between gap-2">
        <span className="text-lg font-medium tracking-tight">{skill.name}</span>
        <span className="font-mono text-[10px] tracking-[0.12em] text-accent uppercase">{coreLabel}</span>
      </div>
    </motion.li>
  )
}

function SkillChip({ skill }: { skill: Skill }) {
  const Icon = skill.icon
  return (
    <motion.li
      whileHover={{ y: -2 }}
      transition={{ type: 'spring', stiffness: 400, damping: 28 }}
      className="group/skill inline-flex items-center gap-2.5 rounded-full border border-line bg-bg/40 py-2 pr-4 pl-3 text-sm text-muted transition-colors hover:border-line-strong hover:text-fg"
    >
      <Icon size={15} aria-hidden={true} className="transition-colors" />
      {skill.name}
    </motion.li>
  )
}

export function TechStack() {
  const { t, l } = useTranslation()

  return (
    <Section id="stack" labelledBy="stack-title">
      <SectionHeading id="stack-title" index={t.stack.index} eyebrow={t.stack.eyebrow} title={t.stack.title} />

      <div className="grid grid-cols-1 gap-4 md:grid-cols-12">
        {skillCategories.map((category, i) => {
          const featured = category.skills.filter((s) => s.featured)
          const regular = category.skills.filter((s) => !s.featured)

          return (
            <Reveal key={category.id} delay={(i % 2) * 0.06} className={SPANS[i % SPANS.length]}>
              <Card interactive className="flex h-full flex-col p-6 sm:p-7">
                <div className="mb-6 flex items-baseline justify-between gap-4">
                  <h3 className="text-lg font-semibold tracking-tight">{l(category.title)}</h3>
                  <span className="font-mono text-[11px] text-subtle">
                    {String(category.skills.length).padStart(2, '0')}
                  </span>
                </div>
                <p className="-mt-4 mb-6 text-sm text-subtle">{l(category.description)}</p>

                {featured.length > 0 ? (
                  <ul className="mb-3 grid grid-cols-2 gap-3">
                    {featured.map((skill) => (
                      <FeaturedSkill key={skill.name} skill={skill} coreLabel={t.stack.core} />
                    ))}
                  </ul>
                ) : null}

                {regular.length > 0 ? (
                  <ul className="mt-auto flex flex-wrap gap-2 pt-2">
                    {regular.map((skill) => (
                      <SkillChip key={skill.name} skill={skill} />
                    ))}
                  </ul>
                ) : null}
              </Card>
            </Reveal>
          )
        })}
      </div>
    </Section>
  )
}
