import trigger from '../../../effect/trigger.js'
import { TriggerOpTypes } from '../../../utils/index.js'

export default function (target, key) {
  const hasKey = Object.prototype.hasOwnProperty.call(target, key)
  const result = Reflect.deleteProperty(target, key)

  // 只有删除目标对象上已有的属性时才进行派发更新
  if (result && hasKey) {
    trigger(target, TriggerOpTypes.DELETE, key)
  }
  return result
}
