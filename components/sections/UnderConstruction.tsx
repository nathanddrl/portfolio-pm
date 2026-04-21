'use client'

import { useEffect, useRef } from 'react'

interface Point {
  x: number
  y: number
}

interface GlyphState {
  x: number
  y: number
  vx: number
  vy: number
}

interface MagneticTextProps {
  text: string
  className: string
  mouseRef: React.RefObject<Point>
}

function MagneticText({ text, className, mouseRef }: MagneticTextProps) {
  const wrapperRef = useRef<HTMLSpanElement>(null)
  const glyphRefs = useRef<Array<HTMLSpanElement | null>>([])
  const basePositionsRef = useRef<Point[]>([])
  const glyphStatesRef = useRef<GlyphState[]>([])
  const frameRef = useRef<number | null>(null)

  useEffect(() => {
    const measureGlyphs = () => {
      const wrapper = wrapperRef.current

      if (!wrapper) {
        return
      }

      const wrapperRect = wrapper.getBoundingClientRect()

      basePositionsRef.current = glyphRefs.current.map((glyph) => {
        if (!glyph) {
          return { x: 0, y: 0 }
        }

        return {
          x: wrapperRect.left + glyph.offsetLeft + glyph.offsetWidth / 2,
          y: wrapperRect.top + glyph.offsetTop + glyph.offsetHeight / 2,
        }
      })

      glyphStatesRef.current = basePositionsRef.current.map(() => ({ x: 0, y: 0, vx: 0, vy: 0 }))
    }

    const animate = () => {
      const mouseX = mouseRef.current?.x ?? 0
      const mouseY = mouseRef.current?.y ?? 0

      const softening = 2600
      const gravityStrength = 90000
      const baseSpring = 0.03
      const damping = 0.9
      const maxSpeed = 6
      const maxOffset = 18
      const influenceRadius = 110000

      glyphStatesRef.current.forEach((state, index) => {
        const glyph = glyphRefs.current[index]
        const base = basePositionsRef.current[index]

        if (!glyph || !base) {
          return
        }

        const currentX = base.x + state.x
        const currentY = base.y + state.y
        const dx = mouseX - currentX
        const dy = mouseY - currentY
        const distanceSq = dx * dx + dy * dy

        let ax = -state.x * baseSpring
        let ay = -state.y * baseSpring

        if (distanceSq < influenceRadius) {
          const distance = Math.sqrt(distanceSq)
          const directionX = distance === 0 ? 0 : dx / distance
          const directionY = distance === 0 ? 0 : dy / distance
          const pull = Math.min(gravityStrength / (distanceSq + softening), 0.22)

          ax += directionX * pull
          ay += directionY * pull
        }

        state.vx = (state.vx + ax) * damping
        state.vy = (state.vy + ay) * damping

        state.vx = Math.max(-maxSpeed, Math.min(maxSpeed, state.vx))
        state.vy = Math.max(-maxSpeed, Math.min(maxSpeed, state.vy))

        state.x = Math.max(-maxOffset, Math.min(maxOffset, state.x + state.vx))
        state.y = Math.max(-maxOffset, Math.min(maxOffset, state.y + state.vy))

        glyph.style.transform = `translate3d(${state.x}px, ${state.y}px, 0)`
      })

      frameRef.current = requestAnimationFrame(animate)
    }

    measureGlyphs()
    frameRef.current = requestAnimationFrame(animate)

    window.addEventListener('resize', measureGlyphs)

    return () => {
      window.removeEventListener('resize', measureGlyphs)

      if (frameRef.current !== null) {
        cancelAnimationFrame(frameRef.current)
      }
    }
  }, [mouseRef])

  const glyphs = Array.from(text)

  return (
    <span ref={wrapperRef} aria-label={text} className={className}>
      {glyphs.map((glyph, index) => {
        if (glyph === ' ') {
          return (
            <span
              key={`${text}-${index}`}
              aria-hidden="true"
              className="inline-block"
              style={{ width: '0.3em' }}
            >
              &nbsp;
            </span>
          )
        }

        return (
          <span
            key={`${text}-${index}`}
            ref={(element) => {
              glyphRefs.current[index] = element
            }}
            aria-hidden="true"
            className="inline-block will-change-transform"
            style={{ transform: 'translate3d(0, 0, 0)' }}
          >
            {glyph}
          </span>
        )
      })}
    </span>
  )
}

export function UnderConstruction() {
  const blobRef = useRef<HTMLDivElement>(null)
  const mouseRef = useRef({ x: 0, y: 0 })
  const blobPos = useRef({ x: 0, y: 0 })
  const blobVelocity = useRef({ x: 0, y: 0 })
  const frameRef = useRef<number | null>(null)

  useEffect(() => {
    const startX = window.innerWidth / 2
    const startY = window.innerHeight / 3

    mouseRef.current = { x: startX, y: startY }
    blobPos.current = { x: startX, y: startY }

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY }
    }

    window.addEventListener('mousemove', handleMouseMove)

    const animate = () => {
      const mouseX = mouseRef.current.x
      const mouseY = mouseRef.current.y
      const current = blobPos.current
      const velocity = blobVelocity.current

      const dx = mouseX - current.x
      const dy = mouseY - current.y
      const distanceSq = dx * dx + dy * dy
      const softening = 1800
      const gravityStrength = 9200
      const damping = 0.9
      const maxSpeed = 18
      const influenceRadius = 1200000

      if (distanceSq < influenceRadius) {
        const distance = Math.sqrt(distanceSq)
        const directionX = distance === 0 ? 0 : dx / distance
        const directionY = distance === 0 ? 0 : dy / distance
        const force = gravityStrength / (distanceSq + softening)
        const pull = Math.min(force, 0.9)

        velocity.x += directionX * pull
        velocity.y += directionY * pull
      }

      velocity.x *= damping
      velocity.y *= damping

      velocity.x = Math.max(-maxSpeed, Math.min(maxSpeed, velocity.x))
      velocity.y = Math.max(-maxSpeed, Math.min(maxSpeed, velocity.y))

      current.x += velocity.x
      current.y += velocity.y

      if (blobRef.current) {
        blobRef.current.style.left = `${current.x}px`
        blobRef.current.style.top = `${current.y}px`
      }

      frameRef.current = requestAnimationFrame(animate)
    }

    frameRef.current = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      if (frameRef.current !== null) {
        cancelAnimationFrame(frameRef.current)
      }
    }
  }, [])

  return (
    <div className="flex h-screen w-full items-center justify-center bg-bg">
      <style>{`
        @keyframes morphing {
          0%, 100% {
            border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%;
          }
          50% {
            border-radius: 30% 60% 70% 40% / 40% 60% 30% 70%;
          }
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0px) scale(1);
          }
          50% {
            transform: translateY(-20px) scale(1.05);
          }
        }

        @keyframes pulse-glow {
          0%, 100% {
            opacity: 0.5;
            box-shadow: 0 0 30px color-mix(in srgb, var(--terracotta) 30%, transparent), inset 0 0 30px color-mix(in srgb, var(--eau) 20%, transparent);
          }
          50% {
            opacity: 0.8;
            box-shadow: 0 0 60px color-mix(in srgb, var(--terracotta) 50%, transparent), inset 0 0 40px color-mix(in srgb, var(--eau) 30%, transparent);
          }
        }

        @keyframes gradient-shift {
          0% {
            background-position: 0% 50%;
          }
          25% {
            background-position: 100% 50%;
          }
          50% {
            background-position: 100% 0%;
          }
          75% {
            background-position: 0% 0%;
          }
          100% {
            background-position: 0% 50%;
          }
        }

        @keyframes slide-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes float-orbit {
          0% {
            transform: rotate(0deg) translateX(140px) rotate(0deg);
            opacity: 0.3;
          }
          50% {
            opacity: 0.6;
          }
          100% {
            transform: rotate(360deg) translateX(140px) rotate(-360deg);
            opacity: 0.3;
          }
        }

        .blob {
          width: 200px;
          height: 200px;
          background: linear-gradient(135deg, var(--terracotta-light), var(--terracotta), var(--eau), var(--eau-dark), var(--terracotta-light));
          background-size: 300% 300%;
          animation: morphing 8s ease-in-out infinite, float 3.5s ease-in-out infinite, gradient-shift 12s ease-in-out infinite;
        }

        .blob::before {
          content: '';
          position: absolute;
          width: 200px;
          height: 200px;
          border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%;
          background: inherit;
          animation: morphing 8s ease-in-out infinite reverse, pulse-glow 4s ease-in-out infinite;
          filter: blur(1px);
        }

        .orbit-particle {
          animation: float-orbit 20s linear infinite;
        }

        .text-fade {
          animation: slide-in 1s ease-out forwards;
        }

        .text-fade-delay-1 {
          animation: slide-in 1s ease-out 0.2s forwards;
          opacity: 0;
        }

        .text-fade-delay-2 {
          animation: slide-in 1s ease-out 0.4s forwards;
          opacity: 0;
        }
      `}</style>

      <div className="relative flex flex-col items-center justify-center">
        {/* Animated blob background - fixed position behind */}
        <div 
          ref={blobRef}
          className="fixed pointer-events-none"
          style={{
            width: '280px',
            height: '280px',
            left: '50%',
            top: '33.33%',
            transform: 'translate(-50%, -50%)',
          }}
        >
          <div className="relative h-64 w-64">
            {/* Main blob */}
            <div
              className="blob absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
              style={{
                filter: 'blur(0.5px)',
                width: '280px',
                height: '280px',
              }}
            />

            {/* Orbit particles */}
            <div className="orbit-particle absolute left-1/2 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent opacity-40" />
            <div className="orbit-particle absolute left-1/2 top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-secondary opacity-30" style={{ animationDelay: '10s' }} />
            <div className="orbit-particle absolute left-1/2 top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent opacity-25" style={{ animationDelay: '5s' }} />
          </div>
        </div>

        {/* Content - on top, wider */}
        <div className="relative z-10 w-full px-8 text-center">
          <h1 className="text-fade mb-6 text-5xl font-bold leading-tight tracking-tight text-text-primary" style={{ fontFamily: 'var(--font-display)' }}>
            <MagneticText text="Portfolio en construction..." className="relative inline" mouseRef={mouseRef} />
          </h1>

          <p className="text-fade-delay-1 mx-auto mb-8 text-base leading-relaxed text-text-secondary">
            <MagneticText
              text="Je suis bien Nathan Dudreuil. Actuellement en train de finir de sculpter les détails du site internet."
              className="relative inline"
              mouseRef={mouseRef}
            />
          </p>

          <div className="text-fade-delay-2 flex items-center justify-center gap-2">
            <span className="text-caption font-medium uppercase tracking-label text-text-tertiary">
              <MagneticText text="En construction" className="relative inline" mouseRef={mouseRef} />
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
