import { useState } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'
import { DB_SCHEMA } from '@/engine/schema'

export function SchemaViewer() {
	const [expanded, setExpanded] = useState(false)

	return (
		<div className="border border-stone-700 rounded-md overflow-hidden">
			<button
				onClick={() => setExpanded(v => !v)}
				className="w-full flex items-center justify-between px-4 py-2.5 bg-stone-800 hover:bg-stone-700 transition-colors text-sm font-medium text-stone-300"
			>
				<span>Esquema de la BD</span>
				{expanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
			</button>

			<div
				className="grid transition-[grid-template-rows,opacity] duration-300 ease-out overflow-hidden"
				style={{ gridTemplateRows: expanded ? '1fr' : '0fr', opacity: expanded ? 1 : 0 }}
			>
				<div className="min-h-0 p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 bg-stone-900">
					{DB_SCHEMA.map(table => (
						<div key={table.nombre} className="bg-stone-800 border border-stone-700 rounded-md p-3">
							<p className="text-xs font-semibold text-stone-200 mb-2 font-mono">{table.nombre}</p>
							<ul className="space-y-0.5">
								{table.columnas.map(col => (
									<li key={col.nombre} className="flex items-center gap-2 text-xs text-stone-400">
										<span className="font-mono">{col.nombre}</span>
										<span className="text-stone-500">{col.tipo}</span>
										{col.restriccion && (
											<span className="text-stone-500 text-xs">{col.restriccion}</span>
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
