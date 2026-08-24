import type { ReactNode } from 'react'

/** For router-aware links, which must be rendered by the caller. */
const LINK_CLASS_NAME = 'tw:text-sm tw:font-medium tw:text-sky-700 tw:underline tw:hover:text-sky-900'

type TextLinkProps = {
  href: string
  children: ReactNode
}

const TextLink = ({ href, children }: TextLinkProps) => (
  <a href={href} className={LINK_CLASS_NAME}>
    {children}
  </a>
)

export { LINK_CLASS_NAME, TextLink }
export type { TextLinkProps }
