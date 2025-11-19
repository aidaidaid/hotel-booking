import { hotelsByCountry, mealsByCountry } from '../../data/constants'
import type { MealPlan } from '../../data/types'
import { DaySelection, SelectionField } from '../../App.types'
import { Select } from '../Select/Select'
import './DailyTable.scss'
import { DailyTableProps } from './DailyTable.types'

const defaultMealPlan: MealPlan = { lunch: [], dinner: [] }

export const DailyTable = ({ days, destination, boardType, selections, onUpdate }: DailyTableProps) => {
  const hotels = destination ? hotelsByCountry[destination] ?? [] : []
  const meals = destination ? mealsByCountry[destination] ?? defaultMealPlan : defaultMealPlan

  const mealsDisabled = boardType === 'NB' || !destination

  const handleSelection = (dayKey: string, field: SelectionField, value: string) => {
    const normalizedValue = value ? Number(value) : null
    onUpdate(dayKey, field, normalizedValue)
  }

  const hotelOptions = hotels.map((hotel) => ({
    value: hotel.id,
    label: `${hotel.name} ($${hotel.price}/night)`,
  }))

  const lunchOptions = [
    { value: '', label: 'No lunch' },
    ...meals.lunch.map((meal) => ({
      value: meal.id,
      label: `${meal.name} ($${meal.price})`,
    })),
  ]

  const dinnerOptions = [
    { value: '', label: 'No dinner' },
    ...meals.dinner.map((meal) => ({
      value: meal.id,
      label: `${meal.name} ($${meal.price})`,
    })),
  ]

  return (
    <div className="table-wrapper">
      <table>
        <thead>
          <tr>
            <th>Day</th>
            <th>Hotel</th>
            <th>Lunch</th>
            <th>Dinner</th>
          </tr>
        </thead>
        <tbody>
          {days.map((day, index) => {
            const selection: DaySelection = selections[day.key] ?? {
              hotelId: null,
              lunchId: null,
              dinnerId: null,
            }
            return (
              <tr key={day.key}>
                <td className='day'>
                  <p className="day-label">{`Day ${index + 1}`}</p>
                  <p className="day-subtitle">{day.subtitle}</p>
                </td>
                <td className='hotel'>
                  <Select
                    value={selection.hotelId}
                    onChange={(value) => handleSelection(day.key, 'hotelId', value)}
                    options={hotelOptions}
                    placeholder={destination ? 'Select hotel...' : 'Choose destination first'}
                    disabled={!destination}
                  />
                </td>
                <td className="meal">
                  <Select
                    value={selection.lunchId ?? ''}
                    onChange={(value) => handleSelection(day.key, 'lunchId', value)}
                    options={lunchOptions}
                    placeholder={mealsDisabled ? 'Not available' : 'Select lunch...'}
                    disabled={mealsDisabled}
                  />
                </td>
                <td className="meal">
                  <Select
                    value={selection.dinnerId ?? ''}
                    onChange={(value) => handleSelection(day.key, 'dinnerId', value)}
                    options={dinnerOptions}
                    placeholder={mealsDisabled ? 'Not available' : 'Select dinner...'}
                    disabled={mealsDisabled}
                  />
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}