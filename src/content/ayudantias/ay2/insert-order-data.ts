export interface InsertLayer {
	order: number
	label: string
	description: string
	tables: string[]
	example: string
}

export const INSERT_LAYERS: InsertLayer[] = [
	{
		order: 1,
		label: 'Catálogos (sin FK)',
		description: 'Tablas que no dependen de ninguna otra. Se insertan primero porque el resto referencia a estas.',
		tables: ['tipo_producto'],
		example: `INSERT INTO tipo_producto (nombre) VALUES ('...');`,
	},
	{
		order: 2,
		label: 'Entidades con columnas extra',
		description: 'Catálogos que tienen más columnas además del id y nombre.',
		tables: ['local'],
		example: `INSERT INTO local (nombre, ciudad) VALUES ('...', '...');`,
	},
	{
		order: 3,
		label: 'Entidades independientes',
		description: 'Entidades principales que no tienen FK.',
		tables: ['empleado'],
		example: `INSERT INTO empleado (alias, cargo) VALUES ('...', '...');`,
	},
	{
		order: 4,
		label: 'Entidades con FK',
		description: 'Tablas que referencian catálogos y/o entidades independientes.',
		tables: ['producto'],
		example: `INSERT INTO producto (nombre, precio, id_tipo, id_local) VALUES ('...', ..., ..., ...);`,
	},
	{
		order: 5,
		label: 'Intersección',
		description: 'Relaciones N:M que necesitan que ambas entidades ya existan.',
		tables: ['venta'],
		example: `INSERT INTO venta (id_empleado, id_producto, cantidad, fecha) VALUES (..., ..., ..., '...');`,
	},
]

export const WRONG_INSERT = "INSERT INTO producto VALUES (1, 'Pollo X', 9990, 99, 1);"

export const WRONG_INSERT_EXPLANATION = "El id_tipo = 99 no existe en la tabla tipo_producto. La FK rechaza la inserción."
