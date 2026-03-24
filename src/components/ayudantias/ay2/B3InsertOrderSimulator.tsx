import { useState } from 'react'
import { AlertTriangle, ChevronDown, ChevronRight, ArrowDown, Play, Eye } from 'lucide-react'
import { SqlEditor } from '@/components/u1/SqlEditor'
import { ResultsTable } from '@/components/u1/ResultsTable'
import { Callout } from '@/components/ui/Callout'
import { useEsportsSqlEngine } from '@/hooks/useEsportsSqlEngine'
import { INSERT_LAYERS, WRONG_INSERT, WRONG_INSERT_EXPLANATION } from '@/content/ayudantias/ay2/insert-order-data'

const LAYER_COLORS = [
	{ bg: 'bg-blue-950/30', border: 'border-blue-700/50', badge: 'bg-blue-500/20 text-blue-300', text: 'text-blue-400' },
	{ bg: 'bg-green-950/30', border: 'border-green-700/50', badge: 'bg-green-500/20 text-green-300', text: 'text-green-400' },
	{ bg: 'bg-amber-950/30', border: 'border-amber-700/50', badge: 'bg-amber-500/20 text-amber-300', text: 'text-amber-400' },
	{ bg: 'bg-orange-950/30', border: 'border-orange-700/50', badge: 'bg-orange-500/20 text-orange-300', text: 'text-orange-400' },
	{ bg: 'bg-red-950/30', border: 'border-red-700/50', badge: 'bg-red-500/20 text-red-300', text: 'text-red-400' },
]

function highlightSql(sql: string) {
	const combined = /\b(INSERT|INTO|VALUES|CREATE|TABLE|ALTER|SELECT|FROM|WHERE|SET|UPDATE|DELETE|DROP|START|TRANSACTION|COMMIT|NULL|INT|VARCHAR|PRIMARY|KEY|NOT)\b|('[^']*')|(\b\d+\b)/g
	const parts: { text: string; type: 'keyword' | 'string' | 'number' | 'plain' }[] = []
	let lastIndex = 0
	let match: RegExpExecArray | null

	while ((match = combined.exec(sql)) !== null) {
		if (match.index > lastIndex) {
			parts.push({ text: sql.slice(lastIndex, match.index), type: 'plain' })
		}
		if (match[1]) parts.push({ text: match[0], type: 'keyword' })
		else if (match[2]) parts.push({ text: match[0], type: 'string' })
		else if (match[3]) parts.push({ text: match[0], type: 'number' })
		lastIndex = match.index + match[0].length
	}
	if (lastIndex < sql.length) parts.push({ text: sql.slice(lastIndex), type: 'plain' })

	return (
		<code className="font-mono text-xs leading-relaxed whitespace-pre-wrap">
			{parts.map((p, i) => {
				switch (p.type) {
					case 'keyword': return <span key={i} className="text-blue-400">{p.text}</span>
					case 'string': return <span key={i} className="text-green-400">{p.text}</span>
					case 'number': return <span key={i} className="text-orange-400">{p.text}</span>
					default: return <span key={i} className="text-stone-300">{p.text}</span>
				}
			})}
		</code>
	)
}

function DependencyDiagram() {
	const layers = [
		{ label: 'Catálogos', tables: ['tipo_producto'], color: LAYER_COLORS[0] },
		{ label: 'Con columnas extra', tables: ['local'], color: LAYER_COLORS[1] },
		{ label: 'Independientes', tables: ['empleado'], color: LAYER_COLORS[2] },
		{ label: 'Con FK', tables: ['producto'], color: LAYER_COLORS[3] },
		{ label: 'Intersección', tables: ['venta'], color: LAYER_COLORS[4] },
	]

	return (
		<div className="flex flex-col items-center gap-2">
			{layers.map((layer, i) => (
				<div key={layer.label} className="flex flex-col items-center gap-2 w-full">
					<div className={`rounded-lg border ${layer.color.border} ${layer.color.bg} px-4 py-3 w-full`}>
						<div className="flex items-center gap-2 mb-1.5">
							<span className={`px-2 py-0.5 rounded text-xs font-semibold ${layer.color.badge}`}>
								Capa {i + 1}
							</span>
							<span className={`text-xs font-medium ${layer.color.text}`}>{layer.label}</span>
						</div>
						<div className="flex flex-wrap gap-1.5">
							{layer.tables.map(t => (
								<span key={t} className="px-2 py-0.5 rounded bg-stone-800 border border-stone-700 text-stone-300 text-xs font-mono">
									{t}
								</span>
							))}
						</div>
					</div>
					{i < layers.length - 1 && (
						<ArrowDown size={16} className="text-stone-600" />
					)}
				</div>
			))}
		</div>
	)
}

function ErrorDemo() {
	const { result, execute } = useEsportsSqlEngine()
	const [executed, setExecuted] = useState(false)

	function handleExecute() {
		execute(WRONG_INSERT)
		setExecuted(true)
	}

	return (
		<div className="flex flex-col gap-4">
			<div className="bg-stone-950 rounded-lg border border-stone-800 px-4 py-3 overflow-x-auto">
				{highlightSql(WRONG_INSERT)}
			</div>

			<button
				onClick={handleExecute}
				className="flex items-center gap-2 px-4 py-2 rounded-lg bg-red-500/15 text-red-400 border border-red-700/50 hover:bg-red-500/25 transition-colors text-sm font-medium w-fit"
			>
				<AlertTriangle size={14} />
				Intentar INSERT incorrecto
			</button>

			{result && <ResultsTable result={result} />}

			{executed && (
				<Callout type="warning" title="Por qué falla">
					{WRONG_INSERT_EXPLANATION}
				</Callout>
			)}
		</div>
	)
}

function CorrectOrderReveal() {
	const [revealed, setRevealed] = useState(false)
	const [expandedLayer, setExpandedLayer] = useState<number | null>(null)

	return (
		<div className="flex flex-col gap-4">
			{!revealed ? (
				<button
					onClick={() => setRevealed(true)}
					className="flex items-center gap-2 px-4 py-2 rounded-lg bg-green-500/15 text-green-400 border border-green-700/50 hover:bg-green-500/25 transition-colors text-sm font-medium w-fit"
				>
					<Eye size={14} />
					Ver orden correcto
				</button>
			) : (
				<div className="flex flex-col gap-3">
					{INSERT_LAYERS.map((layer, i) => {
						const c = LAYER_COLORS[i]
						const isExpanded = expandedLayer === i

						return (
							<div key={layer.order} className={`rounded-lg border ${c.border} bg-stone-900 overflow-hidden`}>
								<button
									onClick={() => setExpandedLayer(isExpanded ? null : i)}
									className="w-full text-left px-4 py-3 flex items-center justify-between hover:bg-stone-800/50 transition-colors"
								>
									<div className="flex items-center gap-2">
										<span className={`px-2 py-0.5 rounded text-xs font-semibold ${c.badge}`}>
											Capa {layer.order}
										</span>
										<span className={`text-sm font-medium ${c.text}`}>{layer.label}</span>
									</div>
									{isExpanded
										? <ChevronDown size={16} className="text-stone-500 shrink-0" />
										: <ChevronRight size={16} className="text-stone-500 shrink-0" />
									}
								</button>

								{isExpanded && (
									<div className="px-4 pb-3 border-t border-stone-800 flex flex-col gap-2 pt-2">
										<p className="text-stone-400 text-xs">{layer.description}</p>
										<div className="flex flex-wrap gap-1.5">
											{layer.tables.map(t => (
												<span key={t} className="px-2 py-0.5 rounded bg-stone-800 border border-stone-700 text-stone-300 text-xs font-mono">
													{t}
												</span>
											))}
										</div>
										<div className="bg-stone-950 rounded border border-stone-800 px-3 py-2 overflow-x-auto">
											{highlightSql(layer.example)}
										</div>
									</div>
								)}
							</div>
						)
					})}
				</div>
			)}
		</div>
	)
}

function PracticeEditor() {
	const [sql, setSql] = useState('')
	const { result, isLoading, execute, reset } = useEsportsSqlEngine()

	function handleExecute() {
		if (sql.trim()) execute(sql)
	}

	return (
		<div className="flex flex-col gap-3">
			<SqlEditor value={sql} onChange={setSql} onExecute={handleExecute} />
			<div className="flex items-center gap-2">
				<button
					onClick={handleExecute}
					disabled={isLoading || !sql.trim()}
					className="flex items-center gap-2 px-4 py-2 rounded-lg bg-amber-500/15 text-amber-400 border border-amber-700/50 hover:bg-amber-500/25 transition-colors text-sm font-medium disabled:opacity-40 disabled:cursor-not-allowed"
				>
					<Play size={14} />
					Ejecutar
				</button>
				<button
					onClick={() => { reset(); setSql('') }}
					className="px-4 py-2 rounded-lg bg-stone-800 text-stone-400 border border-stone-700 hover:text-stone-200 transition-colors text-sm"
				>
					Resetear BD
				</button>
			</div>
			<ResultsTable result={result} />
		</div>
	)
}

export default function B3InsertOrderSimulator() {
	const [phase, setPhase] = useState(0)

	const phases = [
		{ id: 0, label: 'Diagrama de dependencias' },
		{ id: 1, label: 'Error demo' },
		{ id: 2, label: 'Orden correcto' },
		{ id: 3, label: 'Práctica libre' },
	]

	return (
		<div className="flex flex-col gap-6">
			<div>
				<h2 className="font-serif text-lg font-semibold text-stone-100 mb-1">
					Orden de INSERT y Dependencias FK
				</h2>
				<p className="text-stone-400 text-sm">
					Insertar en orden incorrecto causa errores de FK. Explora el diagrama, ve el error, y practica.
				</p>
			</div>

			{/* Phase navigation */}
			<div className="flex flex-wrap gap-2">
				{phases.map(p => (
					<button
						key={p.id}
						onClick={() => setPhase(p.id)}
						className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors border ${
							phase === p.id
								? 'bg-amber-500/15 text-amber-400 border-amber-500/30'
								: 'bg-stone-900 text-stone-400 border-stone-700 hover:text-stone-200 hover:border-stone-600'
						}`}
					>
						{p.id + 1}. {p.label}
					</button>
				))}
			</div>

			{/* Phase content */}
			<div className="animate-fade-in" key={phase}>
				{phase === 0 && (
					<div className="flex flex-col gap-4">
						<h3 className="font-serif text-sm font-semibold text-stone-200">
							Diagrama de dependencias
						</h3>
						<p className="text-stone-400 text-xs">
							Las tablas de arriba no dependen de nadie. Las de abajo dependen de las de arriba.
						</p>
						<DependencyDiagram />
					</div>
				)}

				{phase === 1 && (
					<div className="flex flex-col gap-4">
						<h3 className="font-serif text-sm font-semibold text-stone-200">
							Qué pasa si insertas en orden incorrecto
						</h3>
						<p className="text-stone-400 text-xs">
							Intentamos insertar un producto con un id_tipo que no existe.
						</p>
						<ErrorDemo />
					</div>
				)}

				{phase === 2 && (
					<div className="flex flex-col gap-4">
						<h3 className="font-serif text-sm font-semibold text-stone-200">
							Orden correcto de inserción
						</h3>
						<p className="text-stone-400 text-xs">
							Siempre desde las capas superiores (sin FK) hacia las inferiores (más dependencias).
						</p>
						<CorrectOrderReveal />
					</div>
				)}

				{phase === 3 && (
					<div className="flex flex-col gap-4">
						<h3 className="font-serif text-sm font-semibold text-stone-200">
							Práctica libre
						</h3>
						<p className="text-stone-400 text-xs">
							Escribe tus propios INSERTs sobre la BD Los Pollos Hermanos. Usa Ctrl+Enter para ejecutar.
						</p>
						<PracticeEditor />
					</div>
				)}
			</div>

			<Callout type="example" title="Patrón reutilizable">
				En cualquier BD relacional: primero los catálogos (sin dependencias), después las entidades principales, y al final las tablas de intersección.
			</Callout>
		</div>
	)
}
