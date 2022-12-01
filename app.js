const canvas = document.querySelector('.canvas')
canvas.width = window.innerWidth
canvas.height = window.innerHeight

const context = canvas.getContext('2d')
const frameCount = 150

const currentFrame = (index) => `./DonutBlender/${(index + 1).toString()}.png`
const images = []
let donut = { frame: 0 }

for (let i = 0; i < frameCount; i++) {
  const img = new Image()
  img.src = currentFrame(i)
  images.push(img)
}

gsap.to(donut, {
  frame: frameCount - 1,
  snap: 'frame',
  ease: 'none',
  scrollTrigger: {
    scrub: true,
    pin: 'canvas',
    end: '500%',
  },
  onUpdate: render,
})

gsap.fromTo(
  '.donut-text',
  { opacity: 0 },
  {
    opacity: 1,
    scrollTrigger: {
      scrub: true,
      start: '50%',
      end: '80%',
    },
    onComplete: () => {
      gsap.to('.donut-text', { opacity: 0 })
    },
  }
)

images[0].onload = render

function render() {
  context.clearRect(0, 0, canvas.width, canvas.height)
  context.drawImage(images[donut.frame], 0, 0)
}
console.log(images)
