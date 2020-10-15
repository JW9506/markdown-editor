import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMarkdown } from '@fortawesome/free-brands-svg-icons'
import { AnyFunction, FileObjectBeforeLoaded } from '../typings'
import { useKeyPress } from '../hooks/useKeyPress'
import { onClickCb } from '../utils/onClickCb'
import { useContextMenu } from '../hooks/useContextMenu'
import { getParentNode } from '../utils/helper'

export interface FileListProps {
  files: FileObjectBeforeLoaded[]
  onFileClick: AnyFunction<[fileId: string]>
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

  const _onFileClick = (file: FileObjectBeforeLoaded) => {
    if (currentEditId !== file.id && !file.isNew) {
      onFileClick(file.id)
    }
  }
  const fileEdit = (fileId: string, fileTitle: string) => {
    if (currentEditId !== fileId) {
      setCurrentEditId(fileId)
      setValue(fileTitle)
    }
  }
  const exitFileNameEdit = useCallback(() => {
    setCurrentEditId('')
    setValue('')
    // if renaming a newly created file, delete the file on exit
    if (currentEditFile?.isNew) {
      onFileDelete(currentEditFile.id)
    }
  }, [currentEditFile, onFileDelete])

  // right click context
  const clickedItem = useContextMenu(
    [
      {
        label: 'Open',
        click: () => {
          const node = getParentNode(clickedItem.current, 'FileItem')
          let id: string | undefined
          if ((id = node?.dataset?.id)) {
            onFileClick(id)
          }
        },
      },
      {
        label: 'Rename',
        click: () => {
          const node = getParentNode(clickedItem.current, 'FileItem')
          let id: string | undefined
          let title: string | undefined
          if ((id = node?.dataset?.id) && (title = node?.dataset?.title)) {
            fileEdit(id, title)
          }
        },
      },
      {
        label: 'Delete',
        click: () => {
          const node = getParentNode(clickedItem.current, 'FileItem')
          let id: string | undefined
          if ((id = node?.dataset?.id)) {
            onFileDelete(id)
          }
        },
      },
    ],
    '.FileList',
    [onFileClick, fileEdit, onFileDelete]
  )

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
          data-id={file.id}
          data-title={file.title}
        >
          {currentEditId !== file.id && !file.isNew && (
            <>
              <span className="col-2">
                <FontAwesomeIcon icon={faMarkdown} size="lg" />
              </span>
              <span className="col-10">{file.title}</span>
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
