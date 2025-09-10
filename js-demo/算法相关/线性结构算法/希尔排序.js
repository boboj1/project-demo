const searchArr = [36, 27, 20, 60, 55, 7, 28, 36, 67, 44, 16]

/**
 * 通过一个gap来进行分组，对每一组进行插入排序，排完一轮后，gap取一半，继续重复上述操作
 * @param {any[]} arr
 */
function shellSort(arr) {
  let len = arr.length
  let gap = Math.floor(len / 2)

  // 这一层循环是将每一组的划分都排序完
  while (gap > 0) {
    // 这一层是遍历有多少个组
    for (let i = gap; i < len; i++) {
      const current = arr[i]
      let startIndex = i - gap

      // 这一层是对这一组的数据进行排序
      while (startIndex >= 0 && arr[startIndex] > current) {
        arr[startIndex + gap] = arr[startIndex]
        startIndex -= gap
      }

      // 如果当前的startIndex的数值比较小，说明后一个位置就是插入的位置
      arr[startIndex + gap] = current
    }

    // gap减半继续排
    gap = Math.floor(gap / 2)
  }
}

shellSort(searchArr)

console.log(searchArr)
