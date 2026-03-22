import { useState } from 'react'
import { CheckCircle2, Lightbulb, Eye } from 'lucide-react'
import type { Exercise, QueryResult } from '@/types/sql'
import { executeQuery } from '@/engine/sql'
import { SqlEditor } from './SqlEditor'
import { ResultsTable } from './ResultsTable'

interface ExerciseCardProps {
	exercise: Exercise
	isCompleted: boolean
	onComplete: (id: string) => void
}

function rowsMatch(
	studentRows: Record<string, unknown>[],
	solutionRows: Record<string, unknown>[],
): boolean {
	if (studentRows.length !== solutionRows.length) return false
	const normalize = (rows: Record<string, unknown>[]) =>
		rows.map(r => JSON.stringify(r, Object.keys(r).sort())).sort()
	return normalize(studentRows).join() === normalize(solutionRows).join()
}

const DIFFICULTY_BADGE: Record<Exercise['difficulty'], string> = {
	basico: 'bg-green-900/50 text-green-300 border border-green-700/50',
	intermedio: 'bg-orange-900/50 text-orange-300 border border-orange-700/50',
	avanzado: 'bg-red-900/50 text-red-300 border border-red-700/50',
}

const DIFFICULTY_LABEL: Record<Exercise['difficulty'], string> = {
	basico: 'Básico',
	intermedio: 'Intermedio',
	avanzado: 'Avanzado',
}

export function ExerciseCard({ exercise, isCompleted, onComplete }: ExerciseCardProps) {
	const [query, setQuery] = useState(exercise.initialQuery ?? '')
	const [result, setResult] = useState<QueryResult | null>(null)
	const [showHint, setShowHint] = useState(false)
	const [showSolution, setShowSolution] = useState(false)
	const [validationStatus, setValidationStatus] = useState<'idle' | 'correct' | 'incorrect'>('idle')

	function handleValidate() {
		const studentResult = executeQuery(query)
		setResult(studentResult)

		if (!studentResult.ok) {
			setValidationStatus('incorrect')
			return
		}

		const solutionResult = executeQuery(exercise.solution)
		if (!solutionResult.ok) {
			setValidationStatus('idle')
			return
		}

		const correct = rowsMatch(studentResult.rows, solutionResult.rows)
		setValidationStatus(correct ? 'correct' : 'incorrect')
		if (correct && !isCompleted) {
			onComplete(exercise.id)
		}
	}

	return (
		<div className={`rounded-lg border bg-stone-900 p-5 flex flex-col gap-4 ${isCompleted ? 'border-green-700/50' : 'border-stone-700'}`}>
			{/* Header */}
			<div className="flex items-center gap-3">
				<div className="flex items-center gap-2 flex-1 min-w-0">
					{isCompleted && (
						<CheckCircle2 size={18} className="text-green-400 shrink-0" />
					)}
					<h3 className="font-semibold text-stone-100 truncate">{exercise.title}</h3>
				</div>
				<span className={`text-xs px-2 py-0.5 rounded-full font-medium shrink-0 ${DIFFICULTY_BADGE[exercise.difficulty]}`}>
					{DIFFICULTY_LABEL[exercise.difficulty]}
				</span>
			</div>

			{/* Description */}
			<p className="text-stone-300 text-sm leading-relaxed">{exercise.description}</p>

			{/* Hint toggle */}
			<div>
				<button
					onClick={() => setShowHint(v => !v)}
					className="flex items-center gap-1.5 text-sm text-orange-400 hover:text-orange-300 transition-colors"
				>
					<Lightbulb size={14} />
					{showHint ? 'Ocultar pista' : 'Ver pista'}
				</button>
				{showHint && (
					<div className="animate-slide-down mt-2 bg-orange-950/40 border border-orange-700/40 rounded-md px-3 py-2 text-sm text-orange-200">
						{exercise.hint}
					</div>
				)}
			</div>

			{/* Mini SQL editor */}
			<div className="rounded-md overflow-hidden border border-stone-700">
				<SqlEditor
					value={query}
					onChange={setQuery}
					onExecute={handleValidate}
				/>
			</div>

			{/* Execute + Validate button */}
			<button
				onClick={handleValidate}
				className="self-start px-4 py-1.5 bg-amber-600 hover:bg-amber-500 text-white text-sm font-medium rounded-md transition-colors"
			>
				Ejecutar y Validar
			</button>

			{/* Student result */}
			{result !== null && <ResultsTable result={result} />}

			{/* Validation feedback */}
			{validationStatus === 'correct' && (
				<div className="animate-scale-in flex items-center gap-2 bg-green-950/40 border border-green-700/50 rounded-md px-3 py-2 text-sm text-green-300">
					<CheckCircle2 size={15} className="shrink-0" />
					Correcto! Tu consulta produce el resultado esperado.
				</div>
			)}
			{validationStatus === 'incorrect' && (
				<div className="animate-scale-in bg-red-950/40 border border-red-700/50 rounded-md px-3 py-2 text-sm text-red-300">
					Resultado diferente al esperado. Revisa las columnas, filtros y orden de tu consulta.
				</div>
			)}

			{/* Solution toggle */}
			<div>
				<button
					onClick={() => setShowSolution(v => !v)}
					className="flex items-center gap-1.5 text-sm text-stone-400 hover:text-stone-300 transition-colors"
				>
					<Eye size={14} />
					{showSolution ? 'Ocultar solución' : 'Ver solución'}
				</button>
				{showSolution && (
					<pre className="animate-slide-down mt-2 bg-stone-800 border border-stone-700 rounded-md px-3 py-2 text-sm text-stone-200 font-mono overflow-x-auto whitespace-pre-wrap">
						{exercise.solution}
					</pre>
				)}
			</div>
		</div>
	)
}
