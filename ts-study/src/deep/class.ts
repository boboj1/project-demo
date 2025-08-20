;(() => {
  class Tank {
    protected readonly name: string = 'Tank'
  }

  class PlayerTank extends Tank {}

  const player = new PlayerTank()

  /**
   * 抽象类（一个抽象概念作为一个类）
   * 主要用于提取子类共有的成员，不能直接创建对象
   */

  abstract class Chess {
    // 这个属性是抽象的，子类必须去给这个属性赋值
    abstract readonly name: string

    move() {
      console.log(1)
      console.log(2)
      if (this.rule()) {
        return true
      }
      return false
    }

    abstract rule(): boolean
  }

  class Pao extends Chess {
    // constructor(public name: string) {
    //   super()
    // }

    get name() {
      return '炮'
    }

    rule(): boolean {
      return false
    }
  }

  /**
   * 静态成员
   */

  class User {
    static users: User[] = []

    constructor(public name: string, public age: number) {
      User.users.push(this)
    }

    static hasLogin(name: string, age: number): boolean {
      return User.users.some((i) => i.name === name && i.age === age)
    }
  }

  new User('1', 1)
  new User('2', 2)

  console.log(User.hasLogin('1', 1))

  /**
   * 单例模式，不让new，通过指定的静态方法来创建
   */
  class Board {
    private constructor() {}

    // private static board: Board

    // static create() {
    //   if (this.board) {
    //     return this.board
    //   }
    //   this.board = new Board()
    //   return this.board
    // }
    static readonly board: Board = new Board()
  }

  const b1 = Board.board

  /**
   * 类型保护
   */

  interface AnimalAction {
    eat(): void
    fly(): void
  }

  class Animal {}

  class Tigger extends Animal implements AnimalAction {
    eat(): void {
      console.log('eat')
    }
    fly(): void {
      console.log('fly')
    }
  }

  const animals: Animal[] = []

  animals.push(new Tigger())

  function hasAnimalAction(v: object): v is AnimalAction {
    if ((v as unknown as AnimalAction).eat && (v as unknown as AnimalAction).fly) {
      return true
    }
    return false
  }

  animals.forEach((i) => {
    if (hasAnimalAction(i)) {
      i.eat()
      i.fly()
    }
  })

  // 接口可以继承类，表示该类的成员都在接口中、

  /**
   * 索引器
   * 在ts中不对成员表达式做严格类型检查
   */

  class Test {
    // 索引器
    [p: string]: any
    constructor(public name: string) {}
  }

  const t = new Test('1')

  t['c']

  /**
   * this的指向约束
   */
  interface IUser {
    name: string
    say(this: IUser): void
  }
  const ob1: IUser = {
    name: '11',
    say() {
      console.log(this, this.name)
    },
  }

  const say = ob1.say

  // say()
})()
