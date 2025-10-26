"use client"

import { useEffect, useRef } from "react"

export default function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    const particles: Array<{
      x: number
      y: number
      vx: number
      vy: number
      size: number
      opacity: number
      life: number
    }> = []

    const createParticle = () => {
      const x = Math.random() * canvas.width
      const y = canvas.height + 10
      const vx = (Math.random() - 0.5) * 2
      const vy = -Math.random() * 3 - 1
      const size = Math.random() * 3 + 1
      const life = Math.random() * 0.5 + 0.5

      particles.push({
        x,
        y,
        vx,
        vy,
        size,
        opacity: 1,
        life,
      })
    }

    const animate = () => {
      ctx.fillStyle = "rgba(13, 13, 13, 0.1)"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      if (Math.random() < 0.3) {
        createParticle()
      }

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i]

        p.x += p.vx
        p.y += p.vy
        p.life -= 0.01

        const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 2)
        gradient.addColorStop(0, `rgba(255, 106, 0, ${p.opacity * p.life})`)
        gradient.addColorStop(1, `rgba(255, 140, 50, ${p.opacity * p.life * 0.3})`)

        ctx.fillStyle = gradient
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fill()

        if (p.life <= 0 || p.y < -10) {
          particles.splice(i, 1)
        }
      }

      requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", resizeCanvas)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ background: "linear-gradient(135deg, rgba(13, 13, 13, 1) 0%, rgba(26, 26, 26, 1) 100%)" }}
    />
  )
}
