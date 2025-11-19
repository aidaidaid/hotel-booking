import { useState, useEffect } from 'react'
import { FormState, SelectionsState } from '../App.types'

const STORAGE_KEY = 'hotel-booking-data'

export const useLocalStorage = () => {
  const [hasSavedData, setHasSavedData] = useState(false)

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY)
    setHasSavedData(!!saved)
  }, [])

  const saveData = (form: FormState, selections: SelectionsState) => {
    const payload = {
      form,
      selections,
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(payload))
    setHasSavedData(true)
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