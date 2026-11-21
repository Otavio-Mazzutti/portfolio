export type Variant = 'primary' | 'secondary' | 'ghost'

const base =
  'group inline-flex h-11 items-center justify-center gap-2 rounded-full px-5 text-sm font-medium tracking-tight transition-[background-color,border-color,color,transform] duration-200 active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50'

const variants: Record<Variant, string> = {
  primary: 'bg-fg text-bg hover:bg-fg/85',
  secondary: 'border border-line-strong bg-surface text-fg hover:border-subtle hover:bg-elevated',
  ghost: 'text-muted hover:text-fg',
}

export function buttonClass(variant: Variant = 'primary', className = '') {
  return `${base} ${variants[variant]} ${className}`
}
