# Phase 3: Autoevaluacion - Research

**Researched:** 2026-03-02
**Domain:** React interactive quiz + cheat sheet + solved exercises (client-side, no backend)
**Confidence:** HIGH

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions

**Flujo del Quiz**
- Wizard una pregunta a la vez con barra de progreso (3/10)
- Feedback inmediato al confirmar: verde si correcta, rojo si incorrecta + respuesta correcta + explicacion breve de POR QUE
- Boton "Siguiente" aparece despues del feedback
- Sin navegacion hacia atras (flujo lineal, como examen)
- Pantalla final: score (7/10) + resumen de preguntas incorrectas con respuesta correcta
- Boton "Intentar de nuevo" que re-randomiza orden de preguntas y opciones
- 4 opciones por pregunta (1 correcta + 3 distractores)
- 10+ preguntas distribuidas equilibradamente entre los 4 temas de U1 (~2-3 por tema)

**Layout del Cheat Sheet**
- Pagina unica scrollable con las 6 secciones
- Barra sticky de navegacion arriba con links de ancla a cada seccion (scroll suave)
- Definiciones clave en formato compacto glosario: termino en negrita + definicion corta en 1-2 lineas
- Tablas HTML para clasificaciones (Criterio | Tipos | Ejemplo) — reutilizar estilo de tablas de Conceptos
- 6 secciones: Definiciones, Archivos vs BD, Tipos BD (6 criterios), Etapas Diseno, Niveles Organizacionales, Terminologia Relacional

**Formato Ejercicios Resueltos**
- Revelacion progresiva paso a paso: enunciado visible, boton "Ver paso 1", luego aparece "Ver paso 2", etc.
- Agrupados por tipo con secciones separadas:
  1. Desventajas del enfoque de archivos
  2. Clasificar tipos de BD
  3. Niveles organizacionales y tipos de SI
  4. Problemas archivos vs soluciones BD
- 2 ejercicios por tipo = 8 ejercicios resueltos total
- Sin badge de dificultad (son material de estudio, no evaluacion)

**Tono y Contenido**
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

### Deferred Ideas (OUT OF SCOPE)

None — discussion stayed within phase scope
</user_constraints>

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|-----------------|
| QUIZ-01 | 10+ preguntas seleccion multiple sobre U1 con retroalimentacion inmediata | QuizSection wizard with useState, data in `content/units/u1/quiz.ts` |
| QUIZ-02 | Score final al completar el quiz | QuizSection final screen state, count correct answers |
| QUIZ-03 | Randomizacion de orden de preguntas y opciones en cada intento | Fisher-Yates shuffle on quiz start/retry, no external lib needed |
| CHEAT-01 | Definiciones clave (Dato, Informacion, BD, DBMS, DDL, DML, DCL) | CheatSheetSection section 1 in `content/units/u1/cheatsheet.tsx` |
| CHEAT-02 | Tabla comparativa enfoque archivos vs BD | CheatSheetSection section 2, reuse table pattern from concepts.tsx |
| CHEAT-03 | Mapa de tipos de BD (segun 6 criterios de clasificacion) | CheatSheetSection section 3, reuse table pattern from concepts.tsx |
| CHEAT-04 | Las 6 etapas de diseno con objetivo de cada una | CheatSheetSection section 4 |
| CHEAT-05 | Niveles organizacionales y tipos de SI | CheatSheetSection section 5 |
| CHEAT-06 | Terminologia relacional (relacion/tupla/atributo/dominio/clave) | CheatSheetSection section 6 |
| EJER-01 | Ejercicios de identificar desventajas del enfoque de archivos en escenarios reales | SolvedExercisesSection type 1, data in `content/units/u1/solved-exercises.ts` |
| EJER-02 | Ejercicios de clasificar tipos de BD segun criterios dados | SolvedExercisesSection type 2 |
| EJER-03 | Ejercicios de mapear niveles organizacionales a tipos de SI | SolvedExercisesSection type 3 |
| EJER-04 | Ejercicios de relacionar problemas archivos con soluciones BD | SolvedExercisesSection type 4 |
</phase_requirements>

## Summary

Phase 3 adds three self-assessment tools to the existing platform: a quiz wizard, a cheat sheet, and solved exercises. All three are pure client-side React components with no backend. The project stack (React 19, Tailwind v4, TypeScript, lucide-react) is fully established — no new dependencies are needed. Content follows the same patterns as Phase 2: TypeScript data files plus TSX render components.

The most architecturally significant work is the quiz wizard, which requires a multi-step state machine (question display -> answer selection -> feedback -> next question -> final screen). The cheat sheet is the simplest: a long scrollable TSX file with sticky nav. The solved exercises introduce a new "progressive reveal" pattern similar to the `showHint`/`showSolution` toggle in `ExerciseCard` but applied step-by-step.

**Critical integration note:** The `ejercicios` section route (`/unit/u1/ejercicios`) already renders `ExercisesSection` (SQL exercises). Phase 3 needs to add `SolvedExercisesSection` to the same route. The plan must decide whether to (a) extend `ExercisesSection` with a tab/section for solved exercises, or (b) add a second render block in `SectionPage.tsx` — given the architectural pattern of co-located unit components, option (a) with a tab switcher inside `ExercisesSection` is cleanest, OR the CONTEXT.md may imply the route `/unit/u1/ejercicios` should become the solved exercises section exclusively. The planner must resolve this ambiguity.

**Primary recommendation:** Use established patterns exclusively. No new libraries. Quiz state machine via useState, shuffle via Fisher-Yates, cheat sheet nav via `id` anchors + scroll, solved exercises via step-index state.

## Standard Stack

### Core (all already installed)
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| React | 19.2.0 | UI rendering + state | Already used, hooks for local state |
| TypeScript | 5.9.3 | Type safety | Project baseline |
| Tailwind CSS | 4.2.1 | Styling | Project baseline, no config file |
| lucide-react | 0.576.0 | Icons | Already in ExerciseCard, Callout, etc. |

### Supporting (already installed)
| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| react-router | 7.13.1 | Routing | Already handles section routing |

### New Dependencies
None required. All needed functionality (state management, shuffle, anchor scroll) is achievable with React hooks and native browser APIs.

**Installation:**
```bash
# No new packages needed
```

## Architecture Patterns

### Recommended Project Structure
```
src/
├── components/u1/
│   ├── QuizSection.tsx          # New: quiz wizard component
│   ├── CheatSheetSection.tsx    # New: cheat sheet with sticky nav
│   └── SolvedExercisesSection.tsx  # New: progressive reveal exercises
├── content/units/u1/
│   ├── quiz.ts                  # New: quiz questions data
│   ├── cheatsheet.tsx           # New: cheat sheet TSX content
│   └── solved-exercises.ts      # New: solved exercises data
└── pages/
    └── SectionPage.tsx          # Modify: add 2 new branches (quiz, cheat-sheet)
```

### Pattern 1: Data File Convention (TS vs TSX)
**What:** Pure data (no JSX) goes in `.ts`, rich formatted content (JSX) goes in `.tsx`
**When to use:** Always — established by exercises.ts (data) and concepts.tsx (content)
**Rule:** `quiz.ts` and `solved-exercises.ts` are `.ts` (structured data); `cheatsheet.tsx` is `.tsx` (rich layout with tables and formatting)

```typescript
// quiz.ts — structured data, no JSX
export interface QuizQuestion {
	id: string
	topic: '1.1' | '1.2' | '1.3' | '1.4'
	question: string
	options: string[]         // always 4, index matches correctIndex
	correctIndex: number
	explanation: string       // shown after answering
}

export const U1_QUIZ: QuizQuestion[] = [...]
```

```typescript
// solved-exercises.ts — structured data, no JSX
export interface SolvedStep {
	step: number
	text: string
}

export interface SolvedExercise {
	id: string
	type: 'desventajas-archivos' | 'clasificar-bd' | 'niveles-organizacionales' | 'problemas-soluciones'
	scenario: string          // the problem statement
	steps: SolvedStep[]       // progressive reveal steps
}

export const U1_SOLVED_EXERCISES: SolvedExercise[] = [...]
```

### Pattern 2: Quiz State Machine with useState
**What:** Multi-step wizard using a discriminated union state or index + phase
**When to use:** Quiz component — no external state library needed
**Example:**

```typescript
// Source: established pattern from ExerciseCard.tsx
type QuizPhase = 'answering' | 'feedback' | 'complete'

export default function QuizSection() {
	const [questions, setQuestions] = useState<QuizQuestion[]>([])
	const [currentIndex, setCurrentIndex] = useState(0)
	const [selectedOption, setSelectedOption] = useState<number | null>(null)
	const [phase, setPhase] = useState<QuizPhase>('answering')
	const [results, setResults] = useState<boolean[]>([])

	// Initialize with shuffled questions
	useEffect(() => {
		setQuestions(shuffle([...U1_QUIZ]))
	}, [])

	// ...
}
```

### Pattern 3: Fisher-Yates Shuffle (no library)
**What:** In-place array shuffle for question and option randomization
**When to use:** On quiz init and on "Intentar de nuevo" — QUIZ-03

```typescript
// Source: standard algorithm, no library needed
function shuffle<T>(arr: T[]): T[] {
	for (let i = arr.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[arr[i], arr[j]] = [arr[j], arr[i]]
	}
	return arr
}
```

**CRITICAL:** Options must be shuffled along with tracking which option is now correct. Shuffle the options array and update `correctIndex` accordingly, or shuffle option indices and track by value.

Recommended approach: store options as `{ text: string, isCorrect: boolean }[]` so correct answer survives shuffle:

```typescript
// Shuffle options safely
function shuffleOptions(options: string[], correctIndex: number) {
	const labeled = options.map((text, i) => ({ text, isCorrect: i === correctIndex }))
	shuffle(labeled)
	return labeled
}
```

### Pattern 4: Sticky Nav with Anchor Scroll (Cheat Sheet)
**What:** Sticky `<nav>` at top with `<a href="#section-id">` links; sections have matching `id` props
**When to use:** CheatSheetSection — CHEAT-01 through CHEAT-06

```typescript
// Anchor nav — native browser scroll, no JS needed
<nav className="sticky top-0 z-10 bg-zinc-950 border-b border-zinc-800 py-2 flex gap-4 overflow-x-auto">
	{SECTIONS.map(s => (
		<a
			key={s.id}
			href={`#${s.id}`}
			className="text-sm text-zinc-400 hover:text-zinc-200 whitespace-nowrap px-2 py-1 rounded hover:bg-zinc-800 transition-colors"
		>
			{s.label}
		</a>
	))}
</nav>
// Sections
<section id="definiciones">...</section>
<section id="archivos-vs-bd">...</section>
```

**Note:** Anchor scroll works natively; `scroll-behavior: smooth` should be set in `index.css` or via Tailwind `scroll-smooth` on `<html>`. Check `index.css` to confirm if already set.

### Pattern 5: Progressive Reveal Steps
**What:** State index tracking how many steps are revealed; each step button increments index
**When to use:** SolvedExercisesSection — EJER-01 through EJER-04

```typescript
// Based on ExerciseCard showHint/showSolution pattern, extended for N steps
export function SolvedExerciseCard({ exercise }: { exercise: SolvedExercise }) {
	const [revealedSteps, setRevealedSteps] = useState(0)

	return (
		<div>
			<p>{exercise.scenario}</p>
			{exercise.steps.slice(0, revealedSteps).map(s => (
				<div key={s.step}>{s.text}</div>
			))}
			{revealedSteps < exercise.steps.length && (
				<button onClick={() => setRevealedSteps(v => v + 1)}>
					Ver paso {revealedSteps + 1}
				</button>
			)}
		</div>
	)
}
```

### Pattern 6: SectionPage Branch Extension
**What:** Two new conditional branches in `SectionPage.tsx`
**When to use:** Required to wire quiz and cheat-sheet routes

```typescript
// Add AFTER the existing ejercicios branch in SectionPage.tsx
if (unit.id === 'u1' && sectionData.id === 'quiz') {
	return (
		<div>
			{breadcrumb}
			<QuizSection />
		</div>
	)
}

if (unit.id === 'u1' && sectionData.id === 'cheat-sheet') {
	return (
		<div>
			{breadcrumb}
			<CheatSheetSection />
		</div>
	)
}
```

**Note:** The `ejercicios` branch ALREADY exists and renders `ExercisesSection` (SQL exercises). The SolvedExercisesSection must integrate within the ejercicios route — see Open Questions below.

### Table Style Pattern (from concepts.tsx)
**What:** Established dark-mode table pattern — MUST reuse in cheat sheet
```tsx
// Source: src/content/units/u1/concepts.tsx lines 368-396
<table className="w-full text-sm border-collapse">
	<thead>
		<tr className="bg-zinc-800">
			<th className="text-left px-4 py-3 text-zinc-300 font-semibold border-b border-zinc-700">
				Columna
			</th>
		</tr>
	</thead>
	<tbody>
		{rows.map((row, i) => (
			<tr key={row.key} className={i % 2 === 0 ? 'bg-zinc-900' : 'bg-zinc-900/50'}>
				<td className="px-4 py-2.5 text-zinc-200 font-medium border-b border-zinc-800">
					{row.value}
				</td>
			</tr>
		))}
	</tbody>
</table>
```

### Anti-Patterns to Avoid
- **useState at wrong level:** Quiz state must live in `QuizSection` (not in individual question cards) because the parent needs to track all results for the final screen
- **Mutable shuffle on data import:** Never mutate `U1_QUIZ` directly. Always `shuffle([...U1_QUIZ])` (spread first)
- **Dynamic import of lucide icons:** Use static imports. SidebarUnit established this pattern — bundle size matters
- **Separate CSS files:** No CSS modules. Tailwind classes only
- **Adding ejercicios-resueltos as a new route:** The plan calls for `ejercicios` section — do NOT create a new SectionId; integrate with existing route

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Array shuffle | Custom random sort (`arr.sort(() => Math.random() - 0.5)`) | Fisher-Yates (3-line function) | `Math.random() - 0.5` sort is statistically biased |
| Progress bar | SVG arc math | Simple div width percentage | `width: ${(current/total)*100}%` is sufficient |
| Scroll-to-section | JS scrollIntoView listener | Native `<a href="#id">` anchors | Native is simpler and works without JS |
| State machine library | XState or similar | useState + QuizPhase type | Overkill for 3-state linear flow |

**Key insight:** Everything needed exists in the browser and in the established codebase. Resist the urge to add packages for a quiz widget.

## Common Pitfalls

### Pitfall 1: Option Shuffle Breaks Correct Answer Tracking
**What goes wrong:** Shuffle the options array, forget to update `correctIndex`, all answers marked wrong
**Why it happens:** `correctIndex` is a positional reference that becomes stale after shuffle
**How to avoid:** Either (a) use `{ text, isCorrect }` objects so correctness travels with the option, or (b) re-derive `correctIndex` after shuffle by finding the option that was at the original correct position
**Warning signs:** All quiz answers show as incorrect even when obviously right

### Pitfall 2: ejercicios Route Conflict
**What goes wrong:** `SolvedExercisesSection` added as a new SectionId or new route, breaking routing or sidebar
**Why it happens:** `SectionId` type in `types/content.ts` is a literal union — adding values requires updating the type AND the sidebar
**How to avoid:** Integrate `SolvedExercisesSection` within the `ejercicios` branch of `SectionPage.tsx`, alongside or replacing `ExercisesSection`. The cleanest approach is to show both: SQL exercises first, then a separator, then solved exercises. Or use a tab switcher within the section
**Warning signs:** TypeScript error on `SectionId` type, or sidebar shows a new unexpected entry

### Pitfall 3: Sticky Nav z-index Conflict
**What goes wrong:** Cheat sheet sticky nav hides behind other fixed elements (header)
**Why it happens:** AppLayout's Header has its own z-index; sticky nav needs to be below it but above content
**How to avoid:** Check existing header z-index. Use `top-[header-height]` offset if needed. The AppLayout already handles sidebar; verify what `top-0` means inside the content scroll area
**Warning signs:** Sticky nav appears under the header or over dropdowns

### Pitfall 4: Quiz "Retry" Re-shuffle Not Reset
**What goes wrong:** "Intentar de nuevo" reshuffles questions but doesn't reset `results`, `currentIndex`, `phase`, or `selectedOption`
**Why it happens:** Multiple state variables must reset atomically; forgetting one leaves stale state
**How to avoid:** Create a single `resetQuiz()` function that resets ALL state variables plus calls shuffle
**Warning signs:** Score from previous attempt carries over, or wrong question shown first

### Pitfall 5: Cheat Sheet TSX Gets Unwieldy
**What goes wrong:** A single 500+ line TSX file for 6 cheat sheet sections becomes hard to edit
**Why it happens:** All content inline, no decomposition
**How to avoid:** Export each section as a named function from `cheatsheet.tsx` (like `Topic11`, `Topic12` pattern in `concepts.tsx`). `CheatSheetSection.tsx` imports and renders them with the nav wrapper
**Warning signs:** File over 400 lines, repeated table boilerplate

## Code Examples

Verified patterns from existing codebase:

### Feedback Styling (green/red — from ExerciseCard.tsx)
```tsx
// Correct feedback — reuse this pattern
<div className="flex items-center gap-2 bg-green-950/40 border border-green-700/50 rounded-md px-3 py-2 text-sm text-green-300">
	<CheckCircle2 size={15} className="shrink-0" />
	Correcto!
</div>

// Incorrect feedback
<div className="bg-red-950/40 border border-red-700/50 rounded-md px-3 py-2 text-sm text-red-300">
	Incorrecto. La respuesta correcta era: {correctAnswer}
</div>
```

### Callout Usage (from Callout.tsx)
```tsx
// Reuse for quiz explanation feedback
import { Callout } from '@/components/ui/Callout'

<Callout type="definition" title="Por que?">
	{question.explanation}
</Callout>
```

### Toggle Button Pattern (from ExerciseCard.tsx)
```tsx
// Progressive reveal button — adapt for steps
<button
	onClick={() => setRevealedSteps(v => v + 1)}
	className="flex items-center gap-1.5 text-sm text-blue-400 hover:text-blue-300 transition-colors"
>
	<Eye size={14} />
	Ver paso {revealedSteps + 1}
</button>
```

### Quiz Option Button States
```tsx
// Option button — 3 visual states: unselected, selected-correct, selected-incorrect
function optionClass(isSelected: boolean, isCorrect: boolean, phase: QuizPhase) {
	if (phase === 'answering') {
		return isSelected
			? 'border-blue-500 bg-blue-950/40 text-zinc-100'
			: 'border-zinc-700 bg-zinc-900 text-zinc-300 hover:border-zinc-500'
	}
	// feedback phase
	if (isCorrect) return 'border-green-500 bg-green-950/40 text-green-200'
	if (isSelected && !isCorrect) return 'border-red-500 bg-red-950/40 text-red-300'
	return 'border-zinc-800 bg-zinc-900/50 text-zinc-500'
}
```

### Progress Bar
```tsx
// Simple width-based progress — Claude's discretion on exact design
<div className="w-full bg-zinc-800 rounded-full h-1.5">
	<div
		className="bg-blue-500 h-1.5 rounded-full transition-all"
		style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
	/>
</div>
<p className="text-zinc-500 text-xs">{currentIndex + 1} / {questions.length}</p>
```

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| Separate CSS files | Tailwind v4 only, no config | Phase 1 | No `tailwind.config.js` exists |
| `@apply` custom classes | Direct Tailwind utility classes | Phase 1 | Keep all styling inline |
| Global state (Context) | useState local only | Phase 2 (02-02) | Quiz/Cheat/Exercises use local state |
| External quiz libraries | Custom React components | This phase | No quiz lib in ecosystem that fits our design |

**Deprecated/outdated:**
- `@custom-variant dark` pattern: already handled in index.css — do not add again

## Open Questions

1. **ejercicios route: merge or extend?**
   - What we know: `/unit/u1/ejercicios` already renders `ExercisesSection` (SQL guided exercises). Phase 3 adds `SolvedExercisesSection` (conceptual solved exercises). Both share the `ejercicios` SectionId
   - What's unclear: Should SectionPage render BOTH sections for `ejercicios`, or should one replace the other? The label in the sidebar says "Ejercicios" which is ambiguous
   - Recommendation: Add a tab switcher within `ExercisesSection` (or create a wrapper `EjerciciosPage`) with two tabs: "Ejercicios SQL" and "Ejercicios Resueltos". This keeps routing unchanged and matches the ConceptsSection tab pattern. Alternatively, render both vertically with a `<hr>` separator — simpler but longer page

2. **Scroll behavior for cheat sheet sticky nav**
   - What we know: The AppLayout has a scrollable content area. The header is fixed at top
   - What's unclear: Does `position: sticky; top: 0` inside the content area stick relative to the scroll container or the viewport?
   - Recommendation: Test with `sticky top-0` first. If the header overlaps, use `sticky top-[64px]` (or whatever the header height is). Check `AppLayout.tsx` for header height

3. **Quiz explanation: Callout component or inline div?**
   - What we know: `Callout` component exists with `definition/example/warning` types
   - What's unclear: Does a `Callout` inside the quiz feedback feel too "educational-mode" vs the exam-feedback context?
   - Recommendation: Use a simple `div` with blue border-left (definition style) for the explanation — lighter than a full Callout. Claude's discretion applies here

## Sources

### Primary (HIGH confidence)
- Direct codebase inspection: `src/components/u1/ExerciseCard.tsx` — established toggle/state patterns
- Direct codebase inspection: `src/components/ui/Callout.tsx` — reusable component API
- Direct codebase inspection: `src/content/units/u1/concepts.tsx` — TSX content pattern, table styles
- Direct codebase inspection: `src/pages/SectionPage.tsx` — integration point, branch pattern
- Direct codebase inspection: `src/types/content.ts` — SectionId literal type constraint
- Direct codebase inspection: `package.json` — exact library versions, no missing deps

### Secondary (MEDIUM confidence)
- Fisher-Yates shuffle: well-known algorithm, documented in MDN and TAOCP — no library needed
- HTML anchor scroll behavior: native browser feature, no JS needed for basic `href="#id"` scrolling

### Tertiary (LOW confidence)
- None

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH — all versions confirmed from package.json, no new deps needed
- Architecture: HIGH — patterns confirmed by reading actual codebase files
- Pitfalls: HIGH — derived from reading existing code and understanding established constraints
- Open questions: Genuine ambiguity requiring planner decisions, not research gaps

**Research date:** 2026-03-02
**Valid until:** 2026-04-01 (stable stack, 30 days)
