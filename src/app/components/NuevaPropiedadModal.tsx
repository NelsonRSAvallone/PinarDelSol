import { useState, useEffect, useRef } from 'react'

type TipoPropiedad = '' | 'lote' | 'casa'

interface FormState {
  tipo: TipoPropiedad
  nombre: string
  metrosLote: string
  metrosCubiertos: string
  piezas: string
  banos: string
}

const initialForm: FormState = {
  tipo: '',
  nombre: '',
  metrosLote: '',
  metrosCubiertos: '',
  piezas: '',
  banos: '',
}

interface NuevaPropiedadModalProps {
  open: boolean
  onClose: () => void
  tipoInicial?: 'lote' | 'casa' | ''
}

function SelectNumero({ id, value, onChange }: { id: string; value: string; onChange: (v: string) => void }) {
  return (
    <select
      id={id}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full border border-marble-300 dark:border-white/10 bg-white dark:bg-obsidian-700/50 text-obsidian-700 dark:text-marble-300 px-3 py-2.5 text-sm focus:outline-none focus:border-gold-400 transition-colors duration-200 appearance-none cursor-pointer"
    >
      <option value="">—</option>
      {Array.from({ length: 10 }, (_, i) => i + 1).map((n) => (
        <option key={n} value={n}>{n}</option>
      ))}
    </select>
  )
}

export function NuevaPropiedadModal({ open, onClose, tipoInicial = '' }: NuevaPropiedadModalProps) {
  const [form, setForm] = useState<FormState>({ ...initialForm, tipo: tipoInicial })
  const [errores, setErrores] = useState<Partial<Record<keyof FormState, string>>>({})
  const panelRef = useRef<HTMLDivElement>(null)

  // Sincroniza tipoInicial cuando el modal se abre
  useEffect(() => {
    if (open) {
      setForm({ ...initialForm, tipo: tipoInicial })
      setErrores({})
    }
  }, [open, tipoInicial])

  // Cierra con Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [onClose])

  if (!open) return null

  const set = (field: keyof FormState) => (value: string) =>
    setForm((f) => ({ ...f, [field]: value }))

  const validar = (): boolean => {
    const e: Partial<Record<keyof FormState, string>> = {}
    if (!form.tipo)    e.tipo   = 'Seleccioná el tipo de propiedad.'
    if (!form.nombre.trim()) e.nombre = 'El nombre es obligatorio.'
    if (!form.metrosLote)    e.metrosLote = 'Ingresá los metros del lote.'
    if (form.tipo === 'casa') {
      if (!form.metrosCubiertos) e.metrosCubiertos = 'Ingresá los metros cubiertos.'
      if (!form.piezas)          e.piezas          = 'Seleccioná la cantidad de piezas.'
      if (!form.banos)           e.banos           = 'Seleccioná la cantidad de baños.'
    }
    setErrores(e)
    return Object.keys(e).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!validar()) return
    // TODO: conectar con backend / estado global
    onClose()
  }

  const esCasa = form.tipo === 'casa'

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
      onMouseDown={(e) => { if (e.target === e.currentTarget) onClose() }}
    >
      <div
        ref={panelRef}
        className="w-full max-w-lg bg-white dark:bg-obsidian-800 border border-marble-200 dark:border-white/10 shadow-2xl dark:shadow-black/60 overflow-y-auto max-h-[90vh]"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-8 py-6 border-b border-marble-100 dark:border-white/5">
          <div>
            <span className="text-gold-500 dark:text-gold-400 text-[10px] tracking-[0.4em] uppercase block mb-1">
              Administración
            </span>
            <h2 className="font-serif text-2xl text-obsidian-900 dark:text-white">
              Creación de Propiedad
            </h2>
          </div>
          <button
            onClick={onClose}
            aria-label="Cerrar"
            className="w-8 h-8 flex items-center justify-center text-obsidian-400 dark:text-marble-400 hover:text-obsidian-700 dark:hover:text-white transition-colors duration-200"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} noValidate className="px-8 py-6 flex flex-col gap-5">

          {/* Tipo de propiedad */}
          <div>
            <label htmlFor="tipo" className="text-xs tracking-widest uppercase text-obsidian-500 dark:text-marble-400 mb-1.5 block">
              Tipo de propiedad <span className="text-gold-500">*</span>
            </label>
            <div className="relative">
              <select
                id="tipo"
                value={form.tipo}
                onChange={(e) => set('tipo')(e.target.value)}
                className="w-full border border-marble-300 dark:border-white/10 bg-white dark:bg-obsidian-700/50 text-obsidian-700 dark:text-marble-300 px-3 py-2.5 text-sm focus:outline-none focus:border-gold-400 transition-colors duration-200 appearance-none cursor-pointer pr-9"
              >
                <option value="">Seleccionar tipo</option>
                <option value="lote">Lote</option>
                <option value="casa">Casa</option>
              </select>
              <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gold-400">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </span>
            </div>
            {errores.tipo && <p className="text-red-400 text-xs mt-1">{errores.tipo}</p>}
          </div>

          {/* Nombre */}
          <div>
            <label htmlFor="nombre" className="text-xs tracking-widest uppercase text-obsidian-500 dark:text-marble-400 mb-1.5 block">
              Nombre <span className="text-gold-500">*</span>
            </label>
            <input
              id="nombre"
              type="text"
              value={form.nombre}
              onChange={(e) => set('nombre')(e.target.value)}
              placeholder={form.tipo === 'lote' ? 'Ej: Lote 12' : form.tipo === 'casa' ? 'Ej: Roble' : 'Nombre de la propiedad'}
              className="w-full border border-marble-300 dark:border-white/10 bg-transparent text-obsidian-700 dark:text-marble-300 px-3 py-2.5 text-sm focus:outline-none focus:border-gold-400 transition-colors duration-200 placeholder:text-obsidian-300 dark:placeholder:text-marble-400/30"
            />
            {errores.nombre && <p className="text-red-400 text-xs mt-1">{errores.nombre}</p>}
          </div>

          {/* Campos que aparecen cuando hay tipo seleccionado */}
          {form.tipo && (
            <>
              {/* Metros del lote */}
              <div>
                <label htmlFor="metrosLote" className="text-xs tracking-widest uppercase text-obsidian-500 dark:text-marble-400 mb-1.5 block">
                  Metros del lote (m²) <span className="text-gold-500">*</span>
                </label>
                <input
                  id="metrosLote"
                  type="number"
                  min="1"
                  value={form.metrosLote}
                  onChange={(e) => set('metrosLote')(e.target.value)}
                  placeholder="Ej: 300"
                  className="w-full border border-marble-300 dark:border-white/10 bg-transparent text-obsidian-700 dark:text-marble-300 px-3 py-2.5 text-sm focus:outline-none focus:border-gold-400 transition-colors duration-200 placeholder:text-obsidian-300 dark:placeholder:text-marble-400/30"
                />
                {errores.metrosLote && <p className="text-red-400 text-xs mt-1">{errores.metrosLote}</p>}
              </div>

              {/* Campos exclusivos de Casa */}
              {esCasa && (
                <>
                  {/* Metros cubiertos */}
                  <div>
                    <label htmlFor="metrosCubiertos" className="text-xs tracking-widest uppercase text-obsidian-500 dark:text-marble-400 mb-1.5 block">
                      Metros cubiertos (m²) <span className="text-gold-500">*</span>
                    </label>
                    <input
                      id="metrosCubiertos"
                      type="number"
                      min="1"
                      value={form.metrosCubiertos}
                      onChange={(e) => set('metrosCubiertos')(e.target.value)}
                      placeholder="Ej: 120"
                      className="w-full border border-marble-300 dark:border-white/10 bg-transparent text-obsidian-700 dark:text-marble-300 px-3 py-2.5 text-sm focus:outline-none focus:border-gold-400 transition-colors duration-200 placeholder:text-obsidian-300 dark:placeholder:text-marble-400/30"
                    />
                    {errores.metrosCubiertos && <p className="text-red-400 text-xs mt-1">{errores.metrosCubiertos}</p>}
                  </div>

                  {/* Piezas y baños en fila */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="piezas" className="text-xs tracking-widest uppercase text-obsidian-500 dark:text-marble-400 mb-1.5 block">
                        Piezas <span className="text-gold-500">*</span>
                      </label>
                      <div className="relative">
                        <SelectNumero id="piezas" value={form.piezas} onChange={set('piezas')} />
                        <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gold-400">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </span>
                      </div>
                      {errores.piezas && <p className="text-red-400 text-xs mt-1">{errores.piezas}</p>}
                    </div>

                    <div>
                      <label htmlFor="banos" className="text-xs tracking-widest uppercase text-obsidian-500 dark:text-marble-400 mb-1.5 block">
                        Baños <span className="text-gold-500">*</span>
                      </label>
                      <div className="relative">
                        <SelectNumero id="banos" value={form.banos} onChange={set('banos')} />
                        <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gold-400">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </span>
                      </div>
                      {errores.banos && <p className="text-red-400 text-xs mt-1">{errores.banos}</p>}
                    </div>
                  </div>
                </>
              )}
            </>
          )}

          {/* Separador */}
          <div className="h-px bg-marble-100 dark:bg-white/5" />

          {/* Acciones */}
          <div className="flex gap-3 justify-end">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2.5 border border-marble-300 dark:border-white/10 text-obsidian-600 dark:text-marble-300 hover:border-obsidian-400 dark:hover:border-white/30 text-sm tracking-widest uppercase transition-colors duration-200"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 bg-gold-400 hover:bg-gold-500 text-obsidian-900 text-sm tracking-widest uppercase font-medium transition-colors duration-200"
            >
              Crear propiedad
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
