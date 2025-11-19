import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../store'
import { updateDaySelection } from '../store/selectionsReducer'
import { SelectionField } from '../App.types'

export const useSelections = () => {
  const dispatch = useDispatch<AppDispatch>()
  const boardType = useSelector((state: RootState) => state.form.boardType)

  const handleDayUpdate = useCallback(
    (dayKey: string, field: SelectionField, value: number | null) => {
      dispatch(
        updateDaySelection({
          dayKey,
          field,
          value,
          boardType,
        }),
      )
    },
    [dispatch, boardType],
  )

  return {
    handleDayUpdate,
  }
}