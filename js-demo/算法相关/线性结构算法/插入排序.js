// 插入排序就是将未排序的区间中依次取出元素并插入到已排序区间中合适的位置
const searchArr = [5, 3, 8, 4, 2]

/**
 *
 * @param {any[]} arr
 */
function insertSort(arr) {
  // 直接从第二个元素开始
  for (let i = 1; i < arr.length; i++) {
    const current = arr[i]

    let startIndex = i - 1

    // 依次和已排好序的进行比较
    while (startIndex >= 0 && arr[startIndex] > current) {
      // 每一项都往后娜一个位置
      arr[startIndex + 1] = arr[startIndex]
      startIndex--
    }

    // 都挪完位置后，确定current的位置
    arr[startIndex + 1] = current
  }
}

insertSort(searchArr)

console.log(searchArr)

const searchArr2 = [5, 3, 8, 4, 2, 2]
/**
 * 折半插入排序，在插入排序的基础上，使用二分法来查找插入的位置
 * @param {any[]} arr
 */
function binaryInsertSort(arr) {
  for (let i = 1; i < arr.length; i++) {
    const current = arr[i]

    let left = 0
    let right = i - 1

    // 使用二分查找插入的位置
    while (left <= right) {
      const mid = Math.floor((left + right) / 2)
      if (arr[mid] > current) {
        right = mid - 1
      } else {
        // 如果是相等，实际也是插入到相同元素的后一位
        left = mid + 1
      }
    }

    // 跳出循环，说明找到插入的位置，将该位置的元素依次往后挪
    for (let j = i - 1; j >= left; j--) {
      arr[j + 1] = arr[j]
    }

    // 最后将目标元素插入到此位置
    arr[left] = current
  }
}

binaryInsertSort(searchArr2)
console.log(searchArr2)
