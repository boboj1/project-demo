function classDecorator(desc: string) {
  return function (target: new (...args: any[]) => object, ...args: any[]) {
    console.log(target)
  }
}

function Prop(desc: string) {
  /**
   * 属性装饰器是拿不到属性值的，因为在类还没实例化的时候就已经运行
   */
  return function (target: any, propName: any) {
    // console.log(target, propName)
  }
}

@classDecorator('用户')
class DecUser {
  @Prop('账号')
  loginId: number

  @Prop('密码')
  passWord: string

  constructor(loginId: number = 12, passWord: string = '2') {
    this.loginId = loginId
    this.passWord = passWord
  }
}

// const dUser = new DecUser(1, '2')

// console.log(dUser)
