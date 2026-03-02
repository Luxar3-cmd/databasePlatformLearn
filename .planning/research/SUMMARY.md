# Project Research Summary

**Project:** BDD Lab UTFSM — Plataforma educativa de SQL para INF-239
**Domain:** SPA educativa cliente-side, SQL en browser, despliegue estatico
**Researched:** 2026-03-02
**Confidence:** MEDIUM-HIGH

## Executive Summary

BDD Lab UTFSM es una SPA educativa para el curso INF-239 de la UTFSM, diseñada para que estudiantes aprendan SQL sin instalar nada. La aproximacion correcta es un stack 100% estatico (React 19 + Vite 7 + TypeScript + Tailwind v4) con AlaSQL como motor SQL en el browser. Este patron es el que usan plataformas establecidas como SQLBolt y pgexercises, pero ninguna de ellas tiene contenido especifico al curso, en español, ni un dataset universitario relevante — ahi esta el diferenciador real del producto.

La arquitectura debe separar de forma estricta tres capas: contenido como datos TypeScript puros (`content/units/u{N}/`), logica de renderizado en componentes React (`sections/`), y el motor SQL como singleton (`engine/sql.ts`). La decision mas importante de la fase 1 es establecer estos limites antes de escribir una sola linea de contenido — cambiarlos despues es costoso. La navegacion va en la URL (React Router), no en Zustand; el estado de UI simple va en Zustand; AlaSQL nunca se toca desde componentes directamente.

El riesgo tecnico principal es AlaSQL: no aplica FOREIGN KEY, PRIMARY KEY es parcialmente buggy, y tiene palabras reservadas que rompen schemas validos en PostgreSQL/MySQL. La mitigacion es tratar AlaSQL como ejecutor de queries (no como enforcer de constraints), diseñar el schema defensivamente desde el dia 1, y documentar las limitaciones en la UI. El riesgo de producto es no tener contenido de U1 listo para el primer ayudante — por eso el schema y los ejercicios de U1 son bloqueantes para todo lo demas.

## Key Findings

### Recommended Stack

Stack 100% estatico, sin backend, desplegable en GitHub Pages o Vercel con cero configuracion. Vite 7 + React 19 + TypeScript 5.9 es el baseline moderno para cualquier SPA greenfield en 2026. Tailwind v4 elimina el boilerplate de config y encaja perfectamente con el dark-mode-first del proyecto. AlaSQL 4.17.0 es la unica opcion viable de SQL puro-JS sin WASM para el alcance de U1 (SELECT, JOIN, GROUP BY, subqueries).

**Core technologies:**
- React 19.2.4: UI framework — componentes mapean limpiamente a las secciones del curso (Conceptos, Ejercicios, Editor, Quiz, Cheat Sheet)
- TypeScript 5.9.3: type safety — los content types capturan errores de contenido en build time, no en runtime
- Vite 7.3.1: build tool — output estatico, dev server rapido, requiere Node 20+
- Tailwind CSS 4.2: styling — CSS-first, plugin de Vite, sin tailwind.config.js, dark mode nativo
- AlaSQL 4.17.0: motor SQL in-browser — puro JS, sin WASM, API sincrona, suficiente para U1
- @uiw/react-codemirror + @codemirror/lang-sql: editor SQL — 300KB vs 5-10MB de Monaco, mobile-friendly
- react-router-dom v7 (library mode): routing — URL como fuente de verdad para navegacion

### Expected Features

La investigacion de features muestra que todas las plataformas competidoras (SQLBolt, pgexercises, W3Schools, Khan Academy) tienen un subconjunto de features que los estudiantes dan por hecho. Lo que ninguna tiene es contenido especifico al curso INF-239, en español, con un dataset universitario.

**Must have (table stakes):**
- Editor SQL en browser con feedback inmediato — los estudiantes esperan ejecutar queries sin instalar nada
- Ejercicios guiados con schema precargado (universidad: facultades, ramos, alumnos) — abstracciones sin datos concretos generan abandono
- Seccion Conceptos U1 antes de ejercicios — teoria antes de practica es estandar en todas las plataformas
- Navegacion lateral con U1 activa y U2-U6 bloqueadas pero visibles — estructura que orienta y motiva
- Quiz MCQ con feedback inmediato — los estudiantes quieren autoevaluarse antes de examenes
- Cheat sheet visual embebida — no como PDF descargable
- Show answer (solucion al ejercicio) — sin esto los estudiantes se bloquean y abandonan
- Dark mode + layout responsive con sidebar colapsable

**Should have (competitive):**
- Sistema de hints en 3 niveles: hint conceptual > query parcial > respuesta completa (diferenciador vs todas las plataformas)
- Dataset universitario relevante (facultades, ramos, alumnos) — reduce carga cognitiva vs datasets genericos
- Contenido en español de calidad — ninguna plataforma lo tiene bien resuelto
- Progresion con unidades bloqueadas visibles — muestra el arco completo del curso

**Defer (v2+):**
- Progress tracking con localStorage — trigger: estudiantes preguntan "donde estaba"
- Contenido U2-U6 — desbloquear a medida que avanza el semestre
- Vista de instructor / grade tracking — requiere backend, fuera del modelo estatico
- Autenticacion, backend, colaboracion en tiempo real, video lessons, AI assistant — anti-features para este contexto

### Architecture Approach

SPA pura con tres capas bien delimitadas. El contenido vive en archivos TypeScript de datos sin imports de React (`content/units/u{N}/`). Los componentes de seccion son pure renderers que consumen esos datos. AlaSQL es un singleton de modulo (`engine/sql.ts`) que los componentes nunca tocan directamente — todo pasa por el hook `useSqlEngine`. La navegacion vive en la URL (`/unit/:unitId/:section`), no en el store. Zustand solo maneja UI state simple (sidebar collapsed).

**Major components:**
1. `AppLayout` + `Sidebar` — shell raiz, lista de unidades con lock state, colapso mobile
2. `sections/*Section` — renderers pure de Conceptos, Ejercicios, Editor, Quiz, Cheat Sheet
3. `engine/sql.ts` — singleton AlaSQL: init, execute, reset (punto unico de acceso al motor)
4. `content/units/u{N}/` — datos puros: exercises.ts, quiz.ts, concepts.tsx, cheatsheet.tsx
5. `content/db/schema.ts + seed.ts` — schema y datos del schema universidad

### Critical Pitfalls

1. **AlaSQL no aplica FK ni PK constraints** — Disenar los ejercicios como demostraciones de conceptos mediante datos correctos, no mediante "ejecuta esto y ve el error de constraint". Agregar disclaimer visible en la UI.

2. **AlaSQL reserved keywords rompen schemas** — Validar el schema completo contra AlaSQL antes de escribir cualquier componente. Evitar: `key`, `value`, `count`, `by`, `offset`, `query`. Usar backtick escaping o renombrar (ej: `cantidad` en vez de `count`).

3. **Contenido hardcodeado en componentes = inescalable a U2-U6** — Definir los tipos TypeScript para todo el contenido (Exercise[], QuizQuestion[], Concept[]) en la fase 1, antes de escribir contenido. Agregar U2 debe ser crear un archivo de datos, no tocar componentes.

4. **Monaco Editor = 5-10MB, sin mobile** — Usar CodeMirror 6 via @uiw/react-codemirror. Medir bundle con vite-bundle-visualizer antes de mergear el componente editor.

5. **AlaSQL sin reset entre ejercicios = estado corrupto** — Exponer boton "Reset DB" en el editor. Llamar `resetDb()` antes de cada ejercicio. Esto no es opcional.

## Implications for Roadmap

### Phase 1: Fundacion Tecnica y Schema
**Rationale:** Todo el resto depende del schema correcto en AlaSQL y de la arquitectura de contenido. Estos dos errores son los de mayor costo de recuperacion (HIGH recovery cost segun PITFALLS.md). Hacerlos primero evita reescrituras.
**Delivers:** Proyecto Vite inicializado, schema universidad validado contra AlaSQL, estructura de carpetas `content/units/u{N}/` + `engine/sql.ts`, tipos TypeScript para todos los content types, rutas base con React Router.
**Addresses:** In-browser SQL editor (infraestructura), schema precargado, navegacion lateral (estructura)
**Avoids:** Reserved keyword collisions (probar schema en AlaSQL antes de UI), inline content anti-pattern (definir tipos antes de contenido), Monaco bundle (decidir CodeMirror desde el inicio)

### Phase 2: Contenido U1 y Ejercicios
**Rationale:** El diferenciador #1 del producto es contenido especifico al curso INF-239. La infraestructura de fase 1 hace que agregar contenido sea rellenar archivos de datos. Los ejercicios son el core loop de aprendizaje.
**Delivers:** Seccion Conceptos U1 (1.1-1.4 del silabus oficial), 6 ejercicios guiados con feedback correcto/incorrecto + expected vs actual, solucion show-after-N-attempts.
**Uses:** content/units/u1/concepts.tsx, exercises.ts, engine/sql.ts, ExercisesSection
**Avoids:** AlaSQL sin reset (resetDb() en cada ejercicio desde el primer dia), raw error messages (mapear errores a mensajes en español)

### Phase 3: Quiz y Cheat Sheet
**Rationale:** Quiz y Cheat Sheet son independientes del SQL Editor — el quiz es MCQ, no ejecuta AlaSQL. Pueden construirse en paralelo con ejercicios pero quedan en su propia fase porque tienen UX distinta (wizard pattern para quiz, tabla visual para cheat sheet).
**Delivers:** Quiz U1 con 10+ preguntas MCQ, feedback por pregunta y score final (wizard: una pregunta a la vez), Cheat Sheet visual con definiciones y diagrama ER del schema.
**Implements:** QuizSection, CheatSheetSection — consumidores puros de content/units/u1/quiz.ts y cheatsheet.tsx
**Avoids:** All-questions-at-once UX (wizard pattern obligatorio), hardcoded quiz questions en componentes

### Phase 4: UX y Polish
**Rationale:** Con el contenido y la funcionalidad core validados, se completa la UX: sidebar responsive colapsable, lock states visuales, keyboard shortcuts, accesibilidad del editor.
**Delivers:** Sidebar colapsable mobile (375px), lock states visuales con icono + tooltip para U2-U6, Ctrl+Enter para ejecutar SQL, Escape para salir del editor, errores inline (no toasts), dark mode limpio sin hardcoded colors.
**Avoids:** Keyboard trap en CodeMirror (Escape handler), locked unit navigation errors (route guards), dark mode flicker (class="dark" estatico en html)

### Phase 5: Deploy y Validacion
**Rationale:** El deploy estatico tiene una gotcha conocida (404 en refresh en GH Pages) que se descubre tarde si no se prueba antes de considerar el trabajo terminado.
**Delivers:** Deploy funcional en GitHub Pages o Vercel, todas las rutas funcionan en refresh, base path configurado en vite.config.ts, checklist "looks done but isn't" completado.
**Avoids:** GH Pages 404 on route refresh (404.html redirect o Vercel native SPA handling)

### Phase Ordering Rationale

- Schema y content types son bloqueantes para todo el contenido: deben ir en fase 1 aunque sea tentador "empezar con la UI".
- Ejercicios antes que quiz/cheat sheet porque son el core loop y desbloquean el feedback mas util sobre si el schema es correcto en la practica.
- Quiz y Cheat Sheet juntos en fase 3 porque son independientes entre si y del SQL Engine — se pueden construir y testear en aislamiento.
- UX polish en fase 4 porque requiere contenido real para evaluar correctamente (sidebar con contenido real, quiz con preguntas reales, etc.).
- Deploy al final porque GH Pages tiene configuracion especifica (base path) que solo importa en el contexto del proyecto completo.

### Research Flags

Fases que probablemente necesitan investigacion adicional durante planning:
- **Phase 1:** Validacion del schema AlaSQL — ejecutar el schema completo contra AlaSQL en consola antes de disenar ejercicios. No hay documentacion exhaustiva de todas las incompatibilidades.
- **Phase 4:** Accesibilidad del editor CodeMirror 6 en mobile — el soporte mobile existe pero los patrones especificos (Escape handler, touch keyboard) necesitan verificacion en dispositivos reales.

Fases con patrones establecidos (skip research-phase):
- **Phase 2:** Content rendering en React — patrones bien documentados, sin integraciones complejas.
- **Phase 3:** MCQ quiz en React — componente simple, sin dependencias externas.
- **Phase 5:** Vite static deploy — documentacion oficial clara para GH Pages y Vercel.

## Confidence Assessment

| Area | Confidence | Notes |
|------|------------|-------|
| Stack | HIGH | Todas las versiones verificadas contra fuentes oficiales y npm. AlaSQL es la unica opcion viable para el scope — la alternativa (PGlite) es overkill para U1. |
| Features | MEDIUM | Plataformas competidoras analizadas directamente. Pain points de estudiantes de fuentes comunitarias (HN, reviews). Suficiente para definir MVP. |
| Architecture | MEDIUM | Patrones de React SPA bien documentados. Patrones especificos de AlaSQL + React derivados de GitHub oficial + ejemplos comunitarios — funcionales pero menos referencias que frameworks mainstream. |
| Pitfalls | HIGH | Limitaciones de AlaSQL verificadas contra wiki oficial y GitHub issues especificos (#1005, #1009, #1155, #1162). Muy alta confianza en los pitfalls criticos. |

**Overall confidence:** MEDIUM-HIGH

### Gaps to Address

- **AlaSQL con schema universitario especifico:** La investigacion confirma las limitaciones generales (FK, PK, keywords) pero el schema exacto de `universidad` (facultades, departamentos, profesores, ramos, alumnos, inscripciones) no fue probado contra AlaSQL. Debe ser el primer entregable de Fase 1 antes de cualquier componente React.

- **Contenido INF-239 U1:** El research confirma la estructura de secciones pero el contenido real (Clases 02-04, Unidad_1.pdf del curso) debe ser revisado y transcrito. La calidad de este contenido es el diferenciador #1 — no es un problema tecnico sino de curación.

- **AlaSQL performance con seed completo:** El research menciona el riesgo de freeze sincrono con datasets grandes, pero el tamaño exacto del seed universitario no esta definido. Si el seed supera ~500 filas, puede necesitarse un useEffect con loading spinner en lugar de init sincrona.

## Sources

### Primary (HIGH confidence)
- https://react.dev/versions — React 19.2.4 stable
- https://github.com/microsoft/typescript/releases — TypeScript 5.9.3 stable
- https://vite.dev/blog/announcing-vite7 — Vite 7.3.1
- https://tailwindcss.com/blog/tailwindcss-v4 — Tailwind v4.2
- https://github.com/AlaSQL/alasql/releases — AlaSQL 4.17.0
- https://github.com/AlaSQL/alasql/wiki/Foreign-Key — FK no enforced confirmado
- https://github.com/agershun/alasql/issues/565, #1005, #1009, #1155, #1162 — PK bugs y reserved keywords
- https://alasql-wiki.readthedocs.io/en/latest/readme.html — limitaciones oficiales documentadas
- Tailwind CSS official docs — dark mode class strategy

### Secondary (MEDIUM confidence)
- https://sqlbolt.com/ — analisis directo de la plataforma
- https://pgexercises.com/ — analisis directo de la plataforma
- https://sourcegraph.com/blog/migrating-monaco-codemirror — CodeMirror vs Monaco bundle size
- https://github.com/pmndrs/zustand — Zustand para lightweight SPA state
- https://blog.seancoughlin.me/building-an-interactive-sql-learning-platform-with-react-nextjs-and-sqljs — analogo arquitectonico
- https://www.robinwieruch.de/react-folder-structure/ — estructura de carpetas React 2025
- Vite deployment docs — GH Pages base path configuration

### Tertiary (MEDIUM confidence, community-sourced)
- https://news.ycombinator.com/item?id=28348524 — student pain points learning SQL
- https://edureviewer.com/courses/learnsql-review/ — feedback mechanisms
- https://dl.acm.org/doi/10.1145/3607180 — SQL error messages en contextos educativos

---
*Research completed: 2026-03-02*
*Ready for roadmap: yes*
