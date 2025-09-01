import gsap from 'gsap'
import { GSDevTools } from 'gsap/GSDevTools'

gsap.registerPlugin(GSDevTools)

const tl = gsap.timeline({
  defaults: {
    duration: 3,
    ease: 'none',
    repeat: -1,
  },
})

tl.fromTo(
  '.text2',
  {
    transform: 'translateX(100%)',
  },
  {
    transform: 'translateX(-100%)',
  }
).fromTo(
  '.text1',
  {
    transform: 'translateX(100%)',
  },
  {
    transform: 'translateX(-100%)',
  },
  '1.2'
)

// GSDevTools.create()
