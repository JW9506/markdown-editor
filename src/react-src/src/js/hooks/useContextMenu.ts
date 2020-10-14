import { useEffect, useRef } from 'react'
import { MenuItemConstructorOptions, remote } from 'electron'

const { Menu, MenuItem } = remote

export function useContextMenu(
  itemArr: MenuItemConstructorOptions[],
  targetSelector: string
) {
  const clickedElement = useRef<Node | null>(null)
  useEffect(() => {
    const menu = new Menu()
    itemArr.forEach((item) => {
      menu.append(new MenuItem(item))
    })
    const handleContextMenu = (e: MouseEvent) => {
      clickedElement.current = e.target as Node | null
      if (
        document.querySelector(targetSelector)?.contains(clickedElement.current)
      ) {
        menu.popup({ window: remote.getCurrentWindow() })
      }
    }
    window.addEventListener('contextmenu', handleContextMenu)
    return () => window.removeEventListener('contextmenu', handleContextMenu)
  }, [])
  return clickedElement
}
