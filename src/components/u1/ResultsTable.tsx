import { AlertCircle } from 'lucide-react'
import type { QueryResult } from '@/types/sql'

interface ResultsTableProps {
	result: QueryResult | null
}

export function ResultsTable({ result }: ResultsTableProps) {
	if (result === null) return null

	if (!result.ok) {
		return (
			<div className="flex items-start gap-2 text-red-400 bg-red-950/30 border border-red-800/50 rounded-md p-3 text-sm">
				<AlertCircle className="shrink-0 mt-0.5" size={16} />
				<span>{result.error}</span>
			</div>
		)
	}

	if (result.rows.length === 0) {
		const msg =
			result.rowCount > 0
				? `Consulta ejecutada. ${result.rowCount} ${result.rowCount === 1 ? 'fila afectada' : 'filas afectadas'}.`
				: 'Sin resultados.'
		return (
			<p className="text-stone-400 text-sm italic">{msg}</p>
		)
	}

	const headers = Object.keys(result.rows[0])

	return (
		<div className="overflow-x-auto rounded-md border border-stone-700">
			<table className="w-full text-sm font-mono text-left text-stone-300">
				<thead>
					<tr className="bg-stone-800 border-b border-stone-700">
						{headers.map(h => (
							<th key={h} className="px-3 py-2 font-semibold text-stone-200 whitespace-nowrap">
								{h}
							</th>
						))}
					</tr>
				</thead>
				<tbody>
					{result.rows.map((row, i) => (
						<tr
							key={i}
							className={`${i % 2 === 0 ? 'bg-stone-900' : 'bg-stone-800/60'} hover:bg-stone-800/80 transition-colors`}
						>
							{headers.map(h => (
								<td key={h} className="px-3 py-1.5 border-t border-stone-800 whitespace-nowrap text-stone-300">
									{String(row[h] ?? '')}
								</td>
							))}
						</tr>
					))}
				</tbody>
			</table>
			<p className="px-3 py-1.5 text-xs text-stone-500 border-t border-stone-700 bg-stone-900">
				{result.rowCount} {result.rowCount === 1 ? 'fila' : 'filas'}
			</p>
		</div>
	)
}
