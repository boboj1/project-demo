import { track, trigger } from './effect'
import { isObject } from './utils'
import baseHandlers from './baseHandlers'

export const enum ReactiveFlags {
  IS_REACTIVE = '__v_isReactive',
  IS_READONLY = '__v_isReadonly',
  RAW = '__v_raw',
  SKIP = '__v_skip', // 标记不需要被代理
}

export interface Target {
  [ReactiveFlags.IS_REACTIVE]?: boolean
  [ReactiveFlags.IS_READONLY]?: boolean
  [ReactiveFlags.RAW]?: any
  [ReactiveFlags.SKIP]?: boolean
}

const targetMap = new WeakMap<Target, any>()

export function reactive<T extends object>(target: T) {
  if (!isObject(target)) {
    return target
  }

  // 如果是已经被代理过的对象，直接返回
  if ((target as Target)[ReactiveFlags.IS_REACTIVE]) {
    return target
  }

  // 已经代理过的直接取出来用
  if (targetMap.has(target)) {
    return targetMap.get(target)
  }

  const proxy = new Proxy(target, baseHandlers)

  targetMap.set(target, proxy)

  return proxy
}
