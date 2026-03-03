---
gsd_state_version: 1.0
milestone: v1.0
milestone_name: milestone
status: unknown
last_updated: "2026-03-03T02:15:32.875Z"
progress:
  total_phases: 3
  completed_phases: 2
  total_plans: 10
  completed_plans: 9
---

# Project State

## Project Reference

See: .planning/PROJECT.md (updated 2026-03-02)

**Core value:** Los estudiantes practican SQL y se autoevaluan sobre INF-239 directamente en el browser, sin instalar nada
**Current focus:** Phase 3 — proxima fase (Phase 2 completa)

## Current Position

Phase: 02.1 (Ejemplos Didacticos Vida Real para Conceptos U1) — COMPLETE
Plan: 1 of 1 in current phase — COMPLETE
Status: Phase 02.1 complete
Last activity: 2026-03-03 — Plan 02.1-01 completado: 7 Callout examples en Topic11 y Topic12 con escenarios UTFSM y empresas tech (Spotify, Netflix, banco)

Progress: [██████████] 90% (Phase 02.1 complete, Phase 03 pendiente)

## Performance Metrics

**Velocity:**
- Total plans completed: 3
- Average duration: ~30 min
- Total execution time: ~90 min

**By Phase:**

| Phase | Plans | Total | Avg/Plan |
|-------|-------|-------|----------|
| 01-fundacion | 3/3 | ~90 min | ~30 min |
| 02-contenido-u1-y-editor-sql | 3/5 | ~16 min | ~5 min |

**Recent Trend:**
- Last 5 plans: 01-02, 01-03, 02-01, 02-02, 02-03
- Trend: Fase 2 en progreso

*Updated after each plan completion*
| Phase 02 P05 | 5 | 2 tasks | 0 files |
| Phase 02.1-ejemplos-didacticos-vida-real-para-conceptos-u1 P01 | 3 | 2 tasks | 1 files |

## Accumulated Context

### Decisions

Decisions are logged in PROJECT.md Key Decisions table.
Recent decisions affecting current work:

- [Init]: AlaSQL como motor SQL en browser (sin backend)
- [Init]: Arquitectura modular — contenido en archivos de datos, componentes son pure renderers
- [Research]: Usar CodeMirror 6 via @uiw/react-codemirror (no Monaco — bundle demasiado grande)
- [Research]: Schema AlaSQL debe validarse primero — reserved keywords rompen schemas validos
- [01-01]: Fontsource sobre Google Fonts CDN — self-hosted, sin dependencia externa
- [01-01]: @custom-variant dark en CSS (Tailwind v4 — no existe tailwind.config.js)
- [01-01]: SectionId literal type en UnitSection.id para type-safety en rutas
- [01-02]: App.tsx vaciado — RouterProvider en main.tsx elimina componente App raiz
- [01-02]: Mapa de iconos estatico en SidebarUnit — NO dynamic import de lucide (bundle control)
- [01-02]: expanded default !unit.locked — U1 arranca expandida automaticamente
- [01-03]: Mapa SectionId->descripcion inline en SectionPage — 5 strings no justifican archivo separado
- [01-03]: onCloseMobile siempre llamado al navegar — en desktop isOpen no afecta al sidebar fijo
- [01-03]: PlaceholderSection usa mapa de iconos existente de SidebarUnit — sin duplicacion
- [02-01]: alasql incluye tipos TS propios (types/alasql.d.ts) — no se necesita @types/alasql
- [02-01]: Schema universitario en schema.ts separado — alasql.tables interno no documentado en 4.x
- [02-01]: initialized flag en sql.ts — multiples useEffect no re-seedean la BD
- [02-01]: vite.config.ts no requirio optimizeDeps.include — alasql 4.x compatible con Vite 7
- [02-02]: useSqlEngine usa estado local (no Context) — editor es instancia unica, Context seria over-engineering
- [02-02]: Botones consultas rapidas ejecutan al instante — setQuery + execute en una llamada
- [02-02]: SectionPage branch condicional (unit.id + sectionData.id) — patron a seguir para futuros componentes especializados
- [02-03]: Contenido en TSX estatico (no markdown) — control total del layout por seccion sin parser adicional
- [02-03]: ScrollIntoView via ref en ConceptsSection — smooth scroll al inicio del panel al cambiar de tab
- [02-04]: rowsMatch normaliza filas via JSON.stringify con keys ordenados — comparacion correcta independientemente del orden de columnas y filas
- [02-04]: ExerciseCard autocontenida con estado local — no necesita Context externo
- [02-04]: completedIds en Set en memoria (ExercisesSection) — persistencia es v2, fuera de scope
- [02-04]: initDb() en ExercisesSection useEffect — cubre navegacion directa a ejercicios sin pasar por EditorSection
- [Phase 02]: SectionPage ya tenia los 3 branches correctos desde planes anteriores — no requirio refactor en verificacion
- [Phase 02]: Verificacion visual Fase 2 aprobada por usuario — los 5 success criteria del ROADMAP validados
- [Phase 02.1-01]: No CodeMirror readonly para SQL snippets en ejemplos — pre existente suficiente para visuales estaticos de 3-5 lineas
- [Phase 02.1-01]: Dos Callout separados para redundancia/inconsistencia en Topic12 (UTFSM + tienda online) — ilustran aspectos complementarios
- [Phase 02.1-01]: Niveles organizacionales como Callout example separado en Topic11 (no inline en lista) para mayor visibilidad

### Pending Todos

None yet.

### Roadmap Evolution

- Phase 02.1 inserted after Phase 02: Ejemplos didacticos vida real para conceptos U1 (URGENT)

### Blockers/Concerns

- [Phase 2]: AlaSQL no aplica FK ni PK constraints — documentar limitacion en UI, no depender de errores de constraint en ejercicios (el blocker anterior de schema no validado quedo resuelto en 02-01)

## Session Continuity

Last session: 2026-03-03
Stopped at: Completed 02.1-01-PLAN.md — 7 Callout examples vida real en Topic11 y Topic12; Phase 02.1 completa
Resume file: None
