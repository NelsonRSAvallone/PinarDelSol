import { HashRouter, Routes, Route } from 'react-router-dom'
import { ThemeProvider } from './app/context/ThemeContext'
import { HomePage } from './app/pages/HomePage'
import { BarriosPage } from './app/pages/BarriosPage'
import { LotesPage } from './app/pages/LotesPage'
import { CasasPage } from './app/pages/CasasPage'
import { PropiedadesPage } from './app/pages/PropiedadesPage'

export function App() {
  return (
    <ThemeProvider>
      <HashRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/barrios" element={<BarriosPage />} />
          <Route path="/lotes" element={<LotesPage />} />
          <Route path="/casas" element={<CasasPage />} />
          <Route path="/propiedades" element={<PropiedadesPage />} />
        </Routes>
      </HashRouter>
    </ThemeProvider>
  )
}
