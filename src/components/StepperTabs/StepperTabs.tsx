import './StepperTabs.scss'
import { StepperTabsProps } from './StepperTabs.types'

export const StepperTabs = ({ steps, currentStep, onStepClick }: StepperTabsProps) => {
  return (
    <div className="stepper-tabs">
      {steps.map((step, index) => (
        <button
          key={step.id}
          type="button"
          className={[
            'stepper-tab',
            index === currentStep ? 'active' : '',
            step.isComplete ? 'complete' : '',
            step.isLocked ? 'locked' : '',
          ]
            .filter(Boolean)
            .join(' ')}
          onClick={() => onStepClick(index)}
          disabled={step.isLocked && index !== currentStep}
        >
          <span className="step-circle">{index + 1}</span>
          <div className="step-text">
            <strong>{step.title}</strong>
            <p>{step.subtitle}</p>
          </div>
        </button>
      ))}
    </div>
  )
}