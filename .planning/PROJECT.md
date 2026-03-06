# BDD Lab UTFSM

## What This Is

Plataforma web educativa para la ayudantia del ramo INF-239 Bases de Datos (UTFSM Casa Central). Funciona como complemento al Aula USM, orientada a que estudiantes practiquen y refuercen conceptos de forma interactiva. Todo client-side — React + TypeScript + Tailwind + AlaSQL para ejecutar SQL real en el browser sin backend.

## Core Value

Los estudiantes pueden practicar SQL y autoevaluarse sobre los conceptos del curso de forma interactiva, directamente en el navegador, sin necesidad de instalar nada.

## Requirements

### Validated

- ✓ Layout con sidebar de unidades (U1 activa, U2-U6 bloqueadas), header, footer — v1.0
- ✓ Navegacion entre unidades con sub-secciones: Conceptos, Ejercicios, Editor SQL, Quiz, Cheat Sheet — v1.0
- ✓ Seccion Conceptos U1 completa (1.1 a 1.4 del temario oficial) con ejemplos de vida real — v1.0
- ✓ Editor SQL interactivo con AlaSQL (BD universitaria precargada, 6 ejercicios guiados) — v1.0
- ✓ Quiz de autoevaluacion U1 (13 preguntas con retroalimentacion inmediata y shuffle) — v1.0
- ✓ Cheat Sheet U1 (resumen visual con sticky nav, 6 secciones) — v1.0
- ✓ Ejercicios resueltos paso a paso para U1 (8 ejercicios con reveal secuencial) — v1.0
- ✓ Dark mode profesional, responsive (sidebar colapsable en mobile) — v1.0
- ✓ Arquitectura modular para agregar unidades futuras sin refactoring — v1.0
- ✓ Deploy estatico a Vercel con SPA routing — v1.0

### Active

- [ ] Contenido Unidad 2 (cuando avance el semestre)
- [ ] Contenido Unidades 3-6 (progresivamente)
- [ ] Tracking de progreso en localStorage (quiz scores, ejercicios completados)

### Out of Scope

- Backend / autenticacion de usuarios — todo es client-side, acceso publico
- Secciones Tareas, Certamenes, Ayudantias — solo placeholders en v1
- Mobile app nativa — web responsive es suficiente
- Tracking de progreso persistente en BD — localStorage es suficiente si se necesita

## Context

- **Curso:** INF-239 Bases de Datos, UTFSM Casa Central
- **Profesor:** Mauricio Figueroa Colarte
- **Estructura:** 6 unidades tematicas, v1 cubre solo Unidad 1
- **Herramienta existente:** Aula USM (Moodle institucional) — la plataforma complementa, no reemplaza
- **Contenido fuente:** Presentaciones de clase (Clases 02, 03, 04) y apuntes (Unidad_1.pdf). Todo el contenido de U1 esta transcrito en el PRD
- **Documentos:** Disponibles en `documentos-clase/` como respaldo
- **Publico:** Ayudante(s) como herramienta de ensenanza + estudiantes para repaso autonomo
- **Enfoque incremental:** Unidad por unidad a medida que avanza el semestre

## Constraints

- **Stack:** React + TypeScript + Tailwind CSS + Vite + AlaSQL — sin backend
- **Deployment:** Estatico (Vercel o GitHub Pages)
- **Idioma:** Todo en espanol (UI, contenido, mensajes de error)
- **Motor SQL:** AlaSQL en el browser — debe ejecutar CREATE TABLE, INSERT, SELECT, JOINs basicos
- **Contenido:** Fiel a las presentaciones oficiales del curso
- **UI:** Dark mode profesional, usar ui-ux-pro-max skill para diseno

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| AlaSQL como motor SQL en browser | Ejecuta SQL real sin backend, suficiente para ejercicios introductorios | ✓ Funcionó bien — sin problemas de compatibilidad con Vite 7 |
| Sin backend / sin auth | Simplifica deploy y desarrollo, acceso publico es aceptable para material de ayudantia | ✓ Deploy estatico a Vercel sin friccion |
| Arquitectura modular por unidad | Permite agregar U2-U6 sin tocar componentes, solo agregar data files y desbloquear | ✓ Patron establecido, listo para U2+ |
| Dark mode como unico tema | Reduce scope, profesional para contenido tecnico/codigo | ✓ Resultado visual limpio y consistente |
| createBrowserRouter + vercel.json rewrites | SPA routing con history API, fallback a index.html en produccion | ✓ 5 rutas verificadas sin 404 en refresh |
| Fisher-Yates shuffle en quiz | Preguntas y opciones randomizadas por intento sin depender de indice positional | ✓ Implementacion robusta |

## Current State (v1.0)

- **URL produccion:** https://database-platform-learn-l8h1uw30d-luxar3-cmds-projects.vercel.app/
- **Stack:** React 19, Vite 7, TypeScript, Tailwind v4, React Router v7, AlaSQL 4.x, CodeMirror 6
- **Cobertura:** Unidad 1 completa (Conceptos, Editor SQL, Quiz, Cheat Sheet, Ejercicios)
- **LOC:** 3,696 TypeScript en src/
- **Proxima unidad:** U2 cuando avance el semestre

---
*Last updated: 2026-03-06 after v1.0 milestone*
