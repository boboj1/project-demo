enum Sex {
  MALE = '男',
  FEMALE = '女',
}

class User<T> {
  readonly id: number
  gender: Sex.MALE | Sex.FEMALE = Sex.MALE

  private total: number = 10

  // 属性简写
  constructor(public name: string, public age: number, public eatArr: T[]) {
    this.id = Math.random()
  }

  eat(arr: T[]) {
    console.log(arr)
  }
}

const user = new User<number>('aaa', 12, [1111])

user.eat([222])
