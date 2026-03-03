import { useState } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'
import { DB_SCHEMA } from '@/engine/schema'

export function SchemaViewer() {
	const [expanded, setExpanded] = useState(false)

	return (
		<div className="border border-zinc-700 rounded-md overflow-hidden">
			<button
				onClick={() => setExpanded(v => !v)}
				className="w-full flex items-center justify-between px-4 py-2.5 bg-zinc-800 hover:bg-zinc-700 transition-colors text-sm font-medium text-zinc-300"
			>
				<span>Esquema de la BD</span>
				{expanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
			</button>

			<div
				className="transition-all duration-200 overflow-hidden"
				style={{ maxHeight: expanded ? '600px' : '0px' }}
			>
				<div className="p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 bg-zinc-900">
					{DB_SCHEMA.map(table => (
						<div key={table.nombre} className="bg-zinc-800 border border-zinc-700 rounded-md p-3">
							<p className="text-xs font-semibold text-zinc-200 mb-2 font-mono">{table.nombre}</p>
							<ul className="space-y-0.5">
								{table.columnas.map(col => (
									<li key={col.nombre} className="flex items-center gap-2 text-xs text-zinc-400">
										<span className="font-mono">{col.nombre}</span>
										<span className="text-zinc-600">{col.tipo}</span>
										{col.restriccion && (
											<span className="text-zinc-500 text-xs">{col.restriccion}</span>
										)}
									</li>
								))}
							</ul>
						</div>
					))}
				</div>
			</div>
		</div>
	)
}
