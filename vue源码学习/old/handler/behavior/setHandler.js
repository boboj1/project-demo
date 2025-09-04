import trigger from '../../../effect/trigger.js'
import { hasChanged, TriggerOpTypes } from '../../../utils/index.js'

export default function (target, key, value) {
  // 对象可能新增属性
  const type = Object.prototype.hasOwnProperty.call(target, key) ? TriggerOpTypes.SET : TriggerOpTypes.ADD

  const oldValue = target[key]
  const oldLength = Array.isArray(target) ? target.length : undefined

  const result = Reflect.set(target, key, value)

  if (hasChanged(oldValue, value)) {
    // 新旧值不一样才触发更新
    trigger(target, type, key)

    // 数组长度发生变化时
    if (Array.isArray(target) && oldLength !== target.length) {
      if (key !== 'length') {
        // 隐式的改变数组长度不会触发length的派发更新，需要在这里手动触发
        trigger(target, TriggerOpTypes.SET, 'length')
      } else {
        // 显式的改变数组长度时需要处理长度变小的情况
        // 长度变小需要考虑元素删除的情况
        for (let i = target.length; i < oldLength; i++) {
          trigger(target, TriggerOpTypes.DELETE, i.toString())
        }
      }
    }
  }

  return result
}
