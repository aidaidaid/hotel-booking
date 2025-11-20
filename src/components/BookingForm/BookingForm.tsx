import { countries } from '../../data/constants'
import { Select } from '../Select/Select'
import { BoardTypeSelector } from '../BoardTypeSelector/BoardTypeSelector'
import './BookingForm.scss'
import { BookingFormProps } from './BookingForm.types'

const getToday = () => {
  const today = new Date()
  today.setMinutes(today.getMinutes() - today.getTimezoneOffset())
  return today.toISOString().split('T')[0]
}

export const BookingForm = ({ form, onChange }: BookingFormProps) => {
  const countryOptions = countries.map((country) => ({
    value: country.name,
    label: country.name,
  }))

  return (
    <section className="panel">
      <div className="form-grid">
        <label className="field">
          <span>Citizenship</span>
          <Select
            className="congif-select"
            value={form.citizenship}
            onChange={(value) => onChange('citizenship', value)}
            options={countryOptions}
            placeholder="Select..."
          />
        </label>

        <label className="field">
          <span>Start date</span>
          <input
            type="date"
            min={getToday()}
            value={form.startDate}
            onChange={(e) => onChange('startDate', e.target.value)}
          />
        </label>

        <label className="field">
          <span>Number of days (1-30)</span>
          <input
            type="number"
            min={1}
            max={30}
            value={form.days === 0 ? '' : form.days}
            onChange={(e) => {
              const rawValue = e.target.value
              if (rawValue === '') {
                onChange('days', 0)
                return
              }
              let num = Number(rawValue)
              if (isNaN(num) || num < 1) num = 1
              if (num > 30) num = 30
              onChange('days', num)
            }}
          />
        </label>

        <label className="field">
          <span>Destination country</span>
          <Select
            className="congif-select"
            value={form.destination}
            onChange={(value) => onChange('destination', value)}
            options={countryOptions}
            placeholder="Select..."
          />
        </label>
      </div>

      <BoardTypeSelector value={form.boardType} onChange={(value) => onChange('boardType', value)} />
    </section>
  )
}