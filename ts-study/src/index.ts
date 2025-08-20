export {}

type TagName = keyof HTMLElementTagNameMap & {}
function createElement<T extends TagName>(tagName: T): HTMLElementTagNameMap[T] {
  return document.createElement(tagName)
}

type aaa = keyof any

type User = {
  readonly id: number
  name: string
  tel: string
  address?: string
}

type Copy<T> = {
  [key in keyof T & string]: T[key]
}

const user: Copy<User> = {
  id: 1,
  name: '111',
  tel: 'ssss',
  address: '地址',
}

type DeepReadonly<T> = {
  [key in keyof T]: T[key] extends object ? DeepReadonly<T[key]> : T[key]
}

type ArrLen<T extends any[]> = T['length']

type Concat<T extends any[], K extends any[]> = [...T, ...K]

type NewArr = Concat<[1, 2], ['aa']>

type If<T extends boolean, K, U> = T extends true ? K : U

type A = If<true, 'a', 'b'> // 'a'
type B = If<false, 'a', 'b'> // 'b'

const arr = [
  { id: 1, name: 'aaa' },
  { id: 2, name: 'bbb' },
  { id: 3, name: 'ccc' },
]

type Flatten<T> = T extends any[] ? T[number] : T

type foo = {
  name: string
  age: string
  data: {
    name: string
    age: number
  }
}

type NewFoo = Partial<foo>

type bar = {
  age: number
  sex: string
}

type Merge<T, K> = {
  [key in keyof T | keyof K]: key extends keyof T ? T[key] : key extends keyof K ? K[key] : never
}
type Result = Merge<foo, bar>

type MyInclude<T, K> = T extends K ? T : never

type MyExclude<T, K> = T extends K ? never : T

type MyPick<T, K extends keyof T> = {
  [key in K]: T[key]
}

type DeepPartial<T> = T extends any
  ? {
      [key in keyof T]?: DeepPartial<T[key]>
    }
  : T

type DeepFoo = DeepPartial<foo>

type MyOmit<T, K extends keyof T> = {
  [P in keyof T as P extends K ? never : P]: T[P]
}

// type DeepOmit<T, K extends keyof T> = T extends object ? {
//   [P in keyof T as P extends K ? never : P]: DeepOmit<T[P], K>
// } : T

type DeepOmit<T, K extends keyof any> = T extends object
  ? {
      [P in keyof T as P extends K ? never : P]: DeepOmit<T[P], K>
    }
  : T

type DeepOmitFoo = DeepOmit<foo, 'name'>

type PickType<T, K extends string | number> = {
  [P in keyof T as T[P] extends K ? P : never]: T[P]
}

type Foo = {
  name: string
  age: string
  data: {
    name: string
    age: number
  }
}

type bo = string extends object ? true : false

type NewFoo1 = PickType<Foo, number>

type DeepPickType<T, K extends string | number> = T extends object
  ? {
      [P in keyof T as T[P] extends K | object ? P : never]: DeepPickType<T[P], K>
    }
  : T

type NewFoo2 = DeepPickType<Foo, number>

type GetReturnType<T> = T extends (...args: any[]) => infer U ? U : never

function sayName(): string {
  return '111'
}

type SayNameType = GetReturnType<typeof sayName>

type First<T> = T extends [infer U, ...infer K] ? U : never

type Direction = 'left' | 'right' | 'top' | 'bottom'
type BoxName = 'padding' | 'margin' | 'border'
type BoxModel = `${BoxName}-${Direction}`

type AAA = {
  foo: number
  bar: number
}

type AAAA = {
  [key in keyof AAA as `${key}c`]: AAA[key]
}

type UserInfo = { name: string; age: number; address: string }

type GetterHandler<T> = {
  [K in keyof T as `get${Capitalize<K & string>}`]: () => void
}

type UserInfoGetter = GetterHandler<UserInfo>

// 联合类型转为交叉类型
type NineMantra = '临兵斗者皆阵列前行'
type StringToUnion<S extends string> = S extends `${infer U}${infer Rest}` ? U | StringToUnion<Rest> : never
type NineMantraUnion = StringToUnion<NineMantra>

type ReverseArr<T> = T extends [infer A, ...infer Rest] ? [...ReverseArr<Rest>, A] : T
type Reversed = ReverseArr<[1, 2, 3, 4, 5]>

type LengthOfString<T, U extends string[] = []> = T extends `${infer F}${infer R}` ? LengthOfString<R, [...U, F]> : U['length']

type S = LengthOfString<'12345'>

type UnionToIntersection<U> = (U extends any ? (arg: U) => any : never) extends (arg: infer R) => any ? R : never

type I = UnionToIntersection<{ id: 1 } | { name: 'jack' } | { sex: '男' }>

type DeepPartials<T> = T extends any ? { [K in keyof T]?: DeepPartials<T[K]> } : T
