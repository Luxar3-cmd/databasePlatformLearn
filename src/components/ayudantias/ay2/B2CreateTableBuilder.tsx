import { useState } from 'react'
import { ChevronRight, Play, RotateCcw, Lock, Unlock, CheckCircle2, Circle } from 'lucide-react'
import { SqlEditor } from '@/components/u1/SqlEditor'
import { ResultsTable } from '@/components/u1/ResultsTable'
import { Callout } from '@/components/ui/Callout'
import { useEsportsSqlEngine } from '@/hooks/useEsportsSqlEngine'
import { useProgress } from '@/hooks/useProgress'

interface DDLStep {
	title: string
	concept: string
	explanation: string
	checklist: string[]
	annotations: string[]
	initialQuery: string
}

const DDL_STEPS: DDLStep[] = [
	{
		title: 'Tabla catálogo simple',
		concept: 'AUTO_INCREMENT, NOT NULL, UNIQUE',
		explanation:
			'Los catálogos son tablas pequeñas que almacenan valores fijos (tipos, categorías). Siguen siempre el mismo patrón: un id auto-incremental como PK y un nombre único. AUTO_INCREMENT genera el id automáticamente. NOT NULL impide valores vacíos. UNIQUE evita duplicados. ENGINE=InnoDB habilita foreign keys y transacciones.',
		checklist: [
			'Tabla: tipo_producto',
			'Columna id_tipo: entero, auto-incremental, clave primaria',
			'Columna nombre: texto (máx 30 chars), obligatorio, único',
			'Motor: InnoDB',
		],
		annotations: [
			'AUTO_INCREMENT: el motor genera el id secuencialmente (1, 2, 3...)',
			'NOT NULL: esta columna no puede quedar vacía',
			'UNIQUE: no puede haber dos filas con el mismo nombre',
			'PRIMARY KEY (...): define la clave primaria de la tabla',
			'ENGINE=InnoDB: motor que soporta FKs y transacciones',
		],
		initialQuery: `CREATE TABLE IF NOT EXISTS tipo_producto (\n    -- tu código aquí\n) ENGINE=InnoDB;`,
	},
	{
		title: 'Tabla con columnas adicionales',
		concept: 'Catálogo con más columnas',
		explanation:
			'La tabla local es similar a tipo_producto pero tiene una columna extra (ciudad). No todos los catálogos son idénticos: algunos necesitan más atributos. El patrón base se mantiene (id + nombre), pero se agregan columnas según el contexto.',
		checklist: [
			'Tabla: local',
			'Columna id_local: entero, auto-incremental, PK',
			'Columna nombre: texto (máx 50 chars), obligatorio, único',
			'Columna ciudad: texto (máx 50 chars), obligatorio',
			'Motor: InnoDB',
		],
		annotations: [
			'Mismo patrón base: id AUTO_INCREMENT + nombre NOT NULL UNIQUE',
			'Columna extra: ciudad NOT NULL amplía el catálogo',
			'VARCHAR(50) vs VARCHAR(30): ajusta el largo según el dato real',
		],
		initialQuery: `CREATE TABLE IF NOT EXISTS local (\n    -- mismo patrón base + columna ciudad\n) ENGINE=InnoDB;`,
	},
	{
		title: 'Tabla con claves foráneas',
		concept: 'FOREIGN KEY, REFERENCES, tipos de dato',
		explanation:
			'Las tablas principales referencian a los catálogos mediante FOREIGN KEY. Cada FK apunta a la PK de otra tabla con REFERENCES. Aquí aparece DECIMAL(10,2) para precios con decimales. Una tabla puede tener múltiples FKs.',
		checklist: [
			'Tabla: producto',
			'Columnas propias: id_producto (PK), nombre (obligatorio), precio (DECIMAL)',
			'2 claves foráneas: id_tipo → tipo_producto, id_local → local',
			'Cada FK apunta a la PK de su tabla referenciada',
		],
		annotations: [
			'DECIMAL(10,2): hasta 10 dígitos, 2 decimales (ej: 9990.00)',
			'FOREIGN KEY (col) REFERENCES tabla(col): enlaza con la PK de otra tabla',
			'Múltiples FKs: producto depende de tipo_producto y local',
		],
		initialQuery: `CREATE TABLE IF NOT EXISTS producto (\n    -- columnas propias + FKs\n) ENGINE=InnoDB;`,
	},
	{
		title: 'PK compuesta (relación M:N)',
		concept: 'Relación M:N, clave primaria compuesta',
		explanation:
			'Cuando dos entidades tienen relación muchos-a-muchos (un empleado puede vender muchos productos, un producto puede ser vendido por muchos empleados), se resuelve con una tabla intermedia. La PK se compone de ambas FKs: PRIMARY KEY (id_empleado, id_producto). Esto garantiza unicidad por combinación.',
		checklist: [
			'Tabla: venta',
			'Clave primaria compuesta: (id_empleado, id_producto)',
			'Sin AUTO_INCREMENT',
			'2 FKs: id_empleado → empleado, id_producto → producto',
			'Atributos propios: cantidad (INT, obligatorio), fecha (DATE, obligatorio)',
		],
		annotations: [
			'PRIMARY KEY (id_empleado, id_producto): clave compuesta por 2 columnas',
			'Sin AUTO_INCREMENT: la PK no es un solo id generado',
			'La combinación (empleado, producto) debe ser única',
			'Resuelve relación M:N entre empleado y producto',
			'cantidad y fecha: atributos propios de la relación, no de ninguna entidad',
		],
		initialQuery: `CREATE TABLE IF NOT EXISTS venta (\n    -- PK compuesta + FKs\n) ENGINE=InnoDB;`,
	},
]

export default function B2CreateTableBuilder() {
	const [queries, setQueries] = useState<string[]>(
		() => DDL_STEPS.map(s => s.initialQuery)
	)
	const { result, isLoading, execute, reset } = useEsportsSqlEngine()
	const [activeEditor, setActiveEditor] = useState(0)
	const [successMsg, setSuccessMsg] = useState<Record<number, boolean>>({})
	const { markComplete, isComplete } = useProgress()

	function updateQuery(idx: number, val: string) {
		setQueries(prev => {
			const next = [...prev]
			next[idx] = val
			return next
		})
	}

	function isStepUnlocked(idx: number) {
		if (idx === 0) return true
		return isComplete('b2', `step-${idx - 1}`)
	}

	function handleExecute(idx: number) {
		setActiveEditor(idx)
		setSuccessMsg(prev => ({ ...prev, [idx]: false }))
		const res = execute(queries[idx])
		if (res.ok) {
			markComplete('b2', `step-${idx}`)
			setSuccessMsg(prev => ({ ...prev, [idx]: true }))
		}
	}

	return (
		<div className="flex flex-col gap-6">
			{/* Header */}
			<div>
				<h2 className="font-serif text-lg font-semibold text-stone-100">
					CREATE TABLE — Construcción progresiva
				</h2>
				<p className="text-stone-400 text-sm mt-1">
					De lo simple a lo complejo: catálogos, columnas extra, FKs y PKs compuestas.
				</p>
			</div>

			{/* Reset DB button */}
			<button
				onClick={reset}
				className="flex items-center gap-2 px-3 py-2 rounded-md border border-stone-700 text-stone-400 hover:text-stone-200 hover:border-stone-600 text-sm transition-colors w-fit"
			>
				<RotateCcw size={14} />
				Reset BD
			</button>

			{/* Steps */}
			{DDL_STEPS.map((step, i) => {
				const unlocked = isStepUnlocked(i)
				const completed = isComplete('b2', `step-${i}`)

				if (!unlocked) {
					return (
						<div
							key={i}
							className="flex items-center gap-3 px-4 py-3 bg-stone-900/50 border border-stone-800/50 rounded-md opacity-50"
						>
							<Lock size={14} className="text-stone-600" />
							<span className="text-stone-600 text-sm">
								Paso {i + 1}: {step.title}
							</span>
						</div>
					)
				}

				return (
					<div key={i} className="flex flex-col gap-4 bg-stone-900 border border-stone-800 rounded-lg p-5">
						{/* Step header */}
						<div className="flex items-center gap-3">
							<span className={`flex items-center justify-center w-7 h-7 rounded-full text-sm font-bold ${
								completed
									? 'bg-green-500/15 text-green-400'
									: 'bg-amber-500/15 text-amber-400'
							}`}>
								{i + 1}
							</span>
							<div>
								<h3 className="font-serif text-base font-semibold text-stone-100">
									{step.title}
								</h3>
								<p className="text-stone-500 text-xs">{step.concept}</p>
							</div>
							{completed
								? <CheckCircle2 size={14} className="text-green-500 ml-auto" />
								: <Unlock size={14} className="text-amber-500 ml-auto" />
							}
						</div>

						{/* Concept */}
						<Callout type="definition" title={step.concept}>
							{step.explanation}
						</Callout>

						{/* Checklist */}
						<div className="bg-stone-950 border border-stone-800 rounded-md p-4">
							<p className="text-stone-400 text-xs font-medium uppercase tracking-wide mb-3">
								Qué necesitas
							</p>
							<div className="flex flex-col gap-2">
								{step.checklist.map((item, j) => (
									<div key={j} className="flex items-start gap-2 text-sm text-stone-300">
										<Circle size={8} className="text-amber-500 mt-1.5 shrink-0" />
										<span>{item}</span>
									</div>
								))}
							</div>
						</div>

						{/* Annotations */}
						<div className="flex flex-col gap-1.5">
							{step.annotations.map((note, j) => (
								<div key={j} className="flex items-start gap-2 text-xs text-stone-400">
									<ChevronRight size={12} className="text-amber-500 mt-0.5 shrink-0" />
									<span>{note}</span>
								</div>
							))}
						</div>

						{/* Student editor */}
						<div className="flex flex-col gap-3">
							<p className="text-stone-400 text-xs font-medium uppercase tracking-wide">
								Escribe tu CREATE TABLE:
							</p>
							<SqlEditor
								value={queries[i]}
								onChange={(val) => updateQuery(i, val)}
								onExecute={() => handleExecute(i)}
							/>
							<div className="flex items-center gap-3">
								<button
									onClick={() => handleExecute(i)}
									disabled={isLoading}
									className="flex items-center gap-2 px-4 py-2 rounded-md bg-amber-600 hover:bg-amber-500 text-stone-950 text-sm font-semibold transition-colors disabled:opacity-50"
								>
									<Play size={14} />
									Ejecutar
								</button>
							</div>
							{activeEditor === i && result && <ResultsTable result={result} />}
							{successMsg[i] && (
								<div className="flex items-center gap-2 px-3 py-2 rounded-md bg-green-500/10 border border-green-700/50 text-green-400 text-sm">
									<CheckCircle2 size={14} />
									CREATE TABLE ejecutado correctamente{i < DDL_STEPS.length - 1 ? ' — siguiente paso desbloqueado' : ' — todos los pasos completados'}
								</div>
							)}
						</div>
					</div>
				)
			})}

			{/* Transfer tip */}
			<Callout type="example" title="Patrón reutilizable">
				En cualquier proyecto con datos fijos (tipos, locales, categorías) van a seguir este mismo patrón de catálogos. Identifiquen la estructura, copien y solo cambien nombres y largos de columna.
			</Callout>
		</div>
	)
}
