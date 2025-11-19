import { StepConfig } from '../App.types'
import { ConfigStep } from './ConfigStep'
import { DailyConfigStep } from './DailyConfigStep'
import { SummaryStep } from './SummaryStep'

interface CreateStepsConfigParams {
  configComplete: boolean
  allHotelsSelected: boolean
}

export const createStepsConfig = ({
  configComplete,
  allHotelsSelected,
}: CreateStepsConfigParams): StepConfig[] => {
  return [
    {
      id: 'config',
      title: 'Initial Configuration',
      subtitle: 'Traveler details & board type',
      component: <ConfigStep />,
      isComplete: configComplete,
      isLocked: false,
    },
    {
      id: 'daily',
      title: 'Daily Configuration',
      subtitle: 'Hotels and optional meals',
      component: <DailyConfigStep />,
      isComplete: allHotelsSelected,
      isLocked: !configComplete,
    },
    {
      id: 'summary',
      title: 'Summary & Price',
      subtitle: 'Review selections and pricing',
      component: <SummaryStep />,
      isComplete: allHotelsSelected,
      isLocked: !configComplete || !allHotelsSelected,
    },
  ]
}