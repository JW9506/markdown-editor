import fs from 'fs'

export function readFile(path: string) {
  return fs.promises.readFile(path, { encoding: 'utf8' })
}

export function writeFile(path: string, content: string) {
  return fs.promises.writeFile(path, content)
}

export function renameFile(path: string, newPath: string) {
  return fs.promises.rename(path, newPath)
}

export function deleteFile(path: string) {
  return fs.promises.unlink(path)
}
