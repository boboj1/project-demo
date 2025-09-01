import gsap from 'gsap'
import { Flip } from 'gsap/Flip'
gsap.registerPlugin(Flip)

const randomSort = document.querySelector('#randomSort')

let state

function getState() {
  state = Flip.getState('.flip-box-item')
}

randomSort.addEventListener('click', () => {
  getState()

  // 随机对flip-box-item进行排序
  const classList = ['bg1', 'bg2', 'bg3', 'bg4', 'bg5', 'bg6']
  // 对classList进行随机排序
  classList.sort(() => Math.random() - 0.5)
  // 对flip-box-item进行排序
  const flipBoxItems = document.querySelectorAll('.flip-box-item')
  flipBoxItems.forEach((item, index) => {
    item.classList.remove(...classList)
    item.classList.add(classList[index])
  })

  // 对随机排序后的元素进行动画
  Flip.from(state, {
    duration: 0.5,
  })
})
