import { FileObject } from '../typings'

export function flattenFileObjectCollection<T extends FileObject>(arr: T[]) {
  return arr.reduce((map, item) => {
    map[item.id] = item
    return map
  }, {} as Record<string, T>)
}

export function flattenedFileObjectCollectionToArr<T>(obj: Record<string, T>) {
  return Object.keys(obj).map((key) => obj[key])
}
