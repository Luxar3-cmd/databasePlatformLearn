import { useState, useEffect } from 'react'
import { initDb } from '@/engine/sql'
import { U1_EXERCISES } from '@/content/units/u1/exercises'
import { ExerciseCard } from './ExerciseCard'

export default function ExercisesSection() {
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
				<h1 className="text-2xl font-bold text-zinc-100">Ejercicios Guiados SQL</h1>
				<p className="text-zinc-400 text-sm mt-1">Practica con la base de datos universitaria</p>
			</div>

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
	)
}
