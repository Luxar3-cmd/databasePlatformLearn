import type { TableSchema } from '@/types/sql'

export const ESPORTS_SCHEMA: TableSchema[] = [
	{
		nombre: 'tipo_producto',
		columnas: [
			{ nombre: 'id_tipo', tipo: 'INT', restriccion: 'PK' },
			{ nombre: 'nombre', tipo: 'VARCHAR(30)', restriccion: 'NOT NULL UNIQUE' },
		],
	},
	{
		nombre: 'local',
		columnas: [
			{ nombre: 'id_local', tipo: 'INT', restriccion: 'PK' },
			{ nombre: 'nombre', tipo: 'VARCHAR(50)', restriccion: 'NOT NULL UNIQUE' },
			{ nombre: 'ciudad', tipo: 'VARCHAR(50)', restriccion: 'NOT NULL' },
		],
	},
	{
		nombre: 'producto',
		columnas: [
			{ nombre: 'id_producto', tipo: 'INT', restriccion: 'PK' },
			{ nombre: 'nombre', tipo: 'VARCHAR(100)', restriccion: 'NOT NULL' },
			{ nombre: 'precio', tipo: 'DECIMAL(8,2)', restriccion: 'NOT NULL' },
			{ nombre: 'id_tipo', tipo: 'INT', restriccion: 'FK -> tipo_producto' },
			{ nombre: 'id_local', tipo: 'INT', restriccion: 'FK -> local' },
		],
	},
	{
		nombre: 'empleado',
		columnas: [
			{ nombre: 'id_empleado', tipo: 'INT', restriccion: 'PK' },
			{ nombre: 'alias', tipo: 'VARCHAR(30)', restriccion: 'NOT NULL UNIQUE' },
			{ nombre: 'cargo', tipo: 'VARCHAR(50)', restriccion: 'NOT NULL' },
		],
	},
	{
		nombre: 'venta',
		columnas: [
			{ nombre: 'id_empleado', tipo: 'INT', restriccion: 'PK, FK -> empleado' },
			{ nombre: 'id_producto', tipo: 'INT', restriccion: 'PK, FK -> producto' },
			{ nombre: 'cantidad', tipo: 'INT', restriccion: 'NOT NULL' },
			{ nombre: 'fecha', tipo: 'DATE', restriccion: 'NOT NULL' },
		],
	},
]
