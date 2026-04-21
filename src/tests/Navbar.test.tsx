import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { ThemeProvider } from '../app/context/ThemeContext'
import { Navbar } from '../app/components/Navbar'

function renderNavbar() {
  return render(
    <MemoryRouter>
      <ThemeProvider>
        <Navbar />
      </ThemeProvider>
    </MemoryRouter>
  )
}

describe('Navbar', () => {
  afterEach(() => {
    document.documentElement.classList.remove('dark')
  })

  it('renderiza el logo y el nombre de la empresa', () => {
    renderNavbar()
    expect(screen.getByText('PINAR DEL SOL')).toBeInTheDocument()
    expect(screen.getByText('Inmobiliaria & Desarrollos')).toBeInTheDocument()
  })

  it('renderiza todos los links de navegación (al menos uno por cada sección)', () => {
    renderNavbar()
    // Todos los destinos del dropdown de Propiedades + links directos
    const labels = ['Inicio', 'Barrios', 'Lotes', 'Casas', 'Todas las propiedades', 'Nosotros', 'Contacto']
    labels.forEach((label) => {
      expect(screen.getAllByRole('link', { name: new RegExp(label, 'i') }).length).toBeGreaterThanOrEqual(1)
    })
  })

  it('el botón de dropdown Propiedades existe en el nav', () => {
    renderNavbar()
    // Hay uno en desktop y otro en mobile — al menos uno debe existir
    expect(screen.getAllByRole('button', { name: /propiedades/i }).length).toBeGreaterThanOrEqual(1)
  })

  it('el desktop nav contiene los links del dropdown de propiedades', () => {
    renderNavbar()
    const desktopNav = document.querySelector('nav.hidden')!
    const links = desktopNav.querySelectorAll('a')
    // Inicio + 4 hijos del dropdown (Barrios, Lotes, Casas, Todas) + Nosotros + Contacto = 7
    expect(links.length).toBe(7)
  })

  it('muestra el botón de toggle de tema', () => {
    renderNavbar()
    const toggleBtn = screen.getByRole('button', { name: /cambiar a modo claro/i })
    expect(toggleBtn).toBeInTheDocument()
  })

  it('el botón cambia su aria-label al hacer toggle', async () => {
    const user = userEvent.setup()
    renderNavbar()

    await user.click(screen.getByRole('button', { name: /cambiar a modo claro/i }))
    expect(screen.getByRole('button', { name: /cambiar a modo oscuro/i })).toBeInTheDocument()
  })

  it('el toggle remueve la clase dark del documento', async () => {
    const user = userEvent.setup()
    renderNavbar()

    expect(document.documentElement.classList.contains('dark')).toBe(true)
    await user.click(screen.getByRole('button', { name: /cambiar a modo claro/i }))
    expect(document.documentElement.classList.contains('dark')).toBe(false)
  })

  it('volviendo a oscuro el aria-label es el correcto', async () => {
    const user = userEvent.setup()
    renderNavbar()

    await user.click(screen.getByRole('button', { name: /cambiar a modo claro/i }))
    await user.click(screen.getByRole('button', { name: /cambiar a modo oscuro/i }))
    expect(screen.getByRole('button', { name: /cambiar a modo claro/i })).toBeInTheDocument()
  })

  it('renderiza el link de Consultar', () => {
    renderNavbar()
    expect(screen.getByRole('link', { name: /consultar/i })).toBeInTheDocument()
  })
})
