# Stack Research

**Domain:** Educational web platform — client-side SQL learning, static deployment
**Researched:** 2026-03-02
**Confidence:** HIGH (all versions verified against official sources and npm)

## Recommended Stack

### Core Technologies

| Technology | Version | Purpose | Why Recommended |
|------------|---------|---------|-----------------|
| React | 19.2.4 | UI framework | Stable, component model maps cleanly to the lesson/quiz/editor sections. No need for RSC features — this is a pure SPA, but React 19 is the current stable so no reason to use 18. |
| TypeScript | 5.9.3 | Type safety | Standard for any greenfield React project. With a modular content architecture (units as typed data), TS catches content shape errors at build time. |
| Tailwind CSS | 4.2 | Styling | v4 eliminates tailwind.config.js and PostCSS boilerplate via first-party Vite plugin. CSS-first config, automatic content detection, and container queries out of the box — matches dark-mode-first scope perfectly. |
| Vite | 7.3.1 | Build tool + dev server | Standard for React+TS SPAs. Requires Node 20+ (18 EOL'd). Static output deploys to GitHub Pages or Vercel with zero config. |
| AlaSQL | 4.17.0 | In-browser SQL engine | Only pure-JS SQL engine that runs CREATE TABLE / INSERT / SELECT / JOINs without WASM. Zero bundle complexity, synchronous API. Good enough for introductory SQL exercises covering U1-U6 syllabus. |

### Supporting Libraries

| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| @uiw/react-codemirror | ^4.x | SQL editor UI | Always — provides the interactive SQL editor with syntax highlighting. Wraps CodeMirror 6, which is modular (300KB core vs Monaco's 5-10MB). |
| @codemirror/lang-sql | ^6.x | SQL language support for CodeMirror | Paired with react-codemirror for syntax highlighting and basic autocomplete |
| react-router-dom | ^7.x (library mode) | Client-side routing | For navigating between units and sub-sections (Conceptos / Ejercicios / Editor / Quiz / Cheat Sheet). Use library mode, not framework mode — no SSR needed. |
| clsx | ^2.x | Conditional class merging | Standard utility for dynamic Tailwind class logic. Tiny, no alternative needed. |
| tailwind-merge | ^3.x | Merge Tailwind classes safely | Prevents duplicate class conflicts when building reusable components. Use alongside clsx. |

### Development Tools

| Tool | Purpose | Notes |
|------|---------|-------|
| ESLint + @typescript-eslint | Linting | Standard for React+TS. Use flat config (ESLint 9+). |
| Prettier | Code formatting | Set Tailwind plugin for class sorting: `prettier-plugin-tailwindcss`. |
| Vitest | Unit testing | Vite-native, zero config. Use for quiz logic and SQL exercise validation functions. |
| @vitejs/plugin-react | React fast-refresh in Vite | Required Vite plugin for React. Use SWC variant (`@vitejs/plugin-react-swc`) for faster transforms. |

## Installation

```bash
# Core framework
npm create vite@latest bdd-lab -- --template react-ts
cd bdd-lab

# Tailwind v4 with Vite plugin (no tailwind.config.js needed)
npm install tailwindcss @tailwindcss/vite

# In-browser SQL
npm install alasql

# Editor
npm install @uiw/react-codemirror @codemirror/lang-sql

# Routing
npm install react-router-dom

# Class utilities
npm install clsx tailwind-merge

# Dev dependencies
npm install -D @vitejs/plugin-react-swc vitest prettier prettier-plugin-tailwindcss
```

**vite.config.ts:**
```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
})
```

**src/index.css (Tailwind v4 — no directives needed):**
```css
@import "tailwindcss";

@theme {
  /* dark mode color tokens here */
}
```

## Alternatives Considered

| Recommended | Alternative | When to Use Alternative |
|-------------|-------------|-------------------------|
| AlaSQL | sql.js (SQLite WASM) | When you need full SQLite compliance and don't mind WASM setup complexity. sql.js is in-memory only without extra persistence work. For this project, AlaSQL's pure-JS approach is simpler with no WASM build concerns. |
| AlaSQL | PGlite (PostgreSQL WASM) | When teaching PostgreSQL-specific syntax matters. PGlite is 3MB compressed WASM, requires async API, single-connection only. Overkill for U1 content (ER concepts, basic DML). |
| CodeMirror 6 | Monaco Editor | When you need VS Code-level features (multi-file, IntelliSense, diff editor). Monaco is 5-10MB and has no mobile support. CodeMirror is modular, mobile-friendly, 300KB. |
| React Router v7 (library mode) | TanStack Router | When building a large app where type-safe routes are critical. For this project's simple unit/section navigation, React Router library mode is sufficient and well-known. |
| Tailwind v4 | Tailwind v3 | When targeting projects with locked Node.js < 20 or legacy PostCSS pipelines. v4 is the correct choice for all greenfield projects in 2026. |
| Vite 7 | Create React App | Never use Create React App — deprecated and unmaintained. |

## What NOT to Use

| Avoid | Why | Use Instead |
|-------|-----|-------------|
| Monaco Editor | 5-10MB uncompressed, no mobile support, overkill for a teaching SQL editor | CodeMirror 6 via @uiw/react-codemirror |
| Create React App | Deprecated, no active maintenance, slow builds | Vite 7 with @vitejs/plugin-react-swc |
| Tailwind v3 | Requires tailwind.config.js + PostCSS wiring; v4 replaces this cleanly | Tailwind v4 |
| next.js / Remix | SSR frameworks with server requirements — this project is static-only | Vite SPA + React Router library mode |
| axios | Heavy HTTP client (not needed — no backend calls in this project) | Native fetch if ever needed |
| Redux / Zustand | State management overkill — quiz state, SQL results, and navigation are local component state | React useState / useReducer |
| localStorage for progress | Listed as out of scope for v1 | No persistence in v1 |

## Stack Patterns by Variant

**If SQL needs grow beyond AlaSQL (e.g., window functions, CTEs, stored procedures):**
- Switch to PGlite (PostgreSQL WASM) for units covering advanced SQL
- API is async, requires migration of all `alasql()` calls to `await db.query()`
- AlaSQL 4.x does support basic CTEs and window functions, so evaluate first

**If content grows to 6 full units with rich media:**
- Consider splitting content into dynamic imports per unit to keep initial bundle small
- Vite's `import()` with React.lazy handles this without additional tooling

**If mobile usage becomes primary (currently responsive is enough):**
- CodeMirror 6 already supports mobile; no change needed for editor
- Sidebar collapsing is a CSS concern, no library swap needed

## Version Compatibility

| Package | Compatible With | Notes |
|---------|-----------------|-------|
| React 19.2.4 | react-router-dom ^7.x | RR v7 requires React 18+, works on 19 |
| Vite 7.x | Node.js >= 20 | Node 18 EOL'd April 2025; Vite 7 dropped it |
| Tailwind v4 | @tailwindcss/vite | Do NOT use @tailwindcss/postcss with Vite — use the Vite plugin instead |
| AlaSQL 4.17.0 | No WASM dependencies | Pure JS, works in any browser with ES2015+ |
| @uiw/react-codemirror ^4.x | React 18+ | Compatible with React 19 |
| TypeScript 5.9.x | React 19 types (@types/react ^19) | Install @types/react@^19 to match |

## Sources

- https://react.dev/versions — React 19.2.4 confirmed as current stable (March 2026). HIGH confidence.
- https://github.com/microsoft/typescript/releases — TypeScript 5.9.3 as current stable. HIGH confidence.
- https://vite.dev/blog/announcing-vite7 — Vite 7 announced, 7.3.1 is current. HIGH confidence.
- https://tailwindcss.com/blog/tailwindcss-v4 — Tailwind v4.0 released January 2025, current is v4.2. HIGH confidence.
- https://github.com/AlaSQL/alasql/releases — AlaSQL 4.17.0 released January 9, 2026. HIGH confidence.
- https://sourcegraph.com/blog/migrating-monaco-codemirror — Real-world CodeMirror vs Monaco comparison. MEDIUM confidence.
- https://medium.com/ekino-france/tanstack-router-vs-react-router-v7-32dddc4fcd58 — React Router vs TanStack Router comparison. MEDIUM confidence.

---
*Stack research for: BDD Lab UTFSM — educational SQL platform, client-side only*
*Researched: 2026-03-02*
