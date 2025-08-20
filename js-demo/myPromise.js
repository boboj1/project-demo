const PENDING = 'pending'
const FULFILLED = 'fulfilled'
const REJECTED = 'rejected'

class MyPromise {
  #state = PENDING
  #result = undefined
  #thenables = []

  constructor(executor) {
    const resolve = (value) => {
      this.#changeState(FULFILLED, value)
    }

    const reject = () => {
      this.#changeState(REJECTED, value)
    }

    try {
      executor(resolve, reject)
    } catch (error) {
      reject(error)
    }
  }

  #handleCallback(callback, resolve, reject) {
    if (typeof callback !== 'function') {
      queueMicrotask(() => {
        const fn = this.#state === FULFILLED ? resolve : reject
        fn(this.#result)
      })
    } else {
      queueMicrotask(() => {
        try {
          const result = callback(this.#result)
          if (result instanceof MyPromise) {
            result.then(resolve, reject)
          } else {
            resolve(result)
          }
        } catch (error) {
          reject(error)
        }
      })
    }
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

  #changeState(state, result) {
    if (this.#state !== PENDING) return
    this.#state = state
    this.#result = result
    this.#run()
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

  static resolve(value) {
    return new MyPromise((resolve) => {
      resolve(value)
    })
  }

  static reject(value) {
    return new MyPromise((resolve, reject) => {
      reject(value)
    })
  }

  catch(onRejected) {
    return this.then(undefined, onRejected)
  }

  finally(callback) {
    return this.then((value) => MyPromise.resolve(callback()).then(() => value))
  }
}

const p = new MyPromise((resolve, reject) => {
  resolve('success')
})

p.then((res) => {
  console.log(res)
})
