import type { TableSchema } from '@/types/sql'

export const DB_SCHEMA: TableSchema[] = [
	{
		nombre: 'departamentos',
		columnas: [
			{ nombre: 'id', tipo: 'INT' },
			{ nombre: 'nombre', tipo: 'STRING' },
			{ nombre: 'codigo', tipo: 'STRING' },
		],
	},
	{
		nombre: 'profesores',
		columnas: [
			{ nombre: 'id', tipo: 'INT' },
			{ nombre: 'nombre', tipo: 'STRING' },
			{ nombre: 'apellido', tipo: 'STRING' },
			{ nombre: 'departamento_id', tipo: 'INT' },
		],
	},
	{
		nombre: 'alumnos',
		columnas: [
			{ nombre: 'id', tipo: 'INT' },
			{ nombre: 'nombre', tipo: 'STRING' },
			{ nombre: 'apellido', tipo: 'STRING' },
			{ nombre: 'rol', tipo: 'STRING' },
		],
	},
	{
		nombre: 'asignaturas',
		columnas: [
			{ nombre: 'id', tipo: 'INT' },
			{ nombre: 'codigo', tipo: 'STRING' },
			{ nombre: 'nombre', tipo: 'STRING' },
			{ nombre: 'creditos', tipo: 'INT' },
			{ nombre: 'departamento_id', tipo: 'INT' },
		],
	},
	{
		nombre: 'inscripciones',
		columnas: [
			{ nombre: 'id', tipo: 'INT' },
			{ nombre: 'alumno_id', tipo: 'INT' },
			{ nombre: 'asignatura_id', tipo: 'INT' },
			{ nombre: 'semestre', tipo: 'STRING' },
			{ nombre: 'nota', tipo: 'FLOAT' },
		],
	},
]

export const TABLE_NAMES = DB_SCHEMA.map(t => t.nombre)
