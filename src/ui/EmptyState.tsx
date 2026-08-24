type EmptyStateProps = {
  message: string
}

const EmptyState = ({ message }: EmptyStateProps) => (
  <p className="tw:rounded-md tw:border tw:border-dashed tw:border-slate-300 tw:p-6 tw:text-center tw:text-sm tw:text-slate-500">
    {message}
  </p>
)

export { EmptyState }
export type { EmptyStateProps }
