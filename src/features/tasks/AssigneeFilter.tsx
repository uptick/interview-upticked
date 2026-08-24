import { useEffect, useState } from 'react'

type AssigneeOption = {
  id: string
  name: string
}

type AssigneeFilterProps = {
  listId: string
  value: string
  onChange: (assigneeId: string) => void
}

const AssigneeFilter = ({ listId, value, onChange }: AssigneeFilterProps) => {
  const [options, setOptions] = useState<AssigneeOption[]>([])

  useEffect(() => {
    fetch(`/api/lists/${listId}/members?fields=name`)
      .then((response) => response.json())
      .then((body: { data: AssigneeOption[] }) => setOptions(body.data))
  }, [listId])

  return (
    <span>
      <select value={value} onChange={(event) => onChange(event.target.value)}>
        <option value="">All assignees</option>
        {options.map((option) => (
          <option key={option.id} value={option.id}>
            {option.name}
          </option>
        ))}
      </select>
      {value ? (
        <button type="button" onClick={() => onChange('')}>
          ×
        </button>
      ) : null}
    </span>
  )
}

export { AssigneeFilter }
export type { AssigneeFilterProps, AssigneeOption }
