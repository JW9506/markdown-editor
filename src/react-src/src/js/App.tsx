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

function App() {
  const [files, setFiles] = useState(defaultFiles)
  const [activeFileID, setActiveFileID] = useState('')
  const [openedFileIDs, setOpenedFileIDs] = useState<string[]>([])
  const [unsavedFileIDs, setUnsavedFileIDs] = useState<string[]>([])
  const openedFiles = openedFileIDs.map((id) => {
    let file = files.find((file) => file.id === id)
    file = ensure(file, 'Opened File Ids contain Ids that are not valid')
    return file
  })
  const activeFile = files.find((file) => file.id === activeFileID)
  const fileSearch = (title: string) => {
    let newFiles = defaultFiles
    if (title) {
      newFiles = files.filter((file) => file.title.includes(title))
    }
    setFiles(newFiles)
  }
  const fileClick = (id: string) => {
    console.log('fileClick', id)
  }
  const fileDelete = (id: string) => {
    console.log('fileDelete', id)
  }
  const fileNameSave = (id: string, title: string) => {
    console.log('fileNameSave', id, title)
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
            files={files}
            onFileClick={fileClick}
            onFileNameSave={fileNameSave}
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
                onTabClick={(id) => console.log('tab click', id)}
                onCloseTab={(id) => console.log('close tab', id)}
                activeId={activeFileID}
              />
              <SimpleMDE
                className="flex-1"
                value={activeFile?.body ?? ''}
                onChange={(value) => {
                  console.log(value)
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
