export function isObject(value) {
  return value !== null && typeof value === 'object'
}

export function hasChanged(oldValue, newValue) {
  return !Object.is(oldValue, newValue)
}

export const TrackOpTypes = {
  GET: 'get',
  HAS: 'has',
  ITERATE: 'iterate',
}

export const TriggerOpTypes = {
  SET: 'set',
  DELETE: 'delete',
  ADD: 'add',
}

export const RAW = Symbol('raw')

export const ITERATE_KEY = Symbol('iterate')
