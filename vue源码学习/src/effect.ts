import { TrackOpTypes, TriggerOpTypes } from './operations'

let shouldTrack = true

export function pauseTracking() {
  shouldTrack = false
}

export function resetTracking() {
  shouldTrack = true
}

export function track<T extends object>(target: T, type: TrackOpTypes, key: string | symbol) {
  if (!shouldTrack) {
    return
  }
  console.log(`依赖收集:[[ ${type} ]] ${String(key)}属性被读取`)
}

export function trigger<T extends object>(target: T, type: TriggerOpTypes, key: string | symbol) {
  console.log(`触发更新:[[ ${type} ]] ${String(key)}属性被更新`)
}
