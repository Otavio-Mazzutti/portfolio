import { ArrowUpRight, X } from 'lucide-react'
import { motion } from 'motion/react'
import { useRef } from 'react'
import { createPortal } from 'react-dom'
import { SiGithub } from 'react-icons/si'
import { useModalBehavior } from '../../hooks/useModalBehavior'
import { useTranslation } from '../../hooks/useTranslation'
import type { LocalizedString, Project } from '../../types'
import { buttonClass } from './buttonClass'
import { ExternalLink } from './ExternalLink'
import { ProjectCover } from './ProjectCover'
import { Tag } from './Tag'

interface ProjectModalProps {
  project: Project
  onClose: () => void
}

function DetailList({ title, items }: { title: string; items: LocalizedString[] }) {
  const { l } = useTranslation()
  return (
    <section>
      <h3 className="label-mono mb-4">{title}</h3>
      <ul className="space-y-3">
        {items.map((item) => (
          <li key={item.en} className="flex gap-3 text-[15px] leading-relaxed text-muted">
            <span aria-hidden="true" className="mt-[0.6em] size-1 shrink-0 rounded-full bg-subtle" />
            <span>{l(item)}</span>
          </li>
        ))}
      </ul>
    </section>
  )
}

export function ProjectModal({ project, onClose }: ProjectModalProps) {
  const { t, l } = useTranslation()
  const panelRef = useRef<HTMLDialogElement>(null)
  useModalBehavior(true, panelRef, onClose)

  const title = l(project.title)
  const titleId = `project-${project.slug}-title`

  return createPortal(
    <div className="fixed inset-0 z-[60] flex items-end justify-center sm:items-center sm:p-6">
      <motion.div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        onClick={onClose}
        aria-hidden="true"
      />
      <motion.dialog
        ref={panelRef}
        open
        aria-modal="true"
        aria-labelledby={titleId}
        className="relative m-0 flex max-h-[92dvh] w-full max-w-3xl flex-col overflow-hidden rounded-t-3xl border border-line bg-bg p-0 text-fg shadow-2xl sm:rounded-3xl"
        initial={{ opacity: 0, y: 40, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 24, scale: 0.98 }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      >
        <button
          type="button"
          onClick={onClose}
          data-autofocus
          aria-label={t.a11y.close}
          className="absolute top-4 right-4 z-10 inline-flex size-9 items-center justify-center rounded-full border border-line bg-bg/80 text-muted backdrop-blur transition-colors hover:text-fg"
        >
          <X size={16} aria-hidden="true" />
        </button>

        <div className="overflow-y-auto overscroll-contain">
          <div className="aspect-[16/7] border-b border-line">
            <ProjectCover project={project} />
          </div>

          <div className="space-y-10 p-6 sm:p-10">
            <header>
              <p className="label-mono mb-3">{t.projects.categories[project.category]}</p>
              <h2 id={titleId} className="text-3xl font-semibold tracking-[-0.03em] sm:text-4xl">
                {title}
              </h2>
              <p className="mt-4 text-[15px] leading-relaxed text-muted">{l(project.details.overview)}</p>
              <div className="mt-6 flex flex-wrap gap-3">
                <ExternalLink href={project.repo} className={buttonClass('primary')}>
                  <SiGithub size={15} aria-hidden={true} />
                  {t.projects.code}
                </ExternalLink>
                {project.demo ? (
                  <ExternalLink href={project.demo} className={buttonClass('secondary')}>
                    {t.projects.demo}
                    <ArrowUpRight size={15} aria-hidden="true" />
                  </ExternalLink>
                ) : null}
              </div>
            </header>

            <section>
              <h3 className="label-mono mb-4">{t.projects.stack}</h3>
              <div className="flex flex-wrap gap-2">
                {project.stack.map((tech) => (
                  <Tag key={tech}>{tech}</Tag>
                ))}
              </div>
            </section>

            <div className="grid gap-10 md:grid-cols-2">
              <DetailList title={t.projects.features} items={project.details.features} />
              <DetailList title={t.projects.architecture} items={project.details.architecture} />
            </div>

            {project.details.run?.length ? (
              <section>
                <h3 className="label-mono mb-4">{t.projects.run}</h3>
                <pre className="overflow-x-auto rounded-xl border border-line bg-surface p-4 font-mono text-[13px] leading-relaxed text-muted">
                  {project.details.run.map((cmd) => (
                    <code key={cmd} className="block">
                      <span className="text-subtle select-none">$ </span>
                      {cmd}
                    </code>
                  ))}
                </pre>
              </section>
            ) : null}
          </div>
        </div>
      </motion.dialog>
    </div>,
    document.body,
  )
}
