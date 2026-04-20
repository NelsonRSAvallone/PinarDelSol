# Pinar Del Sol — Sitio Web Corporativo

Sitio web para **Pinar Del Sol**, inmobiliaria y desarrolladora de propiedades. Construido con React + TypeScript + Tailwind CSS (Vite).

---

## Historial de cambios

### [cc28f82] Página Principal con dark/light mode
**Fecha:** 20 de abril de 2026

Primera versión completa de la página de inicio. Incluye sistema de temas con toggle sol/luna, tests para todos los componentes, y corrección de bugs encontrados durante el testing.

**Componentes creados:**
- `src/app/components/Navbar.tsx` — Barra de navegación fija con efecto scroll, menú mobile colapsable, y botón toggle de tema (sol/luna) animado arriba a la derecha.
- `src/app/components/HeroCarousel.tsx` — Carrusel de 4 slides a pantalla completa con avance automático cada 5 segundos, pausa al hacer hover, flechas de navegación, dots y contador de slides.
- `src/app/components/About.tsx` — Sección de historia e información: barra de estadísticas (20+ años, 500+ familias, 12 barrios, 3000+ lotes), texto histórico, panel de mármol decorativo con año de fundación (1998), y 3 tarjetas de valores (Confianza, Desarrollo Integral, Ubicaciones Estratégicas).
- `src/app/components/Footer.tsx` — Pie de página con bloque CTA de contacto (siempre oscuro), links organizados por categoría (La Empresa, Proyectos, Servicios), redes sociales y copyright.
- `src/app/pages/HomePage.tsx` — Página principal que compone todos los componentes.
- `src/app/context/ThemeContext.tsx` — Context de React para gestionar el tema global (dark/light). Agrega/remueve la clase `dark` en `<html>`.

**Sistema de temas:**
- Modo oscuro por defecto (negro obsidiana `#0a0a0a`, dorado `#d4af37`, mármol gris/blanco).
- Modo claro activable con el botón: fondos blancos y mármol `#f5f5f5`, texto oscuro.
- El carrusel hero y el bloque CTA del footer se mantienen siempre oscuros.
- Implementado con `darkMode: 'class'` de Tailwind y prefijos `dark:` en todos los componentes.

**Paleta de colores definida en `tailwind.config.js`:**
- `gold` (300–700): tonos dorados para acentos y decoración.
- `marble` (50–400): grises claros tipo mármol para modo claro.
- `obsidian` (400–900): negros profundos para modo oscuro.
- Tipografía: Playfair Display (serif, títulos) + Inter (sans, cuerpo), importadas desde Google Fonts.

**Bug corregido:**
- `HomePage.tsx` tenía `bg-obsidian-900` hardcodeado, lo que tapaba todo el sistema de temas. Corregido a `bg-marble-100 dark:bg-obsidian-900`.
- La animación del ícono sol/luna usaba `absolute` dinámico que no transicionaba. Corregido a ambos íconos siempre `absolute` dentro de un contenedor `relative`.
- `HeroCarousel`: `animating` era `useState` con stale closure en `goTo`. Reemplazado por `useRef` para lectura inmediata del valor actual.

**Testing — 35 tests, todos en verde:**

| Archivo | Tests |
|---|---|
| `src/tests/ThemeContext.test.tsx` | 5 tests — toggle, clase `dark` en `<html>`, ida y vuelta |
| `src/tests/Navbar.test.tsx` | 8 tests — logo, links, toggle aria-label, clase dark en documento |
| `src/tests/About.test.tsx` | 7 tests — estadísticas, valores, año de fundación, ancla de navegación |
| `src/tests/HeroCarousel.test.tsx` | 15 tests — slides, flechas, dots, autoavance, pausa en hover, guard de animación |

---

### [97ec88b] Setup: configuración multi-agente de Claude Code
**Fecha:** 20 de abril de 2026

Configuración del entorno de trabajo con Claude Code, incluyendo agentes especializados y comandos personalizados.

**Archivos creados:**
- `CLAUDE.md` — Documentación del proyecto para Claude: stack, estructura de archivos, convenciones de código, reglas importantes y comandos.
- `.claudeignore` — Exclusiones para que Claude no lea archivos innecesarios (`node_modules/`, `.env`, `dist/`, `build/`, `*.log`).
- `.claude/agents/orchestrator.md` — Agente líder técnico. Analiza requerimientos, descompone tareas, coordina el equipo y revisa coherencia del resultado final.
- `.claude/agents/designer.md` — Agente especialista en frontend, React, Tailwind CSS y UI/UX.
- `.claude/agents/database.md` — Agente especialista en base de datos, Prisma ORM, esquemas y migraciones.
- `.claude/agents/tester.md` — Agente especialista en testing con Vitest y React Testing Library.
- `.claude/commands/nueva-feature.md` — Comando personalizado `/nueva-feature` que coordina a todos los agentes para implementar una feature completa.

---

### [163b1d7] Initial commit
**Fecha:** 20 de abril de 2026

Commit inicial del repositorio con estructura base del proyecto.

---

## Stack tecnológico

- **Frontend:** React 18 + TypeScript
- **Build tool:** Vite 5
- **Estilos:** Tailwind CSS v3 (dark mode por clase)
- **Tipografía:** Playfair Display + Inter (Google Fonts)
- **Testing:** Vitest + React Testing Library + jsdom

## Comandos

```bash
npm install        # instalar dependencias (primera vez)
npm run dev        # servidor de desarrollo → http://localhost:5173
npm run build      # build de producción
npm run preview    # preview del build
npm run test       # tests en modo watch
npm run test -- --run   # tests una sola vez
npm run lint       # linter
```

## Próximos pasos planeados

- Sección de Barrios con cards y filtros
- Sección de Lotes en venta
- Sección de Casas y desarrollos propios
- Página de detalle de propiedad
- Formulario de contacto funcional
- Base de datos PostgreSQL con Prisma
