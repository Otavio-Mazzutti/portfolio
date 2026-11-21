import type { ReactNode } from 'react'

export function Tag({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border border-line bg-elevated/60 px-2.5 py-1 font-mono text-[11px] leading-none text-muted">
      {children}
    </span>
  )
}
