import React from 'react'
import FileList from './components/FileList'
import FileSearch from './components/FileSearch'
import defaultFiles from './utils/defaultFiles'

function App() {
  return (
    <div className="container-fluid min-h-screen bg-gray-300">
      <div className="row">
        <div className="col-3 left-panel">
          <FileSearch
            title="My Cloud Doc"
            onFileSearch={(value) => {
              console.log(value)
            }}
          />
          <FileList files={defaultFiles} />
        </div>
        <div className="col-9 bg-primary right-panel">
          <h1>this is the right</h1>
        </div>
      </div>
    </div>
  )
}

export default App
