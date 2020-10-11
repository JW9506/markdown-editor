import { useEffect, useState } from 'react'

export const useKeyPress = (targetKey: string) => {
  const [keyPressed, setKeyPressed] = useState(false)
  const keyDownHandler = ({ key }: KeyboardEvent) => {
    if (key === targetKey) {
      setKeyPressed(true)
    }
  }
  const keyUpHandler = ({ key }: KeyboardEvent) => {
    if (key === targetKey) {
      setKeyPressed(false)
    }
  }
  useEffect(() => {
    document.addEventListener('keydown', keyDownHandler)
    document.addEventListener('keyup', keyUpHandler)
    return () => {
      document.removeEventListener('keydown', keyDownHandler)
      document.removeEventListener('keyup', keyUpHandler)
    }
  }, [])
  return keyPressed
}
