import track, { resumeTracking, pauseTracking } from '../../effect/track.js'
import { isObject, TrackOpTypes, RAW } from '../../utils/index.js'
import { reactive } from '../../reactive.js'

// 重写数组的几个查询方法，对数据进行代理的时候，会递归对数组中的每一项进行代理
// 所以在代理数组中查询对象数据时，需要通过原数组进行查询
const arrayInstrumentations = {}

;['includes', 'indexOf'].forEach((key) => {
  arrayInstrumentations[key] = function (...args) {
    // 先指向代理的数组正常找
    const res = Array.prototype[key].apply(this, args)

    // 代理数组中找不到则使用原数组进行查找
    if (!res || res === -1) {
      return Array.prototype[key].apply(this[RAW], args)
    }

    return res
  }
})
// 重写数组的push、unshift、pop、shift、splice方法
// 这些方法会访问数组的length，应避免对length的依赖收集
;['push', 'unshift', 'pop', 'shift', 'splice'].forEach((key) => {
  arrayInstrumentations[key] = function (...args) {
    // 暂停依赖收集
    pauseTracking()
    const res = Array.prototype[key].apply(this, args)
    resumeTracking()
    // 恢复依赖收集
    return res
  }
})

export default function (target, key) {
  // console.log(`拦截${key}的get`)
  if (key === RAW) {
    return target
  }

  track(target, TrackOpTypes.GET, key)

  // 如果target是数组，且访问的是数组的一些方法，则返回重写后的方法
  if (Object.prototype.hasOwnProperty.call(arrayInstrumentations, key) && Array.isArray(target)) {
    return arrayInstrumentations[key]
  }

  const value = Reflect.get(target, key)

  if (isObject(value)) {
    return reactive(value)
  }

  return value
}
