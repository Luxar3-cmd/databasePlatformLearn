# Phase 1: Fundacion - Context

**Gathered:** 2026-03-02
**Status:** Ready for planning

<domain>
## Phase Boundary

Shell visual completo de la plataforma educativa BDD Lab UTFSM. El estudiante puede navegar la estructura completa — sidebar con U1 activa y U2-U6 bloqueadas, sub-navegacion por secciones, header, footer, dark mode — aunque las secciones de contenido esten vacias. Incluye pagina de Informacion General como landing.

</domain>

<decisions>
## Implementation Decisions

### Palette y estilo visual
- Dark mode profesional estilo Linear/Vercel — fondos slate/zinc oscuros
- Color de acento principal: indigo/violeta (#6366F1 / indigo-500)
- Tipografia: Inter para UI/texto, JetBrains Mono para codigo
- Decoracion sutil con profundidad — bordes + sombras suaves en cards/panels, jerarquia visual estilo GitHub dark

### Sidebar y navegacion
- U2-U6 grayed out con icono de candado. Click no hace nada o muestra tooltip "Proximamente"
- Sub-secciones (Conceptos, Ejercicios, Editor SQL, Quiz, Cheat Sheet) anidadas dentro del sidebar como items hijos al expandir una unidad
- Sidebar colapsable con boton toggle en desktop (expandido por defecto, colapsa a solo iconos)
- Tareas, Certamenes y Ayudantias en seccion separada abajo del sidebar, con separador visual, estilo bloqueado

### Layout responsivo
- Mobile/tablet: sidebar se oculta, hamburger icon en header abre sidebar como overlay
- Al seleccionar una seccion en el overlay, se cierra automaticamente y muestra el contenido
- Breakpoint en 1024px (lg) — todo debajo de lg es mobile (sidebar oculto)
- Header sticky (siempre visible al scrollear)

### Placeholders y estados vacios
- Secciones sin contenido muestran card informativa: titulo de la seccion, breve descripcion de que contendra, icono representativo
- Pagina de Informacion General es la ruta raiz (/): presentacion del curso (nombre, profesor, semestre, descripcion) + mini-guia de uso de la plataforma
- Footer minimo: una linea con creditos "BDD Lab UTFSM - Ayudantia INF-239 - 2026"

### Claude's Discretion
- Exact color shades para fondos y superficies (dentro del espectro slate/zinc dark)
- Spacing y sizing del sidebar (ancho expandido, ancho colapsado)
- Animaciones y transiciones (sidebar collapse, overlay open/close)
- Iconos especificos para cada seccion y estado
- Estructura interna de componentes y hooks

</decisions>

<specifics>
## Specific Ideas

- Estilo visual inspirado en Linear/Vercel (profesional oscuro) y GitHub dark (profundidad sutil)
- Las sub-secciones se anidan en el sidebar como un arbol, no como tabs — toda la navegacion en un solo lugar
- La pagina de Informacion General funciona como onboarding ligero para estudiantes nuevos

</specifics>

<code_context>
## Existing Code Insights

### Reusable Assets
- Proyecto greenfield — no hay codigo existente aun
- Documentos de clase disponibles en `documentos-clase/` como referencia de contenido

### Established Patterns
- Stack definido en PROJECT.md: React 19 + TypeScript + Tailwind v4 + Vite
- Sin backend — todo client-side
- Arquitectura modular: agregar unidades sin tocar componentes existentes

### Integration Points
- React Router para rutas: `/unit/:unitId/:section` y `/` para Info General
- Estructura de carpetas planificada: `content/units/u{N}/`, `engine/`, `sections/`

</code_context>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope

</deferred>

---

*Phase: 01-fundacion*
*Context gathered: 2026-03-02*
