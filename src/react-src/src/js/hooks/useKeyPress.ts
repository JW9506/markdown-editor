import { useCallback, useEffect, useState } from 'react'

export const useKeyPress = (targetKey: string) => {
  const [keyPressed, setKeyPressed] = useState(false)
  const keyDownHandler = useCallback(
    ({ key }: KeyboardEvent) => {
      if (key === targetKey) {
        setKeyPressed(true)
      }
    },
    [targetKey]
  )
  const keyUpHandler = useCallback(
    ({ key }: KeyboardEvent) => {
      if (key === targetKey) {
        setKeyPressed(false)
      }
    },
    [targetKey]
  )
  useEffect(() => {
    document.addEventListener('keydown', keyDownHandler)
    document.addEventListener('keyup', keyUpHandler)
    return () => {
      document.removeEventListener('keydown', keyDownHandler)
      document.removeEventListener('keyup', keyUpHandler)
    }
  }, [keyDownHandler, keyUpHandler])
  return keyPressed
}
