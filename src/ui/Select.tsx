import { useId } from 'react'

type SelectOption = {
  value: string
  label: string
}

type SelectProps = {
  label: string
  value: string
  options: readonly SelectOption[]
  onChange: (value: string) => void
}

const Select = ({ label, value, options, onChange }: SelectProps) => {
  const selectId = useId()
  return (
    <span className="tw:inline-flex tw:items-center tw:gap-2">
      <label htmlFor={selectId} className="tw:text-sm tw:text-slate-600">
        {label}
      </label>
      <select
        id={selectId}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="tw:rounded-md tw:border tw:border-slate-300 tw:bg-white tw:px-2 tw:py-1.5 tw:text-sm"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </span>
  )
}

export { Select }
export type { SelectOption, SelectProps }
