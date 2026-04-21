import { Navbar } from '../components/Navbar'
import { Footer } from '../components/Footer'
import { BarrioCard } from '../components/BarrioCard'

interface Barrio {
  id: number
  nombre: string
  ubicacion: string
  lotes: number
}

const barrios: Barrio[] = [
  { id: 1, nombre: 'Pinar 1', ubicacion: 'Maipú', lotes: 48 },
  { id: 2, nombre: 'Pinar 2', ubicacion: 'Maipú', lotes: 64 },
  { id: 3, nombre: 'Pinar 3', ubicacion: 'Maipú', lotes: 80 },
]

export function BarriosPage() {
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
                Barrios
                <span className="text-gradient-gold"> Privados</span>
              </h1>
              <p className="text-obsidian-600/70 dark:text-marble-400 mt-4 max-w-xl text-lg font-light leading-relaxed transition-colors duration-300">
                Comunidades planificadas con criterios de calidad, seguridad y valorización a largo plazo.
              </p>
            </div>

            {/* Botón nuevo barrio (acción de administrador) */}
            <div className="shrink-0">
              <button
                className="inline-flex items-center gap-3 border border-gold-400 text-gold-400 hover:bg-gold-400 hover:text-obsidian-900 text-sm tracking-widest uppercase px-6 py-3 transition-all duration-300 font-medium group"
                aria-label="Crear nuevo barrio"
              >
                <svg className="w-4 h-4 transition-transform group-hover:rotate-90 duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Nuevo Barrio
              </button>
            </div>
          </div>

          {/* Stats rápidas */}
          <div className="flex gap-8 mt-12 pt-8 border-t border-marble-300 dark:border-white/5 transition-colors duration-300">
            <div>
              <p className="font-serif text-3xl text-gradient-gold">{barrios.length}</p>
              <p className="text-obsidian-500 dark:text-marble-400 text-xs tracking-widest uppercase mt-1 transition-colors duration-300">Barrios activos</p>
            </div>
            <div className="w-px bg-marble-300 dark:bg-white/10 transition-colors duration-300" />
            <div>
              <p className="font-serif text-3xl text-gradient-gold">
                {barrios.reduce((acc, b) => acc + b.lotes, 0)}
              </p>
              <p className="text-obsidian-500 dark:text-marble-400 text-xs tracking-widest uppercase mt-1 transition-colors duration-300">Lotes totales</p>
            </div>
            <div className="w-px bg-marble-300 dark:bg-white/10 transition-colors duration-300" />
            <div>
              <p className="font-serif text-3xl text-gradient-gold">Maipú</p>
              <p className="text-obsidian-500 dark:text-marble-400 text-xs tracking-widest uppercase mt-1 transition-colors duration-300">Ubicación</p>
            </div>
          </div>
        </div>
      </section>

      {/* Grid de barrios */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {barrios.map((barrio) => (
            <BarrioCard
              key={barrio.id}
              id={barrio.id}
              nombre={barrio.nombre}
              ubicacion={barrio.ubicacion}
              lotes={barrio.lotes}
            />
          ))}
        </div>
      </section>

      <Footer />
    </div>
  )
}
