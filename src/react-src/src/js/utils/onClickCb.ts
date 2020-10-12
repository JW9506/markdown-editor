import { AnyFunction } from '../typings'

type Options = 'stop' | 'prevent'
export const onClickCb = <T extends AnyFunction>(
  func: T,
  opts: Options[],
  ...args: Parameters<T>
) => (e: React.MouseEvent) => {
  for (const opt of opts) {
    switch (opt) {
      case 'stop':
        e.stopPropagation()
        break
      case 'prevent':
        e.preventDefault()
        break
      default:
        break
    }
  }
  func(...args)
}
