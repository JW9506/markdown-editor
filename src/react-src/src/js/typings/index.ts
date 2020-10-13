export interface FileObject {
  id: string
  title: string
  body: string
  createdAt: number
  isNew?: boolean
}

export type AnyFunction<T extends any[] = any[], R = void> = (...args: T) => R
