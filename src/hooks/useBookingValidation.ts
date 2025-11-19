import { useMemo } from 'react'
import { DayDescriptor, FormState, SelectionsState } from '../App.types'
import { isFormConfigComplete } from '../utils/validation/formValidation'

export const useBookingValidation = (
  form: FormState,
  days: DayDescriptor[],
  selections: SelectionsState,
) => {
  const configComplete = useMemo(() => isFormConfigComplete(form), [form])

  const allHotelsSelected = useMemo(() => {
    if (!days.length) return false
    return days.every((day) => {
      const selection = selections[day.key]
      return Boolean(selection && selection.hotelId)
    })
  }, [days, selections])

  const hasDailySelections = useMemo(() => {
    const values = Object.values(selections)
    return values.some((selection) => selection && (selection.hotelId || selection.lunchId || selection.dinnerId))
  }, [selections])

  return {
    configComplete,
    allHotelsSelected,
    hasDailySelections,
  }
}