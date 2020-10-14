import { useEffect } from 'react'
import { MenuItemConstructorOptions, remote } from 'electron'

const { Menu, MenuItem } = remote

export function useContextMenu(itemArr: MenuItemConstructorOptions[]) {
  useEffect(() => {
    const menu = new Menu()
    itemArr.forEach((item) => {
      menu.append(new MenuItem(item))
    })
    const handleContextMenu = (e: MouseEvent) => {
      menu.popup({ window: remote.getCurrentWindow() })
    }
    window.addEventListener('contextmenu', handleContextMenu)
    return () => window.removeEventListener('contextmenu', handleContextMenu)
  }, [])
}
