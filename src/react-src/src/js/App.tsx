import { hot } from 'react-hot-loader/root'
import React, { useState } from 'react'
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

function App() {
  const [files, setFiles] = useState(defaultFiles)
  const [activeFileID, setActiveFileID] = useState('')
  const [openedFileIDs, setOpenedFileIDs] = useState<string[]>([])
  const [searchedFiles, setSearchedFiles] = useState<FileObject[]>([])
  const [unsavedFileIDs, setUnsavedFileIDs] = useState<string[]>([])
  const openedFiles = openedFileIDs.map((id) => {
    let file = files.find((file) => file.id === id)
    file = ensure(file, 'Opened File Ids contain Ids that are not valid')
    return file
  })
  const activeFile = files.find((file) => file.id === activeFileID)
  const fileSearch = (keyWord: string) => {
    const newFiles = files.filter((file) => file.title.includes(keyWord))
    setSearchedFiles(newFiles)
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
    updateFileObjectField(fileId, 'body', value)

    if (!unsavedFileIDs.includes(fileId)) {
      setUnsavedFileIDs([...unsavedFileIDs, fileId])
    }
  }
  const fileDelete = (fileId: string) => {
    const newFiles = files.filter((file) => file.id !== fileId)
    setFiles(newFiles)
    // close the tab if opened
    tabClose(fileId)
  }
  const updateFileObjectField = <
    K extends keyof FileObject,
    V extends FileObject[K]
  >(
    fileId: string,
    key: K,
    val: V
  ): void => {
    const newFiles = files.map((file) => {
      if (file.id === fileId) {
        file[key] = val
      }
      return file
    })
    setFiles(newFiles)
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
            files={searchedFiles.length ? searchedFiles : files}
            onFileClick={fileClick}
            onFileNameSave={(id, title) =>
              updateFileObjectField(id, 'title', title)
            }
            onFileDelete={fileDelete}
          />
          <div className="row g-0 flex-0 pb-8">
            <div className="col-6">
              <BottomBtn colorClass="btn-primary" icon="plus" />
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
