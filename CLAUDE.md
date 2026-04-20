# Mi Proyecto Web

## Stack tecnológico
- Frontend: React + Tailwind CSS
- Backend: Node.js + Express
- Base de datos: PostgreSQL con Prisma
- Testing: Vitest

## Estructura de archivos
- `src/app/` — componentes y páginas
- `src/api/` — rutas del backend
- `src/db/` — esquemas y migraciones
- `src/tests/` — pruebas

## Convenciones
- Usar named exports, no default exports
- Componentes funcionales con hooks
- async/await, nunca .then() en cadena
- Variables y comentarios en español

## Reglas importantes
- NO modificar archivos en `prisma/migrations/` directamente
- NO instalar dependencias sin mencionarlo en la respuesta
- Siempre correr el linter antes de considerar una tarea lista

## Comandos útiles
- `npm run dev` — servidor de desarrollo
- `npm run test` — correr pruebas
- `npm run lint` — verificar código
