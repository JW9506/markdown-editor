import React from 'react'
import { remote } from 'electron'

const Settings: React.FC = () => {
  const Browser = async () => {
    const { filePaths } = await remote.dialog.showOpenDialog({
      properties: ['openDirectory'],
      message: 'Select file path',
    })
    console.log(filePaths)
  }
  return (
    <div className="Settings p-8">
      <h1>Setting</h1>
      <div>Select setting file saving location</div>
      <div className="flex">
        <input placeholder="Current Location" className="form-control" />
        <button id="browse-btn" className="btn btn-primary" onClick={Browser}>
          Browse
        </button>
      </div>
      <button id="save-btn" className="btn btn-info">
        Save
      </button>
    </div>
  )
}

export default Settings
