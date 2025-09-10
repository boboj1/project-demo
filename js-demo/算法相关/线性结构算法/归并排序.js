// 归并排序的思想就是先分，然后再合并

const arr1 = [4, 5, 7, 8]
const arr2 = [1, 2, 3, 6]

/**
 * 使用双指针
 * @param {any[]} arr1
 * @param {any[]} arr2
 */
function merge(arr1, arr2) {
  let result = []
  let leftIndex = 0
  let rightIndex = 0

  while (leftIndex < arr1.length && rightIndex < arr2.length) {
    if (arr1[leftIndex] > arr2[rightIndex]) {
      result.push(arr2[rightIndex])
      rightIndex++
    } else {
      result.push(arr1[leftIndex])
      leftIndex++
    }
  }

  // 将剩余的加到数组末尾
  if (leftIndex !== arr1.length) {
    result = result.concat(arr1.slice(leftIndex))
  }
  if (rightIndex !== arr2.length) {
    result = result.concat(arr2.slice(rightIndex))
  }

  return result
}

/**
 *
 * @param {any[]} arr
 */
function mergeSort(arr) {
  if (arr.length < 2) {
    return arr
  }

  const mid = Math.floor(arr.length / 2)

  const leftArr = mergeSort(arr.slice(0, mid))
  const rightArr = mergeSort(arr.slice(mid))

  return merge(leftArr, rightArr)
}

const arr = [36, 27, 20, 60, 55, 7, 28, 36, 67, 44, 16]
console.log(mergeSort(arr))
