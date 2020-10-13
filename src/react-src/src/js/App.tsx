import { hot } from 'react-hot-loader/root'
import React, { useState } from 'react'
import { v4 as uuid } from 'uuid'
import SimpleMDE from 'react-simplemde-editor'
import 'easymde/dist/easymde.min.css'
import FileList from './components/FileList'
import FileSearch from './components/FileSearch'
import defaultFiles from './utils/defaultFiles'
import BottomBtn from './components/BottomBtn'
import TabList from './components/TabList'
import '../css/main.scss'
import { ensure } from './utils/ensure'
import { FileObject } from './typings'
import {
  flattenedFileObjectCollectionToArr,
  flattenFileObjectCollection,
} from './utils/helper'
import { renameFile, writeFile } from './utils/fileHelper'
import path from 'path'
import { remote } from 'electron'

function App() {
  const [files, setFiles] = useState(flattenFileObjectCollection(defaultFiles))
  const [activeFileID, setActiveFileID] = useState('')
  const [openedFileIDs, setOpenedFileIDs] = useState<string[]>([])
  const [searchedFiles, setSearchedFiles] = useState<FileObject[]>([])
  const [unsavedFileIDs, setUnsavedFileIDs] = useState<string[]>([])
  const fileObjArr = flattenedFileObjectCollectionToArr(files)
  const saveLocation = path.join(
    remote.app.getPath('home'),
    '_tempfiles',
    'electron_md_notepad_cache'
  )
  const createNewFile = () => {
    const newID = uuid()
    files[newID] = {
      id: newID,
      title: '',
      body: '## default body',
      createdAt: Date.now(),
      isNew: true,
    }
    setFiles({ ...files })
  }
  const openedFiles = openedFileIDs.map((id) => {
    let file = files[id]
    file = ensure(file, 'Opened File Ids contain Ids that are not valid')
    return file
  })
  const activeFile = files[activeFileID]
  const fileNameSave = async (id: string, title: string, isNew?: boolean) => {
    const keys: Array<keyof FileObject> = ['title']
    const values: any[] = [title]
    if (isNew) {
      keys.push('isNew')
      values.push(false)
      try {
        await writeFile(path.join(saveLocation, `${title}.md`), files[id].body)
        updateFileObjectField(id, keys, values)
      } catch (e) {
        console.error(e)
      }
    } else {
      try {
        await renameFile(
          path.join(saveLocation, `${files[id].title}.md`),
          path.join(saveLocation, `${title}.md`)
        )
        updateFileObjectField(id, keys, values)
      } catch (e) {
        console.error(e)
      }
    }
  }
  const fileSearch = (keyWord: string) => {
    if (!keyWord) setSearchedFiles([])
    else {
      const newFiles = fileObjArr.filter((file) => file.title.includes(keyWord))
      setSearchedFiles(newFiles)
    }
  }
  const fileClick = (fileId: string) => {
    // set current active file
    setActiveFileID(fileId)
    // if openedFiles do not already have the current ID
    // add new fileID to openedFiles
    if (!openedFileIDs.includes(fileId)) {
      setOpenedFileIDs([...openedFileIDs, fileId])
    }
  }
  const tabClick = (fileId: string) => {
    setActiveFileID(fileId)
  }
  const tabClose = (fileId: string) => {
    let nextActive = 0
    const newTabList = openedFileIDs.filter((id, idx) => {
      if (id === fileId) {
        nextActive = Math.min(openedFileIDs.length - 2, idx)
      }
      return id !== fileId
    })
    setOpenedFileIDs(newTabList)
    setActiveFileID(newTabList[nextActive] ?? '')
  }
  const fileChange = (fileId: string, value: string) => {
    updateFileObjectField(fileId, ['body'], [value])

    if (!unsavedFileIDs.includes(fileId)) {
      setUnsavedFileIDs([...unsavedFileIDs, fileId])
    }
  }
  const fileDelete = (fileId: string) => {
    delete files[fileId]
    setFiles({ ...files })
    // close the tab if opened
    tabClose(fileId)
  }
  const updateFileObjectField = <
    K extends keyof FileObject,
    V extends FileObject[K]
  >(
    fileId: string,
    keys: K[],
    values: V[]
  ): void => {
    if (keys.length !== values.length) {
      throw new Error(
        'updateFileObjectField error, keys length must equal to values length'
      )
    }
    const file = files[fileId]
    let key: K, val: V
    for (let i = 0; i < keys.length; i++) {
      key = keys[i]
      val = values[i]
      file[key] = val
    }

    setFiles({ ...files })
  }
  return (
    <div className="App container-fluid min-h-screen px-0">
      <div className="row g-0">
        <div className="col-3 left-panel flex flex-col">
          <FileSearch
            className="flex-0"
            title="My Cloud Doc"
            onFileSearch={fileSearch}
          />
          <FileList
            className="flex-1"
            files={searchedFiles.length ? searchedFiles : fileObjArr}
            onFileClick={fileClick}
            onFileNameSave={fileNameSave}
            onFileDelete={fileDelete}
          />
          <div className="row g-0 flex-0 pb-8">
            <div className="col-6">
              <BottomBtn
                colorClass="btn-primary"
                icon="plus"
                onBtnClick={createNewFile}
              />
            </div>
            <div className="col-6">
              <BottomBtn
                text="Import"
                colorClass="btn-success"
                icon="file-import"
              />
            </div>
          </div>
        </div>
        <div className="col-9 right-panel h-screen flex flex-col">
          {!activeFile && (
            <div className="start-page">
              Choose or create a new Markdown document
            </div>
          )}
          {activeFile && (
            <>
              <TabList
                className="flex-0"
                files={openedFiles}
                unsaveIds={unsavedFileIDs}
                onTabClick={tabClick}
                onCloseTab={tabClose}
                activeId={activeFileID}
              />
              <SimpleMDE
                className="flex-1"
                value={activeFile?.body ?? ''}
                onChange={(value) => {
                  fileChange(activeFileID, value)
                }}
                options={{ minHeight: '20px' }}
              />
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default hot(App)
