import type { ReactNode } from 'react'

type PageHeaderProps = {
  title: string
  actions?: ReactNode
}

const PageHeader = ({ title, actions }: PageHeaderProps) => (
  <header className="tw:mb-4 tw:flex tw:flex-wrap tw:items-center tw:justify-between tw:gap-3">
    <h1 className="tw:text-xl tw:font-semibold tw:text-slate-900">{title}</h1>
    {actions ? <div className="tw:flex tw:items-center tw:gap-2">{actions}</div> : null}
  </header>
)

export { PageHeader }
export type { PageHeaderProps }
