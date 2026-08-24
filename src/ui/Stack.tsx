import type { ReactNode } from 'react'

type StackProps = {
  direction?: 'row' | 'column'
  gap?: 'sm' | 'md' | 'lg'
  align?: 'stretch' | 'start' | 'center' | 'between'
  as?: 'div' | 'ul' | 'li' | 'span'
  children: ReactNode
}

const DIRECTION_CLASSES = { row: 'tw:flex-row tw:flex-wrap', column: 'tw:flex-col' } as const
const GAP_CLASSES = { sm: 'tw:gap-2', md: 'tw:gap-3', lg: 'tw:gap-6' } as const
const ALIGN_CLASSES = {
  stretch: 'tw:items-stretch',
  start: 'tw:items-start',
  center: 'tw:items-center',
  between: 'tw:items-center tw:justify-between',
} as const

const Stack = ({ direction = 'column', gap = 'md', align = 'stretch', as = 'div', children }: StackProps) => {
  const Element = as
  return (
    <Element
      className={`tw:flex ${DIRECTION_CLASSES[direction]} ${GAP_CLASSES[gap]} ${ALIGN_CLASSES[align]}`}
    >
      {children}
    </Element>
  )
}

export { Stack }
export type { StackProps }
