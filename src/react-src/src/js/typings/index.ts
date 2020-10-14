export interface FileObject {
  id: string
  title: string
  body: string
  path: string
  createdAt?: number
  isNew?: boolean
  isLoaded?: boolean
}

export type AnyFunction<T extends any[] = any[], R = void> = (...args: T) => R

export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>

export type FileObjectBeforeLoaded = Optional<
  FileObject,
  'body' | 'isNew' | 'isLoaded'
>
