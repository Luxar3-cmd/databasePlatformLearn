import { useState, type ReactNode } from 'react'
import { ChevronDown } from 'lucide-react'
import { Callout } from '@/components/ui/Callout'
import { MODEL_TYPES } from '@/content/ayudantias/ay2/model-types-data'

const COLOR_STYLES: Record<string, { badge: string; badgeText: string; border: string }> = {
	green: {
		badge: 'bg-green-950/30 border-green-700/50',
		badgeText: 'text-green-400',
		border: 'border-green-700/50',
	},
	blue: {
		badge: 'bg-blue-950/30 border-blue-700/50',
		badgeText: 'text-blue-400',
		border: 'border-blue-700/50',
	},
	amber: {
		badge: 'bg-amber-950/30 border-amber-700/50',
		badgeText: 'text-amber-400',
		border: 'border-amber-700/50',
	},
}

function ConceptualVisual() {
	return (
		<div className="bg-stone-800 rounded-md p-4 flex flex-col items-center gap-3">
			<div className="border border-blue-700/50 bg-blue-950/30 rounded-md w-48">
				<div className="border-b border-blue-700/50 px-3 py-1.5 text-center">
					<span className="text-blue-300 font-mono text-sm font-semibold">Producto</span>
				</div>
				<div className="px-3 py-2 text-stone-400 text-xs font-mono leading-relaxed">
					<p>id</p>
					<p>nombre</p>
					<p>precio</p>
					<p>id_tipo</p>
					<p>id_local</p>
				</div>
			</div>
			<div className="text-stone-500 text-xs font-mono">
				se ofrece en (N:1) → Local
			</div>
		</div>
	)
}

function LogicalVisual() {
	const columns = [
		{ name: 'id_producto', type: 'INT', constraint: 'PK', color: 'text-blue-400', underline: true },
		{ name: 'nombre', type: 'VARCHAR(100)', constraint: 'NOT NULL', color: 'text-stone-300', underline: false },
		{ name: 'precio', type: 'DECIMAL(8,2)', constraint: 'NOT NULL', color: 'text-stone-300', underline: false },
		{ name: 'id_tipo', type: 'INT', constraint: 'FK → tipo_producto', color: 'text-amber-400', underline: false },
		{ name: 'id_local', type: 'INT', constraint: 'FK → local', color: 'text-amber-400', underline: false },
	]

	return (
		<div className="bg-stone-800 rounded-md p-4 flex flex-col gap-3">
			<div className="flex items-center gap-2">
				<span className="text-blue-300 font-mono text-sm font-semibold">producto</span>
				<span className="text-stone-500 text-xs">(tabla relacional)</span>
			</div>
			<div className="overflow-x-auto">
				<table className="w-full text-xs font-mono border-collapse">
					<thead>
						<tr className="border-b border-stone-600">
							<th className="text-left text-stone-400 px-2 py-1.5 font-medium">Atributo</th>
							<th className="text-left text-stone-400 px-2 py-1.5 font-medium">Tipo</th>
							<th className="text-left text-stone-400 px-2 py-1.5 font-medium">Restricción</th>
						</tr>
					</thead>
					<tbody>
						{columns.map(col => (
							<tr key={col.name} className="border-b border-stone-700/50">
								<td className={`px-2 py-1.5 ${col.color} ${col.underline ? 'underline' : ''}`}>
									{col.name}
								</td>
								<td className="px-2 py-1.5 text-stone-400">{col.type}</td>
								<td className="px-2 py-1.5 text-stone-500">{col.constraint}</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	)
}

function highlightSql(sql: string): ReactNode[] {
	const keywords = /\b(CREATE|TABLE|INT|VARCHAR|PRIMARY|KEY|AUTO_INCREMENT|NOT|NULL|UNIQUE|FOREIGN|REFERENCES)\b/g
	const strings = /'[^']*'/g
	const numbers = /\b(\d+)\b/g

	const tokens: { start: number; end: number; className: string }[] = []
	let match: RegExpExecArray | null

	const kw = new RegExp(keywords.source, keywords.flags)
	while ((match = kw.exec(sql)) !== null) {
		tokens.push({ start: match.index, end: match.index + match[0].length, className: 'text-blue-400' })
	}

	const st = new RegExp(strings.source, strings.flags)
	while ((match = st.exec(sql)) !== null) {
		tokens.push({ start: match.index, end: match.index + match[0].length, className: 'text-green-400' })
	}

	const nm = new RegExp(numbers.source, numbers.flags)
	while ((match = nm.exec(sql)) !== null) {
		const existing = tokens.find(t => t.start <= match!.index && t.end >= match!.index + match![0].length)
		if (!existing) {
			tokens.push({ start: match.index, end: match.index + match[0].length, className: 'text-orange-400' })
		}
	}

	tokens.sort((a, b) => a.start - b.start)

	const merged: typeof tokens = []
	for (const t of tokens) {
		if (merged.length > 0 && t.start < merged[merged.length - 1].end) continue
		merged.push(t)
	}

	const result: ReactNode[] = []
	let cursor = 0
	for (let i = 0; i < merged.length; i++) {
		const t = merged[i]
		if (cursor < t.start) {
			result.push(<span key={`t-${cursor}`} className="text-stone-300">{sql.slice(cursor, t.start)}</span>)
		}
		result.push(
			<span key={`h-${i}`} className={t.className}>
				{sql.slice(t.start, t.end)}
			</span>
		)
		cursor = t.end
	}
	if (cursor < sql.length) {
		result.push(<span key="tail" className="text-stone-300">{sql.slice(cursor)}</span>)
	}

	return result
}

function PhysicalVisual() {
	const sql = `CREATE TABLE producto (
  id_producto INT PRIMARY KEY AUTO_INCREMENT,
  nombre VARCHAR(100) NOT NULL,
  precio DECIMAL(8,2) NOT NULL,
  id_tipo INT NOT NULL,
  id_local INT NOT NULL,
  FOREIGN KEY (id_tipo) REFERENCES tipo_producto(id_tipo),
  FOREIGN KEY (id_local) REFERENCES local(id_local)
) ENGINE=InnoDB;`

	return (
		<div className="bg-stone-800 rounded-md p-4 overflow-x-auto">
			<pre className="font-mono text-sm leading-relaxed whitespace-pre">
				{highlightSql(sql)}
			</pre>
		</div>
	)
}

const VISUALS: Record<string, () => React.ReactElement> = {
	conceptual: ConceptualVisual,
	logico: LogicalVisual,
	fisico: PhysicalVisual,
}

export default function A2ModelTypes() {
	const [revealed, setRevealed] = useState(1)

	const allRevealed = revealed >= MODEL_TYPES.length

	return (
		<div className="flex flex-col gap-6">
			{/* Steps */}
			<div className="flex flex-col gap-4">
				{MODEL_TYPES.map((model, i) => {
					if (i >= revealed) return null
					const styles = COLOR_STYLES[model.color]
					const Visual = VISUALS[model.id]

					return (
						<div key={model.id} className="animate-fade-in-up flex flex-col gap-2">
							<div className={`bg-stone-900 border ${styles.border} rounded-lg p-5 flex flex-col gap-4`}>
								{/* Badge + title */}
								<div className="flex items-center gap-3 flex-wrap">
									<span className={`px-2 py-0.5 rounded border text-xs font-semibold ${styles.badge} ${styles.badgeText}`}>
										{model.level}
									</span>
									<h3 className="font-serif text-base font-semibold text-stone-100">
										{model.name}
									</h3>
								</div>

								{/* Meta */}
								<div className="flex flex-wrap gap-4 text-sm">
									<div>
										<span className="text-stone-500">¿Qué representa?</span>{' '}
										<span className="text-stone-300">{model.description}</span>
									</div>
									<div>
										<span className="text-stone-500">¿Quién lo entiende?</span>{' '}
										<span className="text-stone-300">{model.audience}</span>
									</div>
								</div>

								{/* Visual */}
								<Visual />
							</div>

							{/* Arrow */}
							{i < MODEL_TYPES.length - 1 && i < revealed - 1 && (
								<div className="flex justify-center py-1">
									<ChevronDown size={20} className="text-stone-600" />
								</div>
							)}
						</div>
					)
				})}
			</div>

			{/* Reveal button */}
			{!allRevealed && (
				<button
					onClick={() => setRevealed(prev => prev + 1)}
					className="flex items-center gap-2 px-4 py-2 rounded-md bg-amber-600 hover:bg-amber-500 text-stone-950 text-sm font-semibold transition-colors w-fit"
				>
					Siguiente nivel
					<ChevronDown size={14} />
				</button>
			)}

			{/* Comparison table */}
			{allRevealed && (
				<div className="animate-fade-in-up flex flex-col gap-4">
					<h3 className="font-serif text-base font-semibold text-stone-100">
						Resumen
					</h3>

					<div className="overflow-x-auto">
						<table className="w-full text-sm border-collapse">
							<thead>
								<tr className="border-b border-stone-700">
									<th className="text-left text-stone-400 font-medium px-3 py-2">Nivel</th>
									<th className="text-left text-stone-400 font-medium px-3 py-2">Qué representa</th>
									<th className="text-left text-stone-400 font-medium px-3 py-2">Quién</th>
									<th className="text-left text-stone-400 font-medium px-3 py-2">Ejemplo</th>
								</tr>
							</thead>
							<tbody>
								{MODEL_TYPES.map(m => {
									const styles = COLOR_STYLES[m.color]
									return (
										<tr key={m.id} className="border-b border-stone-800 transition-colors hover:bg-stone-800/50">
											<td className="px-3 py-2">
												<span className={`px-2 py-0.5 rounded border text-xs font-semibold ${styles.badge} ${styles.badgeText}`}>
													{m.name}
												</span>
											</td>
											<td className="text-stone-300 px-3 py-2">{m.description}</td>
											<td className="text-stone-400 px-3 py-2">{m.audience}</td>
											<td className="text-stone-400 px-3 py-2 font-mono text-xs max-w-xs truncate">
												{m.example.split('\n')[0]}
											</td>
										</tr>
									)
								})}
							</tbody>
						</table>
					</div>

					<Callout type="example" title="Aplicación práctica">
						Estos tres niveles son los pilares de cualquier diseño de BD: primero entender la realidad (conceptual), luego estructurarla (lógico), y finalmente implementarla (físico).
					</Callout>
				</div>
			)}
		</div>
	)
}
