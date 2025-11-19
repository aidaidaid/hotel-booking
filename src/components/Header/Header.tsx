import './Header.scss'
import { HeaderProps } from './Header.types'

export const Header = ({ title }: HeaderProps) => {
  return (
    <header className="header">
      <p>{title}</p>
    </header>
  )
}