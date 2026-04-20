import { ThemeProvider } from './app/context/ThemeContext'
import { HomePage } from './app/pages/HomePage'

export function App() {
  return (
    <ThemeProvider>
      <HomePage />
    </ThemeProvider>
  )
}
