# Architecture Research

**Domain:** Client-side educational SQL learning platform (React SPA, in-browser SQL)
**Researched:** 2026-03-02
**Confidence:** MEDIUM — Core patterns verified via official docs and multiple sources; AlaSQL-specific React integration patterns from official GitHub + community examples.

## Standard Architecture

### System Overview

```
┌──────────────────────────────────────────────────────────────────────┐
│                         Browser (SPA)                                │
├──────────────────────────────────────────────────────────────────────┤
│  ┌──────────────┐  ┌─────────────────────────────────────────────┐   │
│  │   Sidebar    │  │              Content Area                   │   │
│  │  (Nav/Units) │  │  ┌─────────┐ ┌──────────┐ ┌─────────────┐  │   │
│  │              │  │  │Concepts │ │Exercises │ │  SQL Editor │  │   │
│  │  U1 active   │  │  └─────────┘ └──────────┘ └──────┬──────┘  │   │
│  │  U2-U6 lock  │  │  ┌─────────┐ ┌──────────┐        │         │   │
│  │              │  │  │  Quiz   │ │Cheat Sht │        │         │   │
│  └──────┬───────┘  │  └─────────┘ └──────────┘        │         │   │
│         │          └───────────────────────────────────┼─────────┘   │
│         │                                              │             │
├─────────┴──────────────────────────────────────────────┼─────────────┤
│                     App State (Zustand)                │             │
│  ┌──────────────┐  ┌───────────────────┐               │             │
│  │  Navigation  │  │   UI State        │               │             │
│  │ activeUnit   │  │ sidebarCollapsed  │               │             │
│  │ activeSection│  │ darkMode (always) │               │             │
│  └──────────────┘  └───────────────────┘               │             │
├────────────────────────────────────────────────────────┼─────────────┤
│                    SQL Engine Layer                     │             │
│  ┌──────────────────────────────────────────────────┐  │             │
│  │  AlaSQL (in-memory, initialized once at app load)│◄─┘             │
│  │  - Universidad DB (tablas precargadas)           │               │
│  │  - Stateless per-query execution                 │               │
│  └──────────────────────────────────────────────────┘               │
├─────────────────────────────────────────────────────────────────────┤
│                    Content Data Layer (static)                       │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐            │
│  │ units/   │  │ db/      │  │exercises/│  │ quizzes/ │            │
│  │ u1.ts    │  │ schema.ts│  │ u1.ts    │  │ u1.ts    │            │
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘            │
└─────────────────────────────────────────────────────────────────────┘
```

### Component Responsibilities

| Component | Responsibility | Communicates With |
|-----------|----------------|-------------------|
| `AppLayout` | Root shell: header, sidebar, content area, footer | All top-level components |
| `Sidebar` | Unit list, lock state per unit, active unit highlight, collapse on mobile | App state (navigation), React Router |
| `UnitNav` | Sub-section tabs within a unit (Conceptos / Ejercicios / Editor / Quiz / Cheat Sheet) | App state (navigation) |
| `ConceptsSection` | Renders static markdown/JSX content for a unit's theory | Content data files |
| `ExercisesSection` | Step-by-step guided exercises with expected answers | Content data files, SQL Engine |
| `SqlEditor` | Monaco/textarea input + run button + result table + error display | SQL Engine service |
| `QuizSection` | Multiple choice questions, immediate feedback, score | Content data files |
| `CheatSheetSection` | Visual summary tables and definitions | Content data files |
| `SqlEngine` (service) | AlaSQL initialization, DB seeding, query execution, reset | AlaSQL (singleton module) |
| `content/units/*` | Static TypeScript data objects: unit metadata, lock state | All section components |
| `content/db/*` | DB schema definition + seed data for AlaSQL | SqlEngine |

## Recommended Project Structure

```
src/
├── components/
│   ├── layout/
│   │   ├── AppLayout.tsx        # Root shell with sidebar + content area
│   │   ├── Sidebar.tsx          # Unit list, lock states
│   │   ├── Header.tsx
│   │   └── Footer.tsx
│   ├── ui/                      # Reusable atoms: Button, Badge, Table, Tabs
│   └── sql-editor/
│       ├── SqlEditor.tsx        # Input + run button
│       ├── ResultTable.tsx      # Query output grid
│       └── ErrorDisplay.tsx
├── sections/                    # Section-level page components (one per tab)
│   ├── ConceptsSection.tsx
│   ├── ExercisesSection.tsx
│   ├── SqlEditorSection.tsx
│   ├── QuizSection.tsx
│   └── CheatSheetSection.tsx
├── content/                     # Pure data — no React, no logic
│   ├── units/
│   │   ├── index.ts             # Unit registry + lock state
│   │   ├── u1/
│   │   │   ├── concepts.tsx     # Theory content (JSX or MDX)
│   │   │   ├── exercises.ts     # Guided exercise definitions
│   │   │   ├── quiz.ts          # Quiz questions + correct answers
│   │   │   └── cheatsheet.tsx   # Cheat sheet content
│   │   └── u2/                  # Placeholder — empty or locked stub
│   └── db/
│       ├── schema.ts            # CREATE TABLE statements
│       └── seed.ts              # INSERT data for the university DB
├── engine/
│   └── sql.ts                   # AlaSQL singleton: init, execute, reset
├── store/
│   └── appStore.ts              # Zustand store: navigation + UI state
├── hooks/
│   └── useSqlEngine.ts          # React hook wrapping sql.ts
├── router/
│   └── index.tsx                # React Router config
└── main.tsx
```

### Structure Rationale

- **`content/units/u{N}/`:** Each unit is a self-contained directory. Adding U2 = create `u2/`, add data, register in `units/index.ts`, change lock state. Zero impact on existing code.
- **`engine/sql.ts` as singleton module:** AlaSQL state is global per tab session. A module-level singleton avoids multiple initializations across React renders.
- **`sections/` vs `components/`:** Sections are full-page views (route-level). Components are reusable primitives. Never mix them.
- **`content/` has no React imports:** Keeps content portable, testable, and replaceable. Concepts can be JSX but should import nothing from React Router or stores.

## Architectural Patterns

### Pattern 1: Module-Level AlaSQL Singleton

**What:** Initialize AlaSQL once at module load time, not inside React components. Export execute/reset functions. Components never touch `alasql` directly.

**When to use:** Always. AlaSQL is stateful and global. Multiple initializations cause duplicate tables and data corruption.

**Trade-offs:** Simple, zero overhead. Downside: no React Suspense integration — handle loading state manually if seed is large.

**Example:**
```typescript
// src/engine/sql.ts
import alasql from 'alasql';
import { schema } from '../content/db/schema';
import { seed } from '../content/db/seed';

let initialized = false;

export function initDb(): void {
  if (initialized) return;
  schema.forEach(stmt => alasql(stmt));
  seed.forEach(stmt => alasql(stmt));
  initialized = true;
}

export function executeQuery(sql: string): { rows: unknown[]; error: string | null } {
  try {
    const rows = alasql(sql);
    return { rows: Array.isArray(rows) ? rows : [{ result: rows }], error: null };
  } catch (err) {
    return { rows: [], error: (err as Error).message };
  }
}

export function resetDb(): void {
  initialized = false;
  // Drop all tables before reinit
  alasql('SHOW TABLES').forEach((t: { tableid: string }) => {
    alasql(`DROP TABLE IF EXISTS \`${t.tableid}\``);
  });
  initDb();
}
```

### Pattern 2: Content Registry for Units

**What:** A central `units/index.ts` defines all units with metadata and lock state. Sections receive unit data as props. Adding a new unit = one entry in the registry.

**When to use:** Whenever content is structured in discrete units/chapters that can be locked/unlocked independently.

**Trade-offs:** Simple flat registry. Scales to ~10 units without issues. For 50+ units, consider lazy imports — overkill here.

**Example:**
```typescript
// src/content/units/index.ts
import type { Unit } from '../types';

export const UNITS: Unit[] = [
  {
    id: 'u1',
    title: 'Unidad 1: Introduccion a Bases de Datos',
    locked: false,
    sections: ['concepts', 'exercises', 'editor', 'quiz', 'cheatsheet'],
  },
  {
    id: 'u2',
    title: 'Unidad 2: Modelo Relacional',
    locked: true,
    sections: [],
  },
  // u3-u6 similarly locked
];
```

### Pattern 3: Section-Based Routing

**What:** React Router v6 with nested routes. URL encodes both unit and section: `/unit/u1/concepts`. Active unit and section come from URL params, not local state.

**When to use:** Multi-section content platforms. URL-driven navigation = shareable links, browser back/forward works correctly.

**Trade-offs:** Slightly more setup than tab state in a store. Worth it — deep links are essential for study tools.

**Example:**
```typescript
// src/router/index.tsx
<Routes>
  <Route path="/" element={<Navigate to="/unit/u1/concepts" replace />} />
  <Route path="/unit/:unitId/:section" element={<AppLayout />} />
</Routes>
```

## Data Flow

### User Executes SQL Query

```
[User types SQL in SqlEditor]
        |
        v
[Run button clicked]
        |
        v
[useSqlEngine.execute(sql)]  — React hook, calls engine/sql.ts
        |
        v
[executeQuery(sql)]  — engine/sql.ts, synchronous AlaSQL call
        |
    ┌───┴───┐
  success  error
    |        |
    v        v
[rows[]]  [error msg]
    |        |
    └───┬────┘
        v
[ResultTable or ErrorDisplay renders]
```

### Navigation to a Unit Section

```
[User clicks unit+section in Sidebar]
        |
        v
[React Router pushes /unit/:unitId/:section]
        |
        v
[AppLayout re-renders with new params]
        |
        v
[UnitNav highlights active section tab]
        |
        v
[Active section component mounts]
        |
        v
[Content data imported from content/units/u{N}/*.ts]
        |
        v
[Section renders with static content]
```

### State Management

```
Zustand appStore
  - sidebarCollapsed: boolean  (UI only)
  - No navigation state — that lives in React Router URL

React Router
  - unitId, section  (source of truth for navigation)

AlaSQL module (engine/sql.ts)
  - in-memory DB  (source of truth for data)
  - resets on explicit resetDb() call only
```

## Scaling Considerations

| Scale | Architecture Adjustments |
|-------|--------------------------|
| 1 unit (MVP) | Current structure works as-is. No optimization needed. |
| 6 units (full course) | Add u2-u6 to registry, create content files, change `locked: false`. Zero structural change. |
| Multiple courses | Add `course` dimension to registry. Each course has its own DB seed. Zustand store gets `activeCourse`. |

### Scaling Priorities

1. **First bottleneck — AlaSQL seeding at scale:** For very large datasets (thousands of rows), synchronous seed at startup causes a visible freeze. Fix: run seed in a `useEffect` with a loading spinner, or use `alasql.compile()` for bulk inserts. Not an issue for 6 introductory DB exercises.
2. **Second bottleneck — content bundle size:** MDX/JSX content for 6 units will grow. Fix: lazy-import unit content with `React.lazy()` + dynamic imports at the content registry level. Implement if TTI becomes slow.

## Anti-Patterns

### Anti-Pattern 1: Calling AlaSQL Inside React Components Directly

**What people do:** `import alasql from 'alasql'` inside `SqlEditor.tsx` and call it directly on button click.

**Why it's wrong:** Initialization logic scatters across components. No single place to reset or reinitialize the DB. Causes table-already-exists errors when components remount.

**Do this instead:** All AlaSQL calls go through `engine/sql.ts`. Components call `useSqlEngine()` hook only.

### Anti-Pattern 2: Storing Navigation in Zustand Instead of URL

**What people do:** `activeUnit` and `activeSection` as Zustand atoms, sidebar clicks update the store.

**Why it's wrong:** Browser back button breaks. Users can't share links to specific units or exercises. Deep linking for a study tool is a significant UX loss.

**Do this instead:** React Router `/unit/:unitId/:section` route params are the source of truth. Sidebar uses `<Link>` components, not store setters.

### Anti-Pattern 3: Mixing Content and Logic in Section Components

**What people do:** Quiz questions defined as constants inside `QuizSection.tsx`. SQL exercises hardcoded in `SqlEditorSection.tsx`.

**Why it's wrong:** Adding U2 requires editing existing component files, risking regressions. Content and rendering logic become coupled.

**Do this instead:** All content in `content/units/u{N}/`. Section components are pure renderers that accept data as props or import from the registry. Adding a unit never touches section components.

### Anti-Pattern 4: No DB Reset Mechanism in the SQL Editor

**What people do:** AlaSQL database initialized once, never reset. Students can DROP TABLE, corrupt data, or modify seed state permanently for the session.

**Why it's wrong:** One bad query breaks the exercise environment for all subsequent exercises. No way to recover without a page reload.

**Do this instead:** Expose a "Reset database" button in the SQL editor section. `resetDb()` drops all tables and re-runs schema + seed. Implement from day one.

## Integration Points

### External Services

| Service | Integration Pattern | Notes |
|---------|---------------------|-------|
| AlaSQL | Module import, singleton init | No HTTP calls. Pure in-memory. Initialized at app startup. |
| Vite | Static bundler, no SSR | Tree-shaking removes unused content. AlaSQL is ~300KB min+gz. |
| React Router v6 | Nested routes for unit/section navigation | URL is source of truth for navigation state. |
| Tailwind CSS | Utility classes only, no runtime CSS-in-JS | Dark mode via `class` strategy, `dark` class on `<html>`. |

### Internal Boundaries

| Boundary | Communication | Notes |
|----------|---------------|-------|
| Sections `<->` Content data | Direct TypeScript import | Content files export typed objects. No indirect access. |
| Sections `<->` SQL Engine | Via `useSqlEngine` hook | Hook wraps `engine/sql.ts`. Sections never import `alasql` directly. |
| Sidebar `<->` Navigation | React Router `<Link>` + `useParams` | No Zustand for navigation. |
| AppLayout `<->` Zustand | `sidebarCollapsed` only | UI state only — no business logic in store. |

## Sources

- AlaSQL official GitHub (confidence: HIGH): https://github.com/AlaSQL/alasql
- AlaSQL browser session reset behavior (confidence: HIGH via GitHub issue #565): https://github.com/agershun/alasql/issues/565
- Robin Wieruch React folder structure 2025 (confidence: MEDIUM): https://www.robinwieruch.de/react-folder-structure/
- React Router v6 URL-driven navigation (confidence: HIGH): standard React Router docs pattern
- Zustand for lightweight SPA state (confidence: HIGH — multiple sources agree, ~1KB, no boilerplate): https://github.com/pmndrs/zustand
- Interactive SQL platform architecture patterns (confidence: MEDIUM — derived from SQLBolt, learnsqlonline.org analysis): https://sqlbolt.com/
- Building an interactive SQL learning platform with React and SQL.js (confidence: MEDIUM — architectural analogue): https://blog.seancoughlin.me/building-an-interactive-sql-learning-platform-with-react-nextjs-and-sqljs

---
*Architecture research for: BDD Lab UTFSM — client-side educational SQL platform*
*Researched: 2026-03-02*
