import React, { useEffect, useState, useRef } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useKeyPress } from '../hooks/useKeyPress'
import { useIpcRenderer } from '../hooks/useIpcRenderer'

export interface FileSearchProps {
  title: string
  className?: string
  onFileSearch: (title: string) => void
}

const FileSearch: React.FC<FileSearchProps> = ({
  title,
  onFileSearch,
  className,
}) => {
  const [inputActive, setInputActive] = useState(false)
  const [value, setValue] = useState('')
  const inputRef = useRef<HTMLInputElement | null>(null)
  const enterPressed = useKeyPress('Enter')
  const escapedPressed = useKeyPress('Escape')
  const forwardSlashPressed = useKeyPress('/')
  const closeSearch = () => {
    setInputActive(false)
    setValue('')
    onFileSearch('')
  }

  useEffect(() => {
    if (enterPressed && inputActive) {
      onFileSearch(value)
    }
    if (escapedPressed && inputActive) {
      closeSearch()
    }
    if (forwardSlashPressed) {
      setInputActive(true)
    }
  }, [
    value,
    inputActive,
    enterPressed,
    escapedPressed,
    forwardSlashPressed,
    onFileSearch,
  ])

  useEffect(() => {
    if (inputActive) {
      inputRef.current?.focus()
    }
  }, [inputActive])

  useIpcRenderer({
    'search-file': () => setInputActive(true),
  })

  return (
    <div
      className={`FileSearch alert alert-primary d-flex justify-content-between align-items-center h-16 mb-0 ${className}`}
    >
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
