import { HashRouter, Routes, Route } from 'react-router-dom'
import { ThemeProvider } from './app/context/ThemeContext'
import { HomePage } from './app/pages/HomePage'
import { BarriosPage } from './app/pages/BarriosPage'

export function App() {
  return (
    <ThemeProvider>
      <HashRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/barrios" element={<BarriosPage />} />
        </Routes>
      </HashRouter>
    </ThemeProvider>
  )
}
