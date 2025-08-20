export {}

/**
 * 泛型的约束
 */

interface HasNameProperty {
  name: string
}

// 通过extend约束泛型T必须包含一个name属性
function nameToUpperCase<T extends HasNameProperty>(o: T): T {
  o.name = o.name
    .split(' ')
    .map((item) => item[0].toUpperCase() + item.slice(1))
    .join(' ')
  return o
}

const obj = {
  name: 'aaa bbb',
  age: 123,
}

const newObj = nameToUpperCase(obj)

console.log(newObj.name)

/**
 * 多泛型
 */
function mixinArray<T, K>(arr1: T[], arr2: K[]): (T | K)[] {
  if (arr1.length !== arr2.length) {
    throw new Error('arr1.length !== arr2.length')
  }
  const result: (T | K)[] = []
  for (let i = 0; i < arr1.length; i++) {
    result.push(arr1[i])
    result.push(arr2[i])
  }
  return result
}

const result = mixinArray([1, '2'], ['3', 88])
console.log(result)
