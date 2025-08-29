import gsap from 'gsap'
import { SplitText } from 'gsap/SplitText'

gsap.registerPlugin(SplitText)

const textMenuItems = document.querySelectorAll('.text-menu-item')

textMenuItems.forEach((item) => {
  // 进行分割
  const splitText = new SplitText(item, {
    type: 'chars',
    charsClass: 'char',
  })
  // 对每个字符进行动画
  splitText.chars.forEach((char, i) => {
    char.style.transitionDelay = `${i * 0.05}s`
  })
})
