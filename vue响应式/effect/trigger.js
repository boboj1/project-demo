import { activeEffect, targetMap } from './effect.js'
import { TrackOpTypes, TriggerOpTypes, ITERATE_KEY } from '../utils/index.js'

const triggerTypeMap = {
  [TriggerOpTypes.SET]: [TrackOpTypes.GET],
  [TriggerOpTypes.ADD]: [TrackOpTypes.GET, TrackOpTypes.ITERATE, TrackOpTypes.HAS],
  [TriggerOpTypes.DELETE]: [TrackOpTypes.GET, TrackOpTypes.ITERATE, TrackOpTypes.HAS],
}

export default function (target, type, key) {
  // 找到依赖然后执行依赖
  const effectFns = getEffectFns(target, type, key)

  console.log(effectFns, 'effectFns')

  // console.log(`触发器：代理对象${key}属性的${type}操作被拦截`)
}

function getEffectFns(target, type, key) {
  const propMap = targetMap.get(target)
  if (!propMap) return

  const keys = [key]
  if (type === TriggerOpTypes.DELETE || type === TriggerOpTypes.DELETE) {
    keys.push(ITERATE_KEY)
  }
}
