import type { ReactNode } from 'react'

type CardProps = {
  children: ReactNode
}

const Card = ({ children }: CardProps) => (
  <section className="tw:rounded-lg tw:border tw:border-slate-200 tw:bg-white tw:p-4 tw:shadow-sm">
    {children}
  </section>
)

export { Card }
export type { CardProps }
