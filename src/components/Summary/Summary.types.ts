import { FormState } from '../../App.types'
import { CalculationResult } from '../../utils/calculations/calculateSum'

export interface SummaryProps {
  form: FormState
  calculationResult: CalculationResult
}