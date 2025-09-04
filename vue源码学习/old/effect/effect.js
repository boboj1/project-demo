export let activeEffect = null
// 用来存储
export const targetMap = new WeakMap()
const effectStack = []

export function effect(fn, options = {}) {
  const { lazy = false } = options
  const environment = () => {
    try {
      activeEffect = environment
      effectStack.push(environment)
      // 每次执行前先清除依赖
      cleanup(environment)
      return fn()
    } finally {
      effectStack.pop()
      activeEffect = effectStack[effectStack.length - 1]
    }
  }

  environment.deps = []
  environment.options = options

  if (!lazy) {
    environment()
  }

  return environment
}

export function cleanup(environment) {
  let deps = environment.deps
  if (deps?.length) {
    // 先将每个dep中的environment清掉
    deps.forEach((dep) => {
      dep.delete(environment)
    })
    // 在把environment上的deps清空
    deps.length = 0
  }
}
