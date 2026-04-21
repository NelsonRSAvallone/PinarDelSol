import { Link } from 'react-router-dom'

interface LoteCardProps {
  id: number
  numero: string       // "Lote 12"
  barrio: string       // "Pinar 1"
  superficie: number   // m²
  precio: number       // USD
  estado: 'disponible' | 'reservado' | 'vendido'
}

// Configuración de colores por estado
const estadoConfig = {
  disponible: {
    label: 'Disponible',
    className: 'text-emerald-600 border-emerald-400/30 dark:text-emerald-400 dark:border-emerald-400/30',
  },
  reservado: {
    label: 'Reservado',
    className: 'text-amber-500 border-amber-400/30 dark:text-amber-400 dark:border-amber-400/30',
  },
  vendido: {
    label: 'Vendido',
    className: 'text-red-500 border-red-400/30 dark:text-red-400 dark:border-red-400/30',
  },
}

// Formatea un número como precio USD con puntos de miles
function formatPrecio(precio: number): string {
  return '$' + precio.toLocaleString('es-AR')
}

export function LoteCard({ id, numero, barrio, superficie, precio, estado }: LoteCardProps) {
  const estadoCfg = estadoConfig[estado]

  return (
    <div className="group border border-marble-300 dark:border-white/5 hover:border-gold-400/50 dark:hover:border-gold-400/30 bg-white dark:bg-obsidian-800/30 hover:bg-marble-50 dark:hover:bg-obsidian-800/60 transition-all duration-500 shadow-sm dark:shadow-none overflow-hidden">
      {/* Franja decorativa superior animada en hover */}
      <div className="h-1 bg-gradient-to-r from-gold-600 via-gold-400 to-gold-300 w-0 group-hover:w-full transition-all duration-500" />

      <div className="p-8">
        {/* Número decorativo + badge de estado */}
        <div className="flex items-start justify-between mb-6">
          <span className="font-serif text-5xl text-gold-400/20 dark:text-gold-400/10 font-bold leading-none select-none">
            {String(id).padStart(2, '0')}
          </span>
          <span
            className={`inline-flex items-center gap-1.5 text-xs tracking-[0.3em] uppercase border px-3 py-1 transition-colors duration-300 ${estadoCfg.className}`}
          >
            {estadoCfg.label}
          </span>
        </div>

        {/* Nombre del lote */}
        <h3 className="font-serif text-2xl text-obsidian-900 dark:text-white mb-4 transition-colors duration-300">
          {numero}
        </h3>

        {/* Barrio con ícono de pin */}
        <div className="flex items-center gap-2 text-obsidian-500 dark:text-marble-400 text-sm mb-4 transition-colors duration-300">
          <svg className="w-4 h-4 text-gold-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          {barrio}
        </div>

        {/* Superficie con ícono de área */}
        <div className="flex items-center gap-2 text-obsidian-400 dark:text-marble-400/60 text-xs mb-6 transition-colors duration-300">
          <svg className="w-3.5 h-3.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5v-4m0 4h-4m4 0l-5-5" />
          </svg>
          {superficie} m²
        </div>

        {/* Precio */}
        <p className="font-serif text-xl text-gold-500 dark:text-gold-400 mb-6 transition-colors duration-300">
          {formatPrecio(precio)}
          <span className="text-xs text-obsidian-400 dark:text-marble-400/60 font-sans ml-2 transition-colors duration-300">USD</span>
        </p>

        {/* Separador + CTA */}
        <div className="h-px bg-marble-200 dark:bg-white/5 mb-6 transition-colors duration-300" />

        <Link
          to={`/lotes/${id}`}
          className="inline-flex items-center gap-2 text-gold-500 dark:text-gold-400 hover:text-gold-600 dark:hover:text-gold-300 text-sm tracking-widest uppercase font-medium transition-colors duration-300 group/link"
        >
          Ver lote
          <svg className="w-4 h-4 transition-transform group-hover/link:translate-x-1 duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </Link>
      </div>
    </div>
  )
}
