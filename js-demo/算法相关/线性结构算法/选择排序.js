const searchArr = [5, 3, 8, 4, 2]

/**
 * 选择排序
 * @param {any[]} targetArr
 */
function selectionSort(targetArr) {
  // 外层循环决定循环次数
  for (let i = 0; i < targetArr.length - 1; i++) {
    let minIndex = i
    for (let j = i + 1; j < targetArr.length; j++) {
      if (targetArr[j] < targetArr[minIndex]) {
        minIndex = j
      }
    }

    // 交换完顺序后，如果minIndex发生了变化则表示需要进行交换
    if (i !== minIndex) {
      const temp = targetArr[i]
      targetArr[i] = targetArr[minIndex]
      targetArr[minIndex] = temp
    }
  }
}
selectionSort(searchArr)
console.log(searchArr)
