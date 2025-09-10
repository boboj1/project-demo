const searchArr = [5, 3, 8, 4, 2]

/**
 *
 * @param {any[]} target
 */
function bubbleSort(target) {
  // 外层循环决定轮询次数
  for (let i = 0; i < target.length; i++) {
    let isSort = false
    // 内层循环决定一次轮询中对比的次数
    for (let j = 0; j < target.length - 1 - i; j++) {
      // 后一个比前一个小，则交换
      if (target[j + 1] < target[j]) {
        const temp = target[j]
        target[j] = target[j + 1]
        target[j + 1] = temp

        isSort = true
      }
    }

    if (!isSort) {
      break
    }
  }
}

bubbleSort(searchArr)

console.log(searchArr)
