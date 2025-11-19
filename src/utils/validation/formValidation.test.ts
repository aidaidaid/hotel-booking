import { FormState } from '../../App.types'
import { isDateRangeValid, isFormConfigComplete } from './formValidation'

const baseForm: FormState = {
  citizenship: 'USA',
  startDate: '2026-01-01',
  days: 5,
  destination: 'Turkey',
  boardType: 'FB',
}

describe('form validation helpers', () => {
  it('validates required fields and date range', () => {
    expect(isFormConfigComplete(baseForm)).toBe(true)
    expect(isFormConfigComplete({ ...baseForm, destination: '' })).toBe(false)
    expect(isFormConfigComplete({ ...baseForm, startDate: '' })).toBe(false)
    expect(isFormConfigComplete({ ...baseForm, days: 0 })).toBe(false)
  })

  it('ensures date range bounds are respected', () => {
    expect(isDateRangeValid('2026-01-01', 30)).toBe(true)
    expect(isDateRangeValid('invalid', 5)).toBe(false)
    expect(isDateRangeValid('2026-01-01', 0)).toBe(false)
    expect(isDateRangeValid('2026-01-01', 31)).toBe(false)
  })
})