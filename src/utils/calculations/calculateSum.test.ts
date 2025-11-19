import { FormState, SelectionsState } from '../../App.types'
import { createDays } from '../dates/createDays'
import { calculateSum } from './calculateSum'

const baseForm: FormState = {
  citizenship: 'USA',
  startDate: '2026-01-01',
  days: 2,
  destination: 'Turkey',
  boardType: 'FB',
}

describe('calculateSum', () => {
  it('sums hotel and meal prices for each day', () => {
    const days = createDays(baseForm.startDate, baseForm.days)
    const selections: SelectionsState = {
      [days[0].key]: { hotelId: 101, lunchId: 4, dinnerId: 1 },
      [days[1].key]: { hotelId: 102, lunchId: null, dinnerId: 2 },
    }

    const result = calculateSum(baseForm, days, selections)

    expect(result.grandTotal).toBe(120 + 10 + 15 + 90 + 18)
    expect(result.priceRows[0]).toMatchObject({
      total: 145,
      hotel: expect.objectContaining({ id: 101 }),
      lunch: expect.objectContaining({ id: 4 }),
      dinner: expect.objectContaining({ id: 1 }),
    })
    expect(result.priceRows[1]).toMatchObject({
      total: 108,
      hotel: expect.objectContaining({ id: 102 }),
      lunch: undefined,
      dinner: expect.objectContaining({ id: 2 }),
    })
  })

  it('handles missing selections gracefully', () => {
    const days = createDays(baseForm.startDate, baseForm.days)
    const selections: SelectionsState = {
      [days[0].key]: { hotelId: null, lunchId: null, dinnerId: null },
      [days[1].key]: { hotelId: 101, lunchId: 4, dinnerId: null },
    }

    const result = calculateSum(baseForm, days, selections)

    expect(result.grandTotal).toBe(130)
    expect(result.priceRows[0].total).toBe(0)
    expect(result.priceRows[1].total).toBe(130)
  })
})

