import type { ReactNode } from 'react'

interface SectionProps {
  id: string
  labelledBy: string
  children: ReactNode
  className?: string
}

export function Section({ id, labelledBy, children, className = '' }: SectionProps) {
  return (
    <section id={id} aria-labelledby={labelledBy} className={`relative py-24 md:py-32 ${className}`}>
      <div className="container-page">{children}</div>
    </section>
  )
}
