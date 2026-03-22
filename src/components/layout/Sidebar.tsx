import {
	ChevronLeft,
	ChevronRight,
	Lock,
	ClipboardList,
	FileCheck,
	Users,
	type LucideIcon,
} from 'lucide-react'
import { UNITS, SIDEBAR_EXTRA } from '@/data/units'
import SidebarUnit from '@/components/layout/SidebarUnit'

const EXTRA_ICON_MAP: Record<string, LucideIcon> = {
	ClipboardList,
	FileCheck,
	Users,
}

interface SidebarProps {
	isOpen: boolean
	collapsed: boolean
	onToggleMobile: () => void
	onToggleCollapse: () => void
	onCloseMobile: () => void
}

export default function Sidebar({ isOpen, collapsed, onToggleCollapse, onCloseMobile }: SidebarProps) {
	const baseClasses = `fixed inset-y-0 left-0 z-40 flex flex-col bg-stone-900 border-r border-stone-800 transition-transform duration-200`
	const mobileClass = isOpen ? 'translate-x-0' : '-translate-x-full'
	const widthClass = collapsed ? 'w-16' : 'w-64'

	return (
		<aside
			className={`${baseClasses} ${mobileClass} lg:relative lg:translate-x-0 ${widthClass}`}
			aria-label="Navegación"
		>
			{/* Sidebar header */}
			<div className="flex items-center justify-between px-3 py-3 border-b border-stone-800">
				{!collapsed && (
					<span className="font-serif font-semibold text-stone-100 text-sm truncate">BDD Lab UTFSM</span>
				)}
				<button
					className="hidden lg:flex items-center justify-center text-stone-400 hover:text-stone-100 transition-colors ml-auto"
					onClick={onToggleCollapse}
					aria-label={collapsed ? 'Expandir sidebar' : 'Colapsar sidebar'}
				>
					{collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
				</button>
			</div>

			{/* Units section */}
			<nav className="flex-1 overflow-y-auto py-2 px-2 space-y-0.5">
				{UNITS.map((unit) => (
					<SidebarUnit
						key={unit.id}
						unit={unit}
						collapsed={collapsed}
						onNavigate={onCloseMobile}
					/>
				))}
			</nav>

			{/* Separator + extra section */}
			<div className="px-2 pb-3">
				<div className="border-t border-stone-800 my-2" />
				<div className="space-y-0.5">
					{SIDEBAR_EXTRA.map((item) => {
						const Icon = EXTRA_ICON_MAP[item.icon] ?? ClipboardList
						return (
							<div
								key={item.id}
								className="flex items-center gap-3 px-3 py-2 rounded-md text-stone-600 cursor-default select-none opacity-50"
								title="Próximamente"
							>
								<Icon size={18} className="shrink-0" />
								{!collapsed && (
									<>
										<span className="flex-1 text-sm truncate">{item.label}</span>
										<Lock size={14} className="shrink-0" />
									</>
								)}
							</div>
						)
					})}
				</div>
			</div>
		</aside>
	)
}
