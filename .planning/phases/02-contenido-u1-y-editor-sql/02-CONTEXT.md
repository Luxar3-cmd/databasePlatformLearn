# Phase 2: Contenido U1 y Editor SQL - Context

**Gathered:** 2026-03-02
**Status:** Ready for planning

<domain>
## Phase Boundary

El estudiante puede leer los conceptos completos de la Unidad 1 (secciones 1.1-1.4) y ejecutar queries SQL reales contra una base de datos universitaria precargada directamente en el browser. Incluye 6 ejercicios guiados progresivos con validacion automatica.

</domain>

<decisions>
## Implementation Decisions

### Presentacion del contenido teorico
- Tabs por seccion: un tab por cada tema (1.1, 1.2, 1.3, 1.4), solo una seccion visible a la vez
- Definiciones clave en callout boxes: cajas destacadas con borde de color e icono, estilo admonitions
- Tablas comparativas como tablas HTML estilizadas: filas alternadas, bordes sutiles
- Fuente del contenido: el usuario proporcionara apuntes del curso como base para generar el contenido

### Experiencia del editor SQL
- Layout apilado simple: esquema expandible arriba, editor en el medio, resultados debajo
- Botones de consultas rapidas: un boton por tabla que inserta y ejecuta `SELECT * FROM tabla` automaticamente
- Errores SQL: mensaje traducido al espanol inline en la zona de resultados, en rojo
- SQL scope: DDL y DML completo (SELECT, INSERT, UPDATE, DELETE, CREATE TABLE). Boton Reset restaura estado original

### Ejercicios guiados SQL
- Presentacion como lista seleccionable: cards con los 6 ejercicios, el estudiante elige libremente, ve cuales completo
- Hints: boton 'Pista' con una pista general + boton separado 'Ver solucion' con la query completa
- Validacion automatica: se comparan resultados de la query del estudiante vs la solucion (mismas filas/columnas)
- Mini-editor por ejercicio: cada ejercicio tiene su propio editor SQL embebido, autocontenido

### BD universitaria y esquema
- Dominio cercano a UTFSM: tablas con nombres como alumnos, asignaturas, secciones, profesores, inscripciones
- Datos seed moderados (~50-60 registros): 10-15 alumnos, 6-8 profesores, 8-10 asignaturas, 20-25 inscripciones, 4-5 departamentos
- Datos estilo UTFSM: nombres chilenos, codigos de asignaturas reales (INF-239, MAT-021), departamentos USM
- Visor de esquema: seccion expandible (acordeon) arriba del editor, muestra tablas con columnas y tipos

### Claude's Discretion
- Diseno exacto de callout boxes y estilos de tablas
- Tamano y configuracion del editor CodeMirror
- Loading states y transiciones entre tabs
- Orden y contenido especifico de los 6 ejercicios progresivos
- Tratamiento visual de la validacion (correcto/incorrecto)

</decisions>

<specifics>
## Specific Ideas

- El contenido teorico se basara en apuntes oficiales del curso que el usuario compartira durante la implementacion
- Los datos seed deben usar terminologia USM real: codigos como INF-239, MAT-021; departamentos como Informatica, Matematica; nombres chilenos
- El esquema de BD debe soportar queries interesantes: JOINs entre alumnos-inscripciones-asignaturas, GROUP BY con conteos, filtros por departamento

</specifics>

<code_context>
## Existing Code Insights

### Reusable Assets
- `PlaceholderSection`: componente que se reemplazara por los componentes reales de cada seccion
- `SectionPage`: actualmente renderiza placeholder, necesita logica condicional para cargar componente real segun sectionId
- Lucide icons: ya disponible para iconos en callouts, botones, estados
- JetBrains Mono font: ya cargada, ideal para el editor SQL y bloques de codigo

### Established Patterns
- Data-driven: `SECTIONS` y `UNITS` en `data/units.ts` como fuente de verdad para navegacion
- Route pattern: `unit/:unitId/:section` ya enruta a la seccion correcta
- Tailwind v4 dark mode: zinc palette, sin colores hardcodeados
- Tabs en layout: no hay patron de tabs existente, se crea nuevo

### Integration Points
- `SectionPage.tsx`: punto donde se conectan los componentes reales (conceptos, editor-sql, ejercicios)
- `router.tsx`: no necesita cambios, la ruta ya soporta las secciones
- `types/content.ts`: SectionId ya incluye 'conceptos', 'ejercicios', 'editor-sql'
- `package.json`: necesita alasql y @codemirror/* como dependencias nuevas

</code_context>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope

</deferred>

---

*Phase: 02-contenido-u1-y-editor-sql*
*Context gathered: 2026-03-02*
