# Phase 1: Fundacion - Research

**Researched:** 2026-03-02
**Domain:** React 19 + TypeScript + Tailwind v4 + Vite — layout shell, routing, sidebar responsivo, dark mode permanente
**Confidence:** HIGH

---

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions

**Palette y estilo visual**
- Dark mode profesional estilo Linear/Vercel — fondos slate/zinc oscuros
- Color de acento principal: indigo/violeta (#6366F1 / indigo-500)
- Tipografia: Inter para UI/texto, JetBrains Mono para codigo
- Decoracion sutil con profundidad — bordes + sombras suaves en cards/panels, jerarquia visual estilo GitHub dark

**Sidebar y navegacion**
- U2-U6 grayed out con icono de candado. Click no hace nada o muestra tooltip "Proximamente"
- Sub-secciones (Conceptos, Ejercicios, Editor SQL, Quiz, Cheat Sheet) anidadas dentro del sidebar como items hijos al expandir una unidad
- Sidebar colapsable con boton toggle en desktop (expandido por defecto, colapsa a solo iconos)
- Tareas, Certamenes y Ayudantias en seccion separada abajo del sidebar, con separador visual, estilo bloqueado

**Layout responsivo**
- Mobile/tablet: sidebar se oculta, hamburger icon en header abre sidebar como overlay
- Al seleccionar una seccion en el overlay, se cierra automaticamente y muestra el contenido
- Breakpoint en 1024px (lg) — todo debajo de lg es mobile (sidebar oculto)
- Header sticky (siempre visible al scrollear)

**Placeholders y estados vacios**
- Secciones sin contenido muestran card informativa: titulo de la seccion, breve descripcion de que contendra, icono representativo
- Pagina de Informacion General es la ruta raiz (/): presentacion del curso (nombre, profesor, semestre, descripcion) + mini-guia de uso de la plataforma
- Footer minimo: una linea con creditos "BDD Lab UTFSM - Ayudantia INF-239 - 2026"

### Claude's Discretion
- Exact color shades para fondos y superficies (dentro del espectro slate/zinc dark)
- Spacing y sizing del sidebar (ancho expandido, ancho colapsado)
- Animaciones y transiciones (sidebar collapse, overlay open/close)
- Iconos especificos para cada seccion y estado
- Estructura interna de componentes y hooks

### Deferred Ideas (OUT OF SCOPE)
None — discussion stayed within phase scope
</user_constraints>

---

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|-----------------|
| LAYOUT-01 | Sidebar con 6 unidades (U1 activa, U2-U6 bloqueadas visualmente) | Patron data-driven con array de unidades en archivo de datos; estado locked via flag en datos |
| LAYOUT-02 | Header muestra branding "BDD Lab UTFSM — Ayudantia INF-239" | Componente Header sticky con `sticky top-0 z-10` en Tailwind v4 |
| LAYOUT-03 | Footer con creditos del curso | Componente Footer minimo, una linea |
| LAYOUT-04 | Sub-navegacion por secciones dentro de unidad (Conceptos, Ejercicios, Editor SQL, Quiz, Cheat Sheet) | Sub-items en sidebar como hijos en el array de datos; React Router nested routes con Outlet |
| LAYOUT-05 | Sidebar colapsable en mobile/tablet | Estado `isOpen` con `useState`; overlay pattern con `translate-x` en mobile; toggle en desktop |
| LAYOUT-06 | Pagina de Informacion General (presentacion del curso, profesores, programa) | Ruta index `/` — componente InfoGeneral con datos del curso hardcodeados |
| LAYOUT-07 | Placeholders bloqueados para Tareas, Certamenes, Ayudantias en sidebar | Seccion separada en datos del sidebar con flag `locked: true` |
| NFR-01 | Dark mode profesional con tipografia clara para codigo y texto | `@custom-variant dark` en CSS + clase `dark` fija en `<html>`; Inter via Google Fonts o Fontsource |
| NFR-02 | Responsive desktop y tablet | Tailwind breakpoint `lg:` (1024px); sidebar visible en desktop, oculto en mobile |
| NFR-03 | Arquitectura modular — agregar unidades sin tocar componentes existentes | Unico archivo `src/data/units.ts` con array de unidades; componentes leen de ahi |
| NFR-05 | Todo el contenido e interfaz en espanol | Sin i18n library — todo hardcodeado en espanol desde el inicio |
</phase_requirements>

---

## Summary

Esta fase construye el shell visual completo de BDD Lab UTFSM. El trabajo es puramente de layout y routing — no hay logica de negocio ni contenido real. El riesgo tecnico es bajo porque el stack (React + Tailwind + React Router) es maduro, pero Tailwind v4 tiene breaking changes significativos respecto a v3 que pueden generar confusion si se mezclan sintaxis.

El patron central es data-driven navigation: un archivo `src/data/units.ts` define todas las unidades con sus metadatos (nombre, secciones, estado bloqueado/desbloqueado). Los componentes del sidebar y la navegacion leen de ese archivo y nunca se tocan cuando se agrega una nueva unidad. Esto cumple directamente NFR-03.

La parte mas cuidadosa es el dark mode con Tailwind v4: ya no existe `darkMode: 'class'` en `tailwind.config.js` (ese archivo no existe en v4). Se configura con `@custom-variant dark` en el CSS y se activa poniendo la clase `dark` directamente en el `<html>`. Como la plataforma es siempre dark, la clase se pone estaticamente — sin toggle ni localStorage.

**Primary recommendation:** Inicializar con `npm create vite@latest` (template react-ts), instalar `tailwindcss @tailwindcss/vite react-router`, configurar `@custom-variant dark` en CSS con clase `dark` estatica en HTML, luego construir layout con sidebar data-driven antes de cualquier contenido.

---

## Standard Stack

### Core

| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| react | 19.x | UI framework | Stack definido en PROJECT.md |
| react-dom | 19.x | DOM renderer | Par de react |
| typescript | 5.x | Tipado estatico | Stack definido en PROJECT.md |
| vite | 7.3.1 | Build tool y dev server | Stack definido en PROJECT.md |
| tailwindcss | 4.2.1 | CSS utility framework | Stack definido en PROJECT.md |
| @tailwindcss/vite | 4.2.1 | Plugin Vite para Tailwind v4 | Reemplaza PostCSS en v4 — obligatorio para Vite |
| react-router | 7.13.1 | Client-side routing | Stack definido en PROJECT.md; v7 unifica react-router-dom |

### Supporting

| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| lucide-react | latest | Iconos SVG | Iconos para lock, chevron, menu, seccion-icons — tree-shakeable, estilo limpio |
| @fontsource/inter | latest | Tipografia Inter | Alternativa a Google Fonts sin request externo |
| @fontsource/jetbrains-mono | latest | Tipografia JetBrains Mono | Para codigo en secciones futuras; conviene instalarlo en fase 1 |

### Alternatives Considered

| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| lucide-react | heroicons, react-icons | lucide es mas liviano y consistente; heroicons tambien es buena opcion si ya conocida |
| @fontsource | Google Fonts CDN link | Google Fonts es mas simple pero requiere internet; fontsource bundlea las fuentes |
| react-router BrowserRouter | HashRouter | HashRouter no requiere config de servidor pero URLs con `#` son poco profesionales |

**Installation:**
```bash
npm create vite@latest bdd-lab -- --template react-ts
cd bdd-lab
npm install tailwindcss @tailwindcss/vite react-router lucide-react
npm install @fontsource/inter @fontsource/jetbrains-mono
```

---

## Architecture Patterns

### Recommended Project Structure

```
src/
├── data/
│   └── units.ts          # Array de unidades — UNICA fuente de verdad para nav
├── components/
│   ├── layout/
│   │   ├── AppLayout.tsx     # Layout raiz — sidebar + header + main + footer
│   │   ├── Sidebar.tsx       # Sidebar con estado collapsed/expanded + mobile overlay
│   │   ├── SidebarUnit.tsx   # Item de unidad con sub-secciones expandibles
│   │   ├── Header.tsx        # Header sticky con hamburger en mobile
│   │   └── Footer.tsx        # Footer minimo
│   └── ui/
│       ├── PlaceholderSection.tsx  # Card de placeholder para secciones vacias
│       └── LockBadge.tsx           # Badge/tooltip de "Proximamente"
├── pages/
│   ├── InfoGeneral.tsx       # Ruta raiz "/" — presentacion del curso
│   └── SectionPage.tsx       # Ruta "/unit/:unitId/:section" — placeholder por ahora
├── router.tsx                # Definicion de rutas con createBrowserRouter
├── main.tsx                  # Entry point
└── index.css                 # @import "tailwindcss" + @custom-variant dark + @theme
```

### Pattern 1: Data-Driven Navigation (NFR-03)

**What:** Un solo archivo de datos define las unidades. Los componentes iteran sobre el array sin conocer las unidades especificas.

**When to use:** Siempre que agregar contenido no deba implicar tocar componentes.

**Example:**
```typescript
// src/data/units.ts
export interface UnitSection {
	id: string;
	label: string;
	icon: string; // nombre de lucide icon
}

export interface Unit {
	id: string;
	number: number;
	title: string;
	locked: boolean;
	sections: UnitSection[];
}

export const SECTIONS: UnitSection[] = [
	{ id: 'conceptos', label: 'Conceptos', icon: 'BookOpen' },
	{ id: 'ejercicios', label: 'Ejercicios', icon: 'PenTool' },
	{ id: 'editor-sql', label: 'Editor SQL', icon: 'Terminal' },
	{ id: 'quiz', label: 'Quiz', icon: 'CheckSquare' },
	{ id: 'cheat-sheet', label: 'Cheat Sheet', icon: 'FileText' },
];

export const UNITS: Unit[] = [
	{
		id: 'u1',
		number: 1,
		title: 'Introduccion a Bases de Datos',
		locked: false,
		sections: SECTIONS,
	},
	{ id: 'u2', number: 2, title: 'Modelo Entidad-Relacion', locked: true, sections: SECTIONS },
	{ id: 'u3', number: 3, title: 'Modelo Relacional', locked: true, sections: SECTIONS },
	{ id: 'u4', number: 4, title: 'SQL', locked: true, sections: SECTIONS },
	{ id: 'u5', number: 5, title: 'Normalizacion', locked: true, sections: SECTIONS },
	{ id: 'u6', number: 6, title: 'Temas Avanzados', locked: true, sections: SECTIONS },
];

// Items de la seccion inferior del sidebar (bloqueados en v1)
export const SIDEBAR_EXTRA = [
	{ id: 'tareas', label: 'Tareas', icon: 'ClipboardList', locked: true },
	{ id: 'certamenes', label: 'Certamenes', icon: 'FileCheck', locked: true },
	{ id: 'ayudantias', label: 'Ayudantias', icon: 'Users', locked: true },
];
```

### Pattern 2: Layout Route con Outlet

**What:** React Router v7 en modo declarativo. Un layout route sin `path` envuelve todas las rutas y renderiza sidebar + header. Las rutas hijas se inyectan via `<Outlet />`.

**When to use:** Cuando todas las rutas comparten el mismo shell visual.

**Example:**
```tsx
// src/router.tsx
import { createBrowserRouter } from 'react-router';
import AppLayout from './components/layout/AppLayout';
import InfoGeneral from './pages/InfoGeneral';
import SectionPage from './pages/SectionPage';

export const router = createBrowserRouter([
	{
		element: <AppLayout />,
		children: [
			{ index: true, element: <InfoGeneral /> },
			{ path: 'unit/:unitId/:section', element: <SectionPage /> },
		],
	},
]);

// src/main.tsx
import { RouterProvider } from 'react-router';
ReactDOM.createRoot(document.getElementById('root')!).render(
	<RouterProvider router={router} />
);

// src/components/layout/AppLayout.tsx
import { Outlet } from 'react-router';
export default function AppLayout() {
	return (
		<div className="flex h-screen bg-zinc-950">
			<Sidebar />
			<div className="flex flex-col flex-1 min-w-0">
				<Header />
				<main className="flex-1 overflow-auto p-6">
					<Outlet />
				</main>
				<Footer />
			</div>
		</div>
	);
}
```

### Pattern 3: Sidebar Responsivo (Overlay Mobile + Collapse Desktop)

**What:** En desktop el sidebar tiene dos estados: expandido (ancho fijo) y colapsado (solo iconos). En mobile (<lg) el sidebar es un overlay que se abre desde el header.

**When to use:** Breakpoint `lg:` de Tailwind (1024px) para separar comportamientos.

**Example:**
```tsx
// Estado del sidebar manejado en AppLayout con useState
// En mobile: posicion fixed, transform -translate-x-full / translate-x-0
// En desktop: lg:relative, lg:translate-x-0, width condicional

// Sidebar.tsx — estructura de clases
const sidebarClass = `
  fixed inset-y-0 left-0 z-40
  transition-transform duration-200
  ${isOpen ? 'translate-x-0' : '-translate-x-full'}
  lg:relative lg:translate-x-0
  ${collapsed ? 'lg:w-16' : 'lg:w-64'}
  bg-zinc-900 border-r border-zinc-800
  flex flex-col
`;
```

### Pattern 4: Dark Mode Permanente con Tailwind v4

**What:** En Tailwind v4 no existe `tailwind.config.js`. El dark mode class-based se configura con `@custom-variant` en el CSS. Como la plataforma es siempre dark, se pone la clase `dark` estaticamente en `<html>`.

**Example:**
```css
/* src/index.css */
@import "tailwindcss";

@custom-variant dark (&:where(.dark, .dark *));

@theme {
	--font-sans: 'Inter', sans-serif;
	--font-mono: 'JetBrains Mono', monospace;
}
```

```html
<!-- index.html -->
<html lang="es" class="dark">
```

```tsx
// Uso en componentes — dark: prefix funciona igual que en v3
<div className="bg-zinc-950 dark:text-zinc-100">
```

### Anti-Patterns to Avoid

- **No usar `tailwind.config.js`:** En v4 no existe para la configuracion de dark mode ni temas. Todo en CSS con `@theme` y `@custom-variant`.
- **No usar `react-router-dom`:** En React Router v7 el paquete es solo `react-router`. Importar de `react-router-dom` falla.
- **No hardcodear colores en hex en clases:** Usar las variables de Tailwind (`bg-zinc-950`, `text-indigo-500`) para mantener el sistema de diseno coherente. Solo usar `[#hex]` si no hay alternativa.
- **No gestionar estado del sidebar en cada componente hijo:** El estado `isOpen` / `collapsed` vive en `AppLayout` y se pasa via props o context.
- **No usar `@tailwind base/components/utilities`:** En v4 es `@import "tailwindcss"` — las directivas v3 generan error.

---

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Iconos SVG | Componentes SVG inline para cada icono | `lucide-react` | 1000+ iconos consistentes, tree-shakeable, API simple |
| Tipografias | Descarga manual de .woff2 y @font-face | `@fontsource/inter` | Self-hosted, npm install, tree-shakeable por peso |
| Client-side routing | `window.history.pushState` manual | `react-router` v7 | Manejo de historial, scroll restoration, nested routes |
| Responsive breakpoints | Media queries custom en CSS | Prefijos `lg:` de Tailwind | Consistencia con el sistema de diseno |

**Key insight:** Este phase es casi 100% UI shell — la complejidad real esta en los datos y el routing, no en la logica. Cualquier abstraccion prematura en esta fase crea deuda para las fases 2-4.

---

## Common Pitfalls

### Pitfall 1: Mezclar sintaxis Tailwind v3 y v4

**What goes wrong:** Se usan clases v3 como `shadow` (que en v4 es `shadow-sm`) o `rounded` (que en v4 es `rounded-sm`). El componente se ve diferente a lo esperado.

**Why it happens:** La documentacion y ejemplos en internet mezclan versiones. Tutoriales pre-2025 usan v3.

**How to avoid:** Memorizar las clases renombradas clave para este proyecto:
- `shadow` → `shadow-sm`, `shadow-sm` → `shadow-xs`
- `rounded` → `rounded-sm`, `rounded-sm` → `rounded-xs`
- `ring` (3px) → `ring-3`
- `outline-none` → `outline-hidden`
- Gradientes: `bg-gradient-to-r` → `bg-linear-to-r`

**Warning signs:** Sombras o bordes redondeados mas pequenos de lo esperado.

### Pitfall 2: Dark mode no aplica en Tailwind v4

**What goes wrong:** Se pone `dark:bg-zinc-900` en un componente pero no se ve ningun cambio.

**Why it happens:** En v4 el variant `dark` por defecto usa `prefers-color-scheme` (media query del SO). Si el SO esta en modo claro, las clases `dark:` no aplican aunque se quiera siempre dark.

**How to avoid:** SIEMPRE declarar `@custom-variant dark (&:where(.dark, .dark *));` en `index.css` Y poner `class="dark"` en el `<html>`. Sin el `@custom-variant`, la clase `dark` en el HTML no hace nada.

**Warning signs:** `dark:` clases sin efecto en el browser aunque el HTML tenga `class="dark"`.

### Pitfall 3: Importar de `react-router-dom` en React Router v7

**What goes wrong:** `import { Link } from 'react-router-dom'` falla en runtime o TypeScript se queja.

**Why it happens:** En v7 el paquete se consolido en `react-router`. `react-router-dom` aun existe pero es redundante y puede causar version conflicts.

**How to avoid:** Instalar solo `react-router` (no `react-router-dom`). Todos los imports son de `'react-router'`.

**Warning signs:** Errores de TypeScript sobre modulos no encontrados o comportamiento inesperado de rutas.

### Pitfall 4: Sidebar con estado fragmentado

**What goes wrong:** El estado `isOpen` (mobile) y `collapsed` (desktop) se maneja en Sidebar.tsx en lugar de AppLayout.tsx. El Header no puede cerrar el sidebar y el overlay no funciona correctamente.

**Why it happens:** Es tentador encapsular el estado en el componente Sidebar, pero Header necesita el handler para el hamburger button.

**How to avoid:** El estado del sidebar vive en `AppLayout`. Se pasa `isOpen`, `collapsed`, `onToggleMobile`, `onToggleDesktop` como props a Sidebar y `onOpenMobile` a Header.

**Warning signs:** El hamburger button en Header no funciona para abrir el sidebar.

### Pitfall 5: Rutas URL inconsistentes con los datos

**What goes wrong:** La URL es `/unit/u1/conceptos` pero el componente `SectionPage` no puede encontrar la unidad porque el `unitId` en la URL no coincide con el `id` en `UNITS`.

**Why it happens:** Se definen los IDs de manera inconsistente entre el router y los datos.

**How to avoid:** El `path` en el router es `:unitId/:section` y los valores en `UNITS` deben coincidir exactamente con lo que se usa en `<Link to={`unit/${unit.id}/${section.id}`}>`. Validar en `SectionPage` con `UNITS.find(u => u.id === unitId)`.

**Warning signs:** La pagina de seccion siempre muestra el placeholder de "unidad no encontrada".

---

## Code Examples

Verified patterns from official sources:

### Setup completo vite.config.ts (Tailwind v4)

```typescript
// Source: https://tailwindcss.com/docs (instalacion con Vite)
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';

export default defineConfig({
	plugins: [
		react(),
		tailwindcss(),
	],
	resolve: {
		alias: {
			'@': path.resolve(__dirname, './src'),
		},
	},
});
```

### index.css base

```css
/* Source: https://tailwindcss.com/docs/dark-mode */
@import "tailwindcss";

/* Dark mode class-based para Tailwind v4 */
@custom-variant dark (&:where(.dark, .dark *));

/* Tema: fuentes y colores base */
@theme {
	--font-sans: 'Inter', ui-sans-serif, system-ui, sans-serif;
	--font-mono: 'JetBrains Mono', ui-monospace, monospace;
}

/* Fuentes aplicadas al body */
@layer base {
	body {
		font-family: var(--font-sans);
	}
	code, pre {
		font-family: var(--font-mono);
	}
}
```

### Layout Route con Outlet (React Router v7)

```tsx
// Source: https://reactrouter.com/start/library/routing
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router';

function AppLayout() {
	return (
		<div className="flex h-screen bg-zinc-950 text-zinc-100">
			<Sidebar />
			<div className="flex flex-col flex-1 min-w-0 overflow-hidden">
				<Header />
				<main className="flex-1 overflow-auto">
					<Outlet />
				</main>
				<Footer />
			</div>
		</div>
	);
}

const router = createBrowserRouter([
	{
		element: <AppLayout />,
		children: [
			{ index: true, element: <InfoGeneral /> },
			{ path: 'unit/:unitId/:section', element: <SectionPage /> },
		],
	},
]);

// main.tsx
<RouterProvider router={router} />
```

### NavLink activo para secciones del sidebar

```tsx
// Source: https://reactrouter.com/start/library/navigating
import { NavLink } from 'react-router';

// NavLink aplica clase 'active' automaticamente cuando la ruta coincide
<NavLink
	to={`/unit/${unit.id}/${section.id}`}
	className={({ isActive }) =>
		`flex items-center gap-2 px-3 py-2 rounded-sm text-sm transition-colors
		${isActive
			? 'bg-indigo-500/10 text-indigo-400 font-medium'
			: 'text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800'
		}`
	}
>
	{section.label}
</NavLink>
```

### Sidebar colapsable — patron de clases

```tsx
// Pattern responsive: fixed en mobile, relative en desktop
// Transicion suave con duration-200
const sidebarClasses = [
	// Base — mobile: off-canvas overlay
	'fixed inset-y-0 left-0 z-40 flex flex-col',
	'bg-zinc-900 border-r border-zinc-800',
	'transition-transform duration-200',
	// Mobile: oculto por defecto, visible cuando isOpen
	isOpen ? 'translate-x-0' : '-translate-x-full',
	// Desktop: siempre visible, relativo al flujo
	'lg:relative lg:translate-x-0',
	// Ancho: expandido o colapsado
	collapsed ? 'w-16' : 'w-64',
].join(' ');
```

---

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| `tailwind.config.js` con `darkMode: 'class'` | `@custom-variant dark` en CSS | Tailwind v4 (2025) | No existe el config file de JS |
| `@tailwind base/components/utilities` | `@import "tailwindcss"` | Tailwind v4 (2025) | Una sola linea reemplaza tres directivas |
| `import { X } from 'react-router-dom'` | `import { X } from 'react-router'` | React Router v7 (2024) | Un solo paquete, misma API |
| `shadow`, `rounded` (clases v3) | `shadow-sm`, `rounded-sm` (v4 renombradas) | Tailwind v4 (2025) | Semantica mas clara pero breaking change |
| `bg-gradient-to-r` | `bg-linear-to-r` | Tailwind v4 (2025) | Gradientes renombrados |

**Deprecated/outdated:**
- `tailwind.config.js` para dark mode: No existe en v4. No crear este archivo.
- `react-router-dom` como paquete separado: Redundante en v7, usar `react-router` directamente.
- `<Switch>` de react-router v5: Reemplazado por `<Routes>` en v6+, y por `createBrowserRouter` en v7.

---

## Open Questions

1. **React 19 Compiler vs. modo clasico**
   - What we know: React 19 incluye el React Compiler (opt-in) que memoiza automaticamente
   - What's unclear: Si `@vitejs/plugin-react` en la version actual soporta el compiler o requiere configuracion adicional
   - Recommendation: Usar React 19 sin el compiler en fase 1 (modo clasico). Añadir si hay problemas de performance obvios en fases posteriores. El template `react-ts` de Vite ya configura lo minimo correcto.

2. **Fuentes: Fontsource vs Google Fonts CDN**
   - What we know: Fontsource self-hostea, Google Fonts requiere internet externa
   - What's unclear: Si el entorno de desarrollo tiene acceso a Google Fonts sin latencia notable
   - Recommendation: Usar `@fontsource/inter` y `@fontsource/jetbrains-mono` — instalacion simple con npm, sin dependencia de CDN externo.

3. **Manejo de scroll en cambio de ruta**
   - What we know: React Router v7 con `createBrowserRouter` incluye scroll restoration automatico
   - What's unclear: Si el scroll restoration funciona correctamente dentro del `<main>` con `overflow-auto`
   - Recommendation: Verificar despues de implementar. Si el scroll no se resetea al navegar entre secciones, agregar `<ScrollRestoration />` de react-router en el layout.

---

## Sources

### Primary (HIGH confidence)
- https://tailwindcss.com/docs — Instalacion con Vite, dark mode v4, upgrade guide con breaking changes
- https://reactrouter.com/start/library/routing — Modo declarativo, BrowserRouter, Outlet, NavLink
- `npm info` — Versiones confirmadas: react-router@7.13.1, tailwindcss@4.2.1, @tailwindcss/vite@4.2.1, vite@7.3.1

### Secondary (MEDIUM confidence)
- https://tailwindcss.com/docs/upgrade-guide — Breaking changes v3→v4 verificados contra docs oficiales
- https://tailwindcss.com/docs/dark-mode — Patron `@custom-variant dark` verificado en docs oficiales

### Tertiary (LOW confidence)
- Multiples articulos de DEV.to y Medium sobre sidebar responsivo con Tailwind — patrones verificados como consistentes con docs oficiales pero no citation directa

---

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH — versiones verificadas con `npm info`, stack definido en PROJECT.md
- Architecture: HIGH — patrones de React Router y Tailwind verificados contra docs oficiales
- Pitfalls: HIGH — breaking changes de Tailwind v4 verificados en upgrade guide oficial; pitfalls de dark mode verificados en GitHub discussions oficiales
- Data-driven pattern: HIGH — patron estandar de React, no requiere libreria externa

**Research date:** 2026-03-02
**Valid until:** 2026-04-02 (Tailwind v4 y React Router v7 son relativamente estables en este punto)
