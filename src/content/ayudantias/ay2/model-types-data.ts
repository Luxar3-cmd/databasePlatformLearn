export interface ModelType {
	id: string
	name: string
	level: string
	audience: string
	description: string
	example: string
	color: string
}

export const MODEL_TYPES: ModelType[] = [
	{
		id: 'conceptual',
		name: 'Conceptual',
		level: 'Alto nivel',
		audience: 'Cliente/usuario',
		description: 'Representación abstracta de la realidad. Diagrama E-R o UML del sistema',
		example: 'Entidad "Producto" con atributos: id, nombre, precio. Conectado a "Local" con asociación "se ofrece en" (N:1) y a "Tipo Producto" con asociación "pertenece a" (N:1)',
		color: 'green',
	},
	{
		id: 'logico',
		name: 'Lógico',
		level: 'Traducción DBMS',
		audience: 'Diseñador/DBA',
		description: 'Traducción al modelo del DBMS (relacional = tablas con PK/FK)',
		example: 'producto(id_producto PK, nombre NOT NULL, precio DECIMAL, id_tipo FK→tipo_producto, id_local FK→local)',
		color: 'blue',
	},
	{
		id: 'fisico',
		name: 'Físico',
		level: 'Implementación',
		audience: 'DBMS/desarrollador',
		description: 'Código SQL real: CREATE TABLE con tipos, ENGINE, restricciones',
		example: `CREATE TABLE producto (
  id_producto INT PRIMARY KEY AUTO_INCREMENT,
  nombre VARCHAR(100) NOT NULL,
  precio DECIMAL(8,2) NOT NULL,
  id_tipo INT NOT NULL,
  id_local INT NOT NULL,
  FOREIGN KEY (id_tipo) REFERENCES tipo_producto(id_tipo),
  FOREIGN KEY (id_local) REFERENCES local(id_local)
);`,
		color: 'amber',
	},
]
