import { reactive, toRaw, readonly } from './reactive'

const obj = {
  a: 1,
  b: 2
}
const arr = [1, obj, 3, , 4]

const proxyArr = reactive(arr)

proxyArr.push(5)

const readonlyArr = readonly({
  a: 1,
  b: 2,
  c: {
    a: 1,
    b: 2
  }
})

// console.log(readonlyArr)

// readonlyArr.a = 2
