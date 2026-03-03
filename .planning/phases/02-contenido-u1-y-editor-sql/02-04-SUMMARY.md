---
phase: 02-contenido-u1-y-editor-sql
plan: 04
subsystem: ui
tags: [react, alasql, codemirror, sql, exercises]

requires:
  - phase: 02-02
    provides: SqlEditor component con CodeMirror 6 reutilizable
  - phase: 02-01
    provides: engine sql.ts con executeQuery e initDb

provides:
  - 6 ejercicios guiados SQL sobre BD universitaria en U1_EXERCISES array tipado
  - ExerciseCard con mini-editor embebido, pista toggle, solucion toggle, validacion automatica
  - ExercisesSection con estado completedIds en memoria y contador de progreso
  - Ruta /unit/u1/ejercicios funcional con ExercisesSection montada

affects:
  - 02-05 (quiz u1, si lo hay)
  - future phases with exercise patterns

tech-stack:
  added: []
  patterns:
    - rowsMatch normalizacion: JSON.stringify con keys ordenados + sort para comparar resultados SQL independientemente del orden
    - Branch condicional en SectionPage para secciones especializadas (patron de 02-02)
    - initDb() en useEffect de seccion para inicializar BD al navegar directo

key-files:
  created:
    - src/content/units/u1/exercises.ts
    - src/components/u1/ExerciseCard.tsx
    - src/components/u1/ExercisesSection.tsx
  modified:
    - src/pages/SectionPage.tsx

key-decisions:
  - "rowsMatch normaliza filas via JSON.stringify con keys ordenados — comparacion correcta independientemente del orden de columnas y filas"
  - "ExerciseCard es autocontenido con estado local (query, result, showHint, showSolution, validationStatus) — no necesita context externo"
  - "completedIds en Set en memoria (ExercisesSection) — persistencia es v2, fuera de scope"
  - "initDb() en ExercisesSection useEffect — usuario puede navegar directo a ejercicios sin pasar por EditorSection"

patterns-established:
  - "rowsMatch pattern: normaliza resultado SQL para comparacion orden-independiente"
  - "ExerciseCard autocontenido: editor + validacion + pista + solucion en una card"

requirements-completed: [SQL-08]

duration: 2min
completed: 2026-03-03
---

# Phase 2 Plan 4: Ejercicios Guiados U1 Summary

**6 ejercicios SQL progresivos con mini-editor CodeMirror por ejercicio, validacion automatica via rowsMatch, pistas y soluciones, montados en /unit/u1/ejercicios**

## Performance

- **Duration:** 2 min
- **Started:** 2026-03-03T01:20:51Z
- **Completed:** 2026-03-03T01:22:21Z
- **Tasks:** 2
- **Files modified:** 4

## Accomplishments

- U1_EXERCISES: 6 ejercicios tipados con dificultad progresiva (2 basico, 2 intermedio, 2 avanzado) sobre la BD universitaria
- ExerciseCard: card autocontenida con SqlEditor embebido, validacion automatica por comparacion normalizada de resultados, toggle de pista y solucion
- ExercisesSection: lista con estado de completados en memoria, initDb() al montar, contador X de 6
- SectionPage: branch condicional para /unit/u1/ejercicios renderiza ExercisesSection

## Task Commits

1. **Task 1: Datos de ejercicios + ExerciseCard** - `5fd8ebc` (feat)
2. **Task 2: ExercisesSection + wiring SectionPage** - `ec7cc32` (feat)

## Files Created/Modified

- `src/content/units/u1/exercises.ts` - Array U1_EXERCISES con 6 ejercicios tipados
- `src/components/u1/ExerciseCard.tsx` - Card con editor, validacion, pista, solucion
- `src/components/u1/ExercisesSection.tsx` - Lista de cards con estado completados
- `src/pages/SectionPage.tsx` - Branch para ejercicios u1 agregado

## Decisions Made

- rowsMatch normaliza filas via JSON.stringify con keys ordenados: correcto para AlaSQL que puede retornar filas en diferente orden
- Estado local en ExerciseCard (no Context): cada card es independiente, no necesitan compartir estado entre si
- completedIds como Set en memoria: persistencia explicitamente fuera de scope (v2)
- initDb() en ExercisesSection para cubrir caso de navegacion directa sin pasar por EditorSection

## Deviations from Plan

None - plan ejecutado exactamente como escrito.

## Issues Encountered

None.

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness

- Ejercicios guiados completos y funcionales en /unit/u1/ejercicios
- Quedan 02-05 (quiz u1) pendiente en la fase
- Pattern de validacion rowsMatch disponible para reutilizar en futuros ejercicios

---
*Phase: 02-contenido-u1-y-editor-sql*
*Completed: 2026-03-03*
