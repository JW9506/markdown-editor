import React, { useCallback, useState } from 'react'
import { remote } from 'electron'
import Store from 'electron-store'
const settingStore = new Store<Record<'saveLocation', string | undefined>>({
  name: 'Settings',
})

const Settings: React.FC = () => {
  const [saveLocation, setSaveLocation] = useState(
    settingStore.get('saveLocation')
  )
  const Browser = async () => {
    const { filePaths } = await remote.dialog.showOpenDialog({
      properties: ['openDirectory'],
      message: 'Select file path',
    })
    setSaveLocation(filePaths[0])
  }
  const Save = () => {
    settingStore.set('saveLocation', saveLocation)
    remote.getCurrentWindow().close()
  }
  const saveLocationOnChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setSaveLocation(e.target.value)
    },
    []
  )
  return (
    <div className="Settings p-8 bg-gray-200 min-h-screen">
      <h1>Setting</h1>
      <div className="mb-8">Select setting file saving location</div>
      <div className="flex mb-8">
        <input
          placeholder="Current Location"
          className="form-control"
          value={saveLocation}
          onChange={saveLocationOnChange}
        />
        <button id="browse-btn" className="btn btn-primary" onClick={Browser}>
          Browse
        </button>
      </div>
      <button id="save-btn" className="btn btn-info" onClick={Save}>
        Save
      </button>
    </div>
  )
}

export default Settings
