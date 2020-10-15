import { BrowserWindow, BrowserWindowConstructorOptions } from 'electron'
import path from 'path'
import isDev from 'electron-is-dev'

const MAIN_WIN_REACT_PORT = 3123
const DEVELOPMENT_RENDERER_URL = `http://localhost:${MAIN_WIN_REACT_PORT}`
const PRODUCTION_RENDERER_URL = `file://${path.join(
  __dirname,
  '../react-src/dist/'
)}`

type WindowType = 'main' | 'settings'
export default class AppWindow extends BrowserWindow {
  constructor(config: BrowserWindowConstructorOptions, type: WindowType) {
    const baseConfig: BrowserWindowConstructorOptions = {
      width: 800,
      height: 600,
      webPreferences: {
        nodeIntegration: true,
        enableRemoteModule: true,
      },
      show: false,
      backgroundColor: '#efefef',
    }
    config = { ...baseConfig, ...config }

    super(config)

    if (isDev) {
      switch (type) {
        case 'main':
          this.loadURL(DEVELOPMENT_RENDERER_URL + '/')
          break
        case 'settings':
          this.loadURL(DEVELOPMENT_RENDERER_URL + '/#/settings')
          break
        default:
          break
      }
    } else {
      switch (type) {
        case 'main':
          this.loadURL(PRODUCTION_RENDERER_URL + '/')
          break
        case 'settings':
          this.loadURL(PRODUCTION_RENDERER_URL + '/#/settings')
          break
        default:
          break
      }
    }

    this.once('ready-to-show', () => {
      this.show()
    })
  }
}
