import type { IconComponent } from '../../types'
import { ExternalLink } from './ExternalLink'

interface IconLinkProps {
  href: string
  label: string
  icon: IconComponent
  className?: string
}

export function IconLink({ href, label, icon: Icon, className = '' }: IconLinkProps) {
  return (
    <ExternalLink
      href={href}
      aria-label={label}
      title={label}
      className={`inline-flex size-10 items-center justify-center rounded-full border border-line text-muted transition-colors duration-200 hover:border-line-strong hover:bg-elevated hover:text-fg ${className}`}
    >
      <Icon size={16} aria-hidden={true} />
    </ExternalLink>
  )
}
