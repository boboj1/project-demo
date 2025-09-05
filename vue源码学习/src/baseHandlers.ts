import { isObject, hasChanged, hasOwn, isArray } from './utils'
import { track, trigger, pauseTracking, resetTracking } from './effect'
import {
  ReactiveFlags,
  reactive,
  toRaw,
  readonly,
  reactiveMap,
  readonlyMap
} from './reactive'
import { TrackOpTypes, TriggerOpTypes } from './operations'

const ITERATE_KEY = Symbol('iterate')

const arrayInstrumentations: Record<string, Function> = {}

;(['includes', 'indexOf', 'lastIndexOf'] as const).forEach((key) => {
  // 得到原始的方法
  const method = Array.prototype[key]
  arrayInstrumentations[key] = function (this: unknown[], ...args: unknown[]) {
    // 原始数组
    const arr = toRaw(this)
    for (let i = 0, l = this.length; i < l; i++) {
      track(arr, TrackOpTypes.GET, i + '')
    }

    // 将参数在原始数组中查找
    const res = method.apply(arr, args)

    if (res === -1 || res === false) {
      // 没找到则将参数转化为原始值再找一遍
      const rawArgs = args.map(toRaw)
      return method.apply(arr, rawArgs)
    }
    return res
  }
})

// 会触发方法和length的依赖收集，实际不需要这些依赖收集
;(['push', 'pop', 'shift', 'unshift', 'splice'] as const).forEach((key) => {
  const method = Array.prototype[key]
  arrayInstrumentations[key] = function (this: unknown[], ...args: unknown[]) {
    pauseTracking()
    const res = method.apply(this, args)
    resetTracking()
    return res
  }
})

function createGetter(isReadonly: boolean = false, isShallow: boolean = false) {
  return function get(target: any, key: string | symbol, receiver: any) {
    // 代理过的访问相应的属性返回true
    if (key === ReactiveFlags.IS_REACTIVE) {
      return true
    }

    if (key === ReactiveFlags.IS_READONLY) {
      return isReadonly
    }

    // 返回原始对象
    if (
      key === ReactiveFlags.RAW &&
      receiver === (isReadonly ? readonlyMap : reactiveMap).get(target)
    ) {
      return target
    }

    // 如果是数组，返回重写后的方法
    if (isArray(target) && hasOwn(arrayInstrumentations, key)) {
      return Reflect.get(arrayInstrumentations, key, receiver)
    }

    // 收集依赖
    // 非只读的情况下才需要收集依赖
    if (!isReadonly) {
      track(target, TrackOpTypes.GET, key)
    }

    const result = Reflect.get(target, key, receiver)

    if (isObject(result)) {
      // 浅代理
      if (isShallow) {
        return result
      }
      // 递归代理
      return isReadonly ? readonly(result) : reactive(result)
    }
    return result
  }
}

function set(target: any, key: string | symbol, value: any, receiver: any) {
  const oldValue = target[key]
  if (!hasChanged(oldValue, value)) {
    // 值没有变化，直接返回
    return true
  }

  const oldLength = isArray(target)
    ? Reflect.get(target, 'length', receiver)
    : undefined
  const type = hasOwn(target, key) ? TriggerOpTypes.SET : TriggerOpTypes.ADD
  const result = Reflect.set(target, key, value, receiver)
  const newLength = isArray(target)
    ? Reflect.get(target, 'length', receiver)
    : undefined

  // 派发当前key的更新
  trigger(target, type, key)
  // 数组的length会隐式增加和显示减少，此处需要特殊处理
  if (isArray(target) && newLength !== oldLength) {
    if (key !== 'length') {
      // 隐式的增加了数组的length，需要触发length的更新
      trigger(target, TriggerOpTypes.SET, 'length')
    } else {
      // 显示的设置数组的length，且length减少，需要触发删除元素的更新
      if (newLength < oldLength) {
        for (let i = newLength; i < oldLength; i++) {
          trigger(target, TriggerOpTypes.DELETE, i + '')
        }
      }
    }
  }

  return result
}

function has(target: any, key: string | symbol) {
  track(target, TrackOpTypes.HAS, key)
  return Reflect.has(target, key)
}

function ownKeys(target: any) {
  track(target, TrackOpTypes.ITERATE, ITERATE_KEY)
  return Reflect.ownKeys(target)
}

function deleteProperty(target: any, key: string | symbol) {
  trigger(target, TriggerOpTypes.DELETE, key)
  return Reflect.deleteProperty(target, key)
}

export const mutableHandlers: ProxyHandler<any> = {
  get: createGetter(),
  set,
  has,
  ownKeys,
  deleteProperty
}

export const readonlyHandlers: ProxyHandler<any> = {
  get: createGetter(true),
  set(target: any, key: string | symbol, value: any, receiver: any) {
    console.warn(`${target}中的属性${String(key)}是只读的，不能设置`)
    return true
  },
  // 只读的情况下也不需要拦截这两个操作，不需要进行依赖收集
  // has,
  // ownKeys,
  deleteProperty(target: any, key: string | symbol) {
    console.warn(`${target}中的属性${String(key)}是只读的，不能删除`)
    return true
  }
}
