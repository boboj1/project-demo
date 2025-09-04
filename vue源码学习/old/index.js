import { reactive } from './reactive.js'
import { effect, targetMap } from './effect/effect.js'

const obj = reactive({
  name: 'zhangsan',
  age: 18,
  data: {
    name: 'lisi',
  },
})

// const proxyArr = reactive([1, obj, 2])

effect(() => {
  console.log(obj.age, 'effect')
})

// obj.age = 17

console.log('targetMap', targetMap)
