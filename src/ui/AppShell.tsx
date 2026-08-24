import type { ReactNode } from 'react'

/**
 * Class names the shell exposes for router-aware links. The utility scan only
 * covers this directory, so the strings have to be declared here rather than
 * written at the call site.
 */
const NAV_LINK_CLASS_NAME =
  'tw:block tw:rounded-md tw:px-3 tw:py-2 tw:text-sm tw:font-medium tw:text-slate-600 tw:hover:bg-slate-100'
const NAV_LINK_ACTIVE_CLASS_NAME = 'tw:bg-slate-900 tw:text-white tw:hover:bg-slate-900'

type AppShellProps = {
  productName: string
  navigation: ReactNode
  children: ReactNode
}

const AppShell = ({ productName, navigation, children }: AppShellProps) => (
  <div className="tw:mx-auto tw:flex tw:min-h-screen tw:max-w-5xl tw:gap-6 tw:p-6">
    <aside className="tw:w-44 tw:shrink-0">
      <p className="tw:mb-4 tw:text-base tw:font-semibold tw:text-slate-900">{productName}</p>
      <nav aria-label={productName}>{navigation}</nav>
    </aside>
    <main className="tw:min-w-0 tw:flex-1">{children}</main>
  </div>
)

export { AppShell, NAV_LINK_ACTIVE_CLASS_NAME, NAV_LINK_CLASS_NAME }
export type { AppShellProps }
