# BDD Lab UTFSM

## What This Is

Plataforma web educativa para la ayudantia del ramo INF-239 Bases de Datos (UTFSM Casa Central). Funciona como complemento al Aula USM, orientada a que estudiantes practiquen y refuercen conceptos de forma interactiva. Todo client-side — React + TypeScript + Tailwind + AlaSQL para ejecutar SQL real en el browser sin backend.

## Core Value

Los estudiantes pueden practicar SQL y autoevaluarse sobre los conceptos del curso de forma interactiva, directamente en el navegador, sin necesidad de instalar nada.

## Requirements

### Validated

(None yet — ship to validate)

### Active

- [ ] Layout con sidebar de unidades (U1 activa, U2-U6 bloqueadas), header, footer
- [ ] Navegacion entre unidades con sub-secciones: Conceptos, Ejercicios, Editor SQL, Quiz, Cheat Sheet
- [ ] Seccion Conceptos U1 completa (1.1 a 1.4 del temario oficial)
- [ ] Editor SQL interactivo con AlaSQL (BD universitaria precargada, 6 ejercicios guiados)
- [ ] Quiz de autoevaluacion U1 (10+ preguntas con retroalimentacion inmediata)
- [ ] Cheat Sheet U1 (resumen visual de definiciones, tablas comparativas, etapas de diseno)
- [ ] Ejercicios resueltos paso a paso para U1
- [ ] Dark mode profesional, responsive (sidebar colapsable en mobile)
- [ ] Arquitectura modular para agregar unidades futuras sin refactoring
- [ ] Deploy estatico (Vercel o GitHub Pages)

### Out of Scope

- Backend / autenticacion de usuarios — todo es client-side, acceso publico
- Unidades 2-6 con contenido — solo placeholders bloqueados en v1
- Secciones Tareas, Certamenes, Ayudantias — solo placeholders en v1
- Tracking de progreso persistente — sin localStorage ni BD para v1
- Mobile app nativa — web responsive es suficiente

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
| AlaSQL como motor SQL en browser | Ejecuta SQL real sin backend, suficiente para ejercicios introductorios | — Pending |
| Sin backend / sin auth | Simplifica deploy y desarrollo, acceso publico es aceptable para material de ayudantia | — Pending |
| Arquitectura modular por unidad | Permite agregar U2-U6 sin tocar componentes, solo agregar data files y desbloquear | — Pending |
| Dark mode como unico tema | Reduce scope, profesional para contenido tecnico/codigo | — Pending |

---
*Last updated: 2026-03-02 after initialization*
