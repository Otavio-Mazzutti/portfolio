import { ArrowUpRight, Plus } from 'lucide-react'
import { AnimatePresence } from 'motion/react'
import { useCallback, useState } from 'react'
import { SiGithub } from 'react-icons/si'
import { projects } from '../../data/projects'
import { useTranslation } from '../../hooks/useTranslation'
import type { Project } from '../../types'
import { Card } from '../ui/Card'
import { ExternalLink } from '../ui/ExternalLink'
import { ProjectCover } from '../ui/ProjectCover'
import { ProjectModal } from '../ui/ProjectModal'
import { Reveal } from '../ui/Reveal'
import { Section } from '../ui/Section'
import { SectionHeading } from '../ui/SectionHeading'
import { Tag } from '../ui/Tag'

interface ProjectCardProps {
  project: Project
  index: number
  /** Horizontal layout on wide screens, used for the lead project. */
  wide?: boolean
  onOpen: (p: Project) => void
}

function ProjectCard({ project, index, wide = false, onOpen }: ProjectCardProps) {
  const { t, l } = useTranslation()
  const title = l(project.title)
  const category = t.projects.categories[project.category]

  return (
    <Card interactive className={`group flex h-full flex-col ${wide ? 'md:grid md:grid-cols-[1.15fr_1fr]' : ''}`}>
      <button
        type="button"
        onClick={() => onOpen(project)}
        className={`relative block aspect-[16/10] overflow-hidden border-b border-line text-left focus-visible:outline-offset-[-2px] ${
          wide ? 'md:aspect-auto md:min-h-[380px] md:border-r md:border-b-0' : ''
        }`}
        aria-label={`${t.projects.details}: ${title}`}
      >
        <ProjectCover project={project} />
        <span className="absolute top-4 right-4 font-mono text-[11px] text-subtle">
          {String(index + 1).padStart(2, '0')}
        </span>
      </button>

      <div className="flex flex-1 flex-col p-6 sm:p-7">
        <p className="label-mono mb-3">{category}</p>
        <h3 className="text-2xl font-semibold tracking-[-0.03em]">{title}</h3>
        <p className="mt-3 text-[15px] leading-relaxed text-muted">{l(project.summary)}</p>

        <ul className="mt-6 flex flex-wrap gap-2" aria-label={t.projects.stack}>
          {project.stack.map((tech) => (
            <li key={tech}>
              <Tag>{tech}</Tag>
            </li>
          ))}
        </ul>

        <div className="mt-auto flex flex-wrap items-center gap-x-5 gap-y-3 pt-8 text-sm">
          <button
            type="button"
            onClick={() => onOpen(project)}
            className="group/btn inline-flex items-center gap-1.5 font-medium text-fg"
          >
            <Plus size={15} aria-hidden="true" className="transition-transform duration-300 group-hover/btn:rotate-90" />
            {t.projects.details}
          </button>
          <ExternalLink
            href={project.repo}
            className="inline-flex items-center gap-1.5 text-muted transition-colors hover:text-fg"
          >
            <SiGithub size={14} aria-hidden={true} />
            {t.projects.code}
          </ExternalLink>
          {project.demo ? (
            <ExternalLink
              href={project.demo}
              className="group/demo inline-flex items-center gap-1 text-muted transition-colors hover:text-fg"
            >
              {t.projects.demo}
              <ArrowUpRight
                size={14}
                aria-hidden="true"
                className="transition-transform group-hover/demo:translate-x-0.5 group-hover/demo:-translate-y-0.5"
              />
            </ExternalLink>
          ) : null}
        </div>
      </div>
    </Card>
  )
}

/** Wide first card, then a two-column grid — adapts to any number of projects. */
function spanFor(index: number, total: number) {
  if (total % 2 === 1 && index === 0) return 'md:col-span-2'
  return ''
}

export function Projects() {
  const { t } = useTranslation()
  const [selected, setSelected] = useState<Project | null>(null)
  const close = useCallback(() => setSelected(null), [])

  return (
    <Section id="projects" labelledBy="projects-title">
      <SectionHeading id="projects-title" index={t.projects.index} eyebrow={t.projects.eyebrow} title={t.projects.title}>
        <p>{t.projects.subtitle}</p>
      </SectionHeading>

      <ul className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {projects.map((project, i) => (
          <li key={project.slug} className={spanFor(i, projects.length)}>
            <Reveal delay={(i % 2) * 0.06} className="h-full">
              <ProjectCard
                project={project}
                index={i}
                wide={i === 0 && projects.length % 2 === 1}
                onOpen={setSelected}
              />
            </Reveal>
          </li>
        ))}
      </ul>

      <AnimatePresence>{selected ? <ProjectModal key={selected.slug} project={selected} onClose={close} /> : null}</AnimatePresence>
    </Section>
  )
}

