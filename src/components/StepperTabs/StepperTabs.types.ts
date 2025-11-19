import { StepConfig } from '../../App.types'

export interface StepperTabsProps {
  steps: StepConfig[]
  currentStep: number
  onStepClick: (index: number) => void
}