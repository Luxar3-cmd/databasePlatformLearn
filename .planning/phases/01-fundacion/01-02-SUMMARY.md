---
phase: 01-fundacion
plan: 02
subsystem: ui
tags: [react-router, layout, sidebar, navigation, dark-mode, tailwindcss, lucide-react]

requires:
  - phase: 01-01
    provides: "UNITS/SIDEBAR_EXTRA data arrays, SectionId type, Vite + Tailwind v4 configurados"

provides:
  - "React Router v7 con createBrowserRouter, rutas index y unit/:unitId/:section"
  - "AppLayout: layout shell con Sidebar, Header, Outlet y Footer"
  - "Sidebar data-driven desde UNITS con lock states y seccion extra"
  - "SidebarUnit: U1 expandible con NavLinks activos, U2-U6 grayed out con Lock"
  - "Header sticky con branding 'BDD Lab UTFSM — Ayudantia INF-239'"
  - "Footer con creditos 'BDD Lab UTFSM - Ayudantia INF-239 - 2026'"

affects: [01-03, 02-01, 02-02]

tech-stack:
  added: []
  patterns:
    - "RouterProvider en main.tsx — App.tsx eliminado, router.tsx es el entry de rutas"
    - "NavLink con className func para aplicar estilos activos (indigo-500/10)"
    - "Mapa de iconos lucide estatico — import nombrado + Record<string, LucideIcon>"
    - "Sidebar responsive: fixed/translate en mobile, lg:relative lg:translate-x-0 en desktop"

key-files:
  created:
    - src/router.tsx
    - src/components/layout/AppLayout.tsx
    - src/components/layout/Header.tsx
    - src/components/layout/Footer.tsx
    - src/components/layout/Sidebar.tsx
    - src/components/layout/SidebarUnit.tsx
  modified:
    - src/main.tsx
    - src/App.tsx

key-decisions:
  - "App.tsx vaciado con export {} — RouterProvider en main.tsx elimina la necesidad del componente App raiz"
  - "Mapa de iconos estatico en SidebarUnit — NO dynamic import de lucide (bundle control, type safety)"
  - "expanded default true solo para unidades no bloqueadas — U1 arranca expandida"

patterns-established:
  - "Pattern 4: Sidebar responsive — fixed mobile con translate, lg:relative sin translate"
  - "Pattern 5: NavLink activo con className func — isActive ? 'bg-indigo-500/10 text-indigo-400' : 'text-zinc-400 hover:bg-zinc-800'"
  - "Pattern 6: Icono map estatico — importar iconos nombrados de lucide y mapearlos a Record<string, LucideIcon>"

requirements-completed: [LAYOUT-01, LAYOUT-02, LAYOUT-03, LAYOUT-07]

duration: 5min
completed: 2026-03-02
---

# Phase 1 Plan 02: Layout Shell — React Router + Sidebar data-driven + Header/Footer

**Layout shell navegable con React Router v7, sidebar data-driven (U1 activa, U2-U6 bloqueadas con Lock), header sticky con branding y footer — todo construido sobre el data layer de plan 01**

## Performance

- **Duration:** 5 min
- **Started:** 2026-03-02T20:15:47Z
- **Completed:** 2026-03-02T20:21:00Z
- **Tasks:** 2
- **Files modified:** 8

## Accomplishments

- Router configurado con `createBrowserRouter`: ruta index (InfoGeneral) y `unit/:unitId/:section` (SectionPage placeholder)
- AppLayout con Outlet, estado `isOpen/collapsed` para sidebar, overlay mobile
- Sidebar data-driven: itera UNITS desde `@/data/units`, muestra lock states, seccion extra separada por `border-t`
- NavLink con highlight activo `bg-indigo-500/10 text-indigo-400` en sub-secciones de U1
- `npx tsc --noEmit` pasa sin errores

## Task Commits

1. **Task 1: Router + AppLayout + Header + Footer** - `d2b1b35` (feat)
2. **Task 2: Sidebar con unidades, lock states y seccion extra** - `99bc87c` (feat)

## Files Created/Modified

- `src/router.tsx` - createBrowserRouter con rutas index y unit/:unitId/:section
- `src/components/layout/AppLayout.tsx` - Layout shell: Sidebar + Header + Outlet + Footer, estado mobile/collapse
- `src/components/layout/Header.tsx` - Sticky con branding, boton hamburger mobile
- `src/components/layout/Footer.tsx` - Creditos del curso
- `src/components/layout/Sidebar.tsx` - Sidebar responsive data-driven desde UNITS, seccion extra SIDEBAR_EXTRA
- `src/components/layout/SidebarUnit.tsx` - Item de unidad: expandible (U1) o grayed+lock (U2-U6), NavLink por seccion
- `src/main.tsx` - Reemplazado `<App />` por `<RouterProvider router={router} />`
- `src/App.tsx` - Vaciado (ya no se usa)

## Decisions Made

- **App.tsx vaciado con `export {}`:** RouterProvider en main.tsx hace innecesario el componente App raiz. Se mantiene el archivo para no romper imports existentes pero se limpia el contenido.
- **Mapa de iconos estatico en SidebarUnit:** El plan especificaba "NO dynamic import de lucide". Se crea `ICON_MAP: Record<string, LucideIcon>` con imports nombrados directos.
- **`expanded` default true para unidad activa:** U1 arranca expandida automaticamente (`useState(!unit.locked)`) — mejor UX para el estudiante que llega por primera vez.

## Deviations from Plan

None - plan ejecutado exactamente como estaba escrito.

## Issues Encountered

None.

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness

- Layout shell completo y funcional — listo para plan 01-03 (paginas de contenido por seccion)
- `AppLayout` con `Outlet` recibe cualquier componente que plan 01-03 registre en el router
- `SectionPage` placeholder en router.tsx debe ser reemplazado en plan 01-03 por componentes reales

## Self-Check: PASSED

- src/router.tsx: FOUND
- src/components/layout/AppLayout.tsx: FOUND
- src/components/layout/Header.tsx: FOUND
- src/components/layout/Footer.tsx: FOUND
- src/components/layout/Sidebar.tsx: FOUND
- src/components/layout/SidebarUnit.tsx: FOUND
- Commit d2b1b35: FOUND
- Commit 99bc87c: FOUND

---
*Phase: 01-fundacion*
*Completed: 2026-03-02*
