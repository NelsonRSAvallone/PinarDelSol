import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useTheme } from '../context/ThemeContext'

interface NavItem {
  label: string
  to: string        // ruta React Router (/barrios) o anchor del home (#inicio)
  isPage: boolean   // true = navega a una página, false = anchor en el home
}

const navLinks: NavItem[] = [
  { label: 'Inicio',   to: '/',         isPage: true  },
  { label: 'Barrios',  to: '/barrios',  isPage: true  },
  { label: 'Lotes',    to: '#lotes',    isPage: false },
  { label: 'Casas',    to: '#casas',    isPage: false },
  { label: 'Nosotros', to: '#nosotros', isPage: false },
  { label: 'Contacto', to: '#contacto', isPage: false },
]

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

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const { theme, toggleTheme } = useTheme()
  const location = useLocation()
  const isDark = theme === 'dark'

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Cierra el menú mobile al cambiar de ruta
  useEffect(() => {
    setMenuOpen(false)
  }, [location.pathname])

  const linkClasses = (to: string) => {
    const isActive = location.pathname === to
    // Cuando no hay scroll, el navbar es transparente sobre el carousel (siempre oscuro)
    // → texto siempre blanco. Cuando hay scroll, se aplican colores según el tema.
    const textColor = isActive
      ? 'text-gold-500'
      : scrolled
        ? 'text-obsidian-600 dark:text-marble-300 hover:text-gold-500 dark:hover:text-gold-400'
        : 'text-marble-100 hover:text-gold-400'
    return `text-sm tracking-wider uppercase transition-colors duration-300 relative group ${textColor}`
  }

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
            <span className={`font-serif text-lg tracking-widest transition-colors duration-500 ${scrolled ? 'text-obsidian-900 dark:text-white' : 'text-white'}`}>
              PINAR DEL SOL
            </span>
            <span className="text-gold-400 text-[10px] tracking-[0.3em] uppercase">Inmobiliaria & Desarrollos</span>
          </div>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((item) =>
            item.isPage ? (
              <Link key={item.to} to={item.to} className={linkClasses(item.to)}>
                {item.label}
                <span className={`${underline} ${location.pathname === item.to ? 'w-full' : 'w-0'}`} />
              </Link>
            ) : (
              <a key={item.to} href={item.to} className={linkClasses('')}>
                {item.label}
                <span className={`${underline} w-0`} />
              </a>
            )
          )}
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
      <div className={`md:hidden overflow-hidden transition-all duration-500 ${menuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
        <nav className="backdrop-blur-md px-6 py-4 flex flex-col gap-4 border-t border-gold-400/20 bg-marble-100/95 dark:bg-obsidian-800/95">
          {navLinks.map((item) =>
            item.isPage ? (
              <Link
                key={item.to}
                to={item.to}
                className="text-obsidian-700 dark:text-marble-300 hover:text-gold-500 dark:hover:text-gold-400 text-sm tracking-wider uppercase transition-colors duration-300 py-1"
              >
                {item.label}
              </Link>
            ) : (
              <a
                key={item.to}
                href={item.to}
                className="text-obsidian-700 dark:text-marble-300 hover:text-gold-500 dark:hover:text-gold-400 text-sm tracking-wider uppercase transition-colors duration-300 py-1"
              >
                {item.label}
              </a>
            )
          )}
        </nav>
      </div>
    </header>
  )
}
