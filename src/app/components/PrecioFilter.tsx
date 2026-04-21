import { useState, useRef, useEffect } from 'react'

interface PrecioFilterProps {
  onApply: (desde: number | null, hasta: number | null) => void
  active: boolean
}

export function PrecioFilter({ onApply, active }: PrecioFilterProps) {
  const [open, setOpen] = useState(false)
  const [desde, setDesde] = useState('')
  const [hasta, setHasta] = useState('')
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const onClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', onClickOutside)
    return () => document.removeEventListener('mousedown', onClickOutside)
  }, [])

  const handleApply = () => {
    onApply(
      desde !== '' ? Number(desde) : null,
      hasta !== '' ? Number(hasta) : null,
    )
    setOpen(false)
  }

  const handleLimpiar = () => {
    setDesde('')
    setHasta('')
    onApply(null, null)
    setOpen(false)
  }

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        aria-label="Filtrar por precio"
        className={`inline-flex items-center gap-2.5 border text-sm tracking-widest uppercase px-4 py-3 transition-all duration-300 font-medium ${
          active
            ? 'border-gold-400 bg-gold-400/10 text-gold-500 dark:text-gold-400'
            : 'border-marble-300 dark:border-white/10 text-obsidian-600 dark:text-marble-300 hover:border-gold-400 hover:text-gold-500 dark:hover:text-gold-400'
        }`}
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2a1 1 0 01-.293.707L13 13.414V19a1 1 0 01-.553.894l-4 2A1 1 0 017 21v-7.586L3.293 6.707A1 1 0 013 6V4z" />
        </svg>
        Precio
        {active && <span className="w-1.5 h-1.5 rounded-full bg-gold-400 shrink-0" />}
      </button>

      {/* Panel desplegable */}
      <div
        className={`absolute top-full left-0 mt-2 w-64 z-20 transition-all duration-200 ${
          open ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 -translate-y-1 pointer-events-none'
        }`}
      >
        <div className="bg-white dark:bg-obsidian-800 border border-marble-200 dark:border-white/10 shadow-xl dark:shadow-black/40 p-5">
          <p className="text-xs tracking-[0.3em] uppercase text-gold-500 dark:text-gold-400 mb-4">Rango de precio (USD)</p>

          <div className="flex flex-col gap-3">
            {/* Desde */}
            <div>
              <label className="text-xs tracking-widest uppercase text-obsidian-500 dark:text-marble-400 mb-1.5 block">
                Desde
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-obsidian-400 dark:text-marble-400/60 text-sm">$</span>
                <input
                  type="number"
                  min="0"
                  value={desde}
                  onChange={(e) => setDesde(e.target.value)}
                  placeholder="0"
                  className="w-full pl-7 pr-3 py-2.5 border border-marble-300 dark:border-white/10 bg-transparent text-obsidian-700 dark:text-marble-300 text-sm focus:outline-none focus:border-gold-400 transition-colors duration-200 placeholder:text-obsidian-300 dark:placeholder:text-marble-400/30"
                />
              </div>
            </div>

            {/* Hasta */}
            <div>
              <label className="text-xs tracking-widest uppercase text-obsidian-500 dark:text-marble-400 mb-1.5 block">
                Hasta
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-obsidian-400 dark:text-marble-400/60 text-sm">$</span>
                <input
                  type="number"
                  min="0"
                  value={hasta}
                  onChange={(e) => setHasta(e.target.value)}
                  placeholder="Sin límite"
                  className="w-full pl-7 pr-3 py-2.5 border border-marble-300 dark:border-white/10 bg-transparent text-obsidian-700 dark:text-marble-300 text-sm focus:outline-none focus:border-gold-400 transition-colors duration-200 placeholder:text-obsidian-300 dark:placeholder:text-marble-400/30"
                />
              </div>
            </div>

            {/* Acciones */}
            <div className="flex gap-2 pt-2 border-t border-marble-100 dark:border-white/5 mt-1">
              <button
                onClick={handleApply}
                className="flex-1 bg-gold-400 hover:bg-gold-500 text-obsidian-900 text-xs tracking-widest uppercase py-2.5 font-medium transition-colors duration-200"
              >
                Aplicar
              </button>
              {active && (
                <button
                  onClick={handleLimpiar}
                  title="Limpiar filtro"
                  className="px-3.5 border border-marble-300 dark:border-white/10 text-obsidian-400 dark:text-marble-400 hover:border-red-400/50 hover:text-red-400 dark:hover:text-red-400 text-xs transition-colors duration-200"
                >
                  ✕
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
