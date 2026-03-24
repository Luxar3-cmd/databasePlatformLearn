export interface SqlCommand {
	name: string
	description: string
	example: string
}

export interface SqlBranch {
	id: string
	label: string
	fullName: string
	description: string
	color: string
	commands: SqlCommand[]
}

export const SQL_BRANCHES: SqlBranch[] = [
	{
		id: 'ddl',
		label: 'DDL',
		fullName: 'Data Definition Language',
		description: 'Define la estructura de la BD',
		color: 'blue',
		commands: [
			{
				name: 'CREATE',
				description: 'Crea tablas, bases de datos u otros objetos',
				example: "CREATE TABLE producto (id_producto INT PRIMARY KEY, nombre VARCHAR(100) NOT NULL);",
			},
			{
				name: 'ALTER',
				description: 'Modifica la estructura de una tabla existente',
				example: "ALTER TABLE empleado ADD COLUMN telefono VARCHAR(15);",
			},
			{
				name: 'DROP',
				description: 'Elimina tablas u objetos completos',
				example: "DROP TABLE IF EXISTS venta;",
			},
			{
				name: 'TRUNCATE',
				description: 'Elimina todos los registros de una tabla sin borrar su estructura',
				example: "TRUNCATE TABLE venta;",
			},
		],
	},
	{
		id: 'dml',
		label: 'DML',
		fullName: 'Data Manipulation Language',
		description: 'Manipula los datos (CRUD)',
		color: 'green',
		commands: [
			{
				name: 'SELECT',
				description: 'Consulta y recupera datos de una o más tablas',
				example: "SELECT nombre, precio FROM producto;",
			},
			{
				name: 'INSERT',
				description: 'Inserta nuevos registros en una tabla',
				example: "INSERT INTO local (nombre, ciudad) VALUES ('Los Pollos Hermanos Albuquerque', 'Albuquerque');",
			},
			{
				name: 'UPDATE',
				description: 'Modifica registros existentes',
				example: "UPDATE producto SET precio = 9990 WHERE id_producto = 1;",
			},
			{
				name: 'DELETE',
				description: 'Elimina registros de una tabla',
				example: "DELETE FROM venta WHERE id_empleado = 6;",
			},
		],
	},
	{
		id: 'dcl',
		label: 'DCL',
		fullName: 'Data Control Language',
		description: 'Controla permisos y acceso',
		color: 'orange',
		commands: [
			{
				name: 'GRANT',
				description: 'Otorga permisos a un usuario',
				example: "GRANT SELECT ON pollos_hermanos.* TO 'mesero'@'localhost';",
			},
			{
				name: 'REVOKE',
				description: 'Revoca permisos previamente otorgados',
				example: "REVOKE INSERT ON pollos_hermanos.* FROM 'mesero'@'localhost';",
			},
		],
	},
	{
		id: 'tcl',
		label: 'TCL',
		fullName: 'Transaction Control Language',
		description: 'Controla transacciones',
		color: 'amber',
		commands: [
			{
				name: 'COMMIT',
				description: 'Confirma todos los cambios de la transacción actual',
				example: "START TRANSACTION; UPDATE producto SET precio = 9990 WHERE id_producto = 1; COMMIT;",
			},
			{
				name: 'ROLLBACK',
				description: 'Revierte todos los cambios de la transacción actual',
				example: "START TRANSACTION; DELETE FROM venta WHERE id_empleado = 1; ROLLBACK;",
			},
			{
				name: 'SAVEPOINT',
				description: 'Crea un punto de guardado dentro de una transacción',
				example: "SAVEPOINT antes_de_eliminar;",
			},
		],
	},
]
