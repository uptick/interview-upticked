import { describe, expect, it } from 'vitest'
import { addDays, bucketByDueDate, formatDate } from '~/lib/dates'

describe('formatDate', () => {
  it('renders the day the string names, not the day the local timezone lands on', () => {
    expect(formatDate('2026-08-24')).toBe('24 Aug 2026')
    expect(formatDate('2026-01-01')).toBe('1 Jan 2026')
    expect(formatDate('2026-12-31')).toBe('31 Dec 2026')
  })

  it('rejects anything that is not a date-only string', () => {
    expect(() => formatDate('2026-08-24T00:00:00Z')).toThrow(/date-only/)
  })
})

describe('addDays', () => {
  it('crosses month and year boundaries', () => {
    expect(addDays('2026-08-31', 1)).toBe('2026-09-01')
    expect(addDays('2026-01-01', -1)).toBe('2025-12-31')
    expect(addDays('2026-08-24', 0)).toBe('2026-08-24')
  })
})

describe('bucketByDueDate', () => {
  const today = '2026-08-24'

  it('buckets the day either side of the reference day', () => {
    expect(bucketByDueDate('2026-08-23', today)).toBe('overdue')
    expect(bucketByDueDate('2026-08-24', today)).toBe('today')
    expect(bucketByDueDate('2026-08-25', today)).toBe('upcoming')
  })

  it('treats a distant future date as upcoming', () => {
    expect(bucketByDueDate('2027-03-01', today)).toBe('upcoming')
  })
})
