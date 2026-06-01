<script setup>
import { onMounted, onUnmounted, ref } from 'vue'

const canvasRef = ref(null)
let animationFrameId = null

const colors = [
  'rgba(6, 182, 212, 0.15)',  // cyan
  'rgba(16, 185, 129, 0.15)', // emerald
  'rgba(139, 92, 246, 0.12)'  // violet
]

onMounted(() => {
  const canvas = canvasRef.value
  if (!canvas) return
  const ctx = canvas.getContext('2d')
  if (!ctx) return

  let width = (canvas.width = window.innerWidth)
  let height = (canvas.height = window.innerHeight)

  const handleResize = () => {
    width = canvas.width = window.innerWidth
    height = canvas.height = window.innerHeight
  }
  window.addEventListener('resize', handleResize)

  const particles = []
  // Dynamically scale particle count with screen area
  const particleCount = Math.min(80, Math.floor((width * height) / 22000))
  const connectionDistance = 120
  const mouse = { x: null, y: null, radius: 180 }

  class Particle {
    constructor() {
      this.x = Math.random() * width
      this.y = Math.random() * height
      this.vx = (Math.random() - 0.5) * 0.5
      this.vy = (Math.random() - 0.5) * 0.5
      this.radius = Math.random() * 2 + 1.2
      this.color = colors[Math.floor(Math.random() * colors.length)]
    }

    update() {
      this.x += this.vx
      this.y += this.vy

      // Bounce on screen bounds
      if (this.x < 0 || this.x > width) this.vx *= -1
      if (this.y < 0 || this.y > height) this.vy *= -1

      // Subtle mouse interaction (soft attraction)
      if (mouse.x !== null && mouse.y !== null) {
        const dx = mouse.x - this.x
        const dy = mouse.y - this.y
        const dist = Math.hypot(dx, dy)
        if (dist < mouse.radius) {
          const force = (mouse.radius - dist) / mouse.radius
          this.x += dx * force * 0.015
          this.y += dy * force * 0.015
        }
      }
    }

    draw() {
      ctx.beginPath()
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2)
      ctx.fillStyle = this.color
      ctx.fill()
    }
  }

  // Initialize particles
  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle())
  }

  const handleMouseMove = (e) => {
    mouse.x = e.clientX
    mouse.y = e.clientY
  }

  const handleMouseLeave = () => {
    mouse.x = null
    mouse.y = null
  }

  window.addEventListener('mousemove', handleMouseMove)
  document.body.addEventListener('mouseleave', handleMouseLeave)

  const animate = () => {
    ctx.clearRect(0, 0, width, height)

    // Subtle technical grid pattern in the background canvas
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.012)'
    ctx.lineWidth = 1
    const gridSize = 60
    for (let x = 0; x < width; x += gridSize) {
      ctx.beginPath()
      ctx.moveTo(x, 0)
      ctx.lineTo(x, height)
      ctx.stroke()
    }
    for (let y = 0; y < height; y += gridSize) {
      ctx.beginPath()
      ctx.moveTo(0, y)
      ctx.lineTo(width, y)
      ctx.stroke()
    }

    // Update, link, and render particles
    for (let i = 0; i < particles.length; i++) {
      const p1 = particles[i]
      p1.update()
      p1.draw()

      for (let j = i + 1; j < particles.length; j++) {
        const p2 = particles[j]
        const dx = p1.x - p2.x
        const dy = p1.y - p2.y
        const dist = Math.hypot(dx, dy)

        if (dist < connectionDistance) {
          const alpha = (1 - dist / connectionDistance) * 0.15
          ctx.strokeStyle = `rgba(6, 182, 212, ${alpha})`
          ctx.lineWidth = 0.8
          ctx.beginPath()
          ctx.moveTo(p1.x, p1.y)
          ctx.lineTo(p2.x, p2.y)
          ctx.stroke()
        }
      }
    }

    animationFrameId = requestAnimationFrame(animate)
  }

  animate()

  onUnmounted(() => {
    window.removeEventListener('resize', handleResize)
    window.removeEventListener('mousemove', handleMouseMove)
    document.body.removeEventListener('mouseleave', handleMouseLeave)
    if (animationFrameId) {
      cancelAnimationFrame(animationFrameId)
    }
  })
})
</script>

<template>
  <canvas ref="canvasRef" class="fixed inset-0 w-full h-full pointer-events-none z-0" />
</template>
