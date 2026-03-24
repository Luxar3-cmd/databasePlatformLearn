import { useState } from 'react'
import { ChevronRight, Lock, Play, RotateCcw, CheckCircle2, Lightbulb } from 'lucide-react'
import { SqlEditor } from '@/components/u1/SqlEditor'
import { ResultsTable } from '@/components/u1/ResultsTable'
import { SchemaViewer } from '@/components/ui/SchemaViewer'
import { Callout } from '@/components/ui/Callout'
import { useEsportsSqlEngine } from '@/hooks/useEsportsSqlEngine'
import { useProgress } from '@/hooks/useProgress'
import { ESPORTS_SCHEMA } from '@/engine/esports-schema'
import { executeEsportsQuery } from '@/engine/esports-sql'
import { SELECT_STEPS } from '@/content/ayudantias/ay2/select-steps'

const BLOQUE = 'b4'

function rowsMatch(a: Record<string, unknown>[], b: Record<string, unknown>[]): boolean {
	if (a.length !== b.length) return false
	const rowKey = (r: Record<string, unknown>) =>
		Object.values(r).map(v => String(v ?? '')).sort().join('\0')
	return [...a].map(rowKey).sort().join('\n') === [...b].map(rowKey).sort().join('\n')
}

function getHintLevel(attempts: number): number {
	if (attempts >= 5) return 2
	if (attempts >= 3) return 1
	return 0
}

export default function B4SelectProgressive() {
	const [currentStep, setCurrentStep] = useState(0)
	const [queries, setQueries] = useState<string[]>(
		() => SELECT_STEPS.map(s => s.initialQuery ?? '')
	)
	const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null)
	const [showHint, setShowHint] = useState(false)
	const { result, isLoading, execute, reset } = useEsportsSqlEngine()
	const { markComplete, isComplete, incrementAttempts, getAttempts } = useProgress()

	const step = SELECT_STEPS[currentStep]

	function isStepUnlocked(idx: number): boolean {
		if (idx === 0) return true
		return isComplete(BLOQUE, SELECT_STEPS[idx - 1].id)
	}

	function updateQuery(idx: number, val: string) {
		setQueries(prev => {
			const next = [...prev]
			next[idx] = val
			return next
		})
	}

	function handleExecute() {
		const attemptKey = `b4-step-${step.id}`
		incrementAttempts(attemptKey)
		setShowHint(false)
		setFeedback(null)

		execute(queries[currentStep])

		setTimeout(() => {
			const res = document.querySelector('[data-results]')
			if (res) res.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
		}, 50)
	}

	function handleValidate() {
		if (!result) return

		if (!result.ok) {
			setFeedback({ type: 'error', message: `Error en la consulta: ${result.error}` })
			return
		}

		const expected = executeEsportsQuery(step.sql)
		if (!expected.ok) return

		if (result.rowCount !== expected.rowCount) {
			setFeedback({ type: 'error', message: `Resultado incorrecto. Se esperaban ${expected.rowCount} filas, obtuviste ${result.rowCount}.` })
			return
		}

		if (!rowsMatch(result.rows, expected.rows)) {
			setFeedback({ type: 'error', message: `El número de filas es correcto pero los datos no coinciden. Revisa las columnas o condiciones de la consulta.` })
			return
		}

		markComplete(BLOQUE, step.id)
		setFeedback({ type: 'success', message: '¡Correcto! Paso completado.' })
	}

	const attempts = getAttempts(`b4-step-${step.id}`)
	const hintLevel = getHintLevel(attempts)
	const stepCompleted = isComplete(BLOQUE, step.id)

	return (
		<div className="flex flex-col gap-6">
			{/* Schema */}
			<SchemaViewer schema={ESPORTS_SCHEMA} title="Esquema Los Pollos Hermanos" />

			{/* Step pills */}
			<div className="flex flex-wrap gap-2">
				{SELECT_STEPS.map((s, i) => {
					const unlocked = isStepUnlocked(i)
					const completed = isComplete(BLOQUE, s.id)

					return (
						<button
							key={s.id}
							onClick={() => unlocked && setCurrentStep(i)}
							disabled={!unlocked}
							className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-colors border ${
								!unlocked
									? 'bg-stone-950 text-stone-600 border-stone-800 cursor-not-allowed opacity-50'
									: currentStep === i
										? 'bg-amber-500/15 text-amber-400 border-amber-500/30'
										: completed
											? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/25 hover:border-emerald-500/40'
											: 'bg-stone-900 text-stone-400 border-stone-700 hover:text-stone-200 hover:border-stone-600'
							}`}
						>
							<span className={`flex items-center justify-center w-5 h-5 rounded-full text-[10px] font-bold ${
								!unlocked
									? 'bg-stone-900 text-stone-600'
									: completed
										? 'bg-emerald-500/20 text-emerald-400'
										: currentStep === i
											? 'bg-amber-500/25 text-amber-300'
											: 'bg-stone-800 text-stone-500'
							}`}>
								{!unlocked ? <Lock size={10} /> : completed ? <CheckCircle2 size={10} /> : i + 1}
							</span>
							<span className="hidden sm:inline">{s.concept}</span>
						</button>
					)
				})}
			</div>

			{/* Active step content */}
			<div className="flex flex-col gap-5" key={step.id}>
				{/* Locked overlay */}
				{!isStepUnlocked(currentStep) ? (
					<div className="flex flex-col items-center justify-center gap-3 py-12 text-stone-500">
						<Lock size={32} />
						<p className="text-sm font-medium">Completa el paso anterior para desbloquear</p>
					</div>
				) : (
					<>
						{/* Title */}
						<div className="flex items-center gap-2">
							<span className={`flex items-center justify-center w-7 h-7 rounded-full text-sm font-bold ${
								stepCompleted
									? 'bg-emerald-500/15 text-emerald-400'
									: 'bg-amber-500/15 text-amber-400'
							}`}>
								{stepCompleted ? <CheckCircle2 size={16} /> : currentStep + 1}
							</span>
							<h2 className="font-serif text-lg font-semibold text-stone-100">
								{step.title}
							</h2>
							{stepCompleted && (
								<span className="text-xs text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full">
									Completado
								</span>
							)}
						</div>

						{/* Concept explanation */}
						<Callout type="definition" title={step.concept}>
							{step.explanation}
						</Callout>

						{/* Question */}
						<div className="bg-stone-900 border border-stone-800 rounded-md px-4 py-3">
							<div className="flex items-start gap-2">
								<ChevronRight size={16} className="text-amber-500 mt-0.5 shrink-0" />
								<p className="text-stone-200 font-medium text-sm">
									{step.question}
								</p>
							</div>
						</div>

						{/* Hint section */}
						{!stepCompleted && attempts > 0 && (
							<div className="flex flex-col gap-2">
								<button
									onClick={() => setShowHint(h => !h)}
									className="flex items-center gap-2 text-sm text-blue-400 hover:text-blue-300 transition-colors w-fit"
								>
									<Lightbulb size={14} />
									{showHint ? 'Ocultar pista' : 'Ver pista'}
								</button>
								{showHint && (
									<div className="bg-blue-950/30 border border-blue-500/20 rounded-md px-4 py-3">
										<p className="text-xs font-semibold text-blue-400 mb-1">
											Pista nivel {hintLevel + 1}
										</p>
										<p className="text-sm text-stone-300 font-mono">
											{step.hints[hintLevel]}
										</p>
									</div>
								)}
							</div>
						)}

						{/* SQL Editor */}
						<SqlEditor
							value={queries[currentStep]}
							onChange={(val) => updateQuery(currentStep, val)}
							onExecute={handleExecute}
						/>

						{/* Execute + Validate + Reset buttons */}
						<div className="flex items-center gap-3">
							<button
								onClick={handleExecute}
								disabled={isLoading}
								className="flex items-center gap-2 px-4 py-2 rounded-md bg-amber-600 hover:bg-amber-500 text-stone-950 text-sm font-semibold transition-colors disabled:opacity-50"
							>
								<Play size={14} />
								Ejecutar
							</button>
							{result && !stepCompleted && (
								<button
									onClick={handleValidate}
									className="flex items-center gap-2 px-4 py-2 rounded-md bg-emerald-600 hover:bg-emerald-500 text-stone-950 text-sm font-semibold transition-colors"
								>
									<CheckCircle2 size={14} />
									Validar respuesta
								</button>
							)}
							<button
								onClick={reset}
								className="flex items-center gap-2 px-3 py-2 rounded-md border border-stone-700 text-stone-400 hover:text-stone-200 hover:border-stone-600 text-sm transition-colors"
							>
								<RotateCcw size={14} />
								Reset BD
							</button>
						</div>

						{/* Feedback */}
						{feedback && (
							<div className={`rounded-md px-4 py-3 text-sm font-medium ${
								feedback.type === 'success'
									? 'bg-emerald-500/10 border border-emerald-500/25 text-emerald-400'
									: 'bg-red-500/10 border border-red-500/25 text-red-400'
							}`}>
								{feedback.message}
							</div>
						)}

						{/* Results */}
						<div data-results>
							<ResultsTable result={result} />
						</div>

						{/* Transfer tip */}
						<Callout type="example" title="Patron reutilizable">
							{step.transferTip}
						</Callout>
					</>
				)}
			</div>
		</div>
	)
}
