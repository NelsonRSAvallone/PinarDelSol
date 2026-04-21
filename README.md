# Pinar Del Sol — Sitio Web Corporativo

Sitio web para **Pinar Del Sol**, inmobiliaria y desarrolladora de propiedades. Construido con React + TypeScript + Tailwind CSS (Vite).

---

## Historial de cambios

### [038f669] Modal "Creación de Propiedad" + filtro de precio + dropdown Propiedades en navbar
**Fecha:** 21 de abril de 2026

Múltiples features sobre las páginas de listado de propiedades.

**Archivos creados:**
- `src/app/components/NuevaPropiedadModal.tsx` — Modal de formulario con campos dinámicos según tipo:
  - Campos comunes: Tipo (Lote/Casa), Nombre, Barrio, Precio USD.
  - Solo Lote: Metros del lote.
  - Solo Casa: Metros del lote + Metros cubiertos + Piezas (1–10) + Baños (1–10).
  - Validación de obligatorios con mensajes de error inline. Cierra con Escape, click en backdrop o Cancelar.
  - Barrio hardcodeado (marcado con TODO para conectar a base de datos).
- `src/app/components/PrecioFilter.tsx` — Botón que despliega panel con inputs Desde/Hasta (USD). La filtración se ejecuta solo al presionar Aplicar. Muestra punto dorado indicador cuando el filtro está activo. Botón ✕ para limpiar.
- `src/app/pages/PropiedadesPage.tsx` — Catálogo unificado de lotes y casas. Filtra por tipo (Todas/Lotes/Casas), barrio y rango de precio. Stats: total, lotes, casas, ubicación.

**Archivos modificados:**
- `src/app/components/Navbar.tsx` — Menú desplegable "Propiedades" (click) reemplaza los links individuales. Contiene: Barrios, Lotes, Casas, Todas las propiedades. Desktop: panel flotante con triángulo decorativo y cierre por click fuera. Mobile: sección expandible en el menú hamburguesa. El botón muestra subrayado dorado activo cuando la ruta actual es cualquiera de las 4 opciones.
- `src/app/pages/LotesPage.tsx` — Agrega PrecioFilter, botón "Nueva Propiedad" (antes "Nuevo Lote") que abre el modal pre-seleccionando tipo Lote.
- `src/app/pages/CasasPage.tsx` — Agrega PrecioFilter, botón "Nueva Propiedad" (antes "Nueva Casa") que abre el modal pre-seleccionando tipo Casa.
- `src/App.tsx` — Agrega ruta `/propiedades`.
- `src/tests/Navbar.test.tsx` — Tests actualizados para la nueva estructura del navbar con dropdown (36 tests en verde).

**Datos hardcodeados en PropiedadesPage:**
- Mismos 3 lotes de LotesPage + mismas 3 casas de CasasPage.

---

### [4815e8a] Páginas Lotes y Casas con filtro por barrio
**Fecha:** 21 de abril de 2026

**Archivos creados:**
- `src/app/pages/LotesPage.tsx` — Listado de lotes con dropdown de filtro por barrio y botón admin.
- `src/app/pages/CasasPage.tsx` — Listado de casas con dropdown de filtro por barrio y botón admin.
- `src/app/components/LoteCard.tsx` — Card premium: número decorativo, badge de estado (disponible/reservado/vendido), superficie, precio USD, link "Ver lote".
- `src/app/components/CasaCard.tsx` — Card premium: badge de estado (disponible/en construccion/vendido), iconos dormitorios/baños/superficie en fila, precio USD, link "Ver casa".

**Archivos modificados:**
- `src/App.tsx` — Rutas `/lotes` y `/casas`.
- `src/app/components/Navbar.tsx` — Lotes y Casas cambiaron de anchors a rutas de página.

**Datos hardcodeados:**

| Tipo | Nombre | Barrio | Superficie | Precio | Estado |
|---|---|---|---|---|---|
| Lote | Lote 12 | Pinar 1 | 300 m² | $45.000 | disponible |
| Lote | Lote 07 | Pinar 2 | 450 m² | $62.000 | disponible |
| Lote | Lote 23 | Pinar 3 | 380 m² | $55.000 | reservado |
| Casa | Roble | Pinar 1 | 120 m² / 3d 2b | $180.000 | disponible |
| Casa | Cedro | Pinar 2 | 150 m² / 4d 2b | $220.000 | disponible |
| Casa | Alerce | Pinar 3 | 180 m² / 4d 3b | $280.000 | en construcción |

**Bugs corregidos:**
- Navbar en modo claro sobre páginas sin hero oscuro mostraba texto blanco invisible. Corregido: texto blanco solo cuando `pathname === '/'` y sin scroll (carousel siempre oscuro). En otras páginas aplica colores según el tema.
- Tests del Navbar actualizados para incluir `MemoryRouter` (requerido por `useLocation`).

---

### [pendiente] Página de Barrios + React Router
**Fecha:** 21 de abril de 2026

Se incorporó navegación multi-página con React Router y se creó la primera página secundaria: el listado de Barrios.

**Dependencia instalada:**
- `react-router-dom` — enrutamiento del lado del cliente.

**Archivos creados:**
- `src/app/pages/BarriosPage.tsx` — Página completa de barrios con header, stats rápidas (total de barrios, lotes y ubicación), grid de cards y botón "Nuevo Barrio" (acción de administrador).
- `src/app/components/BarrioCard.tsx` — Card por barrio con: número decorativo, badge "Barrio", nombre en serif, ubicación con ícono de pin, cantidad de lotes disponibles, franja dorada animada al hover y link "Ver barrio".

**Archivos modificados:**
- `src/App.tsx` — Incorpora `HashRouter` con rutas: `/` (HomePage) y `/barrios` (BarriosPage). Se usa `HashRouter` (URLs tipo `/#/barrios`) para compatibilidad total con GitHub Pages estático sin configuración de servidor.
- `src/app/components/Navbar.tsx` — Links de página usan `Link` de React Router con estado activo (subrayado dorado cuando la ruta coincide). Links de secciones del home mantienen `href` con anchor. El logo navega con `Link`. El menú mobile se cierra automáticamente al cambiar de ruta.

**Datos hardcodeados (temporales):**

| Barrio | Ubicación | Lotes |
|---|---|---|
| Pinar 1 | Maipú | 48 |
| Pinar 2 | Maipú | 64 |
| Pinar 3 | Maipú | 80 |

**Deploy:**
- `vite.config.ts` — `outDir: 'docs'` y `base: '/PinarDelSol/'` para que GitHub Pages sirva el build desde la carpeta `docs/` de la rama `main`.
- `docs/` — Carpeta de build commiteada al repo. Se regenera con `npm run build` antes de cada push que deba reflejarse en producción.
- `.gitignore` — Se agregó `dist/` para que la carpeta de build local anterior no se trackee.

---

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

- Página de detalle de barrio (`/barrios/:id`)
- Página de detalle de propiedad (`/lotes/:id`, `/casas/:id`)
- Conectar modal "Creación de Propiedad" a estado global / backend
- Reemplazar barrios hardcodeados en el modal por fetch a base de datos
- Formulario de contacto funcional
- Sistema de autenticación para el panel de administrador (botones admin visibles solo para admins)
- Base de datos PostgreSQL con Prisma
- Conectar cards de lotes/casas/barrios con datos reales de la base de datos
