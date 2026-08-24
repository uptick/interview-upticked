import type { ButtonHTMLAttributes, ReactNode } from 'react'

type ButtonVariant = 'primary' | 'secondary' | 'ghost'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant
  children: ReactNode
}

const VARIANT_CLASSES: Record<ButtonVariant, string> = {
  primary: 'tw:bg-slate-900 tw:text-white tw:hover:bg-slate-700',
  secondary: 'tw:bg-white tw:text-slate-900 tw:border tw:border-slate-300 tw:hover:bg-slate-50',
  ghost: 'tw:bg-transparent tw:text-slate-700 tw:hover:bg-slate-100',
}

const Button = ({ variant = 'secondary', children, ...buttonProps }: ButtonProps) => (
  <button
    type="button"
    className={`tw:inline-flex tw:items-center tw:gap-2 tw:rounded-md tw:px-3 tw:py-1.5 tw:text-sm tw:font-medium tw:transition-colors tw:disabled:opacity-50 ${VARIANT_CLASSES[variant]}`}
    {...buttonProps}
  >
    {children}
  </button>
)

export { Button }
export type { ButtonProps, ButtonVariant }
