import { useMemo, useCallback } from 'react'
import './App.scss'
import { StepperTabs } from './components/StepperTabs/StepperTabs'
import { StepperControls } from './components/StepperControls/StepperControls'
import { Header } from './components/Header/Header'
import { StepSlider } from './components/StepSlider/StepSlider'
import { exportBookingToPdf } from './utils/export/exportPdf'
import { useBookingData } from './hooks/useBookingData'
import { useSteps } from './hooks/useSteps'
import { createStepsConfig } from './steps/createStepsConfig'

const App = () => {
  const {
    form,
    selections,
    days,
    configComplete,
    allHotelsSelected,
    hasSavedData,
    saveData,
    loadData,
  } = useBookingData()

  const steps = useMemo(
    () =>
      createStepsConfig({
        configComplete,
        allHotelsSelected,
      }),
    [configComplete, allHotelsSelected],
  )

  const { currentStep, goToStep, nextDisabled } = useSteps(steps, configComplete)

  const handleExport = useCallback(() => {
    exportBookingToPdf(form, days, selections)
  }, [form, days, selections])

  const handleSave = useCallback(() => {
    saveData(form, selections)
  }, [form, selections, saveData])

  return (
    <main className="app-shell">
      <Header title="Hotel Booking System" />
      <section className="stepper">
        <StepperTabs steps={steps} currentStep={currentStep} onStepClick={goToStep} />
        <StepSlider stepId={steps[currentStep].id}>{steps[currentStep].component}</StepSlider>
        <StepperControls
          currentStep={currentStep}
          totalSteps={steps.length}
          onPrevious={() => goToStep(currentStep - 1)}
          onNext={() => goToStep(currentStep + 1)}
          onExport={handleExport}
          onLoad={loadData}
          onSave={handleSave}
          hasSavedData={hasSavedData}
          nextDisabled={nextDisabled}
        />
      </section>
    </main>
  )
}

export default App