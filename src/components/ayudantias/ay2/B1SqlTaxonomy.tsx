import { useState } from 'react'
import { ChevronDown, ChevronRight } from 'lucide-react'
import { Callout } from '@/components/ui/Callout'
import { SQL_BRANCHES, type SqlBranch, type SqlCommand } from '@/content/ayudantias/ay2/taxonomy-data'

const COLOR_MAP: Record<string, { border: string; bg: string; badge: string; text: string }> = {
	blue: {
		border: 'border-blue-700/50',
		bg: 'bg-blue-950/30',
		badge: 'bg-blue-500/20 text-blue-300',
		text: 'text-blue-400',
	},
	green: {
		border: 'border-green-700/50',
		bg: 'bg-green-950/30',
		badge: 'bg-green-500/20 text-green-300',
		text: 'text-green-400',
	},
	orange: {
		border: 'border-orange-700/50',
		bg: 'bg-orange-950/30',
		badge: 'bg-orange-500/20 text-orange-300',
		text: 'text-orange-400',
	},
	amber: {
		border: 'border-amber-700/50',
		bg: 'bg-amber-950/30',
		badge: 'bg-amber-500/20 text-amber-300',
		text: 'text-amber-400',
	},
}

function highlightSql(sql: string) {
	const keywords = /\b(CREATE|TABLE|ALTER|DROP|TRUNCATE|SELECT|INSERT|INTO|UPDATE|DELETE|FROM|WHERE|SET|VALUES|ADD|COLUMN|IF|EXISTS|PRIMARY|KEY|INT|VARCHAR|ON|TO|GRANT|REVOKE|START|TRANSACTION|COMMIT|ROLLBACK|SAVEPOINT|NOT|NULL)\b/g
	const strings = /('[^']*')/g
	const numbers = /\b(\d+)\b/g

	const parts: { text: string; type: 'keyword' | 'string' | 'number' | 'plain' }[] = []
	let lastIndex = 0

	const combined = new RegExp(`(${keywords.source})|(${strings.source})|(${numbers.source})`, 'g')
	let match: RegExpExecArray | null

	while ((match = combined.exec(sql)) !== null) {
		if (match.index > lastIndex) {
			parts.push({ text: sql.slice(lastIndex, match.index), type: 'plain' })
		}
		if (match[1]) {
			parts.push({ text: match[0], type: 'keyword' })
		} else if (match[3]) {
			parts.push({ text: match[0], type: 'string' })
		} else if (match[5]) {
			parts.push({ text: match[0], type: 'number' })
		}
		lastIndex = match.index + match[0].length
	}

	if (lastIndex < sql.length) {
		parts.push({ text: sql.slice(lastIndex), type: 'plain' })
	}

	return (
		<code className="font-mono text-xs leading-relaxed">
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

function CommandItem({ cmd, color }: { cmd: SqlCommand; color: string }) {
	const c = COLOR_MAP[color]
	return (
		<div className="flex flex-col gap-1.5 py-2">
			<div className="flex items-center gap-2">
				<span className={`px-2 py-0.5 rounded text-xs font-mono font-semibold ${c.badge}`}>
					{cmd.name}
				</span>
				<span className="text-stone-400 text-xs">{cmd.description}</span>
			</div>
			<div className="bg-stone-950 rounded border border-stone-800 px-3 py-2 overflow-x-auto">
				{highlightSql(cmd.example)}
			</div>
		</div>
	)
}

function BranchCard({ branch }: { branch: SqlBranch }) {
	const [expanded, setExpanded] = useState(false)
	const c = COLOR_MAP[branch.color]

	return (
		<div
			className={`rounded-lg border-l-4 ${c.border} bg-stone-900 border border-stone-800 overflow-hidden`}
			style={{ borderLeftColor: `var(--color-${branch.color}-500)` }}
		>
			<button
				onClick={() => setExpanded(!expanded)}
				className="w-full text-left px-4 py-3 flex items-center justify-between hover:bg-stone-800/50 transition-colors"
			>
				<div className="flex flex-col gap-0.5">
					<div className="flex items-center gap-2">
						<span className={`font-mono font-bold text-sm ${c.text}`}>
							{branch.label}
						</span>
						<span className="text-stone-500 text-xs">
							{branch.fullName}
						</span>
					</div>
					<span className="text-stone-400 text-xs">{branch.description}</span>
				</div>
				{expanded
					? <ChevronDown size={16} className="text-stone-500 shrink-0" />
					: <ChevronRight size={16} className="text-stone-500 shrink-0" />
				}
			</button>

			{expanded && (
				<div className="px-4 pb-3 border-t border-stone-800 divide-y divide-stone-800/50">
					{branch.commands.map(cmd => (
						<CommandItem key={cmd.name} cmd={cmd} color={branch.color} />
					))}
				</div>
			)}
		</div>
	)
}

export default function B1SqlTaxonomy() {
	return (
		<div className="flex flex-col gap-6">
			<div>
				<h2 className="font-serif text-lg font-semibold text-stone-100 mb-1">
					Taxonomía de Comandos SQL
				</h2>
				<p className="text-stone-400 text-sm">
					Haz clic en cada rama para ver sus comandos con ejemplos del dominio Los Pollos Hermanos.
				</p>
			</div>

			<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
				{SQL_BRANCHES.map(branch => (
					<BranchCard key={branch.id} branch={branch} />
				))}
			</div>

			<Callout type="example" title="Aplicación práctica">
				<ul className="list-disc list-inside space-y-1">
					<li>En un proyecto típico: el script de creación usa <strong>DDL</strong> (CREATE TABLE, ALTER, etc.)</li>
					<li>El poblamiento usa <strong>DML</strong> — INSERT (poblar las tablas)</li>
					<li>Las consultas usan <strong>DML</strong> — SELECT</li>
				</ul>
			</Callout>
		</div>
	)
}
