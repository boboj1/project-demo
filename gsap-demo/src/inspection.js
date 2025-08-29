import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

let boxList = gsap.utils.toArray('.box')
let value = window.innerHeight / 2
let animations = []

function initParallax() {
  // 销毁之前的动画
  animations.forEach((anim) => {
    anim.scrollTrigger?.kill()
    anim.kill()
  })
  animations = []

  value = window.innerHeight / 2

  boxList.forEach((box, i) => {
    const bg = box.querySelector('.bg')

    const anim = gsap.fromTo(
      bg,
      {
        backgroundPosition: `50% -${value}px`,
      },
      {
        backgroundPosition: `50% ${value}px`,
        ease: 'none',
        scrollTrigger: {
          trigger: bg,
          scrub: true,
        },
      }
    )

    animations.push(anim)
  })

  // 刷新ScrollTrigger
  ScrollTrigger.refresh()
}

// 初始加载
initParallax()

// 监听窗口大小变化
window.addEventListener('resize', () => {
  initParallax()
})
