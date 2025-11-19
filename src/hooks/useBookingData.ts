import { useMemo } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../store'
import { createDays } from '../utils/dates/createDays'
import { useBookingValidation } from './useBookingValidation'
import { useSelectionsSync } from './useSelectionsSync'
import { useDataLoader } from './useDataLoader'
import { useLocalStorage } from './useLocalStorage'

export const useBookingData = () => {
  const form = useSelector((state: RootState) => state.form)
  const selections = useSelector((state: RootState) => state.selections)

  const { hasSavedData, saveData, loadDataFromStorage } = useLocalStorage()
  const { isLoading, pendingSelections, loadData, clearPendingSelections } = useDataLoader(loadDataFromStorage)

  const days = useMemo(() => createDays(form.startDate, form.days), [form.startDate, form.days])
  const { configComplete, allHotelsSelected } = useBookingValidation(form, days, selections)

  useSelectionsSync({
    days,
    form,
    pendingSelections,
    isLoading,
    onLoadComplete: clearPendingSelections,
  })

  return {
    form,
    selections,
    days,
    configComplete,
    allHotelsSelected,
    hasSavedData,
    saveData,
    loadData,
  }
}