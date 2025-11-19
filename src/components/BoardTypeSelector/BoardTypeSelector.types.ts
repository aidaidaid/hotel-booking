import { FormState } from '../../App.types'

export interface BoardTypeSelectorProps {
  value: FormState['boardType']
  onChange: (value: FormState['boardType']) => void
}