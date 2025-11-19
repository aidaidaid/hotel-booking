import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import './Select.scss'
import { SelectProps } from './Select.types'

export const Select = ({
  value,
  onChange,
  options,
  placeholder = 'Select...',
  disabled = false,
  className = '',
}: SelectProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const selectRef = useRef<HTMLDivElement>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const selectedOption = options.find((opt) => opt.value === value)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        selectRef.current &&
        !selectRef.current.contains(event.target as Node) &&
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen])

  useEffect(() => {
    const updateDropdownPosition = () => {
      if (isOpen && selectRef.current && dropdownRef.current) {
        const trigger = selectRef.current.querySelector('.select-trigger')
        if (trigger) {
          const rect = trigger.getBoundingClientRect()
          const dropdown = dropdownRef.current
          dropdown.style.position = 'fixed'
          dropdown.style.top = `${rect.bottom + 4}px`
          dropdown.style.left = `${rect.left}px`
          dropdown.style.width = `${rect.width}px`
          dropdown.style.minWidth = `${rect.width}px`
        }
      }
    }

    if (isOpen) {
      updateDropdownPosition()
      window.addEventListener('scroll', updateDropdownPosition, true)
      window.addEventListener('resize', updateDropdownPosition)

      return () => {
        window.removeEventListener('scroll', updateDropdownPosition, true)
        window.removeEventListener('resize', updateDropdownPosition)
      }
    }
  }, [isOpen])

  const handleToggle = () => {
    if (!disabled) {
      setIsOpen(!isOpen)
    }
  }

  const handleSelect = (optionValue: string | number) => {
    onChange(String(optionValue))
    setIsOpen(false)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (disabled) return

    switch (e.key) {
      case 'Enter':
      case ' ':
        e.preventDefault()
        handleToggle()
        break
      case 'Escape':
        setIsOpen(false)
        break
      case 'ArrowDown':
        e.preventDefault()
        if (!isOpen) {
          setIsOpen(true)
        } else {
          const currentIndex = options.findIndex((opt) => opt.value === value)
          const nextIndex = currentIndex < options.length - 1 ? currentIndex + 1 : 0
          if (!options[nextIndex]?.disabled) {
            handleSelect(options[nextIndex].value)
          }
        }
        break
      case 'ArrowUp':
        e.preventDefault()
        if (isOpen) {
          const currentIndex = options.findIndex((opt) => opt.value === value)
          const prevIndex = currentIndex > 0 ? currentIndex - 1 : options.length - 1
          if (!options[prevIndex]?.disabled) {
            handleSelect(options[prevIndex].value)
          }
        }
        break
    }
  }

  return (
    <div
      ref={selectRef}
      className={`custom-select ${className} ${isOpen ? 'open' : ''} ${disabled ? 'disabled' : ''}`}
    >
      <div
        className="select-trigger"
        onClick={handleToggle}
        onKeyDown={handleKeyDown}
        tabIndex={disabled ? -1 : 0}
        role="combobox"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        aria-disabled={disabled}
      >
        <span className={selectedOption ? 'select-value' : 'select-placeholder'}>
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <svg
          className={`select-arrow ${isOpen ? 'open' : ''}`}
          width="12"
          height="8"
          viewBox="0 0 12 8"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M1 1L6 6L11 1"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      {isOpen &&
        createPortal(
          <div ref={dropdownRef} className="select-dropdown" role="listbox">
            <div className="select-options">
              {options.map((option) => (
                <div
                  key={option.value}
                  className={`select-option ${value === option.value ? 'selected' : ''} ${
                    option.disabled ? 'disabled' : ''
                  }`}
                  onClick={() => !option.disabled && handleSelect(option.value)}
                  role="option"
                  aria-selected={value === option.value}
                  tabIndex={option.disabled ? -1 : 0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !option.disabled) {
                      handleSelect(option.value)
                    }
                  }}
                >
                  <span className="option-label">{option.label}</span>
                  {value === option.value && (
                    <svg
                      className="check-icon"
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M13.3333 4L6 11.3333L2.66667 8"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  )}
                </div>
              ))}
            </div>
          </div>,
          document.body,
        )}
    </div>
  )
}