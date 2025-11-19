import { boardTypes } from '../../data/constants'
import { FormState } from '../../App.types'
import './BoardTypeSelector.scss'
import { BoardTypeSelectorProps } from './BoardTypeSelector.types'

export const BoardTypeSelector = ({ value, onChange }: BoardTypeSelectorProps) => {
  return (
    <fieldset className="board-fieldset">
      <legend>Board type</legend>
      <div className="board-options">
        {boardTypes.map((board) => (
          <label key={board.code} className="board-card">
            <input
              type="radio"
              name="boardType"
              value={board.code}
              checked={value === board.code}
              onChange={(e) => onChange(e.target.value as FormState['boardType'])}
            />
            <div>
              <strong>{board.name}</strong>
              <p>{board.description}</p>
            </div>
          </label>
        ))}
      </div>
    </fieldset>
  )
}