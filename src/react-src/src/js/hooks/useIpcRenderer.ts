import { ipcRenderer } from 'electron'
import { useEffect } from 'react'
import { AnyFunction } from '../typings'

interface IPCRendererCallbackMap {
  'create-new-file': AnyFunction
  'save-edit-file': AnyFunction
  'search-file': AnyFunction
  'import-file': AnyFunction
}

export function useIpcRenderer(
  cbMap: Partial<IPCRendererCallbackMap>,
  deps?: any[]
) {
  useEffect(() => {
    Object.keys(cbMap).forEach((key) => {
      if (cbMap[key]) ipcRenderer.on(key, cbMap[key]!)
    })
    return () => {
      Object.keys(cbMap).forEach((key) => {
        if (cbMap[key]) ipcRenderer.removeListener(key, cbMap[key]!)
      })
    }
  }, deps)
}
