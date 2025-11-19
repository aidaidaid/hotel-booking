import { FormField, FormState } from '../../App.types'

export type ChangeHandler = <K extends FormField>(field: K, value: FormState[K]) => void

export interface BookingFormProps {
  form: FormState
  onChange: ChangeHandler
}