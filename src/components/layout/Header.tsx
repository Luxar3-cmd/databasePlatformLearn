import { Menu } from 'lucide-react'

interface HeaderProps {
	onOpenMobile: () => void
}

export default function Header({ onOpenMobile }: HeaderProps) {
	return (
		<header className="sticky top-0 z-30 bg-zinc-900 border-b border-zinc-800 px-4 py-3 flex items-center gap-3">
			<button
				className="lg:hidden text-zinc-400 hover:text-zinc-100 transition-colors"
				onClick={onOpenMobile}
				aria-label="Abrir menu"
			>
				<Menu size={20} />
			</button>
			<div>
				<span className="font-bold text-zinc-100">BDD Lab UTFSM</span>
				<span className="text-zinc-500 text-sm ml-2">— Ayudantia INF-239</span>
			</div>
		</header>
	)
}
