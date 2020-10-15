declare module '*.css' {
  const src: string
  export default src
}

declare module '*.less' {
  const src: string
  export default src
}

type ObjectKeys<T> = T extends Record<string, any>
  ? (keyof T)[]
  : T extends number
  ? []
  : T extends Array<any> | string
  ? string[]
  : never

interface ObjectConstructor {
  keys<T>(o: T): ObjectKeys<T>
}
