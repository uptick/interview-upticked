// Due dates are date-only strings (YYYY-MM-DD). They are never instants, so they
// must never be parsed with `new Date(value)`, which reads them as UTC midnight
// and shifts the day for anyone west of Greenwich. See docs/conventions/dates.md.

type DueDateBucket = 'overdue' | 'today' | 'upcoming'

const DATE_ONLY_PATTERN = /^\d{4}-\d{2}-\d{2}$/

const MONTH_NAMES = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

const assertDateOnly = (value: string) => {
  if (!DATE_ONLY_PATTERN.test(value)) {
    throw new Error(`Expected a date-only string (YYYY-MM-DD), received "${value}"`)
  }
}

/** Today in the viewer's local timezone, as a date-only string. */
const todayAsDateOnly = () => {
  const now = new Date()
  const month = String(now.getMonth() + 1).padStart(2, '0')
  const dayOfMonth = String(now.getDate()).padStart(2, '0')
  return `${now.getFullYear()}-${month}-${dayOfMonth}`
}

/** Shifts a date-only string by a whole number of days. */
const addDays = (dateOnly: string, days: number) => {
  assertDateOnly(dateOnly)
  const [year, month, dayOfMonth] = dateOnly.split('-').map(Number) as [number, number, number]
  const shifted = new Date(year, month - 1, dayOfMonth + days)
  const shiftedMonth = String(shifted.getMonth() + 1).padStart(2, '0')
  const shiftedDayOfMonth = String(shifted.getDate()).padStart(2, '0')
  return `${shifted.getFullYear()}-${shiftedMonth}-${shiftedDayOfMonth}`
}

/** Renders a date-only string for display, e.g. "24 Aug 2026". */
const formatDate = (dateOnly: string) => {
  assertDateOnly(dateOnly)
  const [year, month, dayOfMonth] = dateOnly.split('-') as [string, string, string]
  return `${Number(dayOfMonth)} ${MONTH_NAMES[Number(month) - 1]} ${year}`
}

/**
 * Classifies a due date relative to a reference day. Both arguments are
 * date-only strings, so the comparison is a plain lexicographic one.
 */
const bucketByDueDate = (dueDate: string, today: string): DueDateBucket => {
  assertDateOnly(dueDate)
  assertDateOnly(today)
  if (dueDate < today) return 'overdue'
  if (dueDate === today) return 'today'
  return 'upcoming'
}

export { addDays, bucketByDueDate, formatDate, todayAsDateOnly }
export type { DueDateBucket }
