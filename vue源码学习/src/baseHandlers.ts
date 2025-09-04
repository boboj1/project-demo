import { isObject } from './utils'
import { track, trigger } from './effect'
import { ReactiveFlags, reactive } from './reactive'

export default {
  get(target: any, key: string | symbol, receiver: any) {
    if (key === ReactiveFlags.IS_REACTIVE) {
      return true
    }
    // 收集依赖
    track(target, key)
    const result = Reflect.get(target, key, receiver)

    if (isObject(result)) {
      // 递归代理
      return reactive(result)
    }

    return result
  },
  set(target: any, key: string | symbol, value: any, receiver: any) {
    // 派发更新
    trigger(target, key)
    const result = Reflect.set(target, key, value, receiver)
    return result
  },
  has(target: any, key: string | symbol) {
    track(target, key)
    return Reflect.has(target, key)
  },
} as ProxyHandler<any>
