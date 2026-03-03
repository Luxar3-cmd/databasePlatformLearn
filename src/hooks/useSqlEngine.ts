import { useEffect, useState } from 'react'
import type { QueryResult } from '@/types/sql'
import { initDb, resetDb, executeQuery } from '@/engine/sql'

interface SqlEngineState {
	result: QueryResult | null
	isLoading: boolean
}

export function useSqlEngine() {
	const [state, setState] = useState<SqlEngineState>({ result: null, isLoading: false })

	useEffect(() => {
		initDb()
	}, [])

	function execute(sql: string) {
		setState(s => ({ ...s, isLoading: true }))
		const result = executeQuery(sql)
		setState({ result, isLoading: false })
	}

	function reset() {
		resetDb()
		setState({ result: null, isLoading: false })
	}

	return { result: state.result, isLoading: state.isLoading, execute, reset }
}
