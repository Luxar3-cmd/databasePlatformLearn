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
			<SchemaViewer />

			<div className="flex flex-wrap items-center gap-2">
				<span className="text-zinc-500 text-xs mr-1">Consultas rapidas:</span>
				{TABLE_NAMES.map(tabla => (
					<button
						key={tabla}
						onClick={() => handleQuickQuery(tabla)}
						className="px-2.5 py-1 rounded text-xs font-mono bg-zinc-800 hover:bg-zinc-700 text-zinc-300 border border-zinc-700 hover:border-zinc-600 transition-colors"
					>
						{tabla}
					</button>
				))}

				<div className="flex-1" />

				<span className="text-zinc-600 text-xs hidden sm:block">Ctrl+Enter para ejecutar</span>

				<button
					onClick={() => reset()}
					className="flex items-center gap-1.5 px-3 py-1.5 rounded text-xs bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 text-zinc-400 hover:text-zinc-300 transition-colors"
				>
					<RefreshCw size={13} />
					Reset BD
				</button>

				<button
					onClick={handleExecute}
					className="flex items-center gap-1.5 px-3 py-1.5 rounded text-xs bg-blue-600 hover:bg-blue-500 text-white transition-colors font-medium"
				>
					<Play size={13} />
					Ejecutar
				</button>
			</div>

			<SqlEditor value={query} onChange={setQuery} onExecute={handleExecute} />

			<ResultsTable result={result} />
		</div>
	)
}
