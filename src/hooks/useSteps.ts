import { useState, useEffect, useMemo } from 'react'
import { StepConfig } from '../App.types'

export const useSteps = (steps: StepConfig[], configComplete: boolean) => {
  const [currentStep, setCurrentStep] = useState(0)

  const goToStep = (index: number) => {
    const boundedIndex = Math.min(Math.max(index, 0), steps.length - 1)
    const target = steps[boundedIndex]
    if (target.isLocked && boundedIndex !== currentStep) return
    setCurrentStep(boundedIndex)
  }

  const nextDisabled = useMemo(() => {
    const current = steps[currentStep]
    if (!current) return true
    return !current.isComplete
  }, [steps, currentStep])

  useEffect(() => {
    if (!configComplete) {
      setCurrentStep(0)
    }
  }, [configComplete])

  return {
    currentStep,
    goToStep,
    nextDisabled,
  }
}