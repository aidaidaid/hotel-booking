import { useMemo } from 'react'
import { useSelector } from 'react-redux'
import { DailyConfig } from '../components/DailyConfig/DailyConfig'
import { RootState } from '../store'
import { createDays } from '../utils/dates/createDays'
import { useSelections } from '../hooks/useSelections'

export const DailyConfigStep = () => {
  const form = useSelector((state: RootState) => state.form)
  const selections = useSelector((state: RootState) => state.selections)
  const { handleDayUpdate } = useSelections()

  const days = useMemo(() => createDays(form.startDate, form.days), [form.startDate, form.days])

  return (
    <DailyConfig
      days={days}
      destination={form.destination}
      boardType={form.boardType}
      selections={selections}
      onUpdate={handleDayUpdate}
    />
  )
}