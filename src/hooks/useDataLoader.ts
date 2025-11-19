import { useState, useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '../store'
import { FormState, SelectionsState } from '../App.types'
import { loadForm } from '../store/formReducer'

export const useDataLoader = (loadDataFromStorage: () => { form: FormState; selections: SelectionsState } | null) => {
  const dispatch = useDispatch<AppDispatch>()
  const [isLoading, setIsLoading] = useState(false)
  const [pendingSelections, setPendingSelections] = useState<SelectionsState | null>(null)

  const loadData = useCallback(() => {
    const loadedData = loadDataFromStorage()
    if (!loadedData) return

    setPendingSelections(loadedData.selections)
    setIsLoading(true)
    dispatch(loadForm(loadedData.form))
  }, [loadDataFromStorage, dispatch])

  const clearPendingSelections = useCallback(() => {
    setPendingSelections(null)
    setIsLoading(false)
  }, [])

  return {
    isLoading,
    pendingSelections,
    loadData,
    clearPendingSelections,
  }
}