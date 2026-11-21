import type { HTMLAttributes, PointerEvent } from 'react'

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  /** Enables the subtle cursor-follow highlight. */
  interactive?: boolean
}

function trackPointer(event: PointerEvent<HTMLDivElement>) {
  if (event.pointerType !== 'mouse') return
  const el = event.currentTarget
  const rect = el.getBoundingClientRect()
  el.style.setProperty('--x', `${event.clientX - rect.left}px`)
  el.style.setProperty('--y', `${event.clientY - rect.top}px`)
}

export function Card({ interactive = false, className = '', children, onPointerMove, ...rest }: CardProps) {
  return (
    <div
      className={`relative overflow-hidden rounded-2xl border border-line bg-surface ${
        interactive ? 'spotlight transition-colors duration-300 hover:border-line-strong' : ''
      } ${className}`}
      onPointerMove={
        interactive
          ? (e) => {
              trackPointer(e)
              onPointerMove?.(e)
            }
          : onPointerMove
      }
      {...rest}
    >
      {children}
    </div>
  )
}
