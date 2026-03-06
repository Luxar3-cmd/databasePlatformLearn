# Retrospective: BDD Lab UTFSM

## Milestone: v1.0 — BDD Lab UTFSM MVP

**Shipped:** 2026-03-06
**Phases:** 5 | **Plans:** 14

### What Was Built

- Shell React 19 + Vite + Tailwind v4 con sidebar de 6 unidades y dark mode profesional
- BD universitaria UTFSM (5 tablas, ~30 registros) + editor SQL con CodeMirror 6 + AlaSQL
- Contenido Unidad 1 completo: 4 temas con definiciones, tablas comparativas, ejemplos de vida real (UTFSM, Spotify, Netflix, Falabella)
- Quiz 13 preguntas con shuffle Fisher-Yates, Cheat Sheet con sticky nav, 8 ejercicios resueltos con reveal secuencial
- Deploy a Vercel con SPA routing via `vercel.json` rewrites, 5 rutas verificadas sin 404

### What Worked

- **Arquitectura modular desde dia 1:** El patron `SectionPage` con branches condicionales por `unitId + sectionId` permitio agregar Conceptos, Editor, Ejercicios, Quiz, Cheat Sheet sin tocar el layout ni la navegacion.
- **AlaSQL 4.x compatible sin config:** No requirio `optimizeDeps.include` en Vite 7 — el riesgo tecnico principal de Fase 2 se resolvio solo.
- **Contenido en TSX estatico:** Evito agregar un parser de Markdown, mantuvo control total del layout por seccion, y resulto mas rapido de escribir para contenido rico (tablas, callouts, snippets).
- **Fisher-Yates con `{ text, isCorrect }`:** Patron robusto que evita el bug critico de `correctIndex` stale post-shuffle desde el primer intento.
- **Deployment Vercel sin CI/CD:** Para un proyecto de ayudantia universitaria, deploy manual con `vercel --prod` es lo correcto — cero overhead.

### What Was Inefficient

- **Phase 02.1 insertada urgentemente:** Los ejemplos de vida real deberian haber sido parte del plan original de Conceptos — la insercion decimal agrego overhead de planificacion.
- **Nombre del proyecto Vercel:** El wizard uso el nombre del directorio (`database-platform-learn`) en lugar del nombre planeado (`db-platform-u1`). Una linea en `vercel.json` con `"name"` habria evitado la discrepancia con el README.
- **SUMMARYs sin one-liners:** Los archivos SUMMARY.md no tienen campo `one_liner` valido — el summary-extract no pudo extraerlos. Deberia documentarse en el template para fases futuras.

### Patterns Established

- `SectionPage` branch pattern: `unit.id === 'u1' && section.id === 'quiz'` → renderizar componente especializado. Patron a seguir para U2+.
- Contenido en archivos separados: `concepts.tsx`, `quiz.ts`, `exercises.ts`, `cheatsheet.tsx`, `solvedExercises.ts` — pure data, componentes son pure renderers.
- `initDb()` en cada componente que use SQL — cubre navegacion directa sin pasar por EditorSection.
- `top-[57px]` para sticky elements bajo el header AppLayout.

### Key Lessons

- **Decimal phases para insercion urgente:** Phase 2.1 funciono bien — el numerado decimal es claro y no rompe la numeracion de fases posteriores.
- **Verificacion humana en deploy:** Los checkpoints de tipo `human-action` y `human-verify` en la ejecucion de deploy son correctos — no automatizar lo que requiere auth interactiva.
- **Build verifica tipos:** `tsc -b && vite build` como paso de verificacion en cada plan evito bugs de TypeScript en produccion.

### Cost Observations

- Model mix: 100% claude-sonnet-4-6
- Sessions: ~6-8 sesiones a lo largo de 5 dias
- Notable: Fases 1-3 ejecutadas en sesiones cortas (3-15 min por plan). Fase 4 requirio interaccion humana para el deploy interactivo.

---

## Cross-Milestone Trends

| Metric | v1.0 |
|--------|------|
| Fases | 5 |
| Planes | 14 |
| LOC TypeScript | 3,696 |
| Dias | 5 |
| Commits | 64 |
| Req completados | 36/36 |
