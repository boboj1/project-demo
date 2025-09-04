import handler from './old/handler/index.js'
import { isObject } from './utils/index.js'

const proxyMap = new WeakMap()

export function reactive(target) {
  // 如果不是对象直接返回传入的值
  if (!isObject(target)) {
    return target
  }

  if (proxyMap.has(target)) {
    return proxyMap.get(target)
  }

  const proxy = new Proxy(target, handler)

  proxyMap.set(target, proxy)

  return proxy
}
