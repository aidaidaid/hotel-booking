import exportIcon from '../../assets/img/pdf.png'
import loadIcon from '../../assets/img/load.png'
import saveIcon from '../../assets/img/bookmark.png'
import './StepperControls.scss'
import { StepperControlsProps } from './StepperControls.types'

export const StepperControls = ({
  currentStep,
  totalSteps,
  onPrevious,
  onNext,
  onExport,
  onLoad,
  onSave,
  hasSavedData,
  nextDisabled,
}: StepperControlsProps) => {
  return (
    <div className="stepper-controls">
      <div className="stepper-nav-row">
        <button
          type="button"
          onClick={onPrevious}
          disabled={currentStep === 0}
          className={`nav-btn nav-prev ${currentStep === 0 ? 'invisible' : ''}`}
        >
          Back
        </button>

        <div className="stepper-storage">
          <button type="button" onClick={onLoad} disabled={!hasSavedData} className='btn-img load'>
            <img src={loadIcon} alt="" className="btn-img-icon" />
            Load
          </button>
          <button type="button" onClick={onSave} className='btn-img save'>
            <img src={saveIcon} alt="" className="btn-img-icon" />
            Save
          </button>
        </div>

        {currentStep < totalSteps - 1 ? (
          <button
            type="button"
            onClick={onNext}
            disabled={nextDisabled}
            className="nav-btn nav-next"
          >
            Next
          </button>
        ) : (
          <button type="button" onClick={onExport} className="nav-btn nav-next btn-img">
            <img src={exportIcon} alt="" className="btn-img-icon" />
            Export
          </button>
        )}
      </div>
    </div>
  )
}