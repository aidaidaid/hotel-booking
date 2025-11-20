export type ToastType = 'success' | 'error' | 'info'

export interface ToastProps {
  message: string
  type?: ToastType
  onClose: () => void
  duration?: number
}

export interface ToastItem {
  id: string
  message: string
  type: ToastType
  duration?: number
  isExiting?: boolean
}