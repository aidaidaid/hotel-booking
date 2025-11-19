import { FormField, FormState } from '../App.types'

export const defaultFormState: FormState = {
  citizenship: '',
  startDate: '',
  days: 1,
  destination: '',
  boardType: 'FB',
}

export const updateFormField = <K extends FormField>(field: K, value: FormState[K]) =>
  ({
    type: 'form/updateField',
    payload: { field, value },
  }) as const

export const loadForm = (form: FormState) =>
  ({
    type: 'form/load',
    payload: form,
  }) as const

type UpdateFormAction = ReturnType<typeof updateFormField>
type LoadFormAction = ReturnType<typeof loadForm>

type FormActions = UpdateFormAction | LoadFormAction

export function formReducer(state: FormState = defaultFormState, action: FormActions): FormState {
  switch (action.type) {
    case 'form/updateField': {
      const { field, value } = action.payload
      return {
        ...state,
        [field]: value,
      }
    }
    case 'form/load': {
      return action.payload
    }
    default:
      return state
  }
}