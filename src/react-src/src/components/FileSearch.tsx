import React, { useEffect, useState, useRef } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export interface FileSearchProps {
  title: string
  onFileSearch: (value: string) => void
}

const FileSearch: React.FC<FileSearchProps> = ({ title, onFileSearch }) => {
  const [inputActive, setInputActive] = useState(false)
  const [value, setValue] = useState('')
  const inputRef = useRef<HTMLInputElement | null>(null)
  const closeSearch = (e?: KeyboardEvent) => {
    e?.preventDefault()
    setInputActive(false)
    setValue('')
  }

  useEffect(() => {
    const handleInputEvent = (event: KeyboardEvent) => {
      const { key } = event
      if (key === 'Enter' && inputActive) {
        onFileSearch(value)
      } else if (key === 'Escape' && inputActive) {
        closeSearch()
      }
    }
    document.addEventListener('keyup', handleInputEvent)
    return () => {
      document.removeEventListener('keyup', handleInputEvent)
    }
  }, [value, inputActive])

  useEffect(() => {
    if (inputActive) {
      inputRef.current?.focus()
    }
  }, [inputActive])

  return (
    <div className="FileSearch alert alert-primary d-flex justify-content-between align-items-center h-16">
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
