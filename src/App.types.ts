import { ReactNode } from 'react'

export type BoardTypeCode = 'FB' | 'HB' | 'NB'

export interface FormState {
  citizenship: string
  startDate: string
  days: number
  destination: string
  boardType: BoardTypeCode
}

export type FormField = keyof FormState

export interface DaySelection {
  hotelId: number | null
  lunchId: number | null
  dinnerId: number | null
}

export type SelectionField = keyof DaySelection

export type SelectionsState = Record<string, DaySelection>

export interface DayDescriptor {
  key: string
  subtitle: string
}

export interface StepConfig {
  id: string
  title: string
  subtitle: string
  component: ReactNode
  isComplete: boolean
  isLocked: boolean
}