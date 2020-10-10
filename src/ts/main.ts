import { app, BrowserWindow, ipcMain, Notification } from 'electron'
import path from 'path'

let win: BrowserWindow
app.on('ready', () => {
  win = new BrowserWindow({
    width: 300,
    height: 300,
    webPreferences: {
      nodeIntegration: true,
    },
  })
  win.loadFile(path.resolve(__dirname, '../index.html'))
  handleIPC()
})

function handleIPC() {
  //
}
