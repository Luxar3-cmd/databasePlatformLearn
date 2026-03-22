import { Menu } from 'lucide-react'

interface HeaderProps {
	onOpenMobile: () => void
}

export default function Header({ onOpenMobile }: HeaderProps) {
	return (
		<header className="sticky top-0 z-30 bg-stone-900 border-b border-stone-800 px-4 py-4 flex items-center gap-3">
			<button
				className="lg:hidden text-stone-400 hover:text-stone-100 transition-colors"
				onClick={onOpenMobile}
				aria-label="Abrir menu"
			>
				<Menu size={20} />
			</button>
			<div className="flex items-center gap-3">
				<div className="w-1 h-8 rounded-full bg-amber-500" />
				<div>
					<span className="font-serif font-semibold text-stone-100 text-lg tracking-tight">BDD Lab UTFSM</span>
					<span className="text-stone-500 text-xs block">Ayudantía INF-239</span>
				</div>
			</div>
		</header>
	)
}
