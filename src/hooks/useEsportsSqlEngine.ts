import { useEffect, useState } from 'react'
import type { QueryResult } from '@/types/sql'
import { initEsportsDb, resetEsportsDb, executeEsportsQuery } from '@/engine/esports-sql'

interface SqlEngineState {
	result: QueryResult | null
	isLoading: boolean
}

export function useEsportsSqlEngine() {
	const [state, setState] = useState<SqlEngineState>({ result: null, isLoading: false })

	useEffect(() => {
		initEsportsDb()
	}, [])

	function execute(sql: string): QueryResult {
		setState(s => ({ ...s, isLoading: true }))
		const result = executeEsportsQuery(sql)
		setState({ result, isLoading: false })
		return result
	}

	function reset() {
		resetEsportsDb()
		setState({ result: null, isLoading: false })
	}

	return { result: state.result, isLoading: state.isLoading, execute, reset }
}
