# Phase 2: Contenido U1 y Editor SQL - Research

**Researched:** 2026-03-02
**Domain:** AlaSQL (browser SQL engine), CodeMirror 6 (@uiw/react-codemirror), React content tabs
**Confidence:** MEDIUM-HIGH

---

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions

**Presentacion del contenido teorico**
- Tabs por seccion: un tab por cada tema (1.1, 1.2, 1.3, 1.4), solo una seccion visible a la vez
- Definiciones clave en callout boxes: cajas destacadas con borde de color e icono, estilo admonitions
- Tablas comparativas como tablas HTML estilizadas: filas alternadas, bordes sutiles
- Fuente del contenido: el usuario proporcionara apuntes del curso como base para generar el contenido

**Experiencia del editor SQL**
- Layout apilado simple: esquema expandible arriba, editor en el medio, resultados debajo
- Botones de consultas rapidas: un boton por tabla que inserta y ejecuta `SELECT * FROM tabla` automaticamente
- Errores SQL: mensaje traducido al espanol inline en la zona de resultados, en rojo
- SQL scope: DDL y DML completo (SELECT, INSERT, UPDATE, DELETE, CREATE TABLE). Boton Reset restaura estado original

**Ejercicios guiados SQL**
- Presentacion como lista seleccionable: cards con los 6 ejercicios, el estudiante elige libremente, ve cuales completo
- Hints: boton 'Pista' con una pista general + boton separado 'Ver solucion' con la query completa
- Validacion automatica: se comparan resultados de la query del estudiante vs la solucion (mismas filas/columnas)
- Mini-editor por ejercicio: cada ejercicio tiene su propio editor SQL embebido, autocontenido

**BD universitaria y esquema**
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

### Deferred Ideas (OUT OF SCOPE)
None — discussion stayed within phase scope
</user_constraints>

---

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|-----------------|
| CONT-01 | Seccion 1.1 completa — Definicion de Bases de Datos | Patron de tabs con contenido TSX estatico por tema |
| CONT-02 | Seccion 1.2 completa — Enfoque de Archivos vs Enfoque de BD | Tablas comparativas HTML con Tailwind, callout boxes |
| CONT-03 | Seccion 1.3 completa — Tipos de Bases de Datos | Mismo patron de contenido estatico con listados y tablas |
| CONT-04 | Seccion 1.4 completa — Proceso de Diseno de BD | Mismo patron; el usuario proveera el texto durante implementacion |
| CONT-05 | Navegacion entre temas dentro de la seccion Conceptos | Componente de tabs hand-rolled con Tailwind (no hay patron previo en el proyecto) |
| CONT-06 | Diseno visual claro para definiciones, tablas comparativas, listados | Callout boxes con borde de color + icono Lucide; tablas con `border-separate` Tailwind |
| SQL-01 | Motor AlaSQL integrado con BD universitaria precargada (5 tablas, ~30 registros) | AlaSQL 4.x como singleton ES module; seed via INSERT directo |
| SQL-02 | Editor con CodeMirror 6 y syntax highlighting SQL | @uiw/react-codemirror 4.25.x + @codemirror/lang-sql |
| SQL-03 | Boton Ejecutar + atajo Ctrl+Enter | keymap.of([{ key: 'Mod-Enter', run }]) en CodeMirror extensions |
| SQL-04 | Tabla de resultados con columnas y filas | Render dinamico de Object.keys(results[0]) como headers |
| SQL-05 | Manejo de errores con mensajes claros en espanol | try/catch sobre alasql(); mapa de patrones de error a mensajes ES |
| SQL-06 | Boton reset de BD para restaurar estado original | DROP TABLE + re-ejecutar seed SQL desde funcion initDb() |
| SQL-07 | Visor de esquema de BD (toggle show/hide) | Acordeon con datos estaticos del schema (no se consulta dinamicamente) |
| SQL-08 | 6 ejercicios guiados (basico a avanzado) con hints y soluciones | Archivo exercises.ts con tipo Exercise; mini-editor CodeMirror por ejercicio |
| SQL-09 | Botones de consultas rapidas para explorar tablas | Array de tabla nombres -> boton que llama executeQuery(`SELECT * FROM ${tabla}`) |
</phase_requirements>

---

## Summary

La fase construye dos subsistemas independientes sobre el shell de Phase 1: (1) contenido teorico estático renderizado como TSX con navegacion de tabs, y (2) un editor SQL interactivo que corre en browser usando AlaSQL como motor. Ambos subsistemas se montan en `SectionPage.tsx` reemplazando `PlaceholderSection`.

El riesgo tecnico principal esta en AlaSQL: es una libreria con convenios de import no estandar (CJS historico) que puede requerir ajuste en vite.config.ts. El STATE.md ya documenta que el schema universitario no esta validado y que AlaSQL no aplica FK/PK constraints — esto debe abordarse en el primer plan de la fase (02-01). CodeMirror 6 via @uiw/react-codemirror es bien conocida, pero el patron de Ctrl+Enter requiere cuidado en el orden de extensiones.

El contenido de las secciones 1.1-1.4 sera provisto por el usuario durante implementacion. Los archivos `content/units/u1/concepts.tsx` deben estructurarse con placeholders tipados que el usuario llenara, no esperar a tener el texto final para crear la arquitectura.

**Primary recommendation:** Implementar y validar AlaSQL + schema universitario (plan 02-01) antes de cualquier componente React. Si AlaSQL falla en Vite, diagnosticar vite.config.ts antes de continuar.

---

## Standard Stack

### Core
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| alasql | ^4.17.0 | Motor SQL in-browser, tablas persistentes en memoria | Unica opcion viable para SQL real en browser sin backend; soporta DDL+DML completo |
| @uiw/react-codemirror | ^4.25.4 | Wrapper React para CodeMirror 6 | Alternativa oficial y mantenida; evita integrar CM6 manualmente |
| @codemirror/lang-sql | ^6.x | Syntax highlighting SQL para CodeMirror 6 | Paquete oficial de CM6 para SQL |

### Supporting
| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| @uiw/codemirror-theme-okaidia | ^4.25.x | Tema oscuro para el editor | Si se quiere tema separado del zinc palette; alternativa: `basicDark` de `@uiw/codemirror-theme-basic` |
| lucide-react | (ya instalado) | Iconos para callout boxes, botones de ejercicios | Ya disponible, no reinstalar |

### Alternatives Considered
| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| @uiw/react-codemirror | Monaco Editor | Monaco tiene bundle ~5MB; STATE.md ya decidio usar @uiw/react-codemirror |
| @uiw/codemirror-theme-okaidia | Theme custom con EditorView.baseTheme | Theme custom da control total pero requiere mas codigo; okaidia es suficiente para dark mode |
| callout boxes custom | Componente de libreria UI | Cero dependencias adicionales; 3 variantes (info/warning/example) no justifican libreria |

**Installation:**
```bash
npm install alasql @uiw/react-codemirror @codemirror/lang-sql @uiw/codemirror-theme-okaidia
```

**Nota sobre types:** alasql no incluye tipos TS oficiales; si se necesitan: `npm install --save-dev @types/alasql` (si existe) o declarar modulo manualmente con `declare module 'alasql'`.

---

## Architecture Patterns

### Recommended Project Structure
```
src/
├── engine/
│   └── sql.ts              # singleton alasql + initDb() + executeQuery() + resetDb()
├── hooks/
│   └── useSqlEngine.ts     # React hook: estado results/error/loading + executeQuery wrapper
├── content/
│   └── units/
│       └── u1/
│           ├── concepts.tsx    # JSX del contenido teorico 1.1-1.4
│           └── exercises.ts    # array tipado de 6 ejercicios con hints y soluciones
├── components/
│   └── u1/
│       ├── ConceptsSection.tsx   # Tab navigator + renderiza concepts.tsx
│       ├── EditorSection.tsx     # Layout completo editor SQL
│       ├── ExercisesSection.tsx  # Lista de ejercicio cards
│       ├── SqlEditor.tsx         # CodeMirror wrapper con keymap Ctrl+Enter
│       ├── ResultsTable.tsx      # Tabla dinamica de resultados
│       ├── SchemaViewer.tsx      # Acordeon con schema estatico
│       └── ExerciseCard.tsx      # Card individual con mini-editor
└── pages/
    └── SectionPage.tsx           # Monta ConceptsSection | EditorSection | ExercisesSection segun sectionId
```

### Pattern 1: AlaSQL Singleton

**What:** Modulo `engine/sql.ts` exporta funciones puras; alasql se inicializa una sola vez al importar.

**When to use:** Siempre que se ejecute SQL — no importar alasql directamente en componentes.

**Example:**
```typescript
// src/engine/sql.ts
// Source: AlaSQL wiki readme + pattern propio
import alasql from 'alasql'

const SEED_SQL = `
  DROP TABLE IF EXISTS departamentos;
  DROP TABLE IF EXISTS profesores;
  DROP TABLE IF EXISTS alumnos;
  DROP TABLE IF EXISTS asignaturas;
  DROP TABLE IF EXISTS inscripciones;

  CREATE TABLE departamentos (
    id INT,
    nombre STRING,
    codigo STRING
  );
  CREATE TABLE profesores (
    id INT,
    nombre STRING,
    apellido STRING,
    departamento_id INT
  );
  CREATE TABLE alumnos (
    id INT,
    nombre STRING,
    apellido STRING,
    rol STRING
  );
  CREATE TABLE asignaturas (
    id INT,
    codigo STRING,
    nombre STRING,
    creditos INT,
    departamento_id INT
  );
  CREATE TABLE inscripciones (
    id INT,
    alumno_id INT,
    asignatura_id INT,
    semestre STRING,
    nota FLOAT
  );
`

// INSERT statements van separados — AlaSQL no soporta
// multiples INSERTs en una sola llamada a alasql()
const SEED_DATA = [
  `INSERT INTO departamentos VALUES (1,'Informatica','DI')`,
  `INSERT INTO departamentos VALUES (2,'Matematica','DM')`,
  // ... resto de datos
]

export function initDb(): void {
  // Ejecutar DDL con semicolons — alasql soporta multiples statements
  alasql(SEED_SQL)
  SEED_DATA.forEach(stmt => alasql(stmt))
}

export function resetDb(): void {
  initDb()
}

export type QueryResult =
  | { ok: true; rows: Record<string, unknown>[]; rowCount: number }
  | { ok: false; error: string }

export function executeQuery(sql: string): QueryResult {
  try {
    const rows = alasql(sql) as Record<string, unknown>[]
    // alasql retorna numero para DML (INSERT/UPDATE/DELETE)
    if (typeof rows === 'number') {
      return { ok: true, rows: [], rowCount: rows }
    }
    return { ok: true, rows: Array.isArray(rows) ? rows : [], rowCount: rows.length }
  } catch (err) {
    return { ok: false, error: translateError(err) }
  }
}

function translateError(err: unknown): string {
  const msg = err instanceof Error ? err.message : String(err)
  if (msg.includes('Table') && msg.includes('not found')) return 'Tabla no encontrada'
  if (msg.includes('Unexpected token')) return 'Error de sintaxis SQL'
  if (msg.includes('column') || msg.includes('Column')) return `Columna no existe: ${msg}`
  return `Error SQL: ${msg}`
}
```

### Pattern 2: useSqlEngine Hook

**What:** Hook que encapsula estado React (results, error, loading) y llama a `engine/sql.ts`. Se inicializa la BD al montar.

**When to use:** En `EditorSection` y `ExerciseCard` — cualquier componente que necesite ejecutar SQL.

**Example:**
```typescript
// src/hooks/useSqlEngine.ts
import { useState, useEffect, useCallback } from 'react'
import { initDb, executeQuery, resetDb, type QueryResult } from '@/engine/sql'

type SqlState = {
  result: QueryResult | null
  isLoading: boolean
}

export function useSqlEngine() {
  const [state, setState] = useState<SqlState>({ result: null, isLoading: false })

  useEffect(() => {
    initDb()
  }, [])

  const execute = useCallback((sql: string) => {
    setState({ result: null, isLoading: true })
    // alasql es sincrono — el loading es solo para UX de re-render
    const result = executeQuery(sql)
    setState({ result, isLoading: false })
  }, [])

  const reset = useCallback(() => {
    resetDb()
    setState({ result: null, isLoading: false })
  }, [])

  return { ...state, execute, reset }
}
```

### Pattern 3: CodeMirror con Ctrl+Enter

**What:** Keymap extension colocado PRIMERO en el array de extensions para que no sea interceptado.

**When to use:** En `SqlEditor.tsx` y en cada `ExerciseCard`.

**Example:**
```typescript
// src/components/u1/SqlEditor.tsx
// Source: https://ellie.wtf/notes/custom-keybinding-with-react-codemirror
import CodeMirror from '@uiw/react-codemirror'
import { sql } from '@codemirror/lang-sql'
import { keymap } from '@codemirror/view'
import { okaidia } from '@uiw/codemirror-theme-okaidia'

interface SqlEditorProps {
  value: string
  onChange: (val: string) => void
  onExecute: () => void
}

export function SqlEditor({ value, onChange, onExecute }: SqlEditorProps) {
  const executeKeymap = keymap.of([
    {
      key: 'Mod-Enter',   // Ctrl+Enter en Windows/Linux, Cmd+Enter en Mac
      run: () => { onExecute(); return true }
    }
  ])

  return (
    <CodeMirror
      value={value}
      onChange={onChange}
      theme={okaidia}
      height="200px"
      // executeKeymap PRIMERO para no ser interceptado por otros keymaps
      extensions={[executeKeymap, sql()]}
    />
  )
}
```

### Pattern 4: Tabs de Conceptos (hand-rolled)

**What:** Estado local `activeTab` con array de items. Sin libreria — Tailwind + aria attributes.

**When to use:** ConceptsSection con los 4 temas de U1.

**Example:**
```typescript
// src/components/u1/ConceptsSection.tsx
const TOPICS = [
  { id: '1.1', label: '1.1 Definicion de BD' },
  { id: '1.2', label: '1.2 Enfoques' },
  { id: '1.3', label: '1.3 Tipos de BD' },
  { id: '1.4', label: '1.4 Proceso de Diseno' },
] as const

type TopicId = typeof TOPICS[number]['id']

export function ConceptsSection() {
  const [active, setActive] = useState<TopicId>('1.1')

  return (
    <div>
      <div role="tablist" className="flex gap-1 border-b border-zinc-700 mb-6">
        {TOPICS.map(t => (
          <button
            key={t.id}
            role="tab"
            aria-selected={active === t.id}
            onClick={() => setActive(t.id)}
            className={`px-4 py-2 text-sm font-medium transition-colors
              ${active === t.id
                ? 'border-b-2 border-blue-500 text-blue-400'
                : 'text-zinc-400 hover:text-zinc-200'}`}
          >
            {t.label}
          </button>
        ))}
      </div>
      <div role="tabpanel">
        {/* Switch por topic id */}
      </div>
    </div>
  )
}
```

### Pattern 5: Validacion de ejercicios

**What:** Comparar resultados del alumno vs solucion — mismas filas, mismas columnas (sin importar orden).

**When to use:** En ExerciseCard al ejecutar query del alumno.

**Example:**
```typescript
// Comparacion normalizada: ordenar filas por JSON.stringify para comparar sin depender de orden
function rowsMatch(
  studentRows: Record<string, unknown>[],
  solutionRows: Record<string, unknown>[]
): boolean {
  if (studentRows.length !== solutionRows.length) return false
  const normalize = (rows: Record<string, unknown>[]) =>
    rows.map(r => JSON.stringify(r, Object.keys(r).sort())).sort()
  return normalize(studentRows).join() === normalize(solutionRows).join()
}
```

### Anti-Patterns to Avoid

- **Importar alasql directamente en componentes React:** crea multiples instancias y el estado de la BD es inconsistente. Usar solo `engine/sql.ts`.
- **Ejecutar el seed multiple veces sin DROP TABLE:** las tablas ya existen y AlaSQL lanzara error. El seed SIEMPRE debe empezar con `DROP TABLE IF EXISTS`.
- **Usar `NAME` como nombre de columna sin backticks:** `NAME` es reserved keyword en AlaSQL. Usar `nombre` en espanol o backticks.
- **Confiar en FK/PK constraints de AlaSQL:** AlaSQL no las aplica. No escribir ejercicios que dependan de errores de constraint — el estudiante podria insertar datos invalidos sin error.
- **Renderizar el contenido teorico como Markdown con un parser:** innecesario para contenido estatico; usar TSX directamente.
- **Cargar @uiw/codemirror-themes-all:** incluye todos los temas (~200KB extra). Importar solo el tema elegido.

---

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| SQL parsing y ejecucion | Parser SQL custom | alasql | Parsing SQL es un problema complejo: precedencia de operadores, JOINs, GROUP BY, funciones agregadas |
| Syntax highlighting | Tokenizer CSS custom | @codemirror/lang-sql | Keywords SQL, tokenizacion correcta, completion — decenas de horas de trabajo |
| Editor con historial/undo | textarea con historial manual | @uiw/react-codemirror | Undo/redo, selection, multi-cursor, accesibilidad — CM6 lo da gratis |
| Tema oscuro del editor | Estilos CSS inline | @uiw/codemirror-theme-okaidia o basicDark | Token coloring requires 20+ CSS rules coordinadas; okaidia esta probado |

**Key insight:** La complejidad de un editor SQL esta en los detalles (undo, cursor movement, keyboard shortcuts, syntax awareness). CM6 + alasql cubren estos casos; cualquier implementacion custom sera inferior en semanas de trabajo.

---

## Common Pitfalls

### Pitfall 1: AlaSQL reserved keywords en nombres de columnas/tablas

**What goes wrong:** `CREATE TABLE alumnos (nombre STRING, tipo STRING)` falla o produce resultados inesperados porque `TYPE` es reserved keyword. El error no es obvio.

**Why it happens:** AlaSQL tiene una lista larga de reserved words: `NAME`, `TYPE`, `VALUE`, `KEY`, `ACTION`, `STATUS`, `PATH`, `ROW`, `COLUMN`, `CONTENT`, `SOURCE`, `TARGET`.

**How to avoid:** Usar nombres en espanol que no conflictuen: `nombre`, `apellido`, `rol`, `codigo`, `creditos`, `semestre`, `nota`. Evitar cualquier palabra que sea keyword SQL. Validar el schema completo en plan 02-01 ejecutando todos los queries de los ejercicios antes de implementar componentes.

**Warning signs:** Error inesperado en CREATE TABLE sin razon obvia; columna existe pero SELECT no la retorna.

### Pitfall 2: alasql retorna numero (no array) para INSERT/UPDATE/DELETE

**What goes wrong:** `executeQuery('INSERT INTO ...')` retorna `1` (numero de filas afectadas), no un array. Si el codigo asume `rows.length`, crashea.

**Why it happens:** DML sin SELECT retorna count de filas afectadas como numero en AlaSQL.

**How to avoid:** En `executeQuery`, verificar `typeof rows === 'number'` y retornar `{ ok: true, rows: [], rowCount: rows }`. Mostrar en UI "X filas afectadas" en vez de tabla vacia.

**Warning signs:** `Cannot read properties of undefined (reading 'length')` al ejecutar INSERT.

### Pitfall 3: initDb() se ejecuta multiples veces

**What goes wrong:** Si `ConceptsSection` y `EditorSection` montan simultaneamente y ambos llaman `initDb()`, las tablas se crean dos veces. Con `DROP TABLE IF EXISTS` al inicio del seed es seguro, pero el segundo initDb() borra datos que el usuario haya insertado.

**Why it happens:** Cada componente que usa `useSqlEngine` llama `initDb()` en `useEffect`.

**How to avoid:** Track estado de inicializacion en `engine/sql.ts` con un flag `let initialized = false`. Solo ejecutar seed si `!initialized`. El boton Reset llama `resetDb()` explicitamente (que ignora el flag).

```typescript
// engine/sql.ts
let initialized = false

export function initDb(): void {
  if (initialized) return
  // ejecutar seed...
  initialized = true
}

export function resetDb(): void {
  initialized = false
  initDb()
}
```

### Pitfall 4: CodeMirror keymap order

**What goes wrong:** Ctrl+Enter no funciona — es interceptado por otro keybinding de CM6 antes de llegar al handler custom.

**Why it happens:** CodeMirror evalua extensions en orden; si `sql()` extension tiene un binding que captura Mod-Enter antes del custom keymap, el custom nunca se ejecuta.

**How to avoid:** Colocar el keymap custom PRIMERO en el array `extensions={[customKeymap, sql()]}`. Verificado en documentacion de discuss.codemirror.net.

**Warning signs:** Handler de Ctrl+Enter nunca se llama, pero la tecla no hace nada visible.

### Pitfall 5: Ejercicios con validacion de orden

**What goes wrong:** El alumno escribe `SELECT nombre, apellido FROM alumnos` y el ejercicio espera `SELECT apellido, nombre FROM alumnos` — mismo resultado pero diferente orden de columnas. La comparacion falla incorrectamente.

**Why it happens:** Comparacion directa de arrays de objetos es sensible al orden de keys del objeto.

**How to avoid:** Normalizar con `JSON.stringify(row, Object.keys(row).sort())` antes de comparar. Ver Pattern 5 arriba.

### Pitfall 6: Vite + AlaSQL CJS compatibility

**What goes wrong:** `import alasql from 'alasql'` puede fallar en dev mode o build con error sobre `require` o exports CJS.

**Why it happens:** AlaSQL tiene historial de publicacion en CJS; Vite 5+ maneja mejor ESM pero CJS packages a veces requieren pre-bundling explicito.

**How to avoid:** Si falla, agregar a vite.config.ts:
```typescript
optimizeDeps: {
  include: ['alasql']
}
```
Y verificar que el import es `import alasql from 'alasql'` (no `import * as alasql`). Esto debe ser el primer check en plan 02-01.

**Warning signs:** Error en consola con `require is not defined` o `alasql is not a function` al iniciar dev server.

---

## Code Examples

Verified patterns from official sources and research:

### AlaSQL: Inicializar BD y ejecutar query

```typescript
// Source: AlaSQL wiki readme (https://github.com/AlaSQL/alasql/wiki/readme)
import alasql from 'alasql'

// DDL con multiples statements separados por ;
alasql(`
  DROP TABLE IF EXISTS departamentos;
  CREATE TABLE departamentos (id INT, nombre STRING, codigo STRING);
`)

// INSERT individual (mas robusto que INSERT multiple en algunos casos)
alasql("INSERT INTO departamentos VALUES (1, 'Informatica', 'DI')")
alasql("INSERT INTO departamentos VALUES (2, 'Matematica', 'DM')")

// SELECT con JOIN
const result = alasql(`
  SELECT a.nombre, a.apellido, asig.codigo, i.nota
  FROM inscripciones i
  JOIN alumnos a ON i.alumno_id = a.id
  JOIN asignaturas asig ON i.asignatura_id = asig.id
  WHERE i.nota >= 4.0
`)
// result: Array<Record<string, unknown>>
```

### AlaSQL: Acceder al schema en runtime

```typescript
// Source: WebSearch - alasql.tables property
// alasql.tables es un objeto con las tablas actuales
const tableNames = Object.keys(alasql.tables)
// → ['departamentos', 'profesores', 'alumnos', 'asignaturas', 'inscripciones']

// Columnas de una tabla (estructura interna)
const columns = alasql.tables['alumnos'].columns
// Nota: La estructura de .columns puede variar entre versiones; preferir schema estatico en UI
```

### CodeMirror 6: Setup completo con SQL y Ctrl+Enter

```typescript
// Source: @uiw/react-codemirror docs + discuss.codemirror.net
import CodeMirror from '@uiw/react-codemirror'
import { sql } from '@codemirror/lang-sql'
import { keymap } from '@codemirror/view'
import { okaidia } from '@uiw/codemirror-theme-okaidia'
import { useState } from 'react'

function SqlEditor({ onExecute }: { onExecute: (query: string) => void }) {
  const [value, setValue] = useState('SELECT * FROM alumnos;')

  const runKeymap = keymap.of([{
    key: 'Mod-Enter',
    run: (view) => {
      onExecute(view.state.doc.toString())
      return true
    }
  }])

  return (
    <CodeMirror
      value={value}
      onChange={setValue}
      theme={okaidia}
      height="200px"
      extensions={[runKeymap, sql()]}  // runKeymap PRIMERO
    />
  )
}
```

### SectionPage: Switch por sectionId

```typescript
// src/pages/SectionPage.tsx — reemplaza PlaceholderSection con componentes reales
import ConceptsSection from '@/components/u1/ConceptsSection'
import EditorSection from '@/components/u1/EditorSection'
import ExercisesSection from '@/components/u1/ExercisesSection'
import PlaceholderSection from '@/components/ui/PlaceholderSection'

// Dentro del render:
function renderSection(sectionId: SectionId, unit: Unit) {
  if (unit.id === 'u1') {
    if (sectionId === 'conceptos') return <ConceptsSection />
    if (sectionId === 'editor-sql') return <EditorSection />
    if (sectionId === 'ejercicios') return <ExercisesSection />
  }
  return <PlaceholderSection title={...} description={...} icon={...} />
}
```

### Tipo Exercise para ejercicios guiados

```typescript
// src/content/units/u1/exercises.ts
export interface Exercise {
  id: string
  title: string
  description: string
  hint: string
  solution: string          // Query SQL completa
  initialQuery?: string     // Starter code opcional
  difficulty: 'basico' | 'intermedio' | 'avanzado'
}

export const U1_EXERCISES: Exercise[] = [
  {
    id: 'u1-e1',
    title: 'Explorar alumnos',
    description: 'Obtener todos los alumnos ordenados por apellido',
    hint: 'Usa SELECT con ORDER BY',
    solution: 'SELECT * FROM alumnos ORDER BY apellido',
    initialQuery: 'SELECT * FROM alumnos',
    difficulty: 'basico',
  },
  // ... 5 mas
]
```

### Callout box component

```typescript
// Componente minimo para definiciones destacadas — sin libreria externa
interface CalloutProps {
  type: 'definition' | 'example' | 'warning'
  title: string
  children: React.ReactNode
}

const CALLOUT_STYLES = {
  definition: 'border-blue-500 bg-blue-950/30',
  example:    'border-green-500 bg-green-950/30',
  warning:    'border-amber-500 bg-amber-950/30',
}

export function Callout({ type, title, children }: CalloutProps) {
  return (
    <div className={`border-l-4 rounded-r-md px-4 py-3 my-4 ${CALLOUT_STYLES[type]}`}>
      <p className="font-semibold text-sm uppercase tracking-wide mb-1">{title}</p>
      <div className="text-zinc-300 text-sm">{children}</div>
    </div>
  )
}
```

---

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| CodeMirror 5 / Monaco | CodeMirror 6 via @uiw/react-codemirror 4.x | 2022 | CM6 es tree-shakeable, mejor bundle; Monaco es ~5MB |
| alasql 0.x (CommonJS puro) | alasql 4.x (con soporte ESM mejorado) | 2023-2024 | Menos problemas de bundler en Vite moderno |
| @codemirror/legacy-modes/sql | @codemirror/lang-sql (oficial) | 2022 | lang-sql tiene mejor tokenizacion y completion |

**Deprecated/outdated:**
- `import * as alasql from 'alasql'`: el export default es la forma correcta; el namespace import puede fallar con algunos bundlers.
- `@codemirror/legacy-modes/mode/sql`: reemplazado por `@codemirror/lang-sql` — no usar.

---

## Open Questions

1. **Compatibilidad exacta alasql 4.x con Vite 7 (version en el proyecto)**
   - What we know: alasql 4.x tiene mejor soporte ESM que versiones anteriores; `import alasql from 'alasql'` deberia funcionar
   - What's unclear: Vite 7 es muy reciente (el proyecto usa vite ^7.3.1); puede haber regresiones de compatibilidad no documentadas
   - Recommendation: Plan 02-01 debe verificar esto primero como paso 0. Si falla, agregar `optimizeDeps: { include: ['alasql'] }` al vite.config.ts

2. **Estructura interna de `alasql.tables[name].columns`**
   - What we know: `alasql.tables` es un objeto con las tablas activas
   - What's unclear: La estructura exacta de `.columns` en alasql 4.x no esta documentada claramente
   - Recommendation: Usar schema estatico hardcodeado en `SchemaViewer` en vez de introspección dinamica — mas confiable y predecible

3. **Contenido exacto de las secciones 1.1-1.4**
   - What we know: El usuario proveera apuntes del curso durante implementacion (segun CONTEXT.md)
   - What's unclear: Cuando estaran disponibles los apuntes
   - Recommendation: Plan 02-04 debe crear la estructura de archivos y componentes con placeholders tipados; el texto puede llenarse en la misma sesion de implementacion

---

## Sources

### Primary (HIGH confidence)
- AlaSQL wiki readme (https://github.com/AlaSQL/alasql/wiki/readme) — API basica, CREATE TABLE, INSERT, SELECT, limitaciones
- AlaSQL Keywords wiki (https://github.com/AlaSQL/alasql/wiki/AlaSQL-Keywords) — reserved words
- @uiw/react-codemirror GitHub (https://github.com/uiwjs/react-codemirror) — setup, extensiones, themes
- discuss.codemirror.net keymap thread — orden de extensiones para keymaps custom
- ellie.wtf custom keybinding post (https://ellie.wtf/notes/custom-keybinding-with-react-codemirror) — patron Mod-Enter

### Secondary (MEDIUM confidence)
- WebSearch: alasql 4.17.0 como version actual en npm (release tag v4.10.1 en GitHub Nov 2025, npm muestra 4.17.0)
- WebSearch: @uiw/react-codemirror 4.25.4 como version actual
- DEV Community article sobre AlaSQL (https://dev.to/jorge_rockr/alasql-a-real-database-for-web-browsers-and-nodejs-24gj) — patrones practicos

### Tertiary (LOW confidence)
- Vite + AlaSQL CJS compatibility: no se encontraron issues especificos con Vite 7; la recomendacion de `optimizeDeps.include` es preventiva basada en patrones conocidos de CJS en Vite

---

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH — alasql y @uiw/react-codemirror son las librerias decididas en STATE.md y verificadas con fuentes actuales
- Architecture: HIGH — patrones basados en el codebase existente (Phase 1) y APIs verificadas
- Pitfalls: MEDIUM — reserved keywords y return type de DML verificados; Vite 7 compatibility es LOW (preventivo)

**Research date:** 2026-03-02
**Valid until:** 2026-04-02 (librerias estables; alasql y @uiw/react-codemirror tienen releases frecuentes pero API estable)
