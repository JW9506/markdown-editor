import { FileObjectBeforeLoaded } from '../typings'

export function flattenFileObjectCollection<T extends FileObjectBeforeLoaded>(
  arr: T[]
) {
  return arr.reduce((map, item) => {
    map[item.id] = item
    return map
  }, {} as Record<string, T>)
}

export function flattenedFileObjectCollectionToArr<T>(obj: Record<string, T>) {
  return Object.keys(obj).map((key) => obj[key])
}

export function getParentNode(node: HTMLElement | null, parentClassName: string) {
  let current: HTMLElement | null = node
  while (current != null) {
    if (current.classList.contains(parentClassName)) {
      return current
    }
    current = current.parentElement
  }
  return
}
