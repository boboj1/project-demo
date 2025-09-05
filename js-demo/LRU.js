class LRUCache {
  constructor(capacity) {
    this.capacity = capacity
    this.cache = new Map()
  }

  get(key) {
    if (!this.cache.has(key)) {
      return -1
    }

    const value = this.cache.get(key)
    this.cache.delete(key)
    this.cache.set(key, value)
    return value
  }

  put(key, value) {
    if (this.cache.has(key)) {
      this.cache.delete(key)
    }

    this.cache.set(key, value)

    if (this.cache.size > this.capacity) {
      const oldKey = this.cache.keys().next().value
      this.cache.delete(oldKey)
    }
  }
}

const lRUCache = new LRUCache(2)

// lRUCache.put(1, 1) // 缓存是 {1=1}
// console.log(JSON.stringify(lRUCache.cache))
// console.log(lRUCache)
// lRUCache.put(2, 2) // 缓存是 {1=1, 2=2}
// console.log(lRUCache)
// const v1 = lRUCache.get(1) // 返回 1
// console.log(v1)
// lRUCache.put(3, 3) // 该操作会使得关键字 2 作废，缓存是 {1=1, 3=3}
// console.log(lRUCache)
// const v2 = lRUCache.get(2) // 返回 -1 (未找到)
// console.log(v2)
// lRUCache.put(4, 4) // 该操作会使得关键字 1 作废，缓存是 {4=4, 3=3}
// console.log(lRUCache)
// const v3 = lRUCache.get(1) // 返回 -1 (未找到)
// console.log(v3)
// const v4 = lRUCache.get(3) // 返回 3
// console.log(v4)
// const v5 = lRUCache.get(4) // 返回 4
// console.log(v5)

// 编写函数format实现金额按千分位分割，保留两位小数点
function format(num) {
  if (typeof num === 'string' || typeof num === 'number') {
    return Number(num)
      .toFixed(2)
      .replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  }
  return
}

// const num = '1234567890'
// const formattedNum = format(num)
// console.log(formattedNum) // 输出 "1,234,567,890.13"

// 使用js实现css颜色转化 #RRGGBB <-> rgb(r, g, b)
function rgbToHex(r, g, b) {
  const toHex = (n) => {
    const hex = n.toString(16)
    return hex.length === 1 ? '0' + hex : hex
  }
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`
}

function hexToRgb(hex) {
  // 如果是非hex格式，直接返回
  if (!/^#([0-9A-Fa-f]{6})$/.test(hex)) {
    return hex
  }
  const bigint = parseInt(hex.slice(1), 16)
  const r = (bigint >> 16) & 255
  const g = (bigint >> 8) & 255
  const b = bigint & 255
  return `rgb(${r}, ${g}, ${b})`
}

const hexColor = '#0000FF'
// console.log(hexToRgb(hexColor))

function getRepeatNum(arr) {
  const numMap = {}
  let maxCount = 0
  let result = null

  arr.forEach((num, index) => {
    if (numMap[num]) {
      numMap[num].count += 1
    } else {
      numMap[num] = {
        value: num,
        count: 1,
        firstIndex: index,
      }
    }

    if (numMap[num].count > maxCount) {
      maxCount = numMap[num].count
      result = numMap[num]
    }
  })

  return result
}

console.log(getRepeatNum([1, 2, 3, 1, 2, 3, 4, 3, 3, 5, 3]))
JSON.stringify(getRepeatNum([1, 2, 3, 1, 2, 3, 4, 3, 3, 5, 3]))
