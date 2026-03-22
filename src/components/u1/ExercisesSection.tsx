import { useState, useEffect } from 'react'
import { Database, BookOpen } from 'lucide-react'
import { initDb } from '@/engine/sql'
import { U1_EXERCISES } from '@/content/units/u1/exercises'
import { ExerciseCard } from './ExerciseCard'
import SolvedExercisesSection from './SolvedExercisesSection'

type ActiveTab = 'sql' | 'resueltos'

const TABS: { id: ActiveTab; label: string; icon: React.ReactNode }[] = [
	{ id: 'sql', label: 'Ejercicios SQL', icon: <Database size={14} /> },
	{ id: 'resueltos', label: 'Ejercicios Resueltos', icon: <BookOpen size={14} /> },
]

export default function ExercisesSection() {
	const [activeTab, setActiveTab] = useState<ActiveTab>('sql')
	const [completedIds, setCompletedIds] = useState<Set<string>>(new Set())

	useEffect(() => {
		initDb()
	}, [])

	function handleComplete(id: string) {
		setCompletedIds(prev => new Set(prev).add(id))
	}

	return (
		<div className="flex flex-col gap-6">
			<div>
				<h1 className="font-serif text-2xl font-semibold text-stone-100 tracking-tight">Ejercicios</h1>
				<p className="text-stone-400 text-sm mt-1">Practica y refuerza los conceptos de la Unidad 1</p>
			</div>

			<div role="tablist" className="flex gap-1 border-b border-stone-700">
				{TABS.map((tab) => (
					<button
						key={tab.id}
						role="tab"
						aria-selected={activeTab === tab.id}
						onClick={() => setActiveTab(tab.id)}
						className={`flex items-center gap-1.5 px-4 py-2 text-sm font-medium transition-colors border-b-2 ${
							activeTab === tab.id
								? 'border-amber-500 text-amber-400'
								: 'border-transparent text-stone-400 hover:text-stone-200'
						}`}
					>
						{tab.icon}
						{tab.label}
					</button>
				))}
			</div>

			<div key={activeTab} role="tabpanel" className="animate-fade-in">
				{activeTab === 'sql' && (
					<div className="flex flex-col gap-6">
						<p className="text-stone-400 text-sm">
							<span className="text-stone-200 font-medium">{completedIds.size}</span>
							{' '}de{' '}
							<span className="text-stone-200 font-medium">{U1_EXERCISES.length}</span>
							{' '}completados
						</p>
						<div className="flex flex-col gap-6">
							{U1_EXERCISES.map(exercise => (
								<ExerciseCard
									key={exercise.id}
									exercise={exercise}
									isCompleted={completedIds.has(exercise.id)}
									onComplete={handleComplete}
								/>
							))}
						</div>
					</div>
				)}

				{activeTab === 'resueltos' && <SolvedExercisesSection />}
			</div>
		</div>
	)
}
