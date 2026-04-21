import { Link } from 'react-router-dom'

interface CasaCardProps {
  id: number
  nombre: string       // "Roble"
  barrio: string       // "Pinar 1"
  superficie: number   // m²
  dormitorios: number
  banos: number
  precio: number       // USD
  estado: 'disponible' | 'en construccion' | 'vendido'
}

// Configuración de colores por estado
const estadoConfig = {
  disponible: {
    label: 'Disponible',
    className: 'text-emerald-600 border-emerald-400/30 dark:text-emerald-400 dark:border-emerald-400/30',
  },
  'en construccion': {
    label: 'En Construcción',
    className: 'text-blue-500 border-blue-400/30 dark:text-blue-400 dark:border-blue-400/30',
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

export function CasaCard({ id, nombre, barrio, superficie, dormitorios, banos, precio, estado }: CasaCardProps) {
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

        {/* Nombre de la casa */}
        <h3 className="font-serif text-2xl text-obsidian-900 dark:text-white mb-4 transition-colors duration-300">
          {nombre}
        </h3>

        {/* Barrio con ícono de pin */}
        <div className="flex items-center gap-2 text-obsidian-500 dark:text-marble-400 text-sm mb-6 transition-colors duration-300">
          <svg className="w-4 h-4 text-gold-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          {barrio}
        </div>

        {/* Tres íconos en fila: dormitorios, baños, superficie */}
        <div className="flex items-center gap-5 text-obsidian-400 dark:text-marble-400/60 text-xs mb-6 transition-colors duration-300">
          {/* Dormitorios */}
          <div className="flex items-center gap-1.5">
            <svg className="w-3.5 h-3.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            <span>{dormitorios} dorm.</span>
          </div>

          <span className="w-px h-3 bg-marble-300 dark:bg-white/10" />

          {/* Baños */}
          <div className="flex items-center gap-1.5">
            <svg className="w-3.5 h-3.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
            </svg>
            <span>{banos} baños</span>
          </div>

          <span className="w-px h-3 bg-marble-300 dark:bg-white/10" />

          {/* Superficie */}
          <div className="flex items-center gap-1.5">
            <svg className="w-3.5 h-3.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5v-4m0 4h-4m4 0l-5-5" />
            </svg>
            <span>{superficie} m²</span>
          </div>
        </div>

        {/* Precio */}
        <p className="font-serif text-xl text-gold-500 dark:text-gold-400 mb-6 transition-colors duration-300">
          {formatPrecio(precio)}
          <span className="text-xs text-obsidian-400 dark:text-marble-400/60 font-sans ml-2 transition-colors duration-300">USD</span>
        </p>

        {/* Separador + CTA */}
        <div className="h-px bg-marble-200 dark:bg-white/5 mb-6 transition-colors duration-300" />

        <Link
          to={`/casas/${id}`}
          className="inline-flex items-center gap-2 text-gold-500 dark:text-gold-400 hover:text-gold-600 dark:hover:text-gold-300 text-sm tracking-widest uppercase font-medium transition-colors duration-300 group/link"
        >
          Ver casa
          <svg className="w-4 h-4 transition-transform group-hover/link:translate-x-1 duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </Link>
      </div>
    </div>
  )
}
