import { render, screen, fireEvent, act } from '@testing-library/react'
import { HeroCarousel } from '../app/components/HeroCarousel'

// Los títulos del carrusel se dividen en <span> por palabra; getByRole('heading')
// agrega el textContent de todos los hijos, por lo que funciona correctamente.
function headingText() {
  return screen.getByRole('heading', { level: 1 }).textContent ?? ''
}

// Avanza los timers y flushea los state updates de React
async function advanceTime(ms: number) {
  await act(async () => { vi.advanceTimersByTime(ms) })
}

describe('HeroCarousel', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    // clearAllTimers evita que timers pendientes se filtren al siguiente test
    vi.clearAllTimers()
    vi.useRealTimers()
  })

  it('renderiza el primer slide por defecto', () => {
    render(<HeroCarousel />)
    expect(headingText()).toMatch(/barrios exclusivos/i)
  })

  it('muestra la etiqueta correcta del primer slide', () => {
    render(<HeroCarousel />)
    expect(screen.getByText('Barrios Privados')).toBeInTheDocument()
  })

  it('muestra el contador de slides con el total correcto', () => {
    render(<HeroCarousel />)
    expect(screen.getByText('01')).toBeInTheDocument()
    expect(screen.getByText('04')).toBeInTheDocument()
  })

  it('avanza al siguiente slide con la flecha derecha', async () => {
    render(<HeroCarousel />)

    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: 'Siguiente' }))
    })

    expect(headingText()).toMatch(/lotes premium/i)
  })

  it('retrocede al slide anterior con la flecha izquierda', async () => {
    render(<HeroCarousel />)

    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: 'Siguiente' }))
    })
    await advanceTime(800)  // espera que termine la animación de 700ms
    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: 'Anterior' }))
    })

    expect(headingText()).toMatch(/barrios exclusivos/i)
  })

  it('wrap hacia atrás: desde slide 1 va al último', async () => {
    render(<HeroCarousel />)

    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: 'Anterior' }))
    })

    expect(headingText()).toMatch(/tu inversión segura/i)
  })

  it('avanza automáticamente al cabo de 5 segundos', async () => {
    render(<HeroCarousel />)

    await advanceTime(5000)

    expect(headingText()).toMatch(/lotes premium/i)
  })

  it('avanza al tercer slide tras dos ciclos de 5 segundos', async () => {
    render(<HeroCarousel />)

    await advanceTime(5000)          // → slide 2 (Lotes Premium)
    await advanceTime(800)           // flushea el timeout de animación de 700ms
    await advanceTime(5000)          // → slide 3 (Casas & Desarrollos)

    expect(headingText()).toMatch(/casas & desarrollos/i)
  })

  it('muestra el indicador "pausado" cuando el mouse está encima', () => {
    render(<HeroCarousel />)
    const section = document.getElementById('inicio')!

    fireEvent.mouseEnter(section)
    expect(screen.getByText('pausado')).toBeInTheDocument()
  })

  it('oculta el indicador "pausado" cuando el mouse sale', () => {
    render(<HeroCarousel />)
    const section = document.getElementById('inicio')!

    fireEvent.mouseEnter(section)
    fireEvent.mouseLeave(section)
    expect(screen.queryByText('pausado')).not.toBeInTheDocument()
  })

  it('el autoavance se detiene mientras el mouse está encima', async () => {
    render(<HeroCarousel />)
    const section = document.getElementById('inicio')!

    fireEvent.mouseEnter(section)
    await advanceTime(10000)

    expect(headingText()).toMatch(/barrios exclusivos/i)
  })

  it('los dots de navegación tienen el aria-label correcto para los 4 slides', () => {
    render(<HeroCarousel />)
    for (let i = 1; i <= 4; i++) {
      expect(screen.getByRole('button', { name: `Ir a slide ${i}` })).toBeInTheDocument()
    }
  })

  it('navega directamente al slide 3 al hacer click en su dot', async () => {
    render(<HeroCarousel />)

    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: 'Ir a slide 3' }))
    })

    expect(headingText()).toMatch(/casas & desarrollos/i)
  })

  it('navega al slide 4 desde su dot', async () => {
    render(<HeroCarousel />)

    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: 'Ir a slide 4' }))
    })

    expect(headingText()).toMatch(/tu inversión segura/i)
  })

  it('el botón siguiente no tiene efecto mientras la animación está en curso', async () => {
    render(<HeroCarousel />)

    // Dos clicks rápidos — el segundo debe ignorarse porque la animación sigue
    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: 'Siguiente' }))
      fireEvent.click(screen.getByRole('button', { name: 'Siguiente' }))
    })

    expect(headingText()).toMatch(/lotes premium/i)
  })
})
