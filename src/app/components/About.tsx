const stats = [
  { value: '20+', label: 'Años de trayectoria' },
  { value: '500+', label: 'Familias acompañadas' },
  { value: '12', label: 'Barrios desarrollados' },
  { value: '3.000+', label: 'Lotes comercializados' },
]

const values = [
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    title: 'Confianza',
    desc: 'Cada operación respaldada por años de experiencia y cientos de clientes satisfechos.',
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    ),
    title: 'Desarrollo Integral',
    desc: 'Desde el diseño del barrio hasta la llave de tu casa, somos tu único interlocutor.',
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    title: 'Ubicaciones Estratégicas',
    desc: 'Seleccionamos cada predio con criterios de valorización y calidad de vida.',
  },
]

export function About() {
  return (
    <section id="nosotros" className="bg-marble-50 dark:bg-obsidian-900 py-24 md:py-32 transition-colors duration-300">
      {/* Stats bar */}
      <div className="border-y border-marble-300 dark:border-gold-400/20 bg-marble-200/50 dark:bg-obsidian-800/40 mb-24 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="font-serif text-4xl md:text-5xl text-gradient-gold mb-2">{stat.value}</p>
              <p className="text-obsidian-600/60 dark:text-marble-400 text-xs tracking-widest uppercase transition-colors duration-300">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16 items-center mb-24">
          {/* Text */}
          <div>
            <span className="text-gold-500 dark:text-gold-400 text-xs tracking-[0.4em] uppercase mb-4 block transition-colors duration-300">Nuestra Historia</span>
            <h2 className="font-serif text-4xl md:text-5xl text-obsidian-900 dark:text-white leading-tight mb-8 transition-colors duration-300">
              Más de dos décadas<br />
              <span className="text-gradient-gold">construyendo sueños</span>
            </h2>
            <div className="space-y-5 text-obsidian-700/70 dark:text-marble-400 leading-relaxed font-light transition-colors duration-300">
              <p>
                Pinar del Sol nació con una visión clara: democratizar el acceso a barrios de calidad, donde las familias puedan vivir en entornos seguros, verdes y bien planificados.
              </p>
              <p>
                Lo que comenzó como un pequeño emprendimiento familiar en la región se transformó, con los años, en una de las inmobiliarias y desarrolladoras más reconocidas del sector. Hoy gestionamos proyectos de distinta escala, desde lotes individuales hasta urbanizaciones completas.
              </p>
              <p>
                Nuestra fortaleza radica en la integración vertical: diseñamos, financiamos, construimos y comercializamos. Ese control total nos permite garantizar estándares que otras empresas simplemente no pueden ofrecer.
              </p>
            </div>
            <a
              href="#contacto"
              className="mt-10 inline-flex items-center gap-3 text-gold-500 dark:text-gold-400 hover:text-gold-600 dark:hover:text-gold-300 text-sm tracking-widest uppercase font-medium transition-colors duration-300 group"
            >
              Conocé más sobre nosotros
              <svg className="w-4 h-4 transition-transform group-hover:translate-x-1 duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>

          {/* Visual panel */}
          <div className="relative">
            <div
              className="relative h-96 md:h-[500px] overflow-hidden"
              style={{
                background: 'linear-gradient(135deg, #e8e8e8 0%, #d0d0d0 30%, #b0b0b0 60%, #e0e0e0 100%)',
              }}
            >
              <div
                className="absolute inset-0 opacity-60"
                style={{
                  backgroundImage: `
                    repeating-linear-gradient(125deg, transparent, transparent 30px, rgba(255,255,255,0.5) 30px, rgba(255,255,255,0.5) 31px),
                    repeating-linear-gradient(55deg, transparent, transparent 60px, rgba(0,0,0,0.05) 60px, rgba(0,0,0,0.05) 61px)
                  `,
                }}
              />
              <div
                className="absolute inset-0"
                style={{ background: 'radial-gradient(ellipse at 70% 30%, rgba(212,175,55,0.15) 0%, transparent 60%)' }}
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <p className="font-serif text-6xl text-obsidian-900/20 font-bold tracking-widest">1998</p>
                  <div className="w-16 h-px bg-gold-500 mx-auto my-4" />
                  <p className="font-serif text-lg text-obsidian-700/60 tracking-[0.3em] uppercase">Fundación</p>
                </div>
              </div>
            </div>

            {/* Floating card */}
            <div className="absolute -bottom-6 -left-6 bg-white dark:bg-obsidian-900 border border-marble-300 dark:border-gold-400/30 p-6 max-w-xs shadow-2xl transition-colors duration-300">
              <p className="text-gold-500 dark:text-gold-400 font-serif text-lg mb-1">"La tierra es el único activo que nunca pierde valor."</p>
              <p className="text-obsidian-500 dark:text-marble-400 text-xs tracking-widest uppercase transition-colors duration-300">— Fundadores, Pinar del Sol</p>
            </div>

            <div className="absolute -top-4 -right-4 w-24 h-24 border-t-2 border-r-2 border-gold-400/40" />
          </div>
        </div>

        {/* Values */}
        <div className="grid md:grid-cols-3 gap-8">
          {values.map((v) => (
            <div
              key={v.title}
              className="border border-marble-300 dark:border-white/5 hover:border-gold-400/50 dark:hover:border-gold-400/30 bg-white dark:bg-obsidian-800/30 hover:bg-marble-50 dark:hover:bg-obsidian-800/60 p-8 transition-all duration-500 group shadow-sm dark:shadow-none"
            >
              <div className="w-12 h-12 border border-gold-400/30 group-hover:border-gold-400 flex items-center justify-center text-gold-500 dark:text-gold-400 mb-6 transition-colors duration-300">
                {v.icon}
              </div>
              <h3 className="font-serif text-xl text-obsidian-900 dark:text-white mb-3 transition-colors duration-300">{v.title}</h3>
              <p className="text-obsidian-600/70 dark:text-marble-400 text-sm leading-relaxed font-light transition-colors duration-300">{v.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
