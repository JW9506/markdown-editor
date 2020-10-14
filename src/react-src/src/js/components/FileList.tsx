import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMarkdown } from '@fortawesome/free-brands-svg-icons'
import { AnyFunction, FileObject } from '../typings'
import { useKeyPress } from '../hooks/useKeyPress'
import { onClickCb } from '../utils/onClickCb'

export interface FileListProps {
  files: FileObject[]
  onFileClick: AnyFunction
  onFileNameSave: AnyFunction<[id: string, title: string, isNew?: boolean]>
  onFileDelete: AnyFunction<[fileId: string]>
  className?: string
}

const FileList: React.FC<FileListProps> = ({
  files,
  onFileClick,
  onFileNameSave,
  onFileDelete,
  className,
}) => {
  const [currentEditId, setCurrentEditId] = useState('')
  const [value, setValue] = useState('')
  const inputRef = useRef<HTMLInputElement | null>(null)
  const enterPressed = useKeyPress('Enter')
  const escapePressed = useKeyPress('Escape')
  const currentEditFile = useMemo(
    () => files.find((file) => file.id === currentEditId),
    [currentEditId]
  )

  const _onFileClick = (file: FileObject) => {
    if (currentEditId !== file.id && !file.isNew) {
      onFileClick(file.id)
    }
  }
  const fileEdit = (file: FileObject) => {
    if (currentEditId !== file.id) {
      setCurrentEditId(file.id)
      setValue(file.title)
    }
  }
  const exitFileNameEdit = useCallback(() => {
    setCurrentEditId('')
    setValue('')
    // if renaming a newly created file, delete the file on exit
    if (currentEditFile?.isNew) {
      onFileDelete(currentEditFile.id)
    }
  }, [currentEditFile])
  // Watch on entering input state
  useEffect(() => {
    if (currentEditId) {
      inputRef.current?.focus()
    }
  }, [currentEditId])
  useEffect(() => {
    const newFile = files.find((file) => file.isNew)
    if (newFile) {
      setCurrentEditId(newFile.id)
      setValue(newFile.title)
    }
  }, [files])
  // File name input state key handling
  useEffect(() => {
    if (escapePressed) {
      exitFileNameEdit()
    }
    if (enterPressed && !!currentEditFile && value.trim()) {
      onFileNameSave(currentEditId, value, currentEditFile?.isNew)
      if (currentEditFile?.isNew) currentEditFile.isNew = false
      exitFileNameEdit()
    }
  }, [
    value,
    files,
    currentEditId,
    currentEditFile,
    exitFileNameEdit,
    onFileNameSave,
    enterPressed,
    escapePressed,
  ])
  return (
    <ul className={`FileList list-group-flush p-0 mb-0 ${className}`}>
      {files.map((file) => (
        <li
          key={file.id}
          onClick={onClickCb(_onFileClick, [], file)}
          className="FileItem list-group-item list-group-item-action list-group-item-primary d-flex justify-content-between align-items-center cursor-pointer h-16"
        >
          {currentEditId !== file.id && !file.isNew && (
            <>
              <span className="col-2">
                <FontAwesomeIcon icon={faMarkdown} size="lg" />
              </span>
              <span className="col-8">{file.title}</span>
              <span className="col-2">
                <button
                  onClick={onClickCb(fileEdit, ['stop'], file)}
                  className="focus:outline-none"
                >
                  <FontAwesomeIcon title="edit" icon="edit" size="lg" />
                </button>
                <button
                  onClick={onClickCb(onFileDelete, ['stop'], file.id)}
                  className="focus:outline-none"
                >
                  <FontAwesomeIcon title="trash" icon="trash" size="lg" />
                </button>
              </span>
            </>
          )}
          {(currentEditId === file.id || file.isNew) && (
            <>
              <span className="col-10">
                <input
                  ref={inputRef}
                  className="form-control"
                  placeholder="Enter File Name"
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                />
              </span>
              <span>
                <button
                  type="button"
                  className="focus:outline-none"
                  onClick={onClickCb(exitFileNameEdit, ['stop'])}
                >
                  <FontAwesomeIcon icon="window-close" size="lg" />
                </button>
              </span>
            </>
          )}
        </li>
      ))}
    </ul>
  )
}

export default FileList
