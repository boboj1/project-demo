export function isObject(value: unknown): value is object {
  return value !== null && typeof value === 'object'
}

export function isFunction(value: unknown): value is Function {
  return typeof value === 'function'
}

export function isArray(value: unknown): value is Array<any> {
  return Array.isArray(value)
}

export function isString(value: unknown): value is string {
  return typeof value === 'string'
}

export function isPromise<T = any>(value: any): value is Promise<T> {
  return isObject(value) && isFunction((value as any)?.then) && isFunction((value as any)?.catch)
}

export function hasChanged(oldValue: any, newValue: any): boolean {
  return !Object.is(oldValue, newValue)
}

export function hasOwn(target: object, key: string | symbol): boolean {
  return Object.prototype.hasOwnProperty.call(target, key)
}
