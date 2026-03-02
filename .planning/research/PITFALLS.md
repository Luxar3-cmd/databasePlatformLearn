# Pitfalls Research

**Domain:** Educational in-browser SQL learning platform (React + TypeScript + AlaSQL)
**Researched:** 2026-03-02
**Confidence:** MEDIUM — AlaSQL limitations verified via official wiki + GitHub issues; educational UX from multiple sources; React performance from official docs + community.

---

## Critical Pitfalls

### Pitfall 1: AlaSQL FOREIGN KEY Enforcement Is a Lie

**What goes wrong:**
AlaSQL parses FOREIGN KEY syntax for SQL compatibility but does not enforce referential integrity. `ON DELETE CASCADE`, `ON DELETE SET NULL`, `RESTRICT` — all are silently accepted and silently ignored. You can delete a parent row that has children without any error. Students write FK constraints expecting referential integrity, run queries that violate them, and see no error — learning the wrong mental model.

**Why it happens:**
Developers assume "it parsed without error" means "it's enforced." The AlaSQL wiki explicitly states it parses FK clauses for SQL-99 syntax support only. The enforcement logic is not implemented.

**How to avoid:**
- Add a visible disclaimer in the SQL editor UI: "AlaSQL en el browser no aplica FOREIGN KEY constraints ni ON DELETE CASCADE."
- Design U1 exercises to avoid queries where FK violation would be expected behavior.
- Pre-seed data that is already referentially consistent so the absence of enforcement doesn't produce wrong results.
- Do not design exercises that test "what happens when you violate a FK" — you can't demonstrate that correctly with AlaSQL.

**Warning signs:**
- Exercise deletes a parent row and expects a FK violation error — it won't throw one.
- Exercises testing ON DELETE CASCADE behavior — they won't cascade.
- Students notice inconsistent DB state that "should have been blocked."

**Phase to address:**
Phase where SQL Editor and exercises are built (U1 exercises). Design schema and seed data defensively around this limitation from day one.

---

### Pitfall 2: AlaSQL PRIMARY KEY Does Not Prevent Duplicates Reliably

**What goes wrong:**
PRIMARY KEY constraints are partially implemented in AlaSQL. Issues have been reported where duplicate PK values can be inserted without error, and DELETE operations on tables with PK indexes can throw internal errors ("Something wrong with primary key index on table"). If exercises rely on PK uniqueness enforcement to teach normalization concepts, students will get misleading results.

**Why it happens:**
AlaSQL's internal PK index implementation has known bugs (GitHub issues #1005, #1009). The library is unfunded open source with 399+ open issues and no corporate backing.

**How to avoid:**
- Treat AlaSQL as a query executor, not a constraint enforcer.
- Demonstrate PK concepts via explanation + correct data, not via "insert duplicate and see the error."
- Test every exercise schema with actual AlaSQL execution before shipping — do not assume standard SQL behavior.
- Reset AlaSQL database state between exercise runs (call `alasql('DROP DATABASE IF EXISTS...')`) to avoid state pollution from partial exercise completion.

**Warning signs:**
- Exercise schema uses composite PKs — composite FK/PK interaction has separate reported bugs.
- Exercise expects an error on duplicate insert — won't reliably occur.
- Database state appears corrupt between exercises (stale tables from previous run).

**Phase to address:**
Phase 1 (SQL Editor + exercises). Prototype the full exercise schema in AlaSQL before any UI work.

---

### Pitfall 3: AlaSQL Reserved Keywords Break Schemas Silently

**What goes wrong:**
AlaSQL has a long list of reserved keywords that, when used as column or table names, cause parser errors or silent failures. Confirmed reserved: `key`, `value`, `read`, `count`, `by`, `top`, `path`, `deleted`, `work`, `offset`, `matrix`, `query`. A university database schema naturally uses names like `value`, `key`, `count` — standard naming that works in PostgreSQL/MySQL will break in AlaSQL.

**Why it happens:**
The AlaSQL parser is hand-built and reserves words that standard SQL implementations handle via context. Developers copy schemas from real SQL databases and don't realize the keyword conflicts until runtime.

**How to avoid:**
- Run the full schema through AlaSQL in isolation before integrating it into the app.
- Avoid column names that match SQL keywords. Use `cantidad` instead of `count`, `clave` instead of `key`.
- If a keyword column name is pedagogically necessary, use backtick escaping: `` `count` ``.
- Document the schema mapping: "In this platform, column X is named Y for AlaSQL compatibility."

**Warning signs:**
- Parser error on valid-looking SQL with no obvious syntax issue.
- Column named `value`, `key`, `count`, `by`, or `offset` in the schema.
- Schema was designed for PostgreSQL/MySQL and is being ported to AlaSQL.

**Phase to address:**
Phase 1, during schema design. Validate schema in AlaSQL console before writing any React code.

---

### Pitfall 4: Hardcoded Content = Unscalable to U2-U6

**What goes wrong:**
Content (exercises, quiz questions, concepts, cheat sheets) is written directly into React components instead of as data structures. When U2 needs to be added, every component needs to be modified. What was "modular" at U1 becomes spaghetti by U3.

**Why it happens:**
It's faster to put content inline during development. TypeScript makes it easy to colocate content with components. The "I'll refactor it later" trap closes when there are 6 units of content.

**How to avoid:**
- Design data schemas for all content types before writing U1 content: `Exercise[]`, `QuizQuestion[]`, `Concept[]`, `CheatSheetSection[]`.
- Keep content in `.ts` data files (e.g., `src/data/units/u1/exercises.ts`), never inline in JSX.
- The unit router and sidebar should derive from a unit registry: adding U2 means adding one file and one registry entry, zero component changes.
- Define the data schema in Phase 1 even if only U1 data exists. The schema is the contract.

**Warning signs:**
- Quiz questions are strings inside a `useState` array in a component file.
- Exercise SQL is a template literal in the component that renders it.
- Adding U2 requires editing the sidebar component.

**Phase to address:**
Phase 1 architecture setup, before any content is written. Non-negotiable.

---

### Pitfall 5: Monaco Editor Bundle Size Kills Initial Load

**What goes wrong:**
Monaco Editor (VS Code's editor) adds 5-10MB uncompressed to the bundle. For a static educational site on GitHub Pages or Vercel, this means 3-8 second load times on average connections, killing first impressions. Monaco is also not supported on mobile.

**Why it happens:**
Monaco looks great in demos, has SQL syntax highlighting, and is easy to find tutorials for. Developers add it without measuring bundle impact.

**How to avoid:**
- Use CodeMirror 6 instead. ~300KB core, mobile-compatible, modular (only import what you need).
- If Monaco is chosen anyway: lazy-load it behind `React.lazy()` + `Suspense`, only on the SQL Editor route.
- Measure bundle size before and after adding any code editor library (`npx vite-bundle-visualizer`).

**Warning signs:**
- `npm install monaco-editor` without checking bundle size.
- SQL editor is imported at the root layout level instead of lazily.
- No bundle analyzer in the project setup.

**Phase to address:**
Phase 1 technical setup — decide and lock the editor library choice before content work begins.

---

## Technical Debt Patterns

| Shortcut | Immediate Benefit | Long-term Cost | When Acceptable |
|----------|-------------------|----------------|-----------------|
| Inline quiz questions in component | Faster to write U1 | Adding U2 requires rewriting quiz component | Never — define data schema from day 1 |
| No database reset between exercises | Less setup code | Student gets errors from previous exercise's state bleeding in | Never — always reset AlaSQL DB before each exercise |
| Monaco instead of CodeMirror | Familiar VS Code feel | 5-10MB bundle, no mobile support | Only if lazy-loaded and mobile is truly out of scope |
| `darkMode: 'media'` (system) instead of `'class'` | Zero JS needed | Can't let user override, can't control theme programmatically | Never for an educational app where dark is a brand choice |
| Single large `App.tsx` router | Simple to start | Unmanageable at 6 units × 5 sections = 30 routes | Never — route-split from the start |
| No Suspense boundaries | Less boilerplate | ChunkLoadErrors crash the whole app silently | Never in production |

---

## Integration Gotchas

| Integration | Common Mistake | Correct Approach |
|-------------|----------------|------------------|
| AlaSQL + React state | Running `alasql()` on every render | Run queries in effect or event handlers only; memoize results |
| AlaSQL + exercise reset | Not resetting DB between exercises | Call `alasql('DROP TABLE IF EXISTS X')` before each exercise init; or use separate AlaSQL database instance per exercise |
| AlaSQL + student SQL input | Running raw student SQL directly | Still safe (no backend), but wrap in try/catch — AlaSQL throws on parse errors; display user-friendly Spanish errors |
| CodeMirror 6 + React | Using CodeMirror 5 patterns in CM6 | CM6 has a completely different extension API; follow CM6-specific React integration patterns |
| Tailwind v4 + dark mode | Expecting `darkMode: 'class'` config key | Tailwind v4 changed config syntax; verify your Tailwind version and follow its specific dark mode setup |
| Vite + static deploy | `base` config not set for GitHub Pages subpath | Set `base: '/repo-name/'` in `vite.config.ts` or all assets 404 on GH Pages |

---

## Performance Traps

| Trap | Symptoms | Prevention | When It Breaks |
|------|----------|------------|----------------|
| All unit content imported eagerly | 2-4MB initial JS bundle; slow TTI | Route-based code splitting with `React.lazy()` for each unit section | At unit 2+ if all content is in one bundle |
| AlaSQL on every keystroke | Browser lag while typing SQL | Debounce execution; only run on "Execute" button click, not onChange | At ~50 characters of SQL input |
| Re-initializing AlaSQL schema on every render | Noticeable delay when switching exercises | Initialize schema once on exercise mount, not in render | Every component re-render |
| Unvirtualized quiz list | Slow scroll if many questions visible at once | Keep visible quiz to one question at a time (wizard pattern) | At 20+ questions visible simultaneously |
| Large SVG/diagram content inline | Markdown-heavy concept pages bloat component | Lazy-load heavy concept sections; keep SVGs in separate files | When U3-U6 add complex ER diagram content |

---

## UX Pitfalls

| Pitfall | User Impact | Better Approach |
|---------|-------------|-----------------|
| Raw AlaSQL error messages shown to students | Cryptic JS stack traces confuse beginners ("Cannot read property 'map' of undefined") | Catch AlaSQL exceptions, map to human-readable Spanish messages: "Error de sintaxis: verifica que los nombres de columna sean correctos" |
| No visual state diff between exercise steps | Student doesn't know if their query changed the DB | Show current DB state (tables + row counts) in a panel alongside the editor |
| Code editor captures Tab key | Screen reader and keyboard users trapped in the editor | Add visible "Press Escape to exit editor" instruction; ensure CodeMirror's Escape handler works |
| Locked units look identical to unlocked | Students click locked unit expecting content, get confused | Clear visual treatment: greyed out + lock icon + tooltip "Disponible en semana X" |
| No "Run" keyboard shortcut | Students look for Ctrl+Enter, find only the button | Bind Ctrl+Enter (or Cmd+Enter on Mac) to execute SQL |
| Quiz shows all questions at once | Overwhelming; students skip ahead; no perceived progress | Wizard pattern: one question at a time, progress bar, no going back after answering |
| Error shown far from input (toast) | Student reads error but has lost context of what they typed | Show error inline, directly below the SQL editor, not as a toast notification |

---

## "Looks Done But Isn't" Checklist

- [ ] **SQL Editor:** Only tested with correct SQL — verify AlaSQL error handling for syntax errors, empty input, reserved keywords as table names
- [ ] **Exercise reset:** Database state is isolated between exercises — verify previous exercise's tables don't persist to next exercise
- [ ] **Quiz:** Tested with keyboard only (no mouse) — verify Tab navigation, Enter to select, Space to confirm
- [ ] **Quiz feedback:** Incorrect answer shows WHY it's wrong, not just "incorrecto" — each wrong option needs an explanation
- [ ] **Mobile sidebar:** Sidebar collapses and content is readable on 375px viewport — test on actual mobile, not just browser resize
- [ ] **Dark mode:** Hardcoded colors (`#fff`, `#000`) bypass Tailwind dark mode classes — verify no raw color values in components
- [ ] **Locked units:** Clicking a locked unit doesn't navigate or throw a router error — verify route guards or disabled link states
- [ ] **Static deploy:** All routes work on refresh on GitHub Pages — Vite SPA needs a `404.html` redirect hack for GH Pages or Vercel handles it natively
- [ ] **AlaSQL schema:** Every column name tested against AlaSQL reserved keyword list before finalizing the university DB schema

---

## Recovery Strategies

| Pitfall | Recovery Cost | Recovery Steps |
|---------|---------------|----------------|
| FK/PK enforcement relied upon in exercises | HIGH | Redesign exercises to not require constraint enforcement; add UI disclaimer; rewrite exercise instructions |
| Monaco bundle size discovered post-ship | MEDIUM | Swap to CodeMirror 6 (different API, rewrite editor component); or add lazy loading as hotfix |
| Inline content discovered at U2 | HIGH | Extract all content to data files, refactor all components — essentially a rewrite of content layer |
| AlaSQL keyword collision in schema | LOW | Rename column, update all queries and UI labels that reference it |
| GitHub Pages 404 on route refresh | LOW | Add `404.html` → `index.html` redirect script (standard GH Pages SPA workaround) |
| Dark mode flicker on load | LOW | Add `class="dark"` to `<html>` statically since this is dark-only; no JS needed |

---

## Pitfall-to-Phase Mapping

| Pitfall | Prevention Phase | Verification |
|---------|------------------|--------------|
| FK/PK enforcement assumptions | Phase 1: Schema design | Run all exercise queries against AlaSQL in isolation before building UI |
| Reserved keyword collisions | Phase 1: Schema design | AlaSQL console test of full CREATE TABLE + INSERT script |
| Inline content anti-pattern | Phase 1: Architecture setup | Code review: no string content in JSX, all content in `src/data/` |
| Monaco bundle size | Phase 1: Technical setup | Bundle analyzer run; check bundle size before merging editor component |
| Missing DB reset between exercises | Phase 1: SQL editor build | Manual test: complete exercise 1, start exercise 2, verify clean state |
| Raw AlaSQL errors to user | Phase 1: SQL editor build | Test with bad SQL; verify Spanish error message appears, no stack trace |
| Keyboard trap in code editor | Phase 1: SQL editor build | Test Tab/Escape behavior in editor with keyboard only |
| Locked unit navigation errors | Phase 1: Routing setup | Click every locked unit; verify no navigation or error occurs |
| GitHub Pages 404 on refresh | Phase last: Deployment | Navigate to /unit/1/exercises, copy URL, paste in new tab, verify loads |
| Content not modular enough for U2 | Phase 1: Architecture | Dry-run adding a mock U2 data file; verify zero component changes needed |

---

## Sources

- AlaSQL Foreign Key wiki (official): https://github.com/AlaSQL/alasql/wiki/Foreign-Key — confirmed FK not enforced (HIGH confidence)
- AlaSQL GitHub issues #1005, #1009, #1162, #173 — PK/FK bugs confirmed (HIGH confidence)
- AlaSQL limitations docs: https://alasql-wiki.readthedocs.io/en/latest/readme.html — reserved keywords, JOIN limitations, OUTER JOIN issues (HIGH confidence)
- AlaSQL GitHub issues #1155 — reserved keyword parser break confirmed (HIGH confidence)
- CodeMirror vs Monaco comparison (Sourcegraph, Replit): https://sourcegraph.com/blog/migrating-monaco-codemirror — bundle size, mobile support (MEDIUM confidence, multiple sources agree)
- SQL error messages in educational contexts: https://dl.acm.org/doi/10.1145/3607180 — research on constructive SQL error feedback for novices (MEDIUM confidence)
- React code-splitting pitfalls: https://reacttraining.com/blog/understanding-spas-and-their-shortcomings — serial fetch issue, ChunkLoadError (MEDIUM confidence)
- Tailwind dark mode class vs media: Tailwind CSS official docs, multiple implementation guides agree on `darkMode: 'class'` for manual control (HIGH confidence)
- CodeMirror keyboard trap: https://www.codecademy.com/article/accessibility-on-the-platform — Escape key pattern for editor accessibility (MEDIUM confidence)
- Vite GitHub Pages base path: standard Vite deployment documentation (HIGH confidence)

---
*Pitfalls research for: Educational in-browser SQL learning platform — BDD Lab UTFSM*
*Researched: 2026-03-02*
