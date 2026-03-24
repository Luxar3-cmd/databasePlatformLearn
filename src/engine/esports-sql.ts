import alasql from 'alasql'
import type { QueryResult } from '@/types/sql'

let initialized = false

const SEED_DDL = `
	DROP TABLE IF EXISTS venta;
	DROP TABLE IF EXISTS producto;
	DROP TABLE IF EXISTS empleado;
	DROP TABLE IF EXISTS local;
	DROP TABLE IF EXISTS tipo_producto;

	CREATE TABLE tipo_producto (
		id_tipo INT,
		nombre STRING
	);
	CREATE TABLE local (
		id_local INT,
		nombre STRING,
		ciudad STRING
	);
	CREATE TABLE producto (
		id_producto INT,
		nombre STRING,
		precio FLOAT,
		id_tipo INT,
		id_local INT
	);
	CREATE TABLE empleado (
		id_empleado INT,
		alias STRING,
		cargo STRING
	);
	CREATE TABLE venta (
		id_empleado INT,
		id_producto INT,
		cantidad INT,
		fecha STRING
	);
`

const SEED_DATA: string[] = [
	// tipo_producto (4)
	"INSERT INTO tipo_producto VALUES (1, 'Pollo')",
	"INSERT INTO tipo_producto VALUES (2, 'Acompañamiento')",
	"INSERT INTO tipo_producto VALUES (3, 'Bebida')",
	"INSERT INTO tipo_producto VALUES (4, 'Postre')",

	// local (5)
	"INSERT INTO local VALUES (1, 'Los Pollos Hermanos Albuquerque', 'Albuquerque')",
	"INSERT INTO local VALUES (2, 'Los Pollos Hermanos El Paso', 'El Paso')",
	"INSERT INTO local VALUES (3, 'Los Pollos Hermanos Santa Fe', 'Santa Fe')",
	"INSERT INTO local VALUES (4, 'Los Pollos Hermanos Phoenix', 'Phoenix')",
	"INSERT INTO local VALUES (5, 'Los Pollos Hermanos Denver', 'Denver')",

	// producto (8)
	"INSERT INTO producto VALUES (1, 'Pollo Frito Original', 8990, 1, 1)",
	"INSERT INTO producto VALUES (2, 'Combo Gus Especial', 12990, 1, 1)",
	"INSERT INTO producto VALUES (3, 'Nuggets Los Pollos', 5990, 1, 2)",
	"INSERT INTO producto VALUES (4, 'Curly Fries', 3490, 2, 1)",
	"INSERT INTO producto VALUES (5, 'Ensalada Hermanos', 4990, 2, 3)",
	"INSERT INTO producto VALUES (6, 'Batido Azul', 2990, 3, 1)",
	"INSERT INTO producto VALUES (7, 'Limonada Heisenberg', 1990, 3, 2)",
	"INSERT INTO producto VALUES (8, 'Flan del Desierto', 3990, 4, 4)",

	// empleado (8)
	"INSERT INTO empleado VALUES (1, 'Heisenberg', 'Gerente de Operaciones')",
	"INSERT INTO empleado VALUES (2, 'Cap''n Cook', 'Chef Principal')",
	"INSERT INTO empleado VALUES (3, 'The Chicken Man', 'Director General')",
	"INSERT INTO empleado VALUES (4, 'The Cleaner', 'Jefe de Logística')",
	"INSERT INTO empleado VALUES (5, 'Saul Goodman', 'Asesor Legal')",
	"INSERT INTO empleado VALUES (6, 'Badger', 'Cajero')",
	"INSERT INTO empleado VALUES (7, 'Skinny Pete', 'Repartidor')",
	"INSERT INTO empleado VALUES (8, 'Combo', 'Asistente de Cocina')",

	// venta (15) — Badger y Skinny Pete sin ventas (LEFT JOIN IS NULL)
	"INSERT INTO venta VALUES (1, 1, 15, '2024-03-01')",
	"INSERT INTO venta VALUES (1, 2, 8, '2024-03-05')",
	"INSERT INTO venta VALUES (1, 4, 5, '2024-03-10')",
	"INSERT INTO venta VALUES (1, 5, 3, '2024-03-15')",
	"INSERT INTO venta VALUES (2, 1, 10, '2024-03-02')",
	"INSERT INTO venta VALUES (2, 3, 6, '2024-03-08')",
	"INSERT INTO venta VALUES (3, 2, 25, '2024-03-03')",
	"INSERT INTO venta VALUES (3, 1, 12, '2024-03-12')",
	"INSERT INTO venta VALUES (4, 5, 3, '2024-03-04')",
	"INSERT INTO venta VALUES (4, 6, 4, '2024-03-09')",
	"INSERT INTO venta VALUES (5, 7, 2, '2024-03-06')",
	"INSERT INTO venta VALUES (8, 8, 7, '2024-03-07')",
	"INSERT INTO venta VALUES (8, 4, 3, '2024-03-11')",
	"INSERT INTO venta VALUES (8, 6, 5, '2024-03-14')",
	"INSERT INTO venta VALUES (8, 7, 4, '2024-03-16')",
]

export function initEsportsDb(): void {
	if (initialized) return
	alasql(SEED_DDL)
	SEED_DATA.forEach(stmt => alasql(stmt))
	initialized = true
}

export function resetEsportsDb(): void {
	initialized = false
	initEsportsDb()
}

export function executeEsportsQuery(sql: string): QueryResult {
	try {
		const result = alasql(sql) as unknown
		if (typeof result === 'number') {
			return { ok: true, rows: [], rowCount: result }
		}
		const rows = Array.isArray(result) ? result as Record<string, unknown>[] : []
		return { ok: true, rows, rowCount: rows.length }
	} catch (err) {
		return { ok: false, error: translateError(err) }
	}
}

const LOS_POLLOS_TABLES = 'tipo_producto, local, producto, empleado, venta'

function translateError(err: unknown): string {
	const msg = err instanceof Error ? err.message : String(err)
	if (msg.includes('not found') || msg.includes('Table') && msg.includes('undefined')) {
		return `Tabla no encontrada. Tablas disponibles: ${LOS_POLLOS_TABLES}.`
	}
	if (msg.includes('Unexpected token') || msg.includes('parse error')) {
		return 'Error de sintaxis SQL. Revisa paréntesis, comillas y palabras clave de la consulta.'
	}
	if (msg.toLowerCase().includes('column')) {
		return `Columna no encontrada: ${msg}`
	}
	if (msg.includes('parse')) {
		return 'No se pudo interpretar la consulta SQL.'
	}
	return `Error SQL: ${msg}`
}
