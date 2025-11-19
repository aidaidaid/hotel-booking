import { useEffect, useMemo, useRef } from 'react'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '../store'
import { DayDescriptor, SelectionsState } from '../App.types'
import {
  applyBoardTypeChange,
  initializeDaySelections,
  loadSelections,
  resetSelections,
} from '../store/selectionsReducer'
import { FormState } from '../App.types'

interface UseSelectionsSyncParams {
  days: DayDescriptor[]
  form: FormState
  pendingSelections: SelectionsState | null
  isLoading: boolean
  onLoadComplete: () => void
}

export const useSelectionsSync = ({
  days,
  form,
  pendingSelections,
  isLoading,
  onLoadComplete,
}: UseSelectionsSyncParams) => {
  const dispatch = useDispatch<AppDispatch>()
  const onLoadCompleteRef = useRef(onLoadComplete)
  const isLoadingRef = useRef(isLoading)
  const hasLoadedSelectionsRef = useRef(false)
  const prevDestinationRef = useRef<string>(form.destination)
  const prevBoardTypeRef = useRef<string>(form.boardType)

  useEffect(() => {
    onLoadCompleteRef.current = onLoadComplete
    isLoadingRef.current = isLoading
  }, [onLoadComplete, isLoading])

  const dayKeys = useMemo(() => days.map((day) => day.key), [days])
  const prevDayKeysRef = useRef<string[]>([])

  useEffect(() => {
    if (isLoading && pendingSelections && !hasLoadedSelectionsRef.current && dayKeys.length > 0) {
      hasLoadedSelectionsRef.current = true
      prevDayKeysRef.current = dayKeys
      prevDestinationRef.current = form.destination
      prevBoardTypeRef.current = form.boardType
      dispatch(initializeDaySelections(dayKeys))
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setTimeout(() => {
            if (pendingSelections && isLoadingRef.current) {
              dispatch(loadSelections(pendingSelections))
              dispatch(applyBoardTypeChange(form.boardType))
              onLoadCompleteRef.current()
              hasLoadedSelectionsRef.current = false
            }
          }, 50)
        })
      })
    } else if (!isLoading && !hasLoadedSelectionsRef.current) {
      const dayKeysChanged = JSON.stringify(prevDayKeysRef.current) !== JSON.stringify(dayKeys)
      if (dayKeysChanged) {
        dispatch(initializeDaySelections(dayKeys))
        prevDayKeysRef.current = dayKeys
      }
    }
  }, [dispatch, dayKeys, isLoading, pendingSelections, form.boardType, form.destination])

  useEffect(() => {
    if (!isLoading && !isLoadingRef.current && !hasLoadedSelectionsRef.current && prevDestinationRef.current !== form.destination) {
      prevDestinationRef.current = form.destination
      dispatch(resetSelections())
    }
  }, [dispatch, form.destination, isLoading])

  useEffect(() => {
    if (!isLoading && !isLoadingRef.current && !hasLoadedSelectionsRef.current && prevBoardTypeRef.current !== form.boardType) {
      prevBoardTypeRef.current = form.boardType
      dispatch(applyBoardTypeChange(form.boardType))
    }
  }, [dispatch, form.boardType, isLoading])
}