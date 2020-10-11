import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMarkdown } from '@fortawesome/free-brands-svg-icons'
import { FileObject } from '../typings'

type FileAction = (id: string) => void
export interface FileListProps {
  files: FileObject[]
  onFileClick: FileAction
  onFileEdit: FileAction
  onFileDelete: FileAction
}

const FileList: React.FC<FileListProps> = ({
  files,
  onFileClick,
  onFileEdit,
  onFileDelete,
}) => {
  const onClickCb = (func: FileAction, ...args: Parameters<FileAction>) => (
    e: React.MouseEvent
  ) => {
    e.stopPropagation()
    func(...args)
  }
  return (
    <ul className="FileList list-group-flush p-0">
      {files.map((file) => (
        <li
          key={file.id}
          onClick={onClickCb(onFileClick, file.id)}
          className="FileItem list-group-item list-group-item-action list-group-item-primary row d-flex align-items-center cursor-pointer"
        >
          <span className="col-2">
            <FontAwesomeIcon icon={faMarkdown} size="lg" />
          </span>
          <span className="col-8">{file.title}</span>
          <span className="col-2">
            <button onClick={onClickCb(onFileEdit, file.id)}>
              <FontAwesomeIcon title="edit" icon="edit" size="lg" />
            </button>
            <button onClick={onClickCb(onFileDelete, file.id)}>
              <FontAwesomeIcon title="trash" icon="trash" size="lg" />
            </button>
          </span>
        </li>
      ))}
    </ul>
  )
}

export default FileList
