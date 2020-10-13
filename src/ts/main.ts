import { app, BrowserWindow, ipcMain, Notification } from 'electron'
import path from 'path'
import isDev from 'electron-is-dev'
const REACT_PORT = 3123

let win: BrowserWindow
app.on('ready', () => {
  win = new BrowserWindow({
    width: 300,
    height: 300,
    webPreferences: {
      nodeIntegration: true,
      enableRemoteModule: true,
    },
  })
  if (isDev) {
    win.loadURL(`http://localhost:${REACT_PORT}`)
  } else {
    // win.loadFile(path.resolve(__dirname, 'index.html'))
  }

  handleIPC()
})

function handleIPC() {
  //
}
