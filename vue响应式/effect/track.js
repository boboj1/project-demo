import { TrackOpTypes, ITERATE_KEY } from '../utils/index.js'
import { activeEffect, targetMap } from './effect.js'

let shouldTrack = true

export function pauseTracking() {
  shouldTrack = false
}

export function resumeTracking() {
  shouldTrack = true
}

export default function (target, type, key) {
  if (!shouldTrack || !activeEffect) {
    return
  }

  // 一层层去找
  let propMap = targetMap.get(target)
  if (!propMap) {
    propMap = new Map()
    targetMap.set(target, propMap)
  }

  if (type === TrackOpTypes.ITERATE) {
    // 遍历没有key，对key进行参数归一
    key = ITERATE_KEY
  }

  let typeMap = propMap.get(key)
  if (!typeMap) {
    typeMap = new Map()
    propMap.set(key, typeMap)
  }

  // 最后根据type寻找相应的Set
  let deptSet = typeMap.get(type)
  if (!deptSet) {
    deptSet = new Set()
    typeMap.set(type, deptSet)
  }

  if (!deptSet.has(activeEffect)) {
    // 在target的key的指定类型对应的集合中添加effect函数
    deptSet.add(activeEffect)
    // 同时在effect函数的deps数组中添加set
    // 清理effect函数时，对应的Set中删除effect函数
    activeEffect.deps.push(deptSet)
  }
}
