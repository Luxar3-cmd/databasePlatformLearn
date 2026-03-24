import { useState, useCallback, useEffect } from 'react'

const STORAGE_KEY = 'ayudantia2-progress'

interface ProgressState {
	completedSteps: Record<string, string[]>
	attempts: Record<string, number>
}

const EMPTY: ProgressState = {
	completedSteps: {},
	attempts: {},
}

function load(): ProgressState {
	try {
		const raw = localStorage.getItem(STORAGE_KEY)
		if (!raw) return EMPTY
		return { ...EMPTY, ...JSON.parse(raw) }
	} catch {
		return EMPTY
	}
}

function save(state: ProgressState) {
	localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
}

export function useProgress() {
	const [state, setState] = useState<ProgressState>(load)

	useEffect(() => {
		save(state)
	}, [state])

	const markComplete = useCallback((bloque: string, stepId: string) => {
		setState(prev => {
			const steps = prev.completedSteps[bloque] ?? []
			if (steps.includes(stepId)) return prev
			return {
				...prev,
				completedSteps: {
					...prev.completedSteps,
					[bloque]: [...steps, stepId],
				},
			}
		})
	}, [])

	const isComplete = useCallback((bloque: string, stepId: string) => {
		return (state.completedSteps[bloque] ?? []).includes(stepId)
	}, [state.completedSteps])

	const getCompletedCount = useCallback((bloque: string, total: number) => {
		return Math.min((state.completedSteps[bloque] ?? []).length, total)
	}, [state.completedSteps])

	const incrementAttempts = useCallback((key: string) => {
		setState(prev => ({
			...prev,
			attempts: {
				...prev.attempts,
				[key]: (prev.attempts[key] ?? 0) + 1,
			},
		}))
	}, [])

	const getAttempts = useCallback((key: string) => {
		return state.attempts[key] ?? 0
	}, [state.attempts])

	const resetProgress = useCallback(() => {
		setState(EMPTY)
		localStorage.removeItem(STORAGE_KEY)
	}, [])

	return {
		markComplete,
		isComplete,
		getCompletedCount,
		incrementAttempts,
		getAttempts,
		resetProgress,
	}
}
