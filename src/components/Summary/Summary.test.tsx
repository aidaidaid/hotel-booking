import { render, screen } from '@testing-library/react'
import { Summary } from './Summary'
import { FormState, SelectionsState } from '../../App.types'
import { createDays } from '../../utils/dates/createDays'
import { calculateSum } from '../../utils/calculations/calculateSum'

const form: FormState = {
  citizenship: 'USA',
  startDate: '2026-01-01',
  days: 1,
  destination: 'Turkey',
  boardType: 'FB',
}

const days = createDays(form.startDate, form.days)

const selections: SelectionsState = {
  [days[0].key]: { hotelId: 101, lunchId: 4, dinnerId: 1 },
}

const calculationResult = calculateSum(form, days, selections)

describe('Summary component', () => {
  it('renders chosen configuration and selections', () => {
    render(<Summary form={form} calculationResult={calculationResult} />)
    expect(screen.getByText('USA')).toBeInTheDocument()
    expect(screen.getByText('Turkey')).toBeInTheDocument()
    expect(screen.getByText('Full Board')).toBeInTheDocument()
    expect(screen.getByText('Hilton Istanbul')).toBeInTheDocument()
    expect(screen.getByText('Chicken Pilaf')).toBeInTheDocument()
    expect(screen.getByText('Turkish Kebab')).toBeInTheDocument()
    expect(screen.getByText(/Price/i)).toBeInTheDocument()
  })
})