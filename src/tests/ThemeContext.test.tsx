import { render, screen, act } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { ThemeProvider, useTheme } from '../app/context/ThemeContext'

function ThemeConsumer() {
  const { theme, toggleTheme } = useTheme()
  return (
    <div>
      <span data-testid="theme-value">{theme}</span>
      <button onClick={toggleTheme}>toggle</button>
    </div>
  )
}

describe('ThemeContext', () => {
  afterEach(() => {
    document.documentElement.classList.remove('dark')
  })

  it('comienza en modo oscuro por defecto', () => {
    render(
      <ThemeProvider>
        <ThemeConsumer />
      </ThemeProvider>
    )
    expect(screen.getByTestId('theme-value')).toHaveTextContent('dark')
  })

  it('agrega la clase dark al <html> al montar', () => {
    render(
      <ThemeProvider>
        <ThemeConsumer />
      </ThemeProvider>
    )
    expect(document.documentElement.classList.contains('dark')).toBe(true)
  })

  it('cambia a modo claro al hacer toggle', async () => {
    const user = userEvent.setup()
    render(
      <ThemeProvider>
        <ThemeConsumer />
      </ThemeProvider>
    )
    await user.click(screen.getByRole('button', { name: 'toggle' }))
    expect(screen.getByTestId('theme-value')).toHaveTextContent('light')
  })

  it('remueve la clase dark del <html> al cambiar a modo claro', async () => {
    const user = userEvent.setup()
    render(
      <ThemeProvider>
        <ThemeConsumer />
      </ThemeProvider>
    )
    await user.click(screen.getByRole('button', { name: 'toggle' }))
    expect(document.documentElement.classList.contains('dark')).toBe(false)
  })

  it('vuelve a modo oscuro con un segundo toggle', async () => {
    const user = userEvent.setup()
    render(
      <ThemeProvider>
        <ThemeConsumer />
      </ThemeProvider>
    )
    await user.click(screen.getByRole('button', { name: 'toggle' }))
    await user.click(screen.getByRole('button', { name: 'toggle' }))
    expect(screen.getByTestId('theme-value')).toHaveTextContent('dark')
    expect(document.documentElement.classList.contains('dark')).toBe(true)
  })
})
