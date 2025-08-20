import track from '../../effect/track.js'
import { TrackOpTypes } from '../../utils/index.js'

export default function (target, key) {
  track(target, TrackOpTypes.HAS, key)
  return Reflect.has(target, key)
}
