import {
  app,
  BrowserWindow,
  ipcMain,
  Menu,
  Notification,
  shell,
} from 'electron'
import path from 'path'
import isDev from 'electron-is-dev'
import menuTemplate from './menuTemplate'
const REACT_PORT = 3123

let win: BrowserWindow
app.allowRendererProcessReuse = false
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
  const menu = Menu.buildFromTemplate(menuTemplate(app, shell))
  Menu.setApplicationMenu(menu)
  handleIPC()
})

function handleIPC() {
  //
}
