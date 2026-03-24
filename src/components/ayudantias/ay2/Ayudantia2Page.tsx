import { useState } from 'react'
import { ChevronDown, ChevronUp, RotateCcw } from 'lucide-react'
import B1SqlTaxonomy from './B1SqlTaxonomy'
import B2CreateTableBuilder from './B2CreateTableBuilder'
import B3InsertOrderSimulator from './B3InsertOrderSimulator'
import B4SelectProgressive from './B4SelectProgressive'
import B5Checklist from './B5Checklist'
import A1RevealLadder from './A1RevealLadder'
import A2ModelTypes from './A2ModelTypes'
import A3FlipCards from './A3FlipCards'
import A4NotationComparator from './A4NotationComparator'
import EnunciadoEjercicio from './EnunciadoEjercicio'
import { useProgress } from '@/hooks/useProgress'

const TABS = [
	{ id: 'b' as const, label: 'Parte B — SQL Práctico' },
	{ id: 'a' as const, label: 'Parte A — Modelos de Datos' },
]

const BLOQUES_B = [
	{ id: 'b1', label: 'B1: Taxonomía SQL' },
	{ id: 'b2', label: 'B2: CREATE TABLE', progressKey: 'b2', total: 4 },
	{ id: 'b3', label: 'B3: INSERT + Orden' },
	{ id: 'b4', label: 'B4: SELECT Progresivo', progressKey: 'b4', total: 8 },
	{ id: 'b5', label: 'B5: Checklist' },
]

const BLOQUES_A = [
	{ id: 'a1', label: 'A1: Niveles de Abstracción' },
	{ id: 'a2', label: 'A2: Tipos de Modelos' },
	{ id: 'a3', label: 'A3: Semántica' },
	{ id: 'a4', label: 'A4: Notaciones' },
]

const BLOQUE_COMPONENTS: Record<string, React.ComponentType> = {
	b1: B1SqlTaxonomy,
	b2: B2CreateTableBuilder,
	b3: B3InsertOrderSimulator,
	b4: B4SelectProgressive,
	b5: B5Checklist,
	a1: A1RevealLadder,
	a2: A2ModelTypes,
	a3: A3FlipCards,
	a4: A4NotationComparator,
}

export default function Ayudantia2Page() {
	const [tab, setTab] = useState<'a' | 'b'>('b')
	const [bloque, setBloque] = useState('b1')
	const [enunciadoOpen, setEnunciadoOpen] = useState(true)
	const { getCompletedCount, resetProgress } = useProgress()

	const bloques = tab === 'b' ? BLOQUES_B : BLOQUES_A
	const ActiveComponent = BLOQUE_COMPONENTS[bloque]

	function handleTabChange(newTab: 'a' | 'b') {
		setTab(newTab)
		setBloque(newTab === 'b' ? 'b1' : 'a1')
	}

	return (
		<div className="flex flex-col gap-6">
			{/* Header */}
			<div className="flex items-start justify-between">
				<div>
					<p className="text-stone-500 text-sm mb-2">
						Ayudantías <span className="text-stone-700">&rsaquo;</span>{' '}
						<span className="text-stone-400">Ayudantía 2</span>
					</p>
					<div className="flex items-center gap-3">
						<div className="w-1 h-6 rounded-full bg-amber-500" />
						<h1 className="font-serif text-xl font-semibold text-stone-100 tracking-tight">
							Modelos de Datos + SQL Práctico
						</h1>
					</div>
					<p className="text-stone-400 text-sm mt-2">
						Dominio: Los Pollos Hermanos — patrones reutilizables en tus proyectos
					</p>
				</div>
				<button
					onClick={resetProgress}
					className="flex items-center gap-2 px-3 py-1.5 rounded-md border border-stone-700 text-stone-500 hover:text-stone-300 hover:border-stone-600 text-xs transition-colors mt-1"
				>
					<RotateCcw size={12} />
					Reiniciar progreso
				</button>
			</div>

			{/* Enunciado (fixed above tabs) */}
			<div className="border border-stone-800 rounded-lg overflow-hidden">
				<button
					onClick={() => setEnunciadoOpen(prev => !prev)}
					className="w-full flex items-center justify-between px-5 py-3 bg-stone-900 hover:bg-stone-800/80 transition-colors text-left"
				>
					<span className="text-stone-200 text-sm font-medium">Enunciado del Ejercicio</span>
					{enunciadoOpen
						? <ChevronUp size={16} className="text-stone-500" />
						: <ChevronDown size={16} className="text-stone-500" />
					}
				</button>
				{enunciadoOpen && (
					<div className="p-6">
						<EnunciadoEjercicio />
					</div>
				)}
			</div>

			{/* Tabs */}
			<div className="flex gap-1 bg-stone-900 p-1 rounded-lg border border-stone-800 w-fit">
				{TABS.map(t => (
					<button
						key={t.id}
						onClick={() => handleTabChange(t.id)}
						className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
							tab === t.id
								? 'bg-stone-800 text-stone-100 shadow-sm'
								: 'text-stone-400 hover:text-stone-200'
						}`}
					>
						{t.label}
					</button>
				))}
			</div>

			{/* Bloque pills */}
			<div className="flex flex-wrap gap-2">
				{bloques.map(b => {
					const pk = (b as { progressKey?: string }).progressKey
					const tot = (b as { total?: number }).total ?? 0
					const prog = pk ? getCompletedCount(pk, tot) : 0

					return (
						<button
							key={b.id}
							onClick={() => setBloque(b.id)}
							className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium transition-colors border ${
								bloque === b.id
									? 'bg-amber-500/15 text-amber-400 border-amber-500/30'
									: 'bg-stone-900 text-stone-400 border-stone-700 hover:text-stone-200 hover:border-stone-600'
							}`}
						>
							{b.label}
							{prog > 0 && (
								<span className={`px-1.5 py-0.5 rounded-full text-[10px] font-bold ${
									prog === tot
										? 'bg-green-500/20 text-green-400'
										: 'bg-amber-500/20 text-amber-400'
								}`}>
									{prog}/{tot}
								</span>
							)}
						</button>
					)
				})}
			</div>

			{/* Content */}
			<div className="animate-fade-in" key={bloque}>
				{ActiveComponent && <ActiveComponent />}
			</div>
		</div>
	)
}
