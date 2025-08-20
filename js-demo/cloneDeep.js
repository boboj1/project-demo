const oldObj = {
  name: 'John',
  age: 30,
  colors: ['red', 'green', 'blue'],
  address: {
    city: 'New York',
    zip: '10001',
  },
  oldObj: {},
}

oldObj.oldObj = oldObj

console.log(oldObj)

const map = new WeakMap()

function cloneDeep(obj) {
  if (typeof obj !== 'object' || obj === null) return obj

  if (map.has(obj)) return map.get(obj)

  const copy = Array.isArray(obj) ? [] : {}

  map.set(obj, copy)

  for(const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      copy[key] = cloneDeep(obj[key])
    }
  }

  return copy
}

const newObj = cloneDeep(oldObj)
newObj.age = 22
console.log(newObj)
