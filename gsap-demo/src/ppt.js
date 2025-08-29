import gsap from 'gsap'

const pptStart = document.getElementById('pptStart')
const pptStop = document.getElementById('pptStop')

const tl = gsap.timeline({
  defaults: {
    ease: 'back',
    opacity: 0,
  },
  paused: true,
  onComplete() {
    // 动画结束后样式恢复原样
    // tl.revert()
  },
})

tl.from('.ppt-container', {
  x: 100,
  duration: 0.5,
})
  .from('.ppt-text-title', {
    x: -100,
    duration: 1,
  })
  .from(
    '.ppt-sub-text',
    {
      x: 100,
      duration: 1,
    },
    '<'
  )
  .from(
    '.ppt-submit-btn',
    {
      y: 50,
      duration: 1,
    },
    '-=0.7'
  )
  .from(
    '.ppt-box-item',
    {
      scale: 0,
      duration: 1,
      stagger: {
        each: 0.1,
        from: 'random',
      },
    },
    '<'
  )

pptStart.addEventListener('click', () => {
  tl.restart()
})

pptStop.addEventListener('click', () => {
  tl.reverse()
})
