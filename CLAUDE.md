# Pinar Del Sol — Sitio Web Corporativo

## Sobre el proyecto
Sitio web para **Pinar Del Sol**, inmobiliaria que también desarrolla y construye 
propiedades. El sitio debe transmitir confianza, exclusividad y solidez.

## Servicios que ofrece la empresa
- Venta de propiedades (casas, terrenos, departamentos)
- Alquiler de propiedades
- Desarrollo y construcción de viviendas propias
- Asesoramiento inmobiliario

## Público objetivo
Personas que buscan comprar, alquilar o invertir en propiedades. 
Perfil de nivel medio-alto. Valoran la seriedad, la estética y la claridad.

## Stack tecnológico
- Framework: Next.js 14 (App Router)
- Estilos: Tailwind CSS v3
- Lenguaje: TypeScript
- Base de datos: PostgreSQL con Prisma
- ORM: Prisma
- Testing: Vitest + React Testing Library

## Estructura de archivos
- `src/app/` — páginas y layouts (App Router)
- `src/components/` — componentes reutilizables
- `src/components/ui/` — componentes base (botones, cards, inputs)
- `src/lib/` — utilidades y helpers
- `src/db/` — esquemas Prisma y queries
- `src/types/` — tipos TypeScript compartidos
- `public/` — imágenes y assets estáticos

## Páginas planeadas
- `/` — Home (hero, servicios destacados, propiedades featured, CTA)
- `/propiedades` — Listado con filtros (tipo, precio, ubicación)
- `/propiedades/[id]` — Detalle de propiedad con galería y contacto
- `/desarrollos` — Proyectos propios de construcción
- `/nosotros` — Historia y equipo de Pinar Del Sol
- `/contacto` — Formulario y datos de contacto

## Convenciones de código
- Named exports siempre, nunca `export default`
- Componentes funcionales con hooks
- `async/await`, nunca `.then()` en cadena
- Interfaces TypeScript para todas las props y modelos
- Comentarios en español

## Comandos
- `npm run dev` — servidor local
- `npm run build` — build de producción
- `npm run test` — tests
- `npm run lint` — linter

## Reglas importantes
- NO modificar archivos en `prisma/migrations/` directamente
- NO instalar dependencias sin mencionarlo en la respuesta
- Siempre correr lint antes de dar una tarea por terminada
- Las imágenes de propiedades van en `public/properties/`