import './StepSlider.scss'
import { StepSliderProps } from './StepSlider.types'

export const StepSlider = ({ stepId, children }: StepSliderProps) => {
  return (
    <div className="step-slider">
      <div key={stepId} className="step-slide active-slide">
        {children}
      </div>
    </div>
  )
}