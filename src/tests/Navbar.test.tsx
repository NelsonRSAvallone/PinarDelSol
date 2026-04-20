import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { ThemeProvider } from '../app/context/ThemeContext'
import { Navbar } from '../app/components/Navbar'

function renderNavbar() {
  return render(
    <ThemeProvider>
      <Navbar />
    </ThemeProvider>
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
    // Hay duplicados: desktop nav + mobile nav — verificamos que existan al menos uno de cada uno
    const labels = ['Inicio', 'Barrios', 'Lotes', 'Casas', 'Nosotros', 'Contacto']
    labels.forEach((label) => {
      expect(screen.getAllByRole('link', { name: label }).length).toBeGreaterThanOrEqual(1)
    })
  })

  it('el desktop nav tiene exactamente 6 links de sección', () => {
    renderNavbar()
    const desktopNav = document.querySelector('nav.hidden')!
    const links = desktopNav.querySelectorAll('a')
    expect(links).toHaveLength(6)
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
