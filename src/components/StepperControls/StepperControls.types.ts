export interface StepperControlsProps {
  currentStep: number
  totalSteps: number
  onPrevious: () => void
  onNext: () => void
  onExport: () => void
  onLoad: () => void
  onSave: () => void
  hasSavedData: boolean
  nextDisabled: boolean
}