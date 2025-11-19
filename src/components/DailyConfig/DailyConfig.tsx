import { DailyTable } from '../DailyTable/DailyTable'
import './DailyConfig.scss'
import { DailyConfigProps } from './DailyConfig.types'

export const DailyConfig = ({ days, destination, boardType, selections, onUpdate }: DailyConfigProps) => {
  return (
    <section className="panel">
      <header className="panel-header">
        <h2>Hotels and optional meals</h2>
      </header>
      <DailyTable
        days={days}
        destination={destination}
        boardType={boardType}
        selections={selections}
        onUpdate={onUpdate}
      />
      <p className="rule-hint">
        Choose a hotel for each day.<br />
        {boardType === 'HB' && destination && ' Half Board guests may choose either lunch or dinner per day.'}
        {boardType === 'NB' && destination && ' No Board removes meal selections.'}
      </p>
    </section>
  )
}