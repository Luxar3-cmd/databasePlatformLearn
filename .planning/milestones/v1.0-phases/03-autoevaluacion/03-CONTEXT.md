# Phase 3: Autoevaluacion - Context

**Gathered:** 2026-03-02
**Status:** Ready for planning

<domain>
## Phase Boundary

Quiz de seleccion multiple, cheat sheet visual de referencia, y ejercicios resueltos paso a paso para la Unidad 1. Las tres herramientas de autoevaluacion permiten al estudiante medir comprension, consultar referencia rapida, y practicar con problemas tipo examen.

</domain>

<decisions>
## Implementation Decisions

### Flujo del Quiz
- Wizard una pregunta a la vez con barra de progreso (3/10)
- Feedback inmediato al confirmar: verde si correcta, rojo si incorrecta + respuesta correcta + explicacion breve de POR QUE
- Boton "Siguiente" aparece despues del feedback
- Sin navegacion hacia atras (flujo lineal, como examen)
- Pantalla final: score (7/10) + resumen de preguntas incorrectas con respuesta correcta
- Boton "Intentar de nuevo" que re-randomiza orden de preguntas y opciones
- 4 opciones por pregunta (1 correcta + 3 distractores)
- 10+ preguntas distribuidas equilibradamente entre los 4 temas de U1 (~2-3 por tema)

### Layout del Cheat Sheet
- Pagina unica scrollable con las 6 secciones
- Barra sticky de navegacion arriba con links de ancla a cada seccion (scroll suave)
- Definiciones clave en formato compacto glosario: termino en negrita + definicion corta en 1-2 lineas
- Tablas HTML para clasificaciones (Criterio | Tipos | Ejemplo) — reutilizar estilo de tablas de Conceptos
- 6 secciones: Definiciones, Archivos vs BD, Tipos BD (6 criterios), Etapas Diseno, Niveles Organizacionales, Terminologia Relacional

### Formato Ejercicios Resueltos
- Revelacion progresiva paso a paso: enunciado visible, boton "Ver paso 1", luego aparece "Ver paso 2", etc.
- Agrupados por tipo con secciones separadas:
  1. Desventajas del enfoque de archivos
  2. Clasificar tipos de BD
  3. Niveles organizacionales y tipos de SI
  4. Problemas archivos vs soluciones BD
- 2 ejercicios por tipo = 8 ejercicios resueltos total
- Sin badge de dificultad (son material de estudio, no evaluacion)

### Tono y Contenido
- Tono coloquial como Phase 02.1: cercano, con referencias a UTFSM y empresas tech
- Quiz: preguntas y feedback con estilo accesible, explicaciones que conectan con vida real
- Ejercicios resueltos: escenarios de vida real (UTFSM, Spotify, Netflix, biblioteca, hospital, etc.)
- Consistente con los ejemplos didacticos ya insertados en Phase 02.1

### Claude's Discretion
- Diseño exacto del componente de progreso del quiz (barra, circulos, numeros)
- Espaciado y tipografia dentro de las secciones del cheat sheet
- Formulacion especifica de preguntas y distractores del quiz
- Cantidad exacta de pasos por ejercicio resuelto
- Animaciones/transiciones entre preguntas del quiz

</decisions>

<specifics>
## Specific Ideas

- El quiz debe sentirse como un mini-examen enfocado, no como un formulario largo
- El cheat sheet debe funcionar como referencia rapida de "ultima hora antes del certamen"
- Los ejercicios resueltos deben forzar al estudiante a pensar antes de ver la respuesta (revelacion progresiva)
- Mantener el mismo nivel de cercania de los ejemplos vida real de Phase 02.1 ("Piensa en como la UTFSM maneja...")

</specifics>

<code_context>
## Existing Code Insights

### Reusable Assets
- `Callout` component (definition/example/warning): Usar para destacar definiciones en cheat sheet y explicaciones de feedback en quiz
- `ExerciseCard` component: Patron de hint/solucion toggle reutilizable como referencia para el reveal progresivo
- `ConceptsSection` tabs: Patron de tabs para referencia, aunque cheat sheet usa scroll con anclas
- `PlaceholderSection`: Actualmente renderiza quiz y cheat-sheet — reemplazar con componentes reales
- `DIFFICULTY_BADGE` styling pattern: Referencia para badges aunque ejercicios resueltos no los usan

### Established Patterns
- Dark mode: zinc-900 backgrounds, zinc-100/300/400 text, blue-500 accents
- lucide-react icons para iconografia
- TSX para contenido rico (concepts.tsx), TS para datos estructurados (exercises.ts)
- useState para estado local de componentes interactivos
- Tailwind CSS para estilos, sin CSS modules

### Integration Points
- `SectionPage.tsx`: Agregar condicionales para `quiz`, `cheat-sheet`, y `ejercicios` (actualmente caen a PlaceholderSection)
- `content/units/u1/`: Nuevos archivos quiz.ts, cheatsheet.tsx, solved-exercises.ts
- Routing ya configurado: `/unit/u1/quiz`, `/unit/u1/cheat-sheet`, `/unit/u1/ejercicios`

</code_context>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope

</deferred>

---

*Phase: 03-autoevaluacion*
*Context gathered: 2026-03-02*
