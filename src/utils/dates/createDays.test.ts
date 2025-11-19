import { createDays } from './createDays'

describe('createDays', () => {
  it('generates sequential day descriptors from start date', () => {
    const days = createDays('2026-11-19', 3)
    expect(days).toHaveLength(3)
    expect(days[0].key).toBe('2026-11-19')
    expect(days[1].key).toBe('2026-11-20')
    expect(days[2].key).toBe('2026-11-21')
    expect(days[0].subtitle).toContain('Nov')
  })

  it('falls back to placeholders when start date is missing', () => {
    const days = createDays('', 2)
    expect(days[0].key).toBe('day-1')
    expect(days[0].subtitle).toBe('Date TBD')
  })
})