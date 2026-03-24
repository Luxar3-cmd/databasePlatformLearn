import { useState } from 'react'
import { SEMANTICS_CARDS } from '@/content/ayudantias/ay2/flip-cards-data'

const CARD_COLORS = ['blue', 'green', 'orange', 'amber'] as const

const COLOR_STYLES: Record<string, { front: string; icon: string; name: string }> = {
	blue: {
		front: 'bg-blue-950/30 border-blue-700/50',
		icon: 'text-blue-300',
		name: 'text-blue-400',
	},
	green: {
		front: 'bg-green-950/30 border-green-700/50',
		icon: 'text-green-300',
		name: 'text-green-400',
	},
	orange: {
		front: 'bg-orange-950/30 border-orange-700/50',
		icon: 'text-orange-300',
		name: 'text-orange-400',
	},
	amber: {
		front: 'bg-amber-950/30 border-amber-700/50',
		icon: 'text-amber-300',
		name: 'text-amber-400',
	},
}

const ICON_SVGS: Record<string, React.ReactElement> = {
	cardinalidad: (
		<svg width="48" height="48" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2">
			<line x1="8" y1="24" x2="28" y2="24" />
			<line x1="28" y1="14" x2="40" y2="24" />
			<line x1="28" y1="24" x2="40" y2="24" />
			<line x1="28" y1="34" x2="40" y2="24" />
			<line x1="28" y1="14" x2="28" y2="34" />
		</svg>
	),
	grado: (
		<svg width="48" height="48" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2">
			<rect x="4" y="18" width="12" height="12" rx="1" />
			<rect x="32" y="18" width="12" height="12" rx="1" />
			<line x1="16" y1="24" x2="32" y2="24" />
			<text x="24" y="14" textAnchor="middle" fill="currentColor" stroke="none" fontSize="10" fontFamily="monospace">2</text>
		</svg>
	),
	'dependencia-existencial': (
		<svg width="48" height="48" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2">
			<rect x="6" y="14" width="36" height="20" rx="1" />
			<rect x="10" y="18" width="28" height="12" rx="1" />
		</svg>
	),
	tiempo: (
		<svg width="48" height="48" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2">
			<circle cx="24" cy="24" r="14" />
			<line x1="24" y1="16" x2="24" y2="24" />
			<line x1="24" y1="24" x2="32" y2="28" />
		</svg>
	),
	unicidad: (
		<svg width="48" height="48" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2">
			<circle cx="24" cy="16" r="8" />
			<line x1="24" y1="24" x2="24" y2="42" />
			<line x1="16" y1="30" x2="24" y2="24" />
			<line x1="32" y1="30" x2="24" y2="24" />
		</svg>
	),
	herencia: (
		<svg width="48" height="48" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2">
			<polygon points="24,10 8,38 40,38" />
			<text x="24" y="32" textAnchor="middle" fill="currentColor" stroke="none" fontSize="9" fontFamily="monospace">ISA</text>
		</svg>
	),
	categorizacion: (
		<svg width="48" height="48" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2">
			<polygon points="24,10 8,32 40,32" />
			<line x1="16" y1="38" x2="16" y2="32" />
			<line x1="24" y1="38" x2="24" y2="32" />
			<line x1="32" y1="38" x2="32" y2="32" />
		</svg>
	),
	agregacion: (
		<svg width="48" height="48" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2">
			<polygon points="24,8 40,24 24,40 8,24" />
		</svg>
	),
}

export default function A3FlipCards() {
	const [flipped, setFlipped] = useState<boolean[]>(() => SEMANTICS_CARDS.map(() => false))

	function toggle(idx: number) {
		setFlipped(prev => {
			const next = [...prev]
			next[idx] = !next[idx]
			return next
		})
	}

	return (
		<div className="flex flex-col gap-5">
			<p className="text-stone-400 text-sm italic">
				Haz click en cada tarjeta para ver la definición y ejemplo
			</p>

			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
				{SEMANTICS_CARDS.map((card, i) => {
					const color = CARD_COLORS[i % CARD_COLORS.length]
					const styles = COLOR_STYLES[color]
					const isFlipped = flipped[i]

					return (
						<div
							key={card.id}
							className="min-h-[200px] cursor-pointer"
							style={{ perspective: '1000px' }}
							onClick={() => toggle(i)}
						>
							<div
								className="relative w-full h-full min-h-[200px]"
								style={{
									transition: 'transform 600ms',
									transformStyle: 'preserve-3d',
									transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
								}}
							>
								{/* Front */}
								<div
									className={`absolute inset-0 flex flex-col items-center justify-center gap-3 rounded-lg border p-4 ${styles.front}`}
									style={{ backfaceVisibility: 'hidden' }}
								>
									<div className={styles.icon}>
										{ICON_SVGS[card.id] ?? <span className="text-4xl font-mono font-bold">{card.icon}</span>}
									</div>
									<span className={`font-serif font-semibold text-sm text-center ${styles.name}`}>
										{card.name}
									</span>
								</div>

								{/* Back */}
								<div
									className="absolute inset-0 flex flex-col gap-2 rounded-lg border border-stone-700/50 bg-stone-900 p-4 overflow-y-auto"
									style={{
										backfaceVisibility: 'hidden',
										transform: 'rotateY(180deg)',
									}}
								>
									<p className={`font-semibold text-sm ${styles.name}`}>
										{card.question}
									</p>
									<p className="text-stone-300 text-xs leading-relaxed">
										{card.definition}
									</p>
									<p className="text-stone-400 text-xs italic leading-relaxed mt-auto">
										{card.example}
									</p>
								</div>
							</div>
						</div>
					)
				})}
			</div>
		</div>
	)
}
