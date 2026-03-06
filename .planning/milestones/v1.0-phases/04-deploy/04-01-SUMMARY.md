---
phase: 04-deploy
plan: 01
subsystem: infra
tags: [vercel, vite, spa-routing, deploy, react-router]

# Dependency graph
requires:
  - phase: 03-autoevaluacion
    provides: build final de la plataforma — todo el contenido U1 completo listo para deploy
provides:
  - Deploy publico en Vercel con SPA routing funcional
  - vercel.json con rewrite /(.*) -> /index.html
  - README.md con documentacion real del proyecto
  - NFR-04 cumplido — plataforma accesible sin instalar nada
affects: []

# Tech tracking
tech-stack:
  added: [vercel-cli, vercel (hosting)]
  patterns: [SPA rewrite via vercel.json rewrites, Vercel auto-detects Vite sin buildCommand explicito]

key-files:
  created: [vercel.json, README.md]
  modified: []

key-decisions:
  - "Nombre de proyecto en Vercel resulto ser 'database-platform-learn' (nombre del directorio), no 'db-platform-u1' como planeado — URL de produccion difiere del plan pero es permanente y funcional"
  - "vercel.json minimo sin buildCommand ni outputDirectory — Vercel detecta Vite automaticamente y usa npm run build + dist/"

patterns-established:
  - "SPA rewrite: source /(.*) destination /index.html en vercel.json — patron para cualquier app React Router en Vercel"

requirements-completed: [NFR-04]

# Metrics
duration: ~2 dias (deploy manual + verificacion por usuario)
completed: 2026-03-06
---

# Phase 04: Deploy Summary

**Plataforma BDD Lab UTFSM desplegada en Vercel con SPA routing funcional — las 5 rutas de U1 responden sin 404 en refresh directo**

## Performance

- **Duration:** Multi-sesion (deploy manual interactivo)
- **Started:** 2026-03-06
- **Completed:** 2026-03-06T21:08:45Z
- **Tasks:** 3/3
- **Files modified:** 2

## Accomplishments
- vercel.json configurado con rewrite SPA que cubre todas las rutas de React Router
- README.md reemplazado — el template default de create-vite reemplazado con documentacion real del proyecto
- Deploy a produccion completado por el usuario via Vercel CLI interactivo
- 5 rutas criticas verificadas sin 404 en refresh directo: /, /unit/u1/concepts, /unit/u1/quiz, /unit/u1/cheatsheet, /unit/u1/exercises

## Task Commits

Cada tarea fue procesada atomicamente:

1. **Task 1: Crear vercel.json y reemplazar README.md** - `63354ee` (chore)
2. **Task 2: Deploy a Vercel** - realizado manualmente por el usuario (no genera commit de codigo)
3. **Task 3: Verificacion visual de 5 rutas** - verificado por el usuario (confirmacion manual)

## Files Created/Modified
- `vercel.json` — SPA rewrite config: source /(.*) -> destination /index.html
- `README.md` — Documentacion real con URL de produccion, instrucciones de local y proceso de deploy

## Decisions Made
- Nombre del proyecto en Vercel resulto ser "database-platform-learn" (nombre del directorio del repo) en lugar de "db-platform-u1" como indicaba el plan. El wizard de Vercel tomo el nombre del directorio. La URL de produccion real es https://database-platform-learn-l8h1uw30d-luxar3-cmds-projects.vercel.app/ — permanente y funcional.
- vercel.json sin buildCommand ni outputDirectory — Vercel detecta Vite automaticamente, agregar esas propiedades seria redundante.

## Deviations from Plan

### Nombre de proyecto distinto al planeado

**Desviacion de configuracion — no auto-fix, informada por el usuario**
- **Found during:** Task 2 (Deploy a Vercel)
- **Issue:** El plan especificaba nombre "db-platform-u1" para el proyecto Vercel. El wizard de Vercel uso el nombre del directorio ("database-platform-learn") en su lugar.
- **Fix:** No requirio fix — el deploy funciona correctamente con el nombre generado. La URL de produccion es distinta a la documentada en el plan pero es permanente.
- **URL real:** https://database-platform-learn-l8h1uw30d-luxar3-cmds-projects.vercel.app/
- **URL planeada:** https://db-platform-u1.vercel.app

---

**Total deviations:** 1 (nombre de proyecto en Vercel — sin impacto funcional)
**Impact on plan:** Desviacion cosmética. Toda la funcionalidad SPA routing verificada correctamente. NFR-04 cumplido.

## Issues Encountered
- Nombre de proyecto en Vercel no coincide con el planeado — documentado arriba. Sin impacto funcional.

## User Setup Required
- Deploy a Vercel requirio accion manual del usuario (Task 2 era checkpoint:human-action por diseno — Vercel CLI es interactivo y requiere autenticacion y wizard)
- Verificacion de 5 rutas requirio inspeccion manual del usuario en el browser (Task 3 era checkpoint:human-verify por diseno)

## Next Phase Readiness
- NFR-04 cumplido — la plataforma es publica y accesible sin instalar nada
- Todas las rutas de U1 verificadas en produccion
- v1.0 del proyecto completada — los 4 phases (01-fundacion, 02-contenido, 03-autoevaluacion, 04-deploy) estan completos
- Proximas iteraciones: U2 content, persistencia de quiz scores, mejoras de UI

---
*Phase: 04-deploy*
*Completed: 2026-03-06*
