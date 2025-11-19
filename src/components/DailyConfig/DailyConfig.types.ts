import { BoardTypeCode, DayDescriptor, SelectionField, SelectionsState } from '../../App.types'

export interface DailyConfigProps {
  days: DayDescriptor[]
  destination: string
  boardType: BoardTypeCode
  selections: SelectionsState
  onUpdate: (dayKey: string, field: SelectionField, value: number | null) => void
}