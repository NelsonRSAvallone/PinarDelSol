import { useState } from 'react'
import { Navbar } from '../components/Navbar'
import { Footer } from '../components/Footer'
import { LoteCard } from '../components/LoteCard'
import { CasaCard } from '../components/CasaCard'
import { PrecioFilter } from '../components/PrecioFilter'
import { NuevaPropiedadModal } from '../components/NuevaPropiedadModal'

type TipoFiltro = '' | 'lote' | 'casa'

interface Lote {
  tipo: 'lote'
  id: number
  numero: string
  barrio: string
  barrioId: number
  superficie: number
  precio: number
  estado: 'disponible' | 'reservado' | 'vendido'
}

interface Casa {
  tipo: 'casa'
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

type Propiedad = Lote | Casa

const propiedades: Propiedad[] = [
  { tipo: 'lote', id: 1, numero: 'Lote 12', barrio: 'Pinar 1', barrioId: 1, superficie: 300, precio: 45000,  estado: 'disponible'    },
  { tipo: 'lote', id: 2, numero: 'Lote 07', barrio: 'Pinar 2', barrioId: 2, superficie: 450, precio: 62000,  estado: 'disponible'    },
  { tipo: 'lote', id: 3, numero: 'Lote 23', barrio: 'Pinar 3', barrioId: 3, superficie: 380, precio: 55000,  estado: 'reservado'     },
  { tipo: 'casa', id: 1, nombre: 'Roble',   barrio: 'Pinar 1', barrioId: 1, superficie: 120, precio: 180000, dormitorios: 3, banos: 2, estado: 'disponible'      },
  { tipo: 'casa', id: 2, nombre: 'Cedro',   barrio: 'Pinar 2', barrioId: 2, superficie: 150, precio: 220000, dormitorios: 4, banos: 2, estado: 'disponible'      },
  { tipo: 'casa', id: 3, nombre: 'Alerce',  barrio: 'Pinar 3', barrioId: 3, superficie: 180, precio: 280000, dormitorios: 4, banos: 3, estado: 'en construccion' },
]

const barrios = ['Pinar 1', 'Pinar 2', 'Pinar 3']

export function PropiedadesPage() {
  const [tipoFiltro, setTipoFiltro]     = useState<TipoFiltro>('')
  const [barrioFiltro, setBarrioFiltro] = useState<string>('')
  const [precioDesde, setPrecioDesde]   = useState<number | null>(null)
  const [precioHasta, setPrecioHasta]   = useState<number | null>(null)
  const [modalOpen, setModalOpen]       = useState(false)

  const filtradas = propiedades.filter((p) => {
    if (tipoFiltro && p.tipo !== tipoFiltro) return false
    if (barrioFiltro && p.barrio !== barrioFiltro) return false
    if (precioDesde !== null && p.precio < precioDesde) return false
    if (precioHasta !== null && p.precio > precioHasta) return false
    return true
  })

  const precioFiltroActivo = precioDesde !== null || precioHasta !== null

  const totalLotes = propiedades.filter((p) => p.tipo === 'lote').length
  const totalCasas = propiedades.filter((p) => p.tipo === 'casa').length

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
                Catálogo completo
              </span>
              <h1 className="font-serif text-5xl md:text-6xl text-obsidian-900 dark:text-white leading-tight transition-colors duration-300">
                Todas las
                <span className="text-gradient-gold"> Propiedades</span>
              </h1>
              <p className="text-obsidian-600/70 dark:text-marble-400 mt-4 max-w-xl text-lg font-light leading-relaxed transition-colors duration-300">
                Lotes y casas disponibles en nuestros barrios privados de Maipú. Encontrá tu próxima inversión.
              </p>
            </div>

            {/* Controles: filtros + botón admin */}
            <div className="shrink-0 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              {/* Filtro de precio */}
              <PrecioFilter
                active={precioFiltroActivo}
                onApply={(desde, hasta) => { setPrecioDesde(desde); setPrecioHasta(hasta) }}
              />

              {/* Filtro por tipo */}
              <div className="relative">
                <select
                  value={tipoFiltro}
                  onChange={(e) => setTipoFiltro(e.target.value as TipoFiltro)}
                  aria-label="Filtrar por tipo"
                  className="border border-marble-300 dark:border-white/10 bg-white dark:bg-obsidian-800 text-obsidian-700 dark:text-marble-300 px-4 py-3 text-sm tracking-wider uppercase focus:outline-none focus:border-gold-400 transition-colors duration-300 cursor-pointer appearance-none pr-10 min-w-[180px] w-full"
                >
                  <option value="">Todas</option>
                  <option value="lote">Lotes</option>
                  <option value="casa">Casas</option>
                </select>
                <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gold-400">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </span>
              </div>

              {/* Filtro por barrio */}
              <div className="relative">
                <select
                  value={barrioFiltro}
                  onChange={(e) => setBarrioFiltro(e.target.value)}
                  aria-label="Filtrar por barrio"
                  className="border border-marble-300 dark:border-white/10 bg-white dark:bg-obsidian-800 text-obsidian-700 dark:text-marble-300 px-4 py-3 text-sm tracking-wider uppercase focus:outline-none focus:border-gold-400 transition-colors duration-300 cursor-pointer appearance-none pr-10 min-w-[180px] w-full"
                >
                  <option value="">Todos los Barrios</option>
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
                onClick={() => setModalOpen(true)}
                className="inline-flex items-center justify-center gap-3 border border-gold-400 text-gold-400 hover:bg-gold-400 hover:text-obsidian-900 text-sm tracking-widest uppercase px-6 py-3 transition-all duration-300 font-medium group"
                aria-label="Crear nueva propiedad"
              >
                <svg className="w-4 h-4 transition-transform group-hover:rotate-90 duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Nueva Propiedad
              </button>
            </div>
          </div>

          {/* Stats rápidas */}
          <div className="flex gap-8 mt-12 pt-8 border-t border-marble-300 dark:border-white/5 transition-colors duration-300">
            <div>
              <p className="font-serif text-3xl text-gradient-gold">{propiedades.length}</p>
              <p className="text-obsidian-500 dark:text-marble-400 text-xs tracking-widest uppercase mt-1 transition-colors duration-300">Total propiedades</p>
            </div>
            <div className="w-px bg-marble-300 dark:bg-white/10 transition-colors duration-300" />
            <div>
              <p className="font-serif text-3xl text-gradient-gold">{totalLotes}</p>
              <p className="text-obsidian-500 dark:text-marble-400 text-xs tracking-widest uppercase mt-1 transition-colors duration-300">Lotes</p>
            </div>
            <div className="w-px bg-marble-300 dark:bg-white/10 transition-colors duration-300" />
            <div>
              <p className="font-serif text-3xl text-gradient-gold">{totalCasas}</p>
              <p className="text-obsidian-500 dark:text-marble-400 text-xs tracking-widest uppercase mt-1 transition-colors duration-300">Casas</p>
            </div>
            <div className="w-px bg-marble-300 dark:bg-white/10 transition-colors duration-300" />
            <div>
              <p className="font-serif text-3xl text-gradient-gold">Maipú</p>
              <p className="text-obsidian-500 dark:text-marble-400 text-xs tracking-widest uppercase mt-1 transition-colors duration-300">Ubicación</p>
            </div>
          </div>
        </div>
      </section>

      {/* Grid de propiedades */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        {filtradas.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtradas.map((p) =>
              p.tipo === 'lote' ? (
                <LoteCard
                  key={`lote-${p.id}`}
                  id={p.id}
                  numero={p.numero}
                  barrio={p.barrio}
                  superficie={p.superficie}
                  precio={p.precio}
                  estado={p.estado}
                />
              ) : (
                <CasaCard
                  key={`casa-${p.id}`}
                  id={p.id}
                  nombre={p.nombre}
                  barrio={p.barrio}
                  superficie={p.superficie}
                  dormitorios={p.dormitorios}
                  banos={p.banos}
                  precio={p.precio}
                  estado={p.estado}
                />
              )
            )}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-obsidian-400 dark:text-marble-400/60 text-lg font-light transition-colors duration-300">
              No hay propiedades que coincidan con los filtros seleccionados.
            </p>
          </div>
        )}
      </section>

      <Footer />

      <NuevaPropiedadModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
      />
    </div>
  )
}
