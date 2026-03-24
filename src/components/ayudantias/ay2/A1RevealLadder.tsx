import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { Callout } from '@/components/ui/Callout'
import { ABSTRACTION_LEVELS, ASSOCIATION_TYPES } from '@/content/ayudantias/ay2/abstraction-levels-data'

const COLOR_STYLES: Record<string, { border: string; badge: string; badgeText: string }> = {
	green: {
		border: 'border-l-green-500',
		badge: 'bg-green-950/30 border-green-700/50',
		badgeText: 'text-green-400',
	},
	blue: {
		border: 'border-l-blue-500',
		badge: 'bg-blue-950/30 border-blue-700/50',
		badgeText: 'text-blue-400',
	},
	amber: {
		border: 'border-l-amber-500',
		badge: 'bg-amber-950/30 border-amber-700/50',
		badgeText: 'text-amber-400',
	},
}

export default function A1RevealLadder() {
	const [revealed, setRevealed] = useState(1)

	const allRevealed = revealed >= ABSTRACTION_LEVELS.length

	return (
		<div className="flex flex-col gap-6">
			{/* Levels */}
			<div className="flex flex-col gap-4">
				{ABSTRACTION_LEVELS.map((level, i) => {
					if (i >= revealed) return null
					const styles = COLOR_STYLES[level.color]

					return (
						<div
							key={level.id}
							className="animate-fade-in-up"
							style={{ marginLeft: `${i * 24}px` }}
						>
							<div className={`border-l-4 ${styles.border} bg-stone-900 border border-stone-800 rounded-r-lg p-4 flex flex-col gap-3`}>
								{/* Header */}
								<div className="flex items-center gap-3">
									<span className={`px-2 py-0.5 rounded border text-xs font-semibold ${styles.badge} ${styles.badgeText}`}>
										Nivel {i + 1}
									</span>
									<h3 className="font-serif text-base font-semibold text-stone-100">
										{level.name}
									</h3>
									<span className="text-stone-500 text-sm">— {level.subtitle}</span>
								</div>

								{/* Description */}
								<p className="text-stone-300 text-sm leading-relaxed">
									{level.description}
								</p>

								{/* Example */}
								{level.id === 'diccionario' ? (
									<div className="bg-stone-800 rounded-md overflow-hidden">
										<table className="w-full text-xs font-mono">
											<thead>
												<tr className="border-b border-stone-600">
													<th className="text-left text-stone-300 px-3 py-2">Atributo</th>
													<th className="text-left text-stone-300 px-3 py-2">Tipo</th>
													<th className="text-left text-stone-300 px-3 py-2">Restricción</th>
												</tr>
											</thead>
											<tbody>
												{[
													['id_producto', 'INT', 'PK'],
													['nombre', 'VARCHAR(100)', 'NOT NULL'],
													['precio', 'DECIMAL(8,2)', 'NOT NULL'],
													['id_tipo', 'INT', 'FK → tipo_producto'],
													['id_local', 'INT', 'FK → local'],
												].map(([attr, tipo, rest]) => (
													<tr key={attr} className="border-b border-stone-700/50">
														<td className={`px-3 py-1.5 ${rest === 'PK' ? 'text-blue-400 underline' : 'text-stone-300'}`}>{attr}</td>
														<td className="px-3 py-1.5 text-stone-400">{tipo}</td>
														<td className="px-3 py-1.5 text-stone-500">{rest}</td>
													</tr>
												))}
											</tbody>
										</table>
									</div>
								) : (
									<div className="bg-stone-800 rounded-md px-4 py-3">
										<pre className="font-mono text-sm text-stone-300 whitespace-pre-wrap leading-relaxed">
											{level.example}
										</pre>
									</div>
								)}
							</div>

							{/* Arrow connector */}
							{i < ABSTRACTION_LEVELS.length - 1 && i < revealed - 1 && (
								<div className="flex justify-center py-2" style={{ marginLeft: '12px' }}>
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

			{/* Association types */}
			{allRevealed && (
				<div className="animate-fade-in-up flex flex-col gap-4">
					<h3 className="font-serif text-base font-semibold text-stone-100">
						Tipos de asociaciones
					</h3>

					<div className="overflow-x-auto">
						<table className="w-full text-sm border-collapse">
							<thead>
								<tr className="border-b border-stone-700">
									<th className="text-left text-stone-400 font-medium px-3 py-2">Tipo</th>
									<th className="text-left text-stone-400 font-medium px-3 py-2">Cardinalidad</th>
									<th className="text-left text-stone-400 font-medium px-3 py-2">Ejemplo</th>
									<th className="text-left text-stone-400 font-medium px-3 py-2">Lectura</th>
								</tr>
							</thead>
							<tbody>
								{ASSOCIATION_TYPES.map(a => (
									<tr
										key={a.name}
										className="border-b border-stone-800 transition-colors hover:bg-stone-800/50"
									>
										<td className="text-stone-200 font-medium px-3 py-2">{a.name}</td>
										<td className="text-amber-400 font-mono px-3 py-2">{a.cardinality}</td>
										<td className="text-stone-300 px-3 py-2">{a.example}</td>
										<td className="text-stone-400 px-3 py-2">{a.reading}</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>

					<Callout type="example" title="Tip de modelado">
						Cuando estén modelando, piensen primero en la realidad. Luego traduzcan al diccionario de datos. Finalmente implementen en SQL.
					</Callout>
				</div>
			)}
		</div>
	)
}
