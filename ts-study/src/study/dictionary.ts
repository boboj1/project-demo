type Callback<K, V> = (key: K, val: V) => void

/**
 * 字典类中对键值对的操作：
 * - 按照键，删除对应的键值对
 * - 循环每一个键值对
 * - 得到当前键值对的数量
 * - 判断某个键是否存在
 * - 重新设置某个键对应的值，如果不存在则添加
 */
export class Dictionary<K, V> {
  private keys: K[] = []
  private vals: V[] = []

  /**
   * 设置某个键对应的值，如果不存在则添加
   * @param key
   * @param val
   */
  set(key: K, val: V) {
    const index = this.keys.indexOf(key)
    if (index < 0) {
      this.keys.push(key)
      this.vals.push(val)
    } else {
      this.vals[index] = val
    }
  }

  /**
   * 循环每一个键值对
   * @param callback
   */
  forEach(callback: Callback<K, V>) {
    this.keys.forEach((key, index) => {
      const val = this.vals[index]
      callback(key, val)
    })
  }

  /**
   * 判断某个键是否存在
   * @param key
   */
  has(key: K): boolean {
    return this.keys.indexOf(key) >= 0
  }

  /**
   * 根据键删除键值对
   * @param key
   */
  delete(key: K) {
    const index = this.keys.indexOf(key)
    if (index >= 0) {
      this.keys.splice(index, 1)
      this.vals.splice(index, 1)
    }
  }

  /**
   * 获取键值对的数量
   */
  get length() {
    return this.keys.length
  }
}
