import { useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '../store'
import { updateFormField } from '../store/formReducer'
import { FormField, FormState } from '../App.types'

export const useForm = () => {
  const dispatch = useDispatch<AppDispatch>()

  const handleFormChange = useCallback(
    <K extends FormField>(field: K, value: FormState[K]) => {
      dispatch(updateFormField(field, value))
    },
    [dispatch],
  )

  return {
    handleFormChange,
  }
}