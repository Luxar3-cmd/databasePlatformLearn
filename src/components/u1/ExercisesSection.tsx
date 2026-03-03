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
				<h1 className="text-2xl font-bold text-zinc-100">Ejercicios</h1>
				<p className="text-zinc-400 text-sm mt-1">Practica y refuerza los conceptos de U1</p>
			</div>

			<div role="tablist" className="flex gap-1 border-b border-zinc-700">
				{TABS.map((tab) => (
					<button
						key={tab.id}
						role="tab"
						aria-selected={activeTab === tab.id}
						onClick={() => setActiveTab(tab.id)}
						className={`flex items-center gap-1.5 px-4 py-2 text-sm font-medium transition-colors ${
							activeTab === tab.id
								? 'border-b-2 border-blue-500 text-blue-400'
								: 'text-zinc-400 hover:text-zinc-200'
						}`}
					>
						{tab.icon}
						{tab.label}
					</button>
				))}
			</div>

			<div role="tabpanel">
				{activeTab === 'sql' && (
					<div className="flex flex-col gap-6">
						<p className="text-zinc-400 text-sm">
							<span className="text-zinc-200 font-medium">{completedIds.size}</span>
							{' '}de{' '}
							<span className="text-zinc-200 font-medium">{U1_EXERCISES.length}</span>
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
