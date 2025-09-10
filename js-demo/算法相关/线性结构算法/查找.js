const searchArr = Array.from({ length: 100 }, (item, index) => index + 1)

// 二分查找
// 二分查找一定是有序的数组
/**
 * @param {any[]} searchArr
 * @param {any} target
 */
function binarySearch(searchArr, target) {
  // 使用循环的方式
  // let left = 0
  // let right = searchArr.length - 1

  // while (left <= right) {
  //   const mid = Math.floor((left + right) / 2))
  //   if (searchArr[mid] === target) {
  //     return mid
  //   } else if (searchArr[mid] > target) {
  //     right = mid - 1
  //   } else {
  //     left = mid + 1
  //   }
  // }

  // // 循环结束都没找到则直接返回-1
  // return -1

  // 使用递归的方式
  function search(_searchArr, _target, _left, _right) {
    if (
      _left > _right ||
      _searchArr[_left] > _target ||
      _searchArr[_right] < target
    )
      return -1
    const mid = Math.floor((_left + _right) / 2)
    if (_searchArr[mid] === _target) {
      return mid
    } else if (_searchArr[mid] > _target) {
      return search(_searchArr, _target, _left, mid - 1)
    } else {
      return search(_searchArr, _target, mid + 1, _right)
    }
  }

  return search(searchArr, target, 0, searchArr.length - 1)
}

// console.log(binarySearch(searchArr, 101))

// 插值查找
// 值的增长越均匀，查找的效率就越高
/**
 * @param {any[]} searchArr
 * @param {any} target
 */
function insertSearch(searchArr, target) {
  let left = 0
  let right = searchArr.length - 1

  while (
    left <= right &&
    target >= searchArr[left] &&
    target <= searchArr[right]
  ) {
    const mid =
      left +
      Math.floor(
        ((target - searchArr[left]) / (searchArr[right] - searchArr[left])) *
          (right - left)
      )

    if (searchArr[mid] === target) {
      return mid
    } else if (searchArr[mid] > target) {
      return search(searchArr, target, left, mid - 1)
    } else {
      return search(searchArr, target, mid + 1, right)
    }
  }

  return -1
}

console.log(insertSearch(searchArr, 88))
