import { U1_SOLVED_EXERCISES, type SolvedExercise } from '@/content/units/u1/solved-exercises'
import { SolvedExerciseCard } from './SolvedExerciseCard'

type ExerciseType = SolvedExercise['type']

const TYPE_LABELS: Record<ExerciseType, string> = {
	'desventajas-archivos': 'Desventajas del enfoque de archivos',
	'clasificar-bd': 'Clasificar tipos de BD',
	'niveles-organizacionales': 'Niveles organizacionales y SI',
	'problemas-soluciones': 'Problemas del enfoque archivos vs soluciones BD',
}

const TYPE_ORDER: ExerciseType[] = [
	'desventajas-archivos',
	'clasificar-bd',
	'niveles-organizacionales',
	'problemas-soluciones',
]

export default function SolvedExercisesSection() {
	const grouped = TYPE_ORDER.map((type) => ({
		type,
		label: TYPE_LABELS[type],
		exercises: U1_SOLVED_EXERCISES.filter((e) => e.type === type),
	}))

	return (
		<div className="flex flex-col gap-10">
			{grouped.map(({ type, label, exercises }) => (
				<div key={type} className="flex flex-col gap-4">
					<h2 className="text-lg font-semibold text-zinc-100 border-b border-zinc-700 pb-2">
						{label}
					</h2>
					<div className="flex flex-col gap-4">
						{exercises.map((exercise) => (
							<SolvedExerciseCard key={exercise.id} exercise={exercise} />
						))}
					</div>
				</div>
			))}
		</div>
	)
}
