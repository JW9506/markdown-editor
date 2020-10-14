import { FileObject, FileObjectBeforeLoaded } from '../typings'

export function ensure<T>(
  obj: T,
  msg = 'Object is not defined at runtime'
): NonNullable<T> {
  if (obj == null) {
    throw new Error(msg)
  }
  return obj as any
}

export function isFilesLoaded(
  fileObj: Record<string, FileObjectBeforeLoaded>
): fileObj is Record<string, FileObject>
export function isFilesLoaded(
  fileObj: FileObjectBeforeLoaded[]
): fileObj is FileObject[]
export function isFilesLoaded(
  fileObj: Record<string, FileObjectBeforeLoaded> | FileObjectBeforeLoaded[]
): fileObj is Record<string, FileObject> | FileObject[] {
  if (Array.isArray(fileObj)) {
    if (
      fileObj.every((val) => {
        return val.body != null && val.isLoaded
      })
    ) {
      return true
    } else {
      throw new Error('Files are not being loaded properly')
    }
  } else {
    if (
      Object.values(fileObj).every((val) => {
        return val.body != null && val.isLoaded
      })
    ) {
      return true
    } else {
      throw new Error('Files are not being loaded properly')
    }
  }
}
