import { useMemo } from 'react'
import { boardTypes as boardTypeOptions } from '../../data/constants'
import { formatDate } from '../../utils/dates/formatDate'
import './Summary.scss'
import { SummaryProps } from './Summary.types'

const boardTypeLookup = boardTypeOptions.reduce<Record<string, string>>((acc, board) => {
  acc[board.code] = board.name
  return acc
}, {})

const currencyFormatter = new Intl.NumberFormat(undefined, {
  style: 'currency',
  currency: 'USD',
})

export const Summary = ({ form, calculationResult }: SummaryProps) => {
  const { priceRows, grandTotal } = calculationResult

  // Memoize formatCurrency to avoid recreating on every render
  const formatCurrency = useMemo(
    () => (value: number) => currencyFormatter.format(value),
    [],
  )

  return (
    <section className="panel">
      <header className="panel-header">
        <h2>Review selections and pricing</h2>
      </header>

      <div className="summary-grid">
        <div className="summary-card">
          <h3>Configuration</h3>
          <ul>
            <li>
              <span>Citizenship</span>
              <strong>{form.citizenship || '—'}</strong>
            </li>
            <li>
              <span>Start date</span>
              <strong>{formatDate(form.startDate)}</strong>
            </li>
            <li>
              <span>Trip length</span>
              <strong>{form.days} days</strong>
            </li>
            <li>
              <span>Destination</span>
              <strong>{form.destination || '—'}</strong>
            </li>
            <li>
              <span>Board type</span>
              <strong>{boardTypeLookup[form.boardType] || '—'}</strong>
            </li>
          </ul>
        </div>

        <div className="summary-card">
          <h3>Daily selections</h3>
          <ul className="daily-list">
            {priceRows.map((row, index) => (
              <li key={row.day.key}>
                <p>{`Day ${index + 1} · ${row.day.subtitle}`}</p>
                <div>
                  <span>Hotel</span>
                  <strong>{row.hotel?.name || '—'}</strong>
                </div>
                <div>
                  <span>Lunch</span>
                  <strong>{row.lunch?.name || '—'}</strong>
                </div>
                <div>
                  <span>Dinner</span>
                  <strong>{row.dinner?.name || '—'}</strong>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="totals-card">
        <header>
          <h3>Price</h3>
          <strong>{formatCurrency(grandTotal)}</strong>
        </header>
        <ul>
          {priceRows.map((row, index) => (
            <li key={row.day.key}>
              <span>{`Day ${index + 1}`}</span>
              <span className="muted">
                {[
                  row.hotel ? `${row.hotel.name} (${formatCurrency(row.hotel.price)})` : null,
                  row.lunch ? `${row.lunch.name} (${formatCurrency(row.lunch.price)})` : null,
                  row.dinner ? `${row.dinner.name} (${formatCurrency(row.dinner.price)})` : null,
                ]
                  .filter((item): item is string => item !== null)
                  .join(' + ') || 'No selections'}
              </span>
              <strong>{formatCurrency(row.total)}</strong>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}