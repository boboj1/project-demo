import { isObject } from './utils'
import { mutableHandlers, readonlyHandlers } from './baseHandlers'

export const enum ReactiveFlags {
  IS_REACTIVE = '__v_isReactive',
  IS_READONLY = '__v_isReadonly',
  RAW = '__v_raw',
  SKIP = '__v_skip' // 标记不需要被代理
}

export interface Target {
  [ReactiveFlags.IS_REACTIVE]?: boolean
  [ReactiveFlags.IS_READONLY]?: boolean
  [ReactiveFlags.RAW]?: any
  [ReactiveFlags.SKIP]?: boolean
}

type DeepReadonly<T> = T extends any
  ? { readonly [P in keyof T]: T[P] extends object ? DeepReadonly<T[P]> : T[P] }
  : never

export const targetMap = new WeakMap<Target, any>()
export const reactiveMap = new WeakMap<Target, any>()
export const readonlyMap = new WeakMap<Target, any>()

function createReactiveObject<T extends object>(
  target: T,
  isReadonly: boolean,
  handlers: ProxyHandler<T>
) {
  if (!isObject(target)) {
    return target
  }

  // 如果是已经被代理过的对象，直接返回
  if ((target as Target)[ReactiveFlags.IS_REACTIVE]) {
    return target
  }

  const proxyMap = isReadonly ? readonlyMap : reactiveMap
  const existingProxy = proxyMap.get(target)

  // 已经代理过的直接取出来用
  if (existingProxy) {
    return existingProxy
  }

  const proxy = new Proxy<T>(target, handlers)
  proxyMap.set(target, proxy)
  return proxy
}

export function reactive<T extends object>(target: T): T {
  // 如果传入的是readOnly则直接返回
  if (target && target[ReactiveFlags.IS_READONLY]) {
    return target
  }
  return createReactiveObject<T>(target, false, mutableHandlers)
}

export function readonly<T extends object>(target: T): DeepReadonly<T> {
  // 如果传入的是readOnly则直接返回
  if (target && target[ReactiveFlags.IS_READONLY]) {
    return target as DeepReadonly<T>
  }
  return createReactiveObject<T>(target, true, readonlyHandlers)
}

export function toRaw<T>(target: T): T {
  return (target as Target)[ReactiveFlags.RAW] || target
}
