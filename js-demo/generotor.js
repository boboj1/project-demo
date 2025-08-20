// 自动执行器：驱动 Generator 函数执行
function _asyncToGenerator(fn) {
  return function () {
    const self = this
    const args = arguments
    // 返回一个 Promise，模拟 async 函数的返回值特性
    return new Promise(function (resolve, reject) {
      // 将 async 函数转为 Generator 函数
      const gen = fn.apply(self, args)
      // 执行 Generator 的 next 方法
      function _next(value) {
        try {
          const result = gen.next(value) // 执行到下一个 await（即 yield）
          const value = result.value
          const done = result.done
          if (done) {
            // 全部执行完成，resolve 结果
            resolve(value)
          } else {
            // 对 yield 的结果（Promise）进行链式调用，递归执行下一步
            return Promise.resolve(value).then(_next, _throw)
          }
        } catch (e) {
          // 捕获错误，reject
          reject(e)
        }
      }
      // 处理错误
      function _throw(err) {
        try {
          const result = gen.throw(err)
        } catch (e) {
          reject(e)
        }
      }
      // 启动执行
      _next(undefined)
    })
  }
}

// 编译后的 fetchData（由 async 转为 Generator + 自动执行器）
const fetchData = _asyncToGenerator(function* () {
  // async 转为 * 函数
  try {
    const user = yield fetchUser() // await 转为 yield
    const posts = yield fetchPosts(user.id) // 第二个 await 转为 yield
    return { user, posts }
  } catch (err) {
    console.error('出错了:', err)
    throw err
  }
})
