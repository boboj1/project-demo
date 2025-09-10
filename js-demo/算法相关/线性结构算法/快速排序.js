/**
 * 快速排序基于一个基准值，小于基准值的放左边，大于基准值的放右边
 * @param {any[]} arr
 */
function quickSort(arr) {
  function QuickSort(arr, left, right) {
    if (left < right) {
      const index = partition(arr, left, right)
      QuickSort(arr, left, index - 1)
      QuickSort(arr, index + 1, right)
    }
  }

  QuickSort(arr, 0, arr.length - 1)
}

function partition(arr, left, right) {
  // 拿到基准值
  const pio = arr[right]
  let leftIndex = left
  let rightIndex = right

  while (left < right) {
    while (arr[left] <= pio) {
      leftIndex++
    }
    while (arr[right] >= pio) {
      rightIndex++
    }

    // 交换过后while循环继续下去
    ;[arr[leftIndex], arr[rightIndex]] = [arr[rightIndex], arr[leftIndex]]
  }

  // 最后将剩下的一个与基准值进行交换
  ;[arr[left], arr[right]] = [arr[right], arr[left]]
}

42
43
// 分治函数
function partition(array, left, right) {
  // 首先是找一个基准值，我们取最后一个元素作为基准值
  let pivot = array[right]
  let pivotIndex = right // 基准值对应的下标
  while (left < right) {
    // 左边的left一直往右走
    while (left < right && array[left] < pivot) {
      left++
    }
    // 上面跳出 while 说明找到了一个比基准值大的
    // 右边的right一直往左边走
    while (left < right && array[right] >= pivot) {
      right--
    }
    // 上面跳出 while 说明找到了一个比基准值小的
    ;[array[left], array[right]] = [array[right], array[left]]
  }
  // 当跳出上面的while 的时候，需要将基准值和left指向的值进行交换
  ;[array[left], array[pivotIndex]] = [array[pivotIndex], array[left]]
  return left
}

// 这是入口函数
function quickSort(array) {
  function QuickSort(array, left, right) {
    // 注意下面的条件判断，是判断子数组是否还能够继续拆分
    if (left < right) {
      // 该方法内部，会选择一个元素作为基准值
      // 然后将所有小于基准值的元素，放到基准值左边，所有大于基准值的元素，放到基准值右边
      // 最后会返回基准值的索引
      let index = partition(array, left, right)
      // 拿到基准值之后，再对数组进行切割，对左右两边的子数组做相同的操作
      QuickSort(array, left, index - 1)
      QuickSort(array, index + 1, right)
    }
  }
  QuickSort(array, 0, array.length - 1)
}

const arr = [3, 5, 8, 1, 2, 9, 4, 7]
quickSort(arr)
console.log(arr)
