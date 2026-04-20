import { Navbar } from '../components/Navbar'
import { HeroCarousel } from '../components/HeroCarousel'
import { About } from '../components/About'
import { Footer } from '../components/Footer'

export function HomePage() {
  return (
    <div className="min-h-screen bg-marble-100 dark:bg-obsidian-900 transition-colors duration-300">
      <Navbar />
      <main>
        <HeroCarousel />
        <About />
      </main>
      <Footer />
    </div>
  )
}
