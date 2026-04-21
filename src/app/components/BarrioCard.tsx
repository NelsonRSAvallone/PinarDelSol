import { Link } from 'react-router-dom'

interface BarrioCardProps {
  id: number
  nombre: string
  ubicacion: string
  lotes?: number
}

export function BarrioCard({ id, nombre, ubicacion, lotes }: BarrioCardProps) {
  return (
    <div className="group border border-marble-300 dark:border-white/5 hover:border-gold-400/50 dark:hover:border-gold-400/30 bg-white dark:bg-obsidian-800/30 hover:bg-marble-50 dark:hover:bg-obsidian-800/60 transition-all duration-500 shadow-sm dark:shadow-none overflow-hidden">
      {/* Franja decorativa superior */}
      <div className="h-1 bg-gradient-to-r from-gold-600 via-gold-400 to-gold-300 w-0 group-hover:w-full transition-all duration-500" />

      <div className="p-8">
        {/* Número del barrio */}
        <div className="flex items-start justify-between mb-6">
          <span className="font-serif text-5xl text-gold-400/20 dark:text-gold-400/10 font-bold leading-none select-none">
            {String(id).padStart(2, '0')}
          </span>
          <span className="inline-flex items-center gap-1.5 text-xs tracking-[0.3em] uppercase text-gold-500 dark:text-gold-400 border border-gold-400/30 px-3 py-1">
            Barrio
          </span>
        </div>

        {/* Nombre */}
        <h3 className="font-serif text-2xl text-obsidian-900 dark:text-white mb-4 transition-colors duration-300">
          {nombre}
        </h3>

        {/* Ubicación */}
        <div className="flex items-center gap-2 text-obsidian-500 dark:text-marble-400 text-sm mb-6 transition-colors duration-300">
          <svg className="w-4 h-4 text-gold-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          {ubicacion}
        </div>

        {/* Lotes disponibles (opcional) */}
        {lotes !== undefined && (
          <div className="flex items-center gap-2 text-obsidian-400 dark:text-marble-400/60 text-xs mb-6 transition-colors duration-300">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
            </svg>
            {lotes} lotes disponibles
          </div>
        )}

        {/* Separador */}
        <div className="h-px bg-marble-200 dark:bg-white/5 mb-6 transition-colors duration-300" />

        {/* CTA */}
        <Link
          to={`/barrios/${id}`}
          className="inline-flex items-center gap-2 text-gold-500 dark:text-gold-400 hover:text-gold-600 dark:hover:text-gold-300 text-sm tracking-widest uppercase font-medium transition-colors duration-300 group/link"
        >
          Ver barrio
          <svg className="w-4 h-4 transition-transform group-hover/link:translate-x-1 duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </Link>
      </div>
    </div>
  )
}
