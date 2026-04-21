import { useState } from 'react'
import { Navbar } from '../components/Navbar'
import { Footer } from '../components/Footer'
import { CasaCard } from '../components/CasaCard'
import { PrecioFilter } from '../components/PrecioFilter'

interface Casa {
  id: number
  nombre: string
  barrio: string
  barrioId: number
  superficie: number
  dormitorios: number
  banos: number
  precio: number
  estado: 'disponible' | 'en construccion' | 'vendido'
}

const casas: Casa[] = [
  { id: 1, nombre: 'Roble',  barrio: 'Pinar 1', barrioId: 1, superficie: 120, dormitorios: 3, banos: 2, precio: 180000, estado: 'disponible' },
  { id: 2, nombre: 'Cedro',  barrio: 'Pinar 2', barrioId: 2, superficie: 150, dormitorios: 4, banos: 2, precio: 220000, estado: 'disponible' },
  { id: 3, nombre: 'Alerce', barrio: 'Pinar 3', barrioId: 3, superficie: 180, dormitorios: 4, banos: 3, precio: 280000, estado: 'en construccion' },
]

const barrios = ['Pinar 1', 'Pinar 2', 'Pinar 3']

// Formatea precio para el rango en stats
function formatPrecioCorto(precio: number): string {
  return '$' + (precio / 1000).toFixed(0) + 'k'
}

export function CasasPage() {
  const [barrioSeleccionado, setBarrioSeleccionado] = useState<string>('')
  const [precioDesde, setPrecioDesde] = useState<number | null>(null)
  const [precioHasta, setPrecioHasta] = useState<number | null>(null)

  const casasFiltradas = casas.filter((c) => {
    if (barrioSeleccionado && c.barrio !== barrioSeleccionado) return false
    if (precioDesde !== null && c.precio < precioDesde) return false
    if (precioHasta !== null && c.precio > precioHasta) return false
    return true
  })

  const precioFiltroActivo = precioDesde !== null || precioHasta !== null

  const precioMin = Math.min(...casas.map((c) => c.precio))
  const precioMax = Math.max(...casas.map((c) => c.precio))
  const rangoPrecios = `${formatPrecioCorto(precioMin)} – ${formatPrecioCorto(precioMax)}`

  return (
    <div className="min-h-screen bg-marble-100 dark:bg-obsidian-900 transition-colors duration-300">
      <Navbar />

      {/* Hero de la página */}
      <section className="pt-32 pb-16 border-b border-marble-300 dark:border-white/5 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8">
            {/* Título */}
            <div>
              <span className="text-gold-500 dark:text-gold-400 text-xs tracking-[0.4em] uppercase mb-4 block transition-colors duration-300">
                Nuestros proyectos
              </span>
              <h1 className="font-serif text-5xl md:text-6xl text-obsidian-900 dark:text-white leading-tight transition-colors duration-300">
                Casas
                <span className="text-gradient-gold"> Exclusivas</span>
              </h1>
              <p className="text-obsidian-600/70 dark:text-marble-400 mt-4 max-w-xl text-lg font-light leading-relaxed transition-colors duration-300">
                Viviendas de diseño contemporáneo en barrios privados de Maipú, construidas con los más altos estándares de calidad.
              </p>
            </div>

            {/* Controles de la derecha: filtros + botón admin */}
            <div className="shrink-0 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              {/* Filtro de precio */}
              <PrecioFilter
                active={precioFiltroActivo}
                onApply={(desde, hasta) => { setPrecioDesde(desde); setPrecioHasta(hasta) }}
              />

              {/* DropDown de filtro por barrio */}
              <div className="relative">
                <select
                  value={barrioSeleccionado}
                  onChange={(e) => setBarrioSeleccionado(e.target.value)}
                  aria-label="Filtrar por barrio"
                  className="border border-marble-300 dark:border-white/10 bg-white dark:bg-obsidian-800 text-obsidian-700 dark:text-marble-300 px-4 py-3 text-sm tracking-wider uppercase focus:outline-none focus:border-gold-400 transition-colors duration-300 cursor-pointer appearance-none pr-10 min-w-[200px] w-full"
                >
                  <option value="">Todas las Casas</option>
                  {barrios.map((b) => (
                    <option key={b} value={b}>{b}</option>
                  ))}
                </select>
                <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gold-400">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </span>
              </div>

              {/* Botón admin — en el futuro solo visible para administradores */}
              <button
                className="inline-flex items-center justify-center gap-3 border border-gold-400 text-gold-400 hover:bg-gold-400 hover:text-obsidian-900 text-sm tracking-widest uppercase px-6 py-3 transition-all duration-300 font-medium group"
                aria-label="Crear nueva casa"
              >
                <svg className="w-4 h-4 transition-transform group-hover:rotate-90 duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Nueva Casa
              </button>
            </div>
          </div>

          {/* Stats rápidas */}
          <div className="flex gap-8 mt-12 pt-8 border-t border-marble-300 dark:border-white/5 transition-colors duration-300">
            <div>
              <p className="font-serif text-3xl text-gradient-gold">{casas.length}</p>
              <p className="text-obsidian-500 dark:text-marble-400 text-xs tracking-widest uppercase mt-1 transition-colors duration-300">Casas totales</p>
            </div>
            <div className="w-px bg-marble-300 dark:bg-white/10 transition-colors duration-300" />
            <div>
              <p className="font-serif text-3xl text-gradient-gold">{rangoPrecios}</p>
              <p className="text-obsidian-500 dark:text-marble-400 text-xs tracking-widest uppercase mt-1 transition-colors duration-300">Rango de precios</p>
            </div>
            <div className="w-px bg-marble-300 dark:bg-white/10 transition-colors duration-300" />
            <div>
              <p className="font-serif text-3xl text-gradient-gold">Maipú</p>
              <p className="text-obsidian-500 dark:text-marble-400 text-xs tracking-widest uppercase mt-1 transition-colors duration-300">Ubicación</p>
            </div>
          </div>
        </div>
      </section>

      {/* Grid de casas */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        {casasFiltradas.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {casasFiltradas.map((casa) => (
              <CasaCard
                key={casa.id}
                id={casa.id}
                nombre={casa.nombre}
                barrio={casa.barrio}
                superficie={casa.superficie}
                dormitorios={casa.dormitorios}
                banos={casa.banos}
                precio={casa.precio}
                estado={casa.estado}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-obsidian-400 dark:text-marble-400/60 text-lg font-light transition-colors duration-300">
              No hay casas disponibles para este barrio.
            </p>
          </div>
        )}
      </section>

      <Footer />
    </div>
  )
}
