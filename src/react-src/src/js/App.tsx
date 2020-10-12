import { hot } from 'react-hot-loader/root'
import React from 'react'
import SimpleMDE from 'react-simplemde-editor'
import 'easymde/dist/easymde.min.css'
import FileList from './components/FileList'
import FileSearch from './components/FileSearch'
import defaultFiles from './utils/defaultFiles'
import BottomBtn from './components/BottomBtn'
import TabList from './components/TabList'
import '../css/main.scss'

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
    <div className="container-fluid min-h-screen bg-gray-400 px-0">
      <div className="row g-0">
        <div className="col-3 left-panel flex flex-col">
          <FileSearch
            className="flex-0"
            title="My Cloud Doc"
            onFileSearch={(value) => {
              console.log(value)
            }}
          />
          <FileList
            className="flex-1"
            files={defaultFiles}
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
          <TabList
            className="flex-0"
            files={defaultFiles}
            unsaveIds={['1', '2', '3']}
            onTabClick={(id) => console.log('tab click', id)}
            onCloseTab={(id) => console.log('close tab', id)}
            activeId="1"
          />
          <SimpleMDE
            className="flex-1"
            value={defaultFiles[1].body}
            onChange={(value) => {
              console.log(value)
            }}
            options={{ minHeight: '20px' }}
          />
        </div>
      </div>
    </div>
  )
}

export default hot(App)
