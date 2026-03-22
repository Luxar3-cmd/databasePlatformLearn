import { useState } from 'react'
import { BookOpen, Eye } from 'lucide-react'
import type { SolvedExercise } from '@/content/units/u1/solved-exercises'

interface SolvedExerciseCardProps {
	exercise: SolvedExercise
}

export function SolvedExerciseCard({ exercise }: SolvedExerciseCardProps) {
	const [revealedSteps, setRevealedSteps] = useState(0)

	const allRevealed = revealedSteps >= exercise.steps.length

	return (
		<div className="rounded-lg border border-stone-700 bg-stone-900 p-5 flex flex-col gap-4">
			<h3 className="font-semibold text-stone-100">{exercise.title}</h3>

			<p className="text-stone-300 text-sm leading-relaxed">{exercise.scenario}</p>

			{revealedSteps > 0 && (
				<div className="flex flex-col gap-3">
					{exercise.steps.slice(0, revealedSteps).map((s, i) => (
						<div
							key={s.step}
							className={`border-l-2 border-amber-500 pl-4 text-sm text-stone-300 leading-relaxed ${i === revealedSteps - 1 ? 'animate-fade-in-up' : ''}`}
						>
							<span className="text-amber-400 font-medium">Paso {s.step}:</span>{' '}
							{s.text}
						</div>
					))}
				</div>
			)}

			{!allRevealed && (
				<button
					onClick={() => setRevealedSteps((n) => n + 1)}
					className="self-start flex items-center gap-1.5 text-sm text-amber-400 hover:text-amber-300 transition-colors"
				>
					<Eye size={14} />
					Ver paso {revealedSteps + 1}
				</button>
			)}

			{allRevealed && (
				<div className="animate-fade-in flex items-center gap-2 text-sm text-stone-400">
					<BookOpen size={15} className="shrink-0" />
					Todos los pasos revelados
				</div>
			)}
		</div>
	)
}
