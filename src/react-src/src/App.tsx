import React from 'react'
import FileSearch from './components/FileSearch'

function App() {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-3 bg-danger left-panel">
          <FileSearch title="My Cloud Doc" onFileSearch={() => {}} />
        </div>
        <div className="col-9 bg-primary right-panel">
          <h1>this is the right</h1>
        </div>
      </div>
    </div>
  )
}

export default App
