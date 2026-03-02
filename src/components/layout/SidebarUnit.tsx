import { useState } from 'react'
import { NavLink } from 'react-router'
import {
	Lock,
	ChevronDown,
	ChevronRight,
	BookOpen,
	PenTool,
	Terminal,
	CheckSquare,
	FileText,
	type LucideIcon,
} from 'lucide-react'
import type { Unit } from '@/data/units'

const ICON_MAP: Record<string, LucideIcon> = {
	BookOpen,
	PenTool,
	Terminal,
	CheckSquare,
	FileText,
}

interface SidebarUnitProps {
	unit: Unit
	collapsed: boolean
	onNavigate: () => void
}

export default function SidebarUnit({ unit, collapsed, onNavigate }: SidebarUnitProps) {
	const [expanded, setExpanded] = useState(!unit.locked)

	if (unit.locked) {
		return (
			<div
				className="flex items-center gap-3 px-3 py-2 rounded-md text-zinc-600 cursor-default select-none"
				title="Proximamente"
			>
				<BookOpen size={18} className="shrink-0" />
				{!collapsed && (
					<>
						<span className="flex-1 text-sm truncate">
							U{unit.number} {unit.title}
						</span>
						<Lock size={14} className="shrink-0" />
					</>
				)}
			</div>
		)
	}

	return (
		<div>
			<button
				className="w-full flex items-center gap-3 px-3 py-2 rounded-md text-zinc-300 hover:text-zinc-100 hover:bg-zinc-800 transition-colors"
				onClick={() => setExpanded((v) => !v)}
			>
				<BookOpen size={18} className="shrink-0" />
				{!collapsed && (
					<>
						<span className="flex-1 text-sm text-left truncate">
							U{unit.number} {unit.title}
						</span>
						{expanded ? <ChevronDown size={14} className="shrink-0" /> : <ChevronRight size={14} className="shrink-0" />}
					</>
				)}
			</button>

			{!collapsed && expanded && (
				<div className="ml-4 mt-1 space-y-0.5">
					{unit.sections.map((section) => {
						const Icon = ICON_MAP[section.icon] ?? FileText
						return (
							<NavLink
								key={section.id}
								to={`/unit/${unit.id}/${section.id}`}
								onClick={onNavigate}
								className={({ isActive }) =>
									`flex items-center gap-3 px-3 py-1.5 rounded-md text-sm transition-colors ${
										isActive
											? 'bg-indigo-500/10 text-indigo-400 font-medium'
											: 'text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800'
									}`
								}
							>
								<Icon size={15} className="shrink-0" />
								<span>{section.label}</span>
							</NavLink>
						)
					})}
				</div>
			)}
		</div>
	)
}
