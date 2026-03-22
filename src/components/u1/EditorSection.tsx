import { useState } from 'react'
import { Play, RefreshCw } from 'lucide-react'
import { useSqlEngine } from '@/hooks/useSqlEngine'
import { TABLE_NAMES } from '@/engine/schema'
import { SchemaViewer } from './SchemaViewer'
import { SqlEditor } from './SqlEditor'
import { ResultsTable } from './ResultsTable'

export default function EditorSection() {
	const [query, setQuery] = useState('SELECT * FROM alumnos;')
	const { result, execute, reset } = useSqlEngine()

	function handleExecute() {
		execute(query)
	}

	function handleQuickQuery(tabla: string) {
		const q = `SELECT * FROM ${tabla};`
		setQuery(q)
		execute(q)
	}

	return (
		<div className="flex flex-col gap-4">
			<div className="flex items-center gap-3 mb-1">
				<div className="w-1 h-6 rounded-full bg-amber-500" />
				<h2 className="font-serif text-xl font-semibold text-stone-100 tracking-tight">Editor SQL Interactivo</h2>
			</div>

			<SchemaViewer />

			<div className="flex flex-wrap items-center gap-2">
				<span className="text-stone-500 text-xs mr-1">Consultas rápidas:</span>
				{TABLE_NAMES.map(tabla => (
					<button
						key={tabla}
						onClick={() => handleQuickQuery(tabla)}
						className="px-2.5 py-1 rounded text-xs font-mono bg-stone-800 hover:bg-stone-700 text-stone-300 border border-stone-700 hover:border-stone-600 transition-colors"
					>
						{tabla}
					</button>
				))}
			</div>

			<SqlEditor value={query} onChange={setQuery} onExecute={handleExecute} />

			<div className="flex flex-wrap items-center gap-2">
				<span className="text-stone-500 text-xs hidden sm:block">Ctrl+Enter para ejecutar</span>

				<div className="flex-1" />

				<button
					onClick={() => reset()}
					className="flex items-center gap-1.5 px-3 py-1.5 rounded text-xs bg-stone-800 hover:bg-stone-700 border border-stone-700 text-red-400 hover:text-red-300 transition-colors"
				>
					<RefreshCw size={13} />
					Reset BD
				</button>

				<button
					onClick={handleExecute}
					className="flex items-center gap-1.5 px-4 py-2 rounded text-sm bg-amber-600 hover:bg-amber-500 text-white transition-colors font-medium"
				>
					<Play size={14} />
					Ejecutar
				</button>
			</div>

			<ResultsTable result={result} />
		</div>
	)
}
