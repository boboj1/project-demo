import { reactive } from './reactive'

const originObj = {
  name: 'tao',
  age: 18,
  get fullName() {
    console.log(this)
    return this.name + this.age
  },
  address: { city: 'beijing' },
}

const obj = reactive(originObj)
const obj2 = reactive(originObj)

// console.log(obj === obj2)

// console.log(obj.fullName)
console.log(obj.address)
