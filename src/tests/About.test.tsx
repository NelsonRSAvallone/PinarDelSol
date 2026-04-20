import { render, screen } from '@testing-library/react'
import { About } from '../app/components/About'

describe('About', () => {
  it('renderiza las estadísticas principales', () => {
    render(<About />)
    expect(screen.getByText('20+')).toBeInTheDocument()
    expect(screen.getByText('500+')).toBeInTheDocument()
    expect(screen.getByText('12')).toBeInTheDocument()
    expect(screen.getByText('3.000+')).toBeInTheDocument()
  })

  it('renderiza las etiquetas descriptivas de cada estadística', () => {
    render(<About />)
    expect(screen.getByText('Años de trayectoria')).toBeInTheDocument()
    expect(screen.getByText('Familias acompañadas')).toBeInTheDocument()
    expect(screen.getByText('Barrios desarrollados')).toBeInTheDocument()
    expect(screen.getByText('Lotes comercializados')).toBeInTheDocument()
  })

  it('renderiza el título de historia', () => {
    render(<About />)
    expect(screen.getByText('Nuestra Historia')).toBeInTheDocument()
  })

  it('renderiza los tres valores de la empresa', () => {
    render(<About />)
    expect(screen.getByText('Confianza')).toBeInTheDocument()
    expect(screen.getByText('Desarrollo Integral')).toBeInTheDocument()
    expect(screen.getByText('Ubicaciones Estratégicas')).toBeInTheDocument()
  })

  it('renderiza el año de fundación', () => {
    render(<About />)
    expect(screen.getByText('1998')).toBeInTheDocument()
  })

  it('la sección tiene el id correcto para navegación', () => {
    const { container } = render(<About />)
    expect(container.querySelector('#nosotros')).toBeInTheDocument()
  })

  it('tiene el link de contacto para "Conocé más"', () => {
    render(<About />)
    const link = screen.getByRole('link', { name: /conocé más/i })
    expect(link).toHaveAttribute('href', '#contacto')
  })
})
