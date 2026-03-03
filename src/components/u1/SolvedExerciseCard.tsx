import { useState } from 'react'
import { CheckCircle2, Eye } from 'lucide-react'
import type { SolvedExercise } from '@/content/units/u1/solved-exercises'

interface SolvedExerciseCardProps {
	exercise: SolvedExercise
}

export function SolvedExerciseCard({ exercise }: SolvedExerciseCardProps) {
	const [revealedSteps, setRevealedSteps] = useState(0)

	const allRevealed = revealedSteps >= exercise.steps.length

	return (
		<div className="rounded-lg border border-zinc-700 bg-zinc-900 p-5 flex flex-col gap-4">
			<h3 className="font-semibold text-zinc-100">{exercise.title}</h3>

			<p className="text-zinc-300 text-sm leading-relaxed">{exercise.scenario}</p>

			{revealedSteps > 0 && (
				<div className="flex flex-col gap-3">
					{exercise.steps.slice(0, revealedSteps).map((s) => (
						<div
							key={s.step}
							className="border-l-2 border-blue-500 pl-4 text-sm text-zinc-300 leading-relaxed"
						>
							<span className="text-blue-400 font-medium">Paso {s.step}:</span>{' '}
							{s.text}
						</div>
					))}
				</div>
			)}

			{!allRevealed && (
				<button
					onClick={() => setRevealedSteps((n) => n + 1)}
					className="self-start flex items-center gap-1.5 text-sm text-blue-400 hover:text-blue-300 transition-colors"
				>
					<Eye size={14} />
					Ver paso {revealedSteps + 1}
				</button>
			)}

			{allRevealed && (
				<div className="flex items-center gap-2 text-sm text-green-400">
					<CheckCircle2 size={15} className="shrink-0" />
					Ejercicio completo
				</div>
			)}
		</div>
	)
}
