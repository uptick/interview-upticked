import type { ReactNode } from 'react'

type TextProps = {
  size?: 'sm' | 'md' | 'lg'
  tone?: 'default' | 'muted'
  weight?: 'regular' | 'medium' | 'semibold'
  as?: 'span' | 'p' | 'h2'
  children: ReactNode
}

const SIZE_CLASSES = { sm: 'tw:text-xs', md: 'tw:text-sm', lg: 'tw:text-base' } as const
const TONE_CLASSES = { default: 'tw:text-slate-800', muted: 'tw:text-slate-500' } as const
const WEIGHT_CLASSES = {
  regular: 'tw:font-normal',
  medium: 'tw:font-medium',
  semibold: 'tw:font-semibold',
} as const

const Text = ({ size = 'md', tone = 'default', weight = 'regular', as = 'span', children }: TextProps) => {
  const Element = as
  return (
    <Element className={`${SIZE_CLASSES[size]} ${TONE_CLASSES[tone]} ${WEIGHT_CLASSES[weight]}`}>
      {children}
    </Element>
  )
}

export { Text }
export type { TextProps }
