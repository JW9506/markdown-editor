export function ensure<T>(
  obj: T,
  msg = 'Object is not defined at runtime'
): NonNullable<T> {
  if (obj == null) {
    throw new Error(msg)
  }
  return obj as any
}
