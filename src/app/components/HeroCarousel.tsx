import { useState, useEffect, useRef, useCallback } from 'react'

interface Slide {
  id: number
  title: string
  subtitle: string
  tag: string
  gradient: string
  pattern: string
}

const slides: Slide[] = [
  {
    id: 1,
    title: 'Barrios Exclusivos',
    subtitle: 'Viví en comunidades diseñadas para quienes aprecian lo mejor. Seguridad, naturaleza y confort en perfecta armonía.',
    tag: 'Barrios Privados',
    gradient: 'from-obsidian-900 via-obsidian-800/80 to-transparent',
    pattern: 'marble-1',
  },
  {
    id: 2,
    title: 'Lotes Premium',
    subtitle: 'Elegí el terreno ideal y construí la vida que soñás. Superficies privilegiadas en ubicaciones estratégicas.',
    tag: 'Lotes en Venta',
    gradient: 'from-obsidian-900 via-obsidian-700/70 to-transparent',
    pattern: 'marble-2',
  },
  {
    id: 3,
    title: 'Casas & Desarrollos',
    subtitle: 'Arquitectura contemporánea con materiales de primera calidad. Diseñamos y construimos el hogar que merecés.',
    tag: 'Desarrollos Propios',
    gradient: 'from-obsidian-900 via-obsidian-800/75 to-transparent',
    pattern: 'marble-3',
  },
  {
    id: 4,
    title: 'Tu Inversión Segura',
    subtitle: 'Más de 20 años de trayectoria avalan cada proyecto. Confianza, transparencia y resultados que hablan por sí solos.',
    tag: 'Trayectoria & Confianza',
    gradient: 'from-obsidian-900 via-obsidian-900/60 to-transparent',
    pattern: 'marble-4',
  },
]

const slideColors = [
  { bg: 'bg-gradient-to-br from-stone-900 via-stone-800 to-zinc-900', accent: '#c9a84c' },
  { bg: 'bg-gradient-to-br from-zinc-900 via-neutral-800 to-stone-900', accent: '#d4af37' },
  { bg: 'bg-gradient-to-br from-neutral-900 via-stone-800 to-zinc-800', accent: '#e8c96b' },
  { bg: 'bg-gradient-to-br from-stone-800 via-zinc-900 to-neutral-900', accent: '#c9a84c' },
]

export function HeroCarousel() {
  const [current, setCurrent] = useState(0)
  const [prev, setPrev] = useState<number | null>(null)
  const [paused, setPaused] = useState(false)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)
  // Ref en lugar de state para evitar stale closures: goTo lee el valor actual
  // sin depender del ciclo de renders de React.
  const animatingRef = useRef(false)

  const goTo = useCallback((index: number) => {
    if (animatingRef.current || index === current) return
    animatingRef.current = true
    setPrev(current)
    setCurrent(index)
    setTimeout(() => {
      setPrev(null)
      animatingRef.current = false
    }, 700)
  }, [current])

  const next = useCallback(() => {
    goTo((current + 1) % slides.length)
  }, [current, goTo])

  const prev_ = useCallback(() => {
    goTo((current - 1 + slides.length) % slides.length)
  }, [current, goTo])

  useEffect(() => {
    if (paused) return
    intervalRef.current = setInterval(next, 5000)
    return () => { if (intervalRef.current) clearInterval(intervalRef.current) }
  }, [paused, next])

  const slide = slides[current]

  return (
    <section
      id="inicio"
      className="relative h-screen min-h-[600px] overflow-hidden"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Slides */}
      {slides.map((s, i) => (
        <div
          key={s.id}
          className={`absolute inset-0 transition-opacity duration-700 ${
            i === current ? 'opacity-100 z-10' : i === prev ? 'opacity-0 z-10' : 'opacity-0 z-0'
          }`}
        >
          {/* Marble-style background */}
          <div className={`absolute inset-0 ${slideColors[i].bg}`} />

          {/* Marble texture overlay */}
          <div
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: `
                radial-gradient(ellipse at ${20 + i * 20}% ${30 + i * 10}%, rgba(201,168,76,0.15) 0%, transparent 60%),
                radial-gradient(ellipse at ${70 - i * 10}% ${60 + i * 5}%, rgba(208,208,208,0.1) 0%, transparent 50%),
                repeating-linear-gradient(
                  ${45 + i * 15}deg,
                  transparent,
                  transparent 80px,
                  rgba(255,255,255,0.02) 80px,
                  rgba(255,255,255,0.02) 81px
                )
              `,
            }}
          />

          {/* Gold accent lines */}
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: `
                linear-gradient(${i * 30}deg, transparent 40%, rgba(212,175,55,0.4) 50%, transparent 60%)
              `,
            }}
          />
        </div>
      ))}

      {/* Content overlay */}
      <div className="absolute inset-0 z-20 flex items-center">
        <div className="max-w-7xl mx-auto px-6 w-full">
          <div
            key={current}
            className="max-w-2xl animate-fade-in"
          >
            <span className="inline-block text-gold-400 text-xs tracking-[0.4em] uppercase mb-6 border border-gold-400/40 px-4 py-1.5">
              {slide.tag}
            </span>

            <h1 className="font-serif text-5xl md:text-7xl text-white leading-tight mb-6">
              {slide.title.split(' ').map((word, wi) => (
                <span key={wi} className={wi === slide.title.split(' ').length - 1 ? 'text-gradient-gold' : ''}>
                  {word}{' '}
                </span>
              ))}
            </h1>

            <p className="text-marble-300 text-lg md:text-xl leading-relaxed mb-10 max-w-xl font-light">
              {slide.subtitle}
            </p>

            <div className="flex flex-wrap gap-4">
              <a
                href="#contacto"
                className="inline-flex items-center gap-3 bg-gold-400 hover:bg-gold-300 text-obsidian-900 font-semibold text-sm tracking-widest uppercase px-8 py-4 transition-all duration-300 hover:shadow-lg hover:shadow-gold-400/30"
              >
                Consultar Ahora
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
              <a
                href="#barrios"
                className="inline-flex items-center gap-3 border border-marble-300/40 text-marble-200 hover:border-gold-400 hover:text-gold-400 text-sm tracking-widest uppercase px-8 py-4 transition-all duration-300"
              >
                Ver Proyectos
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Pause indicator */}
      {paused && (
        <div className="absolute top-28 right-6 z-30 flex items-center gap-2 text-gold-400/60 text-xs tracking-wider">
          <div className="w-2 h-2 rounded-full border border-gold-400/60 flex items-center justify-center">
            <div className="w-0.5 h-1 bg-gold-400/60" style={{ boxShadow: '3px 0 0 rgba(212,175,55,0.6)' }} />
          </div>
          pausado
        </div>
      )}

      {/* Navigation arrows */}
      <button
        onClick={prev_}
        className="absolute left-6 top-1/2 -translate-y-1/2 z-30 w-12 h-12 border border-white/20 hover:border-gold-400 flex items-center justify-center text-white/60 hover:text-gold-400 transition-all duration-300 backdrop-blur-sm bg-black/20 hover:bg-black/40"
        aria-label="Anterior"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <button
        onClick={next}
        className="absolute right-6 top-1/2 -translate-y-1/2 z-30 w-12 h-12 border border-white/20 hover:border-gold-400 flex items-center justify-center text-white/60 hover:text-gold-400 transition-all duration-300 backdrop-blur-sm bg-black/20 hover:bg-black/40"
        aria-label="Siguiente"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Dots */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-30 flex gap-3">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            className={`transition-all duration-300 ${
              i === current
                ? 'w-8 h-1 bg-gold-400'
                : 'w-4 h-1 bg-white/30 hover:bg-white/60'
            }`}
            aria-label={`Ir a slide ${i + 1}`}
          />
        ))}
      </div>

      {/* Slide counter */}
      <div className="absolute bottom-10 right-6 z-30 text-white/40 text-sm font-mono">
        <span className="text-gold-400">{String(current + 1).padStart(2, '0')}</span>
        <span className="mx-2">/</span>
        <span>{String(slides.length).padStart(2, '0')}</span>
      </div>

      {/* Bottom gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 z-20 bg-gradient-to-t from-obsidian-900 to-transparent pointer-events-none" />
    </section>
  )
}
