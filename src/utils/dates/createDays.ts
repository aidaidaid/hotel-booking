import { DayDescriptor } from '../../App.types'

export const createDays = (startDate: string, dayCount: number): DayDescriptor[] => {
  const totalDays = Math.max(1, Number(dayCount) || 1)
  const baseDate = startDate ? new Date(startDate) : null

  return Array.from({ length: totalDays }, (_, index) => {
    const currentDate = baseDate ? new Date(baseDate) : null
    if (currentDate) {
      currentDate.setDate(currentDate.getDate() + index)
    }
    const subtitle = currentDate
      ? currentDate.toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' })
      : 'Date TBD'
    const key = currentDate ? currentDate.toISOString().split('T')[0] : `day-${index + 1}`

    return {
      key,
      subtitle,
    }
  })
}