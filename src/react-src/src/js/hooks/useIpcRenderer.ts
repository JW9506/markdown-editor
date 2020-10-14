import { ipcRenderer } from 'electron'
import { useEffect } from 'react'
import { AnyFunction } from '../typings'

interface IPCRendererCallbackMap {
  'create-new-file': AnyFunction
  'save-edit-file': AnyFunction
  'search-file': AnyFunction
  'import-file': AnyFunction
}

export function useIpcRenderer(cbMap: IPCRendererCallbackMap, deps?: any[]) {
  useEffect(() => {
    Object.keys(cbMap).forEach((key) => {
      ipcRenderer.on(key, cbMap[key])
    })
    return () => {
      Object.keys(cbMap).forEach((key) => {
        ipcRenderer.off(key, cbMap[key])
      })
    }
  }, deps)
}
