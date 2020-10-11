import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMarkdown } from '@fortawesome/free-brands-svg-icons'
import { FileObject } from '../typings'

export interface FileListProps {
  files: FileObject[]
  onFileClick: any
  onSaveEdit: any
  onFileDelete: any
}

const FileList: React.FC<FileListProps> = ({
  files,
  onFileClick,
  onSaveEdit,
  onFileDelete,
}) => {
  return (
    <ul className="FileList list-group-flush p-0">
      {files.map((file) => (
        <li
          key={file.id}
          className="FileItem list-group-item list-group-item-action list-group-item-primary row d-flex align-items-center cursor-pointer"
        >
          <span className="col-2">
            <FontAwesomeIcon icon={faMarkdown} size="lg" />
          </span>
          <span className="col-8">{file.title}</span>
          <span className="col-2">
            <button>
              <FontAwesomeIcon title="edit" icon="edit" size="lg" />
            </button>
            <button>
              <FontAwesomeIcon title="trash" icon="trash" size="lg" />
            </button>
          </span>
        </li>
      ))}
    </ul>
  )
}

export default FileList
