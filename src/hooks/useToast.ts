import { useState, useCallback } from 'react'
import { ToastItem, ToastType } from '../components/Toast/Toast.types'

const MAX_TOASTS = 4

export const useToast = () => {
  const [toasts, setToasts] = useState<ToastItem[]>([])

  const showToast = useCallback((message: string, type: ToastType = 'success', duration = 3000) => {
    const id = `toast-${Date.now()}-${Math.random()}`
    const newToast: ToastItem = {
      id,
      message,
      type,
      duration,
    }

    setToasts((prev) => {
      const updated = [newToast, ...prev]
      return updated.slice(0, MAX_TOASTS)
    })
  }, [])

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id))
  }, [])

  return {
    toasts,
    showToast,
    removeToast,
  }
}