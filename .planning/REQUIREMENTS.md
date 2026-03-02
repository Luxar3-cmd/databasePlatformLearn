# Requirements: BDD Lab UTFSM

**Defined:** 2026-03-02
**Core Value:** Los estudiantes pueden practicar SQL y autoevaluarse sobre los conceptos del curso de forma interactiva, directamente en el navegador, sin necesidad de instalar nada.

## v1 Requirements

Requirements for initial release. Each maps to roadmap phases.

### Layout y Navegacion

- [x] **LAYOUT-01**: Usuario ve sidebar con 6 unidades (U1 activa, U2-U6 bloqueadas visualmente)
- [x] **LAYOUT-02**: Header muestra branding "BDD Lab UTFSM — Ayudantia INF-239"
- [x] **LAYOUT-03**: Footer con creditos del curso
- [ ] **LAYOUT-04**: Sub-navegacion por secciones dentro de unidad (Conceptos, Ejercicios, Editor SQL, Quiz, Cheat Sheet)
- [ ] **LAYOUT-05**: Sidebar colapsable en mobile/tablet
- [ ] **LAYOUT-06**: Pagina de Informacion General (presentacion del curso, profesores, programa)
- [x] **LAYOUT-07**: Placeholders bloqueados para Tareas, Certamenes, Ayudantias en sidebar

### Contenido Teorico

- [ ] **CONT-01**: Seccion 1.1 completa — Definicion de Bases de Datos
- [ ] **CONT-02**: Seccion 1.2 completa — Enfoque de Archivos vs Enfoque de BD
- [ ] **CONT-03**: Seccion 1.3 completa — Tipos de Bases de Datos
- [ ] **CONT-04**: Seccion 1.4 completa — Proceso de Diseno de BD
- [ ] **CONT-05**: Navegacion entre temas dentro de la seccion Conceptos
- [ ] **CONT-06**: Diseno visual claro para definiciones, tablas comparativas, listados

### Editor SQL Interactivo

- [ ] **SQL-01**: Motor AlaSQL integrado con BD universitaria precargada (5 tablas, ~30 registros)
- [ ] **SQL-02**: Editor con CodeMirror 6 y syntax highlighting SQL
- [ ] **SQL-03**: Boton Ejecutar + atajo Ctrl+Enter
- [ ] **SQL-04**: Tabla de resultados con columnas y filas
- [ ] **SQL-05**: Manejo de errores con mensajes claros en espanol
- [ ] **SQL-06**: Boton reset de BD para restaurar estado original
- [ ] **SQL-07**: Visor de esquema de BD (toggle show/hide)
- [ ] **SQL-08**: 6 ejercicios guiados (basico a avanzado) con hints y soluciones
- [ ] **SQL-09**: Botones de consultas rapidas para explorar tablas

### Quiz

- [ ] **QUIZ-01**: 10+ preguntas seleccion multiple sobre U1 con retroalimentacion inmediata
- [ ] **QUIZ-02**: Score final al completar el quiz
- [ ] **QUIZ-03**: Randomizacion de orden de preguntas y opciones en cada intento

### Cheat Sheet

- [ ] **CHEAT-01**: Definiciones clave (Dato, Informacion, BD, DBMS, DDL, DML, DCL)
- [ ] **CHEAT-02**: Tabla comparativa enfoque archivos vs BD
- [ ] **CHEAT-03**: Mapa de tipos de BD (segun 6 criterios de clasificacion)
- [ ] **CHEAT-04**: Las 6 etapas de diseno con objetivo de cada una
- [ ] **CHEAT-05**: Niveles organizacionales y tipos de SI
- [ ] **CHEAT-06**: Terminologia relacional (relacion/tupla/atributo/dominio/clave)

### Ejercicios Resueltos

- [ ] **EJER-01**: Ejercicios de identificar desventajas del enfoque de archivos en escenarios reales
- [ ] **EJER-02**: Ejercicios de clasificar tipos de BD segun criterios dados
- [ ] **EJER-03**: Ejercicios de mapear niveles organizacionales a tipos de SI
- [ ] **EJER-04**: Ejercicios de relacionar problemas archivos con soluciones BD

### No Funcionales

- [x] **NFR-01**: Dark mode profesional con tipografia clara para codigo y texto
- [ ] **NFR-02**: Responsive desktop y tablet
- [x] **NFR-03**: Arquitectura modular — agregar unidades sin tocar componentes existentes
- [ ] **NFR-04**: Deploy estatico a Vercel o GitHub Pages
- [x] **NFR-05**: Todo el contenido e interfaz en espanol

## v2 Requirements

Deferred to future release. Tracked but not in current roadmap.

### Contenido Adicional

- **CONT-V2-01**: Unidad 2 — Modelo Entidad-Relacion
- **CONT-V2-02**: Unidad 3 — Modelo Relacional y Algebra Relacional
- **CONT-V2-03**: Unidad 4 — SQL
- **CONT-V2-04**: Unidad 5 — Normalizacion
- **CONT-V2-05**: Unidad 6 — Temas Avanzados

### Features Avanzadas

- **ADV-V2-01**: Diagramas interactivos (flujos, jerarquias de tipos de BD)
- **ADV-V2-02**: Tracking de progreso persistente (localStorage)
- **ADV-V2-03**: Hint system de 3 niveles (conceptual, parcial, completo)
- **ADV-V2-04**: Contenido para secciones Tareas, Certamenes, Ayudantias

## Out of Scope

Explicitly excluded. Documented to prevent scope creep.

| Feature | Reason |
|---------|--------|
| Backend / autenticacion | Todo client-side, acceso publico es suficiente para material de ayudantia |
| Mobile app nativa | Web responsive cubre las necesidades |
| Real-time chat / foro | Aula USM ya lo provee |
| Video lessons | Complejidad de hosting/storage innecesaria |
| AI assistant para SQL | Scope creep, derrota el proposito pedagogico |
| Leaderboards / gamification | Innecesario para herramienta de estudio complementaria |
| OAuth / login social | Sin backend, sin necesidad de identidad |

## Traceability

Which phases cover which requirements. Updated during roadmap creation.

| Requirement | Phase | Status |
|-------------|-------|--------|
| LAYOUT-01 | Phase 1 | Complete |
| LAYOUT-02 | Phase 1 | Complete |
| LAYOUT-03 | Phase 1 | Complete |
| LAYOUT-04 | Phase 1 | Pending |
| LAYOUT-05 | Phase 1 | Pending |
| LAYOUT-06 | Phase 1 | Pending |
| LAYOUT-07 | Phase 1 | Complete |
| NFR-01 | Phase 1 | Complete |
| NFR-02 | Phase 1 | Pending |
| NFR-03 | Phase 1 | Complete |
| NFR-05 | Phase 1 | Complete |
| CONT-01 | Phase 2 | Pending |
| CONT-02 | Phase 2 | Pending |
| CONT-03 | Phase 2 | Pending |
| CONT-04 | Phase 2 | Pending |
| CONT-05 | Phase 2 | Pending |
| CONT-06 | Phase 2 | Pending |
| SQL-01 | Phase 2 | Pending |
| SQL-02 | Phase 2 | Pending |
| SQL-03 | Phase 2 | Pending |
| SQL-04 | Phase 2 | Pending |
| SQL-05 | Phase 2 | Pending |
| SQL-06 | Phase 2 | Pending |
| SQL-07 | Phase 2 | Pending |
| SQL-08 | Phase 2 | Pending |
| SQL-09 | Phase 2 | Pending |
| QUIZ-01 | Phase 3 | Pending |
| QUIZ-02 | Phase 3 | Pending |
| QUIZ-03 | Phase 3 | Pending |
| CHEAT-01 | Phase 3 | Pending |
| CHEAT-02 | Phase 3 | Pending |
| CHEAT-03 | Phase 3 | Pending |
| CHEAT-04 | Phase 3 | Pending |
| CHEAT-05 | Phase 3 | Pending |
| CHEAT-06 | Phase 3 | Pending |
| EJER-01 | Phase 3 | Pending |
| EJER-02 | Phase 3 | Pending |
| EJER-03 | Phase 3 | Pending |
| EJER-04 | Phase 3 | Pending |
| NFR-04 | Phase 4 | Pending |

**Coverage:**
- v1 requirements: 33 total
- Mapped to phases: 33
- Unmapped: 0

---
*Requirements defined: 2026-03-02*
*Last updated: 2026-03-02 after roadmap creation*
