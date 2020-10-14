import { app, ipcMain, Menu, shell } from 'electron'
import menuTemplate from './menuTemplate'
import AppWindow from './AppWindow'

app.allowRendererProcessReuse = false

let mainWindow: AppWindow | null, settingsWindow: AppWindow | null

app.on('ready', () => {
  mainWindow = new AppWindow(
    {
      width: 1440,
      height: 768,
    },
    'main'
  )
  mainWindow.on('close', () => {
    settingsWindow = null
    mainWindow = null
  })
  ipcMain.on('open-setting-window', () => {
    if (mainWindow) {
      settingsWindow = new AppWindow(
        {
          width: 500,
          height: 400,
          parent: mainWindow,
        },
        'settings'
      )
      settingsWindow.removeMenu()
      settingsWindow.on('close', () => {
        settingsWindow = null
      })
    }
  })

  const menu = Menu.buildFromTemplate(menuTemplate(app, shell))
  Menu.setApplicationMenu(menu)
  handleIPC()
})

function handleIPC() {
  //
}
