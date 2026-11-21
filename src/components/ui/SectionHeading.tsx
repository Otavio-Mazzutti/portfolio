import type { ReactNode } from 'react'
import { Reveal } from './Reveal'

interface SectionHeadingProps {
  id: string
  index: string
  eyebrow: string
  title: string
  children?: ReactNode
}

export function SectionHeading({ id, index, eyebrow, title, children }: SectionHeadingProps) {
  return (
    <Reveal className="mb-12 grid grid-cols-1 gap-6 md:mb-16 md:grid-cols-12">
      <p className="label-mono flex items-center gap-3 md:col-span-3 md:pt-3">
        <span className="text-fg">{index}</span>
        <span aria-hidden="true" className="h-px w-8 bg-line-strong" />
        <span>{eyebrow}</span>
      </p>
      <div className="md:col-span-9">
        <h2 id={id} className="max-w-3xl text-3xl font-semibold tracking-[-0.035em] text-fg sm:text-4xl md:text-5xl">
          {title}
        </h2>
        {children ? <div className="mt-4 max-w-2xl text-muted">{children}</div> : null}
      </div>
    </Reveal>
  )
}
