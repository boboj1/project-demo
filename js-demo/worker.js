// async function getData() {
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       console.log('getData')
//       resolve('data')
//     }, 2000)
//   })
// }

// function* executor() {
//   console.log(1)
//   yield 20
//   yield getData()
// }

// const gen = executor()

// const res1 = gen.next()
// console.log('res1:', res1)

// const res2 = gen.next()
// console.log('res2:', res2)

// const res3 = gen.next()
// console.log('res3:', res3)
