# Project State

## Project Reference

See: .planning/PROJECT.md (updated 2026-03-02)

**Core value:** Los estudiantes practican SQL y se autoevaluan sobre INF-239 directamente en el browser, sin instalar nada
**Current focus:** Phase 1 — Fundacion

## Current Position

Phase: 1 of 4 (Fundacion)
Plan: 2 of 3 in current phase
Status: In progress
Last activity: 2026-03-02 — Plan 01-02 completado: layout shell, React Router, Sidebar data-driven

Progress: [██░░░░░░░░] 20%

## Performance Metrics

**Velocity:**
- Total plans completed: 0
- Average duration: -
- Total execution time: -

**By Phase:**

| Phase | Plans | Total | Avg/Plan |
|-------|-------|-------|----------|
| - | - | - | - |

**Recent Trend:**
- Last 5 plans: -
- Trend: -

*Updated after each plan completion*

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

### Pending Todos

None yet.

### Blockers/Concerns

- [Phase 1-2]: Schema universitario contra AlaSQL no esta validado — es el primer entregable critico de Fase 2, plan 02-01 debe ejecutarse antes de cualquier componente React
- [Phase 2]: AlaSQL no aplica FK ni PK constraints — documentar limitacion en UI, no depender de errores de constraint en ejercicios

## Session Continuity

Last session: 2026-03-02
Stopped at: Completed 01-02-PLAN.md — layout shell, React Router v7, Sidebar data-driven, Header/Footer
Resume file: None
