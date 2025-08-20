interface Condition {
  (num: number): boolean
}

function sum(numbers: number[], callback: Condition) {
  let s = 0
  numbers.forEach((item) => {
    if (callback(item)) {
      s += item
    }
  })
  return s
}

// 只读
const arr: readonly number[] = [1, 2, 3]

/**
 * ts类型兼容性
 * B  -> A 如果能完成赋值，则B和A类型兼容
 */

interface Duck {
  name: 'aaa'
  swin: () => void
}
const duck1 = {
  name: '1111' as 'aaa',
  swin() {
    console.log('111')
  },
  age: 123,
}

// 直接赋值，类型兼容
const duck2: Duck = duck1

interface Obj1 {
  name?: string
  age: number
}

function test() {
  return {
    neme: '11',
    age: 123,
  }
}

const a1: Obj1 = test()
