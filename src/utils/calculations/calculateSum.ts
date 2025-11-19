import { hotelsByCountry, mealsByCountry } from '../../data/constants'
import type { Hotel, MealOption, MealPlan } from '../../data/types'
import { DayDescriptor, FormState, SelectionsState } from '../../App.types'

export interface PriceRow {
  day: DayDescriptor
  hotel: Hotel | undefined
  lunch: MealOption | undefined
  dinner: MealOption | undefined
  total: number
}

export interface CalculationResult {
  priceRows: PriceRow[]
  grandTotal: number
}

const defaultMealPlan: MealPlan = { lunch: [], dinner: [] }

export function calculateSum(
  form: FormState,
  days: DayDescriptor[],
  selections: SelectionsState,
): CalculationResult {
  const hotels = form.destination ? hotelsByCountry[form.destination] ?? [] : []
  const meals = form.destination ? mealsByCountry[form.destination] ?? defaultMealPlan : defaultMealPlan

  const hotelMap = new Map<number, Hotel>()
  hotels.forEach((hotel) => hotelMap.set(hotel.id, hotel))

  const lunchMap = new Map<number, MealOption>()
  meals.lunch.forEach((meal) => lunchMap.set(meal.id, meal))

  const dinnerMap = new Map<number, MealOption>()
  meals.dinner.forEach((meal) => dinnerMap.set(meal.id, meal))

  const priceRows: PriceRow[] = days.map((day) => {
    const selection = selections[day.key]
    const hotel = selection?.hotelId ? hotelMap.get(selection.hotelId) : undefined
    const lunch = selection?.lunchId ? lunchMap.get(selection.lunchId) : undefined
    const dinner = selection?.dinnerId ? dinnerMap.get(selection.dinnerId) : undefined
    const total = (hotel?.price ?? 0) + (lunch?.price ?? 0) + (dinner?.price ?? 0)

    return {
      day,
      hotel,
      lunch,
      dinner,
      total,
    }
  })

  const grandTotal = priceRows.reduce((sum, row) => sum + row.total, 0)

  return {
    priceRows,
    grandTotal,
  }
}