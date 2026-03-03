import { BookOpen, Lightbulb, AlertTriangle } from 'lucide-react'
import type { ReactNode } from 'react'

interface CalloutProps {
	type: 'definition' | 'example' | 'warning'
	title: string
	children: ReactNode
}

const STYLES = {
	definition: {
		container: 'border-blue-500 bg-blue-950/30',
		icon: 'text-blue-400',
		title: 'text-blue-300',
	},
	example: {
		container: 'border-green-500 bg-green-950/30',
		icon: 'text-green-400',
		title: 'text-green-300',
	},
	warning: {
		container: 'border-amber-500 bg-amber-950/30',
		icon: 'text-amber-400',
		title: 'text-amber-300',
	},
}

const ICONS = {
	definition: BookOpen,
	example: Lightbulb,
	warning: AlertTriangle,
}

export function Callout({ type, title, children }: CalloutProps) {
	const s = STYLES[type]
	const Icon = ICONS[type]

	return (
		<div className={`border-l-4 rounded-r-md px-4 py-3 my-4 ${s.container}`}>
			<div className="flex items-center gap-2 mb-2">
				<Icon size={16} className={s.icon} />
				<p className={`font-semibold text-sm uppercase tracking-wide ${s.title}`}>{title}</p>
			</div>
			<div className="text-zinc-300 text-sm leading-relaxed">{children}</div>
		</div>
	)
}
