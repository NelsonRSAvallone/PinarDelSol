import { useState, useEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useTheme } from '../context/ThemeContext'

interface DropdownChild {
  label: string
  to: string
}

interface NavItem {
  label: string
  to?: string
  isPage?: boolean
  isDropdown?: boolean
  children?: DropdownChild[]
}

const navLinks: NavItem[] = [
  { label: 'Inicio', to: '/', isPage: true },
  {
    label: 'Propiedades',
    isDropdown: true,
    children: [
      { label: 'Barrios',               to: '/barrios'     },
      { label: 'Lotes',                 to: '/lotes'       },
      { label: 'Casas',                 to: '/casas'       },
      { label: 'Todas las propiedades', to: '/propiedades' },
    ],
  },
  { label: 'Nosotros', to: '#nosotros', isPage: false },
  { label: 'Contacto', to: '#contacto', isPage: false },
]

const propiedadesRoutes = ['/barrios', '/lotes', '/casas', '/propiedades']

function SunIcon() {
  return (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
      <circle cx="12" cy="12" r="4" />
      <path strokeLinecap="round" d="M12 2v2M12 20v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M2 12h2M20 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
    </svg>
  )
}

function MoonIcon() {
  return (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 12.79A9 9 0 1111.21 3a7 7 0 009.79 9.79z" />
    </svg>
  )
}

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg
      className={`w-3 h-3 transition-transform duration-300 ${open ? 'rotate-180' : ''}`}
      fill="none" stroke="currentColor" viewBox="0 0 24 24"
    >
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
    </svg>
  )
}

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [mobileDropdownOpen, setMobileDropdownOpen] = useState(false)
  const { theme, toggleTheme } = useTheme()
  const location = useLocation()
  const isDark = theme === 'dark'
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Cierra menús al cambiar de ruta
  useEffect(() => {
    setMenuOpen(false)
    setDropdownOpen(false)
    setMobileDropdownOpen(false)
  }, [location.pathname])

  // Cierra el dropdown al hacer click fuera
  useEffect(() => {
    const onClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false)
      }
    }
    document.addEventListener('mousedown', onClickOutside)
    return () => document.removeEventListener('mousedown', onClickOutside)
  }, [])

  // En el home sin scroll el navbar flota sobre el carousel siempre oscuro → texto blanco.
  // En cualquier otra página el fondo puede ser claro → colores según el tema.
  const overDarkHero = location.pathname === '/' && !scrolled

  const isDropdownActive = propiedadesRoutes.includes(location.pathname)

  const baseLinkClass = 'text-sm tracking-wider uppercase transition-colors duration-300 relative group'
  const textColor = (active: boolean) =>
    active
      ? 'text-gold-500'
      : overDarkHero
        ? 'text-marble-100 hover:text-gold-400'
        : 'text-obsidian-600 dark:text-marble-300 hover:text-gold-500 dark:hover:text-gold-400'

  const underline = 'absolute -bottom-1 left-0 h-px bg-gold-400 transition-all duration-300 group-hover:w-full'

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'backdrop-blur-md shadow-lg py-3 bg-white/95 dark:bg-obsidian-900/95 shadow-black/10 dark:shadow-black/40'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 border border-gold-400 rotate-45 flex items-center justify-center transition-transform group-hover:rotate-0 duration-500">
            <span className="text-gold-400 font-serif font-bold text-sm -rotate-45 group-hover:rotate-0 duration-500">PS</span>
          </div>
          <div className="flex flex-col leading-none">
            <span className={`font-serif text-lg tracking-widest transition-colors duration-500 ${overDarkHero ? 'text-white' : 'text-obsidian-900 dark:text-white'}`}>
              PINAR DEL SOL
            </span>
            <span className="text-gold-400 text-[10px] tracking-[0.3em] uppercase">Inmobiliaria & Desarrollos</span>
          </div>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((item) => {
            if (item.isDropdown) {
              return (
                <div key="propiedades" ref={dropdownRef} className="relative">
                  <button
                    onClick={() => setDropdownOpen((o) => !o)}
                    className={`${baseLinkClass} ${textColor(isDropdownActive)} flex items-center gap-1.5`}
                  >
                    {item.label}
                    <ChevronIcon open={dropdownOpen} />
                    <span className={`${underline} ${isDropdownActive ? 'w-full' : 'w-0'}`} />
                  </button>

                  {/* Panel del dropdown */}
                  <div
                    className={`absolute top-full left-1/2 -translate-x-1/2 mt-3 w-56 transition-all duration-200 ${
                      dropdownOpen ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 -translate-y-1 pointer-events-none'
                    }`}
                  >
                    {/* Triángulo decorativo */}
                    <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-white dark:bg-obsidian-800 border-l border-t border-marble-200 dark:border-white/10 rotate-45" />

                    <div className="relative bg-white dark:bg-obsidian-800 border border-marble-200 dark:border-white/10 shadow-xl dark:shadow-black/40 py-2 overflow-hidden">
                      {item.children!.map((child, i) => (
                        <Link
                          key={child.to}
                          to={child.to}
                          className={`block px-5 py-3 text-xs tracking-widest uppercase transition-colors duration-200 hover:bg-marble-50 dark:hover:bg-obsidian-700/50 hover:text-gold-500 dark:hover:text-gold-400 ${
                            location.pathname === child.to
                              ? 'text-gold-500 dark:text-gold-400 bg-marble-50 dark:bg-obsidian-700/30'
                              : 'text-obsidian-600 dark:text-marble-300'
                          } ${i < item.children!.length - 1 && i === 2 ? 'border-b border-marble-100 dark:border-white/5 mb-1 pb-4' : ''}`}
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              )
            }

            if (item.isPage) {
              return (
                <Link key={item.to} to={item.to!} className={`${baseLinkClass} ${textColor(location.pathname === item.to)}`}>
                  {item.label}
                  <span className={`${underline} ${location.pathname === item.to ? 'w-full' : 'w-0'}`} />
                </Link>
              )
            }

            return (
              <a key={item.to} href={item.to} className={`${baseLinkClass} ${textColor(false)}`}>
                {item.label}
                <span className={`${underline} w-0`} />
              </a>
            )
          })}
        </nav>

        {/* Right side: theme toggle + CTA + hamburger */}
        <div className="flex items-center gap-3">
          {/* Theme toggle */}
          <button
            onClick={toggleTheme}
            aria-label={isDark ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
            className="w-9 h-9 relative flex items-center justify-center border transition-all duration-300 text-gold-400 border-gold-400/40 hover:border-gold-400 hover:bg-gold-400/10"
            title={isDark ? 'Modo claro' : 'Modo oscuro'}
          >
            <span className={`absolute transition-all duration-300 ${isDark ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 rotate-90 scale-75'}`}>
              <SunIcon />
            </span>
            <span className={`absolute transition-all duration-300 ${!isDark ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 -rotate-90 scale-75'}`}>
              <MoonIcon />
            </span>
          </button>

          {/* CTA */}
          <a
            href="#contacto"
            className="hidden md:inline-flex items-center gap-2 border border-gold-400 text-gold-400 hover:bg-gold-400 hover:text-obsidian-900 text-sm tracking-widest uppercase px-5 py-2 transition-all duration-300 font-medium"
          >
            Consultar
          </a>

          {/* Mobile hamburger */}
          <button
            className="md:hidden flex flex-col gap-1.5 p-2"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menú"
          >
            <span className={`block w-6 h-px bg-gold-400 transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
            <span className={`block w-6 h-px bg-gold-400 transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
            <span className={`block w-6 h-px bg-gold-400 transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`md:hidden overflow-hidden transition-all duration-500 ${menuOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}>
        <nav className="backdrop-blur-md px-6 py-4 flex flex-col gap-1 border-t border-gold-400/20 bg-marble-100/95 dark:bg-obsidian-800/95">
          {navLinks.map((item) => {
            if (item.isDropdown) {
              return (
                <div key="propiedades-mobile">
                  <button
                    onClick={() => setMobileDropdownOpen((o) => !o)}
                    className="w-full flex items-center justify-between text-obsidian-700 dark:text-marble-300 hover:text-gold-500 dark:hover:text-gold-400 text-sm tracking-wider uppercase transition-colors duration-300 py-2"
                  >
                    {item.label}
                    <ChevronIcon open={mobileDropdownOpen} />
                  </button>

                  <div className={`overflow-hidden transition-all duration-300 ${mobileDropdownOpen ? 'max-h-60 opacity-100' : 'max-h-0 opacity-0'}`}>
                    <div className="pl-4 flex flex-col gap-1 border-l border-gold-400/20 ml-2 mt-1 mb-2">
                      {item.children!.map((child) => (
                        <Link
                          key={child.to}
                          to={child.to}
                          className={`text-xs tracking-widest uppercase py-2 transition-colors duration-300 ${
                            location.pathname === child.to
                              ? 'text-gold-500 dark:text-gold-400'
                              : 'text-obsidian-500 dark:text-marble-400 hover:text-gold-500 dark:hover:text-gold-400'
                          }`}
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              )
            }

            if (item.isPage) {
              return (
                <Link
                  key={item.to}
                  to={item.to!}
                  className="text-obsidian-700 dark:text-marble-300 hover:text-gold-500 dark:hover:text-gold-400 text-sm tracking-wider uppercase transition-colors duration-300 py-2"
                >
                  {item.label}
                </Link>
              )
            }

            return (
              <a
                key={item.to}
                href={item.to}
                className="text-obsidian-700 dark:text-marble-300 hover:text-gold-500 dark:hover:text-gold-400 text-sm tracking-wider uppercase transition-colors duration-300 py-2"
              >
                {item.label}
              </a>
            )
          })}
        </nav>
      </div>
    </header>
  )
}
