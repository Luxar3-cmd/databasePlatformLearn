# Roadmap: BDD Lab UTFSM

## Overview

La plataforma se construye en cuatro fases. Primero se establece la arquitectura y shell visual sin contenido real. Luego se carga el contenido core de U1 junto con el editor SQL interactivo, que es el diferenciador tecnico del proyecto. Despues se completan las herramientas de autoevaluacion (quiz, cheat sheet, ejercicios resueltos). Finalmente se hace el deploy estatico y se valida que todo funciona en produccion.

## Phases

**Phase Numbering:**
- Integer phases (1, 2, 3): Planned milestone work
- Decimal phases (2.1, 2.2): Urgent insertions (marked with INSERTED)

Decimal phases appear between their surrounding integers in numeric order.

- [x] **Phase 1: Fundacion** - Shell visual, arquitectura modular y tipos TypeScript base
- [x] **Phase 2: Contenido U1 y Editor SQL** - Seccion Conceptos completa y editor SQL interactivo con AlaSQL (completed 2026-03-03)
- [ ] **Phase 3: Autoevaluacion** - Quiz, Cheat Sheet y Ejercicios Resueltos para U1
- [ ] **Phase 4: Deploy** - Deploy estatico funcional con todas las rutas validadas

## Phase Details

### Phase 1: Fundacion
**Goal**: El estudiante puede navegar por la estructura completa de la plataforma — sidebar con U1 activa y U2-U6 bloqueadas, sub-navegacion por secciones, header, footer, dark mode — aunque las secciones de contenido esten vacias
**Depends on**: Nothing (first phase)
**Requirements**: LAYOUT-01, LAYOUT-02, LAYOUT-03, LAYOUT-04, LAYOUT-05, LAYOUT-06, LAYOUT-07, NFR-01, NFR-02, NFR-03, NFR-05
**Success Criteria** (what must be TRUE):
  1. El estudiante ve el sidebar con U1 marcada como activa y U2-U6 visualmente bloqueadas con icono de candado
  2. El estudiante puede navegar entre las sub-secciones de U1 (Conceptos, Ejercicios, Editor SQL, Quiz, Cheat Sheet) y la URL cambia
  3. El sidebar se colapsa en mobile/tablet y el contenido ocupa el ancho completo
  4. Todo el texto e interfaz esta en espanol y el fondo es dark mode sin colores hardcodeados
  5. Agregar una nueva unidad requiere solo crear un archivo de datos, sin tocar componentes existentes
**Plans:** 3 plans

Plans:
- [x] 01-01-PLAN.md — Scaffold Vite + React 19 + Tailwind v4 + dark mode + data layer con tipos y unidades
- [x] 01-02-PLAN.md — AppLayout + Sidebar con lock states + Header + Footer + React Router
- [x] 01-03-PLAN.md — InfoGeneral + placeholders + sidebar responsive mobile + verificacion visual

### Phase 2: Contenido U1 y Editor SQL
**Goal**: El estudiante puede leer los conceptos completos de la Unidad 1 y ejecutar queries SQL reales contra una base de datos universitaria precargada directamente en el browser
**Depends on**: Phase 1
**Requirements**: CONT-01, CONT-02, CONT-03, CONT-04, CONT-05, CONT-06, SQL-01, SQL-02, SQL-03, SQL-04, SQL-05, SQL-06, SQL-07, SQL-08, SQL-09
**Success Criteria** (what must be TRUE):
  1. El estudiante puede leer las secciones 1.1, 1.2, 1.3 y 1.4 con definiciones, tablas comparativas y listados fieles al temario oficial
  2. El estudiante escribe un SELECT en el editor, presiona Ctrl+Enter o el boton Ejecutar, y ve los resultados en una tabla
  3. Si el estudiante escribe SQL invalido, ve un mensaje de error claro en espanol (no el mensaje raw de AlaSQL)
  4. El estudiante puede ver el esquema de la BD universitaria (5 tablas con columnas y tipos) y resetear la BD al estado original
  5. El estudiante puede seguir 6 ejercicios guiados de dificultad progresiva con hints y ver la solucion
**Plans:** 5/5 plans complete

Plans:
- [x] 02-01-PLAN.md — Instalar dependencias, validar AlaSQL en Vite 7, motor SQL singleton con BD universitaria UTFSM, tipos TypeScript
- [x] 02-02-PLAN.md — Editor SQL interactivo: useSqlEngine hook, CodeMirror 6, tabla resultados, schema viewer, consultas rapidas, reset
- [x] 02-03-PLAN.md — Contenido Conceptos U1 (1.1-1.4): tabs, callout boxes, tablas comparativas, contenido fiel al temario oficial
- [x] 02-04-PLAN.md — 6 ejercicios guiados SQL con mini-editor, pistas, soluciones, validacion automatica
- [x] 02-05-PLAN.md — Verificacion integracion + checkpoint visual de toda la fase

### Phase 3: Autoevaluacion
**Goal**: El estudiante puede autoevaluarse con un quiz de seleccion multiple, consultar un cheat sheet visual de referencia, y practicar con ejercicios resueltos paso a paso — todo para la Unidad 1
**Depends on**: Phase 2
**Requirements**: QUIZ-01, QUIZ-02, QUIZ-03, CHEAT-01, CHEAT-02, CHEAT-03, CHEAT-04, CHEAT-05, CHEAT-06, EJER-01, EJER-02, EJER-03, EJER-04
**Success Criteria** (what must be TRUE):
  1. El estudiante completa el quiz respondiendo 10+ preguntas una por una y ve feedback inmediato por pregunta
  2. Al terminar el quiz, el estudiante ve su score final y puede intentarlo de nuevo con preguntas en orden diferente
  3. El estudiante puede consultar el cheat sheet con definiciones clave, tabla comparativa, mapa de tipos de BD y etapas de diseno sin salir de la plataforma
  4. El estudiante puede trabajar ejercicios resueltos de los 4 tipos (desventajas archivos, clasificar BD, niveles organizacionales, problemas vs soluciones) y ver la solucion paso a paso
**Plans**: TBD

Plans:
- [ ] 03-01: Contenido quiz en `content/units/u1/quiz.ts` (10+ preguntas MCQ con feedback) + QuizSection wizard con randomizacion y score final
- [ ] 03-02: Contenido cheat sheet en `content/units/u1/cheatsheet.tsx` (6 secciones) + CheatSheetSection visual
- [ ] 03-03: Ejercicios resueltos en `content/units/u1/solved-exercises.ts` (4 tipos) + ExercisesSolvedSection con solucion paso a paso

### Phase 4: Deploy
**Goal**: La plataforma esta disponible publicamente en una URL permanente, todas las rutas funcionan al hacer refresh, y el build estatico es el artefacto que se despliega
**Depends on**: Phase 3
**Requirements**: NFR-04
**Success Criteria** (what must be TRUE):
  1. La plataforma es accesible desde una URL publica (Vercel o GitHub Pages) sin instalar nada
  2. Hacer refresh en cualquier ruta (ej: `/unit/1/editor`) no devuelve 404
  3. El build estatico (`npm run build`) completa sin errores y el output es deployable
**Plans**: TBD

Plans:
- [ ] 04-01: Configurar base path en `vite.config.ts`, solucionar SPA 404 on refresh (404.html o Vercel rewrite), deploy y validar todas las rutas

## Progress

**Execution Order:**
Phases execute in numeric order: 1 → 2 → 3 → 4

| Phase | Plans Complete | Status | Completed |
|-------|----------------|--------|-----------|
| 1. Fundacion | 3/3 | Complete | 2026-03-02 |
| 2. Contenido U1 y Editor SQL | 5/5 | Complete   | 2026-03-03 |
| 3. Autoevaluacion | 0/3 | Not started | - |
| 4. Deploy | 0/1 | Not started | - |
