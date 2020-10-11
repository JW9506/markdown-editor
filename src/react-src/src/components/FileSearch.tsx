import React, { useState } from 'react'

export interface FileSearchProps {
  title: string
  onFileSearch: () => void
}

const FileSearch: React.FC<FileSearchProps> = ({ title, onFileSearch }) => {
  const [inputActive, setInputActive] = useState(false)
  const [value, setValue] = useState('')
  return (
    <div className="FileSearch alert alert-primary">
      {!inputActive && (
        <div className="d-flex justify-content-between align-items-center">
          <span>{title}</span>
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => {
              setInputActive(true)
            }}
          >
            Search
          </button>
        </div>
      )}
      {inputActive && (
        <div className="row">
          <div className="col-8">
            <input
              className="form-control"
              value={value}
              onChange={(e) => setValue(e.target.value)}
            />
          </div>
          <button
            type="button"
            className="col-4 btn btn-primary"
            onClick={() => {
              setInputActive(false)
            }}
          >
            Close
          </button>
        </div>
      )}
    </div>
  )
}

export default FileSearch
