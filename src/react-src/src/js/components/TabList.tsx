import React from 'react'
import clsx from 'clsx'
import { AnyFunction, FileObject } from '../typings'
import { onClickCb } from '../utils/onClickCb'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './TabList.scss'

interface TabListProps {
  files: FileObject[]
  activeId: any
  unsaveIds?: string[]
  onTabClick: AnyFunction<[id: string], void>
  onCloseTab: AnyFunction<[id: string], void>
}

const TabList: React.FC<TabListProps> = ({
  files,
  activeId,
  unsaveIds,
  onTabClick,
  onCloseTab,
}) => {
  unsaveIds ??= []
  return (
    <ul className="TabList nav nav-pills">
      {files.map((file) => {
        const withUnsavedMark = unsaveIds?.includes(file.id) ?? false
        const xClsx = clsx({
          'nav-link': true,
          active: file.id === activeId,
          withUnsaved: withUnsavedMark,
        })
        return (
          <li className="nav-item" key={file.id}>
            <a
              href="#"
              className={xClsx}
              onClick={onClickCb(onTabClick, ['prevent'], file.id)}
            >
              {file.title}
              <span
                className="ml-2 close-icon"
                onClick={onClickCb(onCloseTab, ['stop'], file.id)}
              >
                <FontAwesomeIcon icon="times" />
              </span>
              {withUnsavedMark && (
                <span className="rounded-circle ml-2 unsaved-icon"></span>
              )}
            </a>
          </li>
        )
      })}
    </ul>
  )
}

export default TabList
