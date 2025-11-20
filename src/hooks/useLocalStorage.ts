import { useState, useEffect } from 'react'
import { FormState, SelectionsState } from '../App.types'

const STORAGE_KEY = 'hotel-booking-data'

export interface UseLocalStorageCallbacks {
  onSuccess?: () => void
  onError?: (error: Error) => void
}

export const useLocalStorage = () => {
  const [hasSavedData, setHasSavedData] = useState(false)

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY)
    setHasSavedData(!!saved)
  }, [])

  const saveData = (form: FormState, selections: SelectionsState, callbacks?: UseLocalStorageCallbacks) => {
    try {
      const payload = {
        form,
        selections,
      }
      localStorage.setItem(STORAGE_KEY, JSON.stringify(payload))
      setHasSavedData(true)
      callbacks?.onSuccess?.()
    } catch (error) {
      const err = error instanceof Error ? error : new Error('Failed to save data')
      console.error('Failed to save data to localStorage:', err)
      callbacks?.onError?.(err)
    }
  }

  const loadDataFromStorage = (): { form: FormState; selections: SelectionsState } | null => {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (!saved) return null

    try {
      const parsed = JSON.parse(saved) as { form: FormState; selections: SelectionsState }
      setHasSavedData(true)
      return parsed
    } catch (error) {
      console.error('Failed to load saved data:', error)
      setHasSavedData(false)
      return null
    }
  }

  return {
    hasSavedData,
    saveData,
    loadDataFromStorage,
  }
}