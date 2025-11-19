import { FormState } from '../../App.types'

export const isDateRangeValid = (startDate: string, days: number): boolean => {
  if (!startDate) {
    return false
  }
  const parsed = new Date(startDate)
  if (Number.isNaN(parsed.getTime())) {
    return false
  }
  return Number.isFinite(days) && days >= 1 && days <= 30
}

export const isFormConfigComplete = (form: FormState): boolean => {
  if (!form.citizenship || !form.destination || !form.boardType) {
    return false
  }
  return isDateRangeValid(form.startDate, form.days)
}