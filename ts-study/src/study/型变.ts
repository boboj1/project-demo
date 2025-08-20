class Animal {
  eat() {
    console.log('eat')
  }
}

class Pet extends Animal {
  run() {
    console.log('run')
  }
}

class Dog extends Pet {
  bark() {
    console.log('bark')
  }
}

function clone(f: (p: Pet) => Pet): void {
  // ...
}

function petToAnimal(p: Pet): Animal {
  return new Animal()
}

function petToPet(p: Pet): Pet {
  return new Pet()
}

function petToDog(p: Pet): Dog {
  return new Dog()
}

// clone(petToAnimal) // error
clone(petToPet)
clone(petToDog)

class Parent {
  name: string = 'Parent'
}
class Child extends Parent {
  age: number = 10
}

// 函数类型：接收 Parent 并返回 void
type FuncParent = (p: Parent) => void
// 函数类型：接收 Child 并返回 void
type FuncChild = (c: Child) => void

const funcParent: FuncParent = (p) => console.log(p.name)
const funcChild: FuncChild = funcParent // 合法（逆变）
// 解释：funcParent 能处理 Parent，自然能处理其亚型 Child
