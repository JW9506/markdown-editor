import React, { useEffect, useState, useRef } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useKeyPress } from '../hooks/useKeyPress'

export interface FileSearchProps {
  title: string
  onFileSearch: (value: string) => void
}

const FileSearch: React.FC<FileSearchProps> = ({ title, onFileSearch }) => {
  const [inputActive, setInputActive] = useState(false)
  const [value, setValue] = useState('')
  const inputRef = useRef<HTMLInputElement | null>(null)
  const enterPressed = useKeyPress('Enter')
  const escapedPressed = useKeyPress('Escape')
  const closeSearch = () => {
    setInputActive(false)
    setValue('')
  }

  useEffect(() => {
    if (!inputActive) return
    if (enterPressed) {
      onFileSearch(value)
    }
    if (escapedPressed) {
      closeSearch()
    }
  }, [value, inputActive, enterPressed, escapedPressed, onFileSearch])

  useEffect(() => {
    if (inputActive) {
      inputRef.current?.focus()
    }
  }, [inputActive])

  return (
    <div className="FileSearch alert alert-primary d-flex justify-content-between align-items-center h-16 mb-0">
      {!inputActive && (
        <>
          <span>{title}</span>
          <button
            type="button"
            className="focus:outline-none"
            onClick={() => setInputActive(true)}
          >
            <FontAwesomeIcon icon="search" size="lg" />
          </button>
        </>
      )}
      {inputActive && (
        <>
          <div className="w-75">
            <input
              ref={inputRef}
              className="form-control"
              value={value}
              onChange={(e) => setValue(e.target.value)}
            />
          </div>
          <button
            type="button"
            className="focus:outline-none"
            onClick={() => closeSearch()}
          >
            <FontAwesomeIcon icon="window-close" size="lg" />
          </button>
        </>
      )}
    </div>
  )
}

export default FileSearch
