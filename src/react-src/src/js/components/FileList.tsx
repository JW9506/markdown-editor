import React, { useCallback, useEffect, useRef, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMarkdown } from '@fortawesome/free-brands-svg-icons'
import { AnyFunction, FileObject } from '../typings'
import { useKeyPress } from '../hooks/useKeyPress'

type FileObjectAction = (file: FileObject) => void
export interface FileListProps {
  files: FileObject[]
  onFileClick: AnyFunction
  onFileNameSave: AnyFunction<[id: string, title: string]>
  onFileDelete: AnyFunction
}

const FileList: React.FC<FileListProps> = ({
  files,
  onFileClick,
  onFileNameSave,
  onFileDelete,
}) => {
  const [currentEditId, setCurrentEditId] = useState('')
  const [value, setValue] = useState('')
  const inputRef = useRef<HTMLInputElement | null>(null)
  const enterPressed = useKeyPress('Enter')
  const escapePressed = useKeyPress('Escape')
  const _onFileClick = (file: FileObject) => {
    if (currentEditId !== file.id) {
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
  }, [])
  const onClickCb = <T extends AnyFunction = FileObjectAction>(
    func: T,
    ...args: Parameters<T>
  ) => (e: React.MouseEvent) => {
    e.stopPropagation()
    func(...args)
  }
  useEffect(() => {
    if (currentEditId) {
      inputRef.current?.focus()
    }
  }, [currentEditId])
  useEffect(() => {
    if (!currentEditId) return
    if (enterPressed) {
      onFileNameSave(currentEditId, value)
      exitFileNameEdit()
    } else if (escapePressed) {
      exitFileNameEdit()
    }
  }, [
    value,
    currentEditId,
    exitFileNameEdit,
    onFileNameSave,
    enterPressed,
    escapePressed,
  ])
  return (
    <ul className="FileList list-group-flush p-0">
      {files.map((file) => (
        <li
          key={file.id}
          onClick={onClickCb(_onFileClick, file)}
          className="FileItem list-group-item list-group-item-action list-group-item-primary row d-flex align-items-center cursor-pointer h-16"
        >
          {currentEditId !== file.id && (
            <>
              <span className="col-2">
                <FontAwesomeIcon icon={faMarkdown} size="lg" />
              </span>
              <span className="col-8">{file.title}</span>
              <span className="col-2">
                <button
                  onClick={onClickCb(fileEdit, file)}
                  className="focus:outline-none"
                >
                  <FontAwesomeIcon title="edit" icon="edit" size="lg" />
                </button>
                <button
                  onClick={onClickCb(onFileDelete, file.id)}
                  className="focus:outline-none"
                >
                  <FontAwesomeIcon title="trash" icon="trash" size="lg" />
                </button>
              </span>
            </>
          )}
          {currentEditId === file.id && (
            <>
              <span className="col-10">
                <input
                  ref={inputRef}
                  className="form-control"
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                />
              </span>
              <span className="col-2">
                <button
                  type="button"
                  className="focus:outline-none"
                  onClick={exitFileNameEdit}
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
