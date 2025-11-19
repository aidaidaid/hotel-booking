import { useMemo } from 'react'
import { useSelector } from 'react-redux'
import { Summary } from '../components/Summary/Summary'
import { RootState } from '../store'
import { createDays } from '../utils/dates/createDays'
import { calculateSum } from '../utils/calculations/calculateSum'

export const SummaryStep = () => {
  const form = useSelector((state: RootState) => state.form)
  const selections = useSelector((state: RootState) => state.selections)
  const days = useMemo(() => createDays(form.startDate, form.days), [form.startDate, form.days])
  const calculationResult = useMemo(
    () => calculateSum(form, days, selections),
    [form, days, selections],
  )
  return <Summary form={form} calculationResult={calculationResult} />
}