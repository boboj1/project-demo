const PENDING = 'pending'
const FULFILLED = 'fulfilled'
const REJECTED = 'rejected'

class MyPromise {
  #state = 'pending'
  #result = undefined
  #thenables = []

  constructor(executor) {
    const resolve = (value) => {
      this.#changeState(FULFILLED, value)
    }

    const reject = (error) => {
      this.#changeState(REJECTED, error)
    }

    try {
      executor(resolve, reject)
    } catch (error) {
      reject(error)
    }
  }

  #changeState(state, result) {
    if (this.#state !== PENDING) return
    this.#state = state
    this.#result = result

    this.#run()
  }

  #handleCallback(callback, resolve, reject) {
    if (typeof callback !== 'function') {
      // 状态穿透
      queueMicrotask(() => {
        const fn = this.#state === FULFILLED ? resolve : reject
        fn(this.#result)
      })
      return
    }

    queueMicrotask(() => {
      try {
        const data = callback(this.#result)
        if (data instanceof MyPromise) {
          data.then(resolve, reject)
        } else {
          resolve(data)
        }
      } catch (error) {
        reject(error)
      }
    })
  }

  #run() {
    if (this.#state === PENDING) return

    while (this.#thenables.length) {
      const { onFulfilled, onRejected, resolve, reject } = this.#thenables.shift()

      if (this.#state === FULFILLED) {
        this.#handleCallback(onFulfilled, resolve, reject)
      } else {
        this.#handleCallback(onRejected, resolve, reject)
      }
    }
  }

  then(onFulfilled, onRejected) {
    return new MyPromise((resolve, reject) => {
      this.#thenables.push({
        onFulfilled,
        onRejected,
        resolve,
        reject,
      })

      this.#run()
    })
  }

  catch(onRejected) {
    return this.then(undefined, onRejected)
  }

  finally(callback) {
    return this.then(
      (value) => {
        return MyPromise.resolve(callback()).then(() => value)
      },
      (reason) => {
        return MyPromise.resolve(callback()).then(() => {
          throw reason
        })
      }
    )
  }

  static resolve(value) {
    return new MyPromise((resolve) => {
      resolve(value)
    })
  }

  static reject(reason) {
    return new MyPromise((resolve, reject) => {
      reject(reason)
    })
  }

  static all(promises) {
    return new MyPromise((resolve, reject) => {
      const results = []
      let completed = 0

      promises.forEach((p, index) => {
        MyPromise.resolve(p).then(
          (value) => {
            results[index] = value
            completed += 1
            if (completed === promises.length) {
              resolve(results)
            }
          },
          (reason) => {
            reject(reason)
          }
        )
      })
    })
  }

  static any(promises) {
    return new MyPromise((resolve, reject) => {
      const errors = []
      let completed = 0

      promises.forEach((p) => {
        MyPromise.resolve(p).then(
          (value) => {
            resolve(value)
          },
          (reason) => {
            errors.push(reason)
            completed += 1
            if (completed === promises.length) {
              reject(new AggregateError(errors))
            }
          }
        )
      })
    })
  }

  static race(promises) {
    return new MyPromise((resolve, reject) => {
      promises.forEach((p) => {
        MyPromise.resolve(p).then(resolve, reject)
      })
    })
  }

  static allSettled(promises) {
    return new MyPromise((resolve) => {
      const results = []
      let completed = 0

      promises.forEach((p, index) => {
        MyPromise.resolve(p)
          .then(
            (value) => {
              results[index] = { status: 'fulfilled', value }
            },
            (reason) => {
              results[index] = { status: 'rejected', reason }
            }
          )
          .finally(() => {
            completed += 1
            if (completed === promises.length) {
              resolve(results)
            }
          })
      })
    })
  }
}

// const p = new MyPromise((resolve, reject) => {
//   resolve('成功')
// })

// p.then((res) => {
//   console.log('then', res)
// })
//   .then(123)
//   .then((res) => {
//     console.log('第三次then', res)
//   })

const p2 = new MyPromise((resolve, reject) => {
  resolve(111)
})

p2.then(() => {
  return new MyPromise((resolve, reject) => {
    resolve(222)
  })
}).then((res) => {
  console.log(333, res)
})
