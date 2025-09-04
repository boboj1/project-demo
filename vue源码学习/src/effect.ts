export function track<T extends object>(target: T, key: string | symbol) {
  console.log('track', target, key)
}

export function trigger<T extends object>(target: T, key: string | symbol) {}
