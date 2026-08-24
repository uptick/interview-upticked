import type { ReactNode } from 'react'

type BadgeTone = 'neutral' | 'info' | 'warning' | 'danger' | 'success'

type BadgeProps = {
  tone?: BadgeTone
  children: ReactNode
}

const TONE_CLASSES: Record<BadgeTone, string> = {
  neutral: 'tw:bg-slate-100 tw:text-slate-700',
  info: 'tw:bg-sky-100 tw:text-sky-800',
  warning: 'tw:bg-amber-100 tw:text-amber-900',
  danger: 'tw:bg-rose-100 tw:text-rose-800',
  success: 'tw:bg-emerald-100 tw:text-emerald-800',
}

const Badge = ({ tone = 'neutral', children }: BadgeProps) => (
  <span
    className={`tw:inline-flex tw:items-center tw:rounded-full tw:px-2 tw:py-0.5 tw:text-xs tw:font-medium ${TONE_CLASSES[tone]}`}
  >
    {children}
  </span>
)

export { Badge }
export type { BadgeProps, BadgeTone }
