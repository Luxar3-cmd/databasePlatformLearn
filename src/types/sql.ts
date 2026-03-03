export type QueryResult =
	| { ok: true; rows: Record<string, unknown>[]; rowCount: number }
	| { ok: false; error: string }

export interface ColumnDef {
	nombre: string
	tipo: string
	restriccion?: string
}

export interface TableSchema {
	nombre: string
	columnas: ColumnDef[]
}

export interface Exercise {
	id: string
	title: string
	description: string
	hint: string
	solution: string
	initialQuery?: string
	difficulty: 'basico' | 'intermedio' | 'avanzado'
}
