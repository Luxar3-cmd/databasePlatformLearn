import { useState, useEffect } from 'react'
import { CheckCircle2, XCircle, RotateCcw, ArrowRight, Trophy, AlertCircle } from 'lucide-react'
import { U1_QUIZ } from '@/content/units/u1/quiz'
import type { QuizQuestion } from '@/content/units/u1/quiz'

type QuizPhase = 'answering' | 'feedback' | 'complete'

interface ShuffledOption {
	text: string
	isCorrect: boolean
}

interface ShuffledQuestion {
	original: QuizQuestion
	options: ShuffledOption[]
}

function shuffle<T>(arr: T[]): T[] {
	for (let i = arr.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[arr[i], arr[j]] = [arr[j], arr[i]]
	}
	return arr
}

function shuffleQuestion(q: QuizQuestion): ShuffledQuestion {
	const labeled = q.options.map((text, i) => ({ text, isCorrect: i === q.correctIndex }))
	return { original: q, options: shuffle(labeled) }
}

function buildShuffledQuestions(): ShuffledQuestion[] {
	return shuffle([...U1_QUIZ]).map(shuffleQuestion)
}

function optionClass(
	idx: number,
	selectedOption: number | null,
	phase: QuizPhase,
	options: ShuffledOption[],
): string {
	const base = 'w-full text-left px-4 py-3 rounded-lg border text-sm transition-colors'
	const isSelected = idx === selectedOption
	const isCorrect = options[idx].isCorrect

	if (phase === 'answering') {
		return `${base} ${isSelected
			? 'border-blue-500 bg-blue-950/40 text-zinc-100'
			: 'border-zinc-700 bg-zinc-900 text-zinc-300 hover:border-zinc-500 hover:text-zinc-100'}`
	}

	// feedback phase
	if (isCorrect) return `${base} border-green-500 bg-green-950/40 text-green-200`
	if (isSelected && !isCorrect) return `${base} border-red-500 bg-red-950/40 text-red-300`
	return `${base} border-zinc-800 bg-zinc-900/50 text-zinc-500`
}

function scoreIcon(score: number, total: number) {
	const pct = score / total
	if (pct >= 0.9) return <Trophy size={40} className="text-yellow-400" />
	if (pct >= 0.7) return <CheckCircle2 size={40} className="text-green-400" />
	return <AlertCircle size={40} className="text-amber-400" />
}

function scoreMessage(score: number, total: number) {
	const pct = score / total
	if (pct >= 0.9) return 'Excelente — dominas los conceptos de U1'
	if (pct >= 0.7) return 'Bien — repasa los temas donde fallaste'
	return 'Sigue practicando — hay conceptos que reforzar'
}

export default function QuizSection() {
	const [questions, setQuestions] = useState<ShuffledQuestion[]>([])
	const [currentIndex, setCurrentIndex] = useState(0)
	const [selectedOption, setSelectedOption] = useState<number | null>(null)
	const [phase, setPhase] = useState<QuizPhase>('answering')
	const [results, setResults] = useState<boolean[]>([])

	useEffect(() => {
		setQuestions(buildShuffledQuestions())
	}, [])

	function resetQuiz() {
		setCurrentIndex(0)
		setSelectedOption(null)
		setPhase('answering')
		setResults([])
		setQuestions(buildShuffledQuestions())
	}

	function handleConfirm() {
		if (selectedOption === null) return
		const isCorrect = questions[currentIndex].options[selectedOption].isCorrect
		setResults(prev => [...prev, isCorrect])
		setPhase('feedback')
	}

	function handleNext() {
		if (currentIndex + 1 >= questions.length) {
			setPhase('complete')
		} else {
			setCurrentIndex(prev => prev + 1)
			setSelectedOption(null)
			setPhase('answering')
		}
	}

	if (questions.length === 0) {
		return (
			<div className="text-zinc-500 text-sm p-6">Cargando preguntas...</div>
		)
	}

	// Complete screen
	if (phase === 'complete') {
		const score = results.filter(Boolean).length
		const total = results.length
		const incorrectIndices = results.map((ok, i) => ({ ok, i })).filter(x => !x.ok)

		return (
			<div className="max-w-2xl mx-auto py-6 px-4 flex flex-col gap-6">
				{/* Score card */}
				<div className="rounded-xl border border-zinc-700 bg-zinc-900 p-8 flex flex-col items-center gap-3 text-center">
					{scoreIcon(score, total)}
					<p className="text-3xl font-bold text-zinc-100">
						{score} <span className="text-zinc-500 text-xl font-normal">de</span> {total}
					</p>
					<p className="text-zinc-400 text-sm">{scoreMessage(score, total)}</p>
				</div>

				{/* Incorrect summary */}
				{incorrectIndices.length > 0 && (
					<div className="flex flex-col gap-3">
						<h3 className="text-zinc-400 text-sm font-medium uppercase tracking-wide">
							Preguntas incorrectas
						</h3>
						{incorrectIndices.map(({ i }) => {
							const q = questions[i]
							const correct = q.options.find(o => o.isCorrect)
							return (
								<div key={i} className="rounded-lg border border-zinc-800 bg-zinc-900/50 p-4 flex flex-col gap-2">
									<p className="text-zinc-300 text-sm font-medium">{q.original.question}</p>
									<p className="text-green-400 text-sm">
										<span className="text-zinc-500">Correcta: </span>{correct?.text}
									</p>
									<p className="text-zinc-500 text-xs leading-relaxed">{q.original.explanation}</p>
								</div>
							)
						})}
					</div>
				)}

				{/* Retry button */}
				<button
					onClick={resetQuiz}
					className="flex items-center gap-2 self-center px-6 py-2.5 bg-blue-600 hover:bg-blue-500 text-white text-sm font-medium rounded-lg transition-colors"
				>
					<RotateCcw size={15} />
					Intentar de nuevo
				</button>
			</div>
		)
	}

	const q = questions[currentIndex]

	return (
		<div className="max-w-2xl mx-auto py-6 px-4 flex flex-col gap-5">
			{/* Progress */}
			<div className="flex flex-col gap-1.5">
				<div className="w-full bg-zinc-800 rounded-full h-1.5">
					<div
						className="bg-blue-500 h-1.5 rounded-full transition-all"
						style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
					/>
				</div>
				<p className="text-zinc-500 text-xs text-right">
					{currentIndex + 1} / {questions.length}
				</p>
			</div>

			{/* Topic badge */}
			<span className="text-xs text-zinc-500 font-medium">
				Tema {q.original.topic}
			</span>

			{/* Question */}
			<p className="text-zinc-100 text-base font-medium leading-relaxed">
				{q.original.question}
			</p>

			{/* Options */}
			<div className="flex flex-col gap-2">
				{q.options.map((opt, idx) => (
					<button
						key={idx}
						onClick={() => phase === 'answering' && setSelectedOption(idx)}
						className={optionClass(idx, selectedOption, phase, q.options)}
						disabled={phase === 'feedback'}
					>
						{opt.text}
					</button>
				))}
			</div>

			{/* Feedback */}
			{phase === 'feedback' && (
				<div className="flex flex-col gap-3">
					{selectedOption !== null && q.options[selectedOption].isCorrect ? (
						<div className="flex items-center gap-2 bg-green-950/40 border border-green-700/50 rounded-md px-3 py-2 text-sm text-green-300">
							<CheckCircle2 size={15} className="shrink-0" />
							Correcto!
						</div>
					) : (
						<div className="flex items-start gap-2 bg-red-950/40 border border-red-700/50 rounded-md px-3 py-2 text-sm text-red-300">
							<XCircle size={15} className="shrink-0 mt-0.5" />
							<span>
								Incorrecto.{' '}
								<span className="text-red-200">
									La correcta era: {q.options.find(o => o.isCorrect)?.text}
								</span>
							</span>
						</div>
					)}
					{/* Explanation */}
					<div className="border-l-2 border-blue-700 bg-blue-950/20 px-4 py-3 text-zinc-400 text-sm leading-relaxed rounded-r-md">
						{q.original.explanation}
					</div>
				</div>
			)}

			{/* Action buttons */}
			<div className="flex gap-3">
				{phase === 'answering' && (
					<button
						onClick={handleConfirm}
						disabled={selectedOption === null}
						className="flex items-center gap-2 px-5 py-2 bg-blue-600 hover:bg-blue-500 disabled:opacity-40 disabled:cursor-not-allowed text-white text-sm font-medium rounded-lg transition-colors"
					>
						Confirmar
					</button>
				)}
				{phase === 'feedback' && (
					<button
						onClick={handleNext}
						className="flex items-center gap-2 px-5 py-2 bg-zinc-700 hover:bg-zinc-600 text-zinc-100 text-sm font-medium rounded-lg transition-colors"
					>
						{currentIndex + 1 >= questions.length ? 'Ver resultado' : 'Siguiente'}
						<ArrowRight size={15} />
					</button>
				)}
			</div>
		</div>
	)
}
