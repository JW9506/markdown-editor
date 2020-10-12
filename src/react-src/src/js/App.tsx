import { hot } from 'react-hot-loader/root'
import React from 'react'
import FileList from './components/FileList'
import FileSearch from './components/FileSearch'
import defaultFiles from './utils/defaultFiles'
import BottomBtn from './components/BottomBtn'

function App() {
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
    <div className="container-fluid min-h-screen bg-gray-300 px-0">
      <div className="row g-0">
        <div className="col-3 left-panel">
          <FileSearch
            title="My Cloud Doc"
            onFileSearch={(value) => {
              console.log(value)
            }}
          />
          <FileList
            files={defaultFiles}
            onFileClick={fileClick}
            onFileNameSave={fileNameSave}
            onFileDelete={fileDelete}
          />
          <div className="row g-0">
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
        <div className="col-9 bg-primary right-panel">
          <h1>this is the right</h1>
        </div>
      </div>
    </div>
  )
}

export default hot(App)
