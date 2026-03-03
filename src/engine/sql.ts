import alasql from 'alasql'
import type { QueryResult } from '@/types/sql'

// Pitfall 3: Track init state to avoid re-seeding when multiple components mount
let initialized = false

const SEED_DDL = `
	DROP TABLE IF EXISTS inscripciones;
	DROP TABLE IF EXISTS asignaturas;
	DROP TABLE IF EXISTS alumnos;
	DROP TABLE IF EXISTS profesores;
	DROP TABLE IF EXISTS departamentos;

	CREATE TABLE departamentos (
		id INT,
		nombre STRING,
		codigo STRING
	);
	CREATE TABLE profesores (
		id INT,
		nombre STRING,
		apellido STRING,
		departamento_id INT
	);
	CREATE TABLE alumnos (
		id INT,
		nombre STRING,
		apellido STRING,
		rol STRING
	);
	CREATE TABLE asignaturas (
		id INT,
		codigo STRING,
		nombre STRING,
		creditos INT,
		departamento_id INT
	);
	CREATE TABLE inscripciones (
		id INT,
		alumno_id INT,
		asignatura_id INT,
		semestre STRING,
		nota FLOAT
	);
`

// Pitfall 2: AlaSQL returns number for DML — each INSERT must be separate call
const SEED_DATA: string[] = [
	// departamentos (5)
	"INSERT INTO departamentos VALUES (1, 'Informatica', 'DI')",
	"INSERT INTO departamentos VALUES (2, 'Matematica', 'DM')",
	"INSERT INTO departamentos VALUES (3, 'Fisica', 'DF')",
	"INSERT INTO departamentos VALUES (4, 'Industrias', 'DII')",
	"INSERT INTO departamentos VALUES (5, 'Electronica', 'DE')",

	// profesores (8)
	"INSERT INTO profesores VALUES (1, 'Carlos', 'Fuentes', 1)",
	"INSERT INTO profesores VALUES (2, 'Ana', 'Reyes', 1)",
	"INSERT INTO profesores VALUES (3, 'Jorge', 'Medina', 2)",
	"INSERT INTO profesores VALUES (4, 'Patricia', 'Soto', 2)",
	"INSERT INTO profesores VALUES (5, 'Luis', 'Castillo', 3)",
	"INSERT INTO profesores VALUES (6, 'Monica', 'Vega', 4)",
	"INSERT INTO profesores VALUES (7, 'Roberto', 'Pinto', 4)",
	"INSERT INTO profesores VALUES (8, 'Sandra', 'Munoz', 5)",

	// alumnos (14)
	"INSERT INTO alumnos VALUES (1, 'Felipe', 'Gonzalez', '202173001-K')",
	"INSERT INTO alumnos VALUES (2, 'Valentina', 'Herrera', '202173002-1')",
	"INSERT INTO alumnos VALUES (3, 'Sebastian', 'Rojas', '202173003-2')",
	"INSERT INTO alumnos VALUES (4, 'Camila', 'Torres', '202173004-3')",
	"INSERT INTO alumnos VALUES (5, 'Nicolas', 'Vargas', '202173005-4')",
	"INSERT INTO alumnos VALUES (6, 'Isidora', 'Campos', '202173006-5')",
	"INSERT INTO alumnos VALUES (7, 'Matias', 'Sandoval', '202173007-6')",
	"INSERT INTO alumnos VALUES (8, 'Constanza', 'Ortiz', '202173008-7')",
	"INSERT INTO alumnos VALUES (9, 'Diego', 'Flores', '202073009-8')",
	"INSERT INTO alumnos VALUES (10, 'Fernanda', 'Cruz', '202073010-9')",
	"INSERT INTO alumnos VALUES (11, 'Andres', 'Moreno', '202073011-0')",
	"INSERT INTO alumnos VALUES (12, 'Daniela', 'Rios', '202073012-1')",
	"INSERT INTO alumnos VALUES (13, 'Ignacio', 'Pena', '201973013-2')",
	"INSERT INTO alumnos VALUES (14, 'Javiera', 'Lagos', '201973014-3')",

	// asignaturas (9) — codigos reales UTFSM
	"INSERT INTO asignaturas VALUES (1, 'INF-239', 'Bases de Datos', 3, 1)",
	"INSERT INTO asignaturas VALUES (2, 'INF-245', 'Redes de Computadores', 3, 1)",
	"INSERT INTO asignaturas VALUES (3, 'INF-152', 'Estructura de Datos', 4, 1)",
	"INSERT INTO asignaturas VALUES (4, 'MAT-021', 'Calculo en Varias Variables', 5, 2)",
	"INSERT INTO asignaturas VALUES (5, 'MAT-023', 'Algebra Lineal', 4, 2)",
	"INSERT INTO asignaturas VALUES (6, 'FIS-110', 'Fisica General I', 5, 3)",
	"INSERT INTO asignaturas VALUES (7, 'IND-163', 'Investigacion de Operaciones', 4, 4)",
	"INSERT INTO asignaturas VALUES (8, 'ELO-211', 'Circuitos Electricos', 5, 5)",
	"INSERT INTO asignaturas VALUES (9, 'INF-343', 'Ingenieria de Software', 3, 1)",

	// inscripciones (24) — semestres 2024-1 y 2024-2, notas 1.0 a 7.0
	"INSERT INTO inscripciones VALUES (1, 1, 1, '2024-2', 6.5)",
	"INSERT INTO inscripciones VALUES (2, 1, 4, '2024-2', 5.8)",
	"INSERT INTO inscripciones VALUES (3, 1, 6, '2024-1', 4.2)",
	"INSERT INTO inscripciones VALUES (4, 2, 1, '2024-2', 7.0)",
	"INSERT INTO inscripciones VALUES (5, 2, 2, '2024-2', 5.5)",
	"INSERT INTO inscripciones VALUES (6, 2, 5, '2024-1', 6.0)",
	"INSERT INTO inscripciones VALUES (7, 3, 1, '2024-2', 3.8)",
	"INSERT INTO inscripciones VALUES (8, 3, 3, '2024-1', 4.5)",
	"INSERT INTO inscripciones VALUES (9, 3, 7, '2024-1', 5.0)",
	"INSERT INTO inscripciones VALUES (10, 4, 1, '2024-2', 4.8)",
	"INSERT INTO inscripciones VALUES (11, 4, 4, '2024-2', 2.9)",
	"INSERT INTO inscripciones VALUES (12, 4, 8, '2024-1', 6.2)",
	"INSERT INTO inscripciones VALUES (13, 5, 2, '2024-2', 5.3)",
	"INSERT INTO inscripciones VALUES (14, 5, 9, '2024-2', 6.8)",
	"INSERT INTO inscripciones VALUES (15, 6, 1, '2024-2', 1.5)",
	"INSERT INTO inscripciones VALUES (16, 6, 3, '2024-1', 4.0)",
	"INSERT INTO inscripciones VALUES (17, 7, 4, '2024-2', 5.1)",
	"INSERT INTO inscripciones VALUES (18, 7, 5, '2024-2', 3.5)",
	"INSERT INTO inscripciones VALUES (19, 8, 1, '2024-2', 6.1)",
	"INSERT INTO inscripciones VALUES (20, 8, 6, '2024-1', 4.9)",
	"INSERT INTO inscripciones VALUES (21, 9, 7, '2024-1', 5.7)",
	"INSERT INTO inscripciones VALUES (22, 10, 9, '2024-2', 4.3)",
	"INSERT INTO inscripciones VALUES (23, 11, 3, '2024-1', 2.1)",
	"INSERT INTO inscripciones VALUES (24, 12, 8, '2024-1', 6.4)",
]

export function initDb(): void {
	if (initialized) return
	alasql(SEED_DDL)
	SEED_DATA.forEach(stmt => alasql(stmt))
	initialized = true
}

export function resetDb(): void {
	initialized = false
	initDb()
}

export function executeQuery(sql: string): QueryResult {
	try {
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		const result = alasql(sql) as any
		// Pitfall 2: DML returns number (affected rows), not array
		if (typeof result === 'number') {
			return { ok: true, rows: [], rowCount: result }
		}
		const rows = Array.isArray(result) ? result as Record<string, unknown>[] : []
		return { ok: true, rows, rowCount: rows.length }
	} catch (err) {
		return { ok: false, error: translateError(err) }
	}
}

function translateError(err: unknown): string {
	const msg = err instanceof Error ? err.message : String(err)
	if (msg.includes('not found') || msg.includes('Table') && msg.includes('undefined')) {
		return 'Tabla no encontrada. Verifica el nombre.'
	}
	if (msg.includes('Unexpected token') || msg.includes('parse error')) {
		return 'Error de sintaxis SQL. Revisa la consulta.'
	}
	if (msg.toLowerCase().includes('column')) {
		return `Columna no encontrada: ${msg}`
	}
	if (msg.includes('parse')) {
		return 'No se pudo interpretar la consulta SQL.'
	}
	return `Error SQL: ${msg}`
}
