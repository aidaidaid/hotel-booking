import { BoardTypeCode, DaySelection, SelectionField, SelectionsState } from '../App.types'

const defaultSelection: DaySelection = {
  hotelId: null,
  lunchId: null,
  dinnerId: null,
}

const cloneDefault = (): DaySelection => ({ ...defaultSelection })

const sanitizeHalfBoard = (selection: DaySelection): DaySelection => {
  if (selection.lunchId && selection.dinnerId) {
    return { ...selection, dinnerId: null }
  }
  return selection
}

export const initializeDaySelections = (dayKeys: string[]) =>
  ({
    type: 'selections/initializeDays',
    payload: { dayKeys },
  }) as const

export const resetSelections = () =>
  ({
    type: 'selections/resetAll',
  }) as const

export const updateDaySelection = (params: {
  dayKey: string
  field: SelectionField
  value: number | null
  boardType: BoardTypeCode
}) =>
  ({
    type: 'selections/update',
    payload: params,
  }) as const

export const applyBoardTypeChange = (boardType: BoardTypeCode) =>
  ({
    type: 'selections/applyBoardType',
    payload: { boardType },
  }) as const

export const loadSelections = (selections: SelectionsState) =>
  ({
    type: 'selections/load',
    payload: selections,
  }) as const

type SelectionsActions =
  | ReturnType<typeof initializeDaySelections>
  | ReturnType<typeof resetSelections>
  | ReturnType<typeof updateDaySelection>
  | ReturnType<typeof applyBoardTypeChange>
  | ReturnType<typeof loadSelections>

const withDefault = (selection?: DaySelection): DaySelection => selection ?? cloneDefault()

export function selectionsReducer(
  state: SelectionsState = {},
  action: SelectionsActions,
): SelectionsState {
  switch (action.type) {
    case 'selections/initializeDays': {
      const { dayKeys } = action.payload
      const next: SelectionsState = {}
      dayKeys.forEach((key) => {
        next[key] = withDefault(state[key])
      })
      return next
    }
    case 'selections/resetAll': {
      const next: SelectionsState = {}
      Object.keys(state).forEach((key) => {
        next[key] = cloneDefault()
      })
      return next
    }
    case 'selections/update': {
      const { dayKey, field, value, boardType } = action.payload
      const current = withDefault(state[dayKey])
      let updated: DaySelection = {
        ...current,
        [field]: value,
      }

      if (boardType === 'HB' && value && (field === 'lunchId' || field === 'dinnerId')) {
        const siblingField: SelectionField = field === 'lunchId' ? 'dinnerId' : 'lunchId'
        updated = {
          ...updated,
          [siblingField]: null,
        }
      }

      if (boardType === 'NB') {
        updated = { ...updated, lunchId: null, dinnerId: null }
      }

      return {
        ...state,
        [dayKey]: updated,
      }
    }
    case 'selections/applyBoardType': {
      const { boardType } = action.payload
      if (boardType === 'FB') {
        return state
      }

      const nextEntries = Object.entries(state).map(([key, selection]) => {
        if (boardType === 'NB') {
          return [key, { ...selection, lunchId: null, dinnerId: null }] as const
        }
        return [key, sanitizeHalfBoard(selection)] as const
      })

      return Object.fromEntries(nextEntries)
    }
    case 'selections/load': {
      return action.payload
    }
    default:
      return state
  }
}